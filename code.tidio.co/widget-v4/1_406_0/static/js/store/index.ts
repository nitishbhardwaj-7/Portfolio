import { type Store, applyMiddleware, compose, createStore } from 'redux';
import uuid from 'uuid/v4';

import {
    IS_LOCAL_PROD_BUILD,
    addSPAAction,
    deobfuscateVisitorId,
    extractPublickeyFromScriptTag,
    getCurrentUrl,
    getIsMobileByUserAgent,
    getTidioIdentifyData,
    isInDesignMode,
    isInPreviewMode,
    isInSandboxMode,
    isInTestingMode,
    isLaunchedFromWebdriver,
    obfuscateVisitorId,
} from '../helpers';
import { getMetricsCollectorInstance } from '../helpers/metricsCollector/MetricsCollector';
import { ravenCaptureException } from '../helpers/raven';
import { setCurrentTranslations } from '../helpers/translations';

import { mobileWidgetHash } from '../components/UrlObservers/anchors';
import createConnectionManager from '../connection/socketsConnection';
import { initializeVisitor } from '../visitor';
import {
    compareTidioIdentifyData,
    initializeVisitorData,
    persistedStateLoaded,
    replaceStateWithSaved,
    setIframeView,
    setPreviewData,
    setWidgetMountState,
    updateVisitorUrl,
} from './actions';
import cachedVisitorRegisterDataMiddleware from './cachedVisitorRegisterDataMiddleware';
import reducer, { defaultState } from './reducer';
import reducerSideEffectsMiddleware from './reducerSideEffectsMiddleware';
import { getKeyFromStorage, loadState, rebuildStateIfVersionsDiffer } from './savedState';
import { sentryInit, sentryReduxEnhancer, setSentryTags, setSentryUserData } from './sentryConfig';
import socketEmitsMiddleware from './socketEmitsMiddleware';
import syncStateMiddleware from './syncStateMiddleware';
import bindTidioChatApiMethods from './tidioChatApiHelper';
import { CustomWindow, IframeViews } from './typings';
import viewStateMiddleware from './viewStateMiddleware';

const sessionId = uuid();

declare let window: CustomWindow;
declare let APP_VERSION_WEBPACK: string | undefined;

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development' || IS_LOCAL_PROD_BUILD) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

function initializeStore(): Store | undefined {
    if (process.env.NODE_ENV !== 'development' && !IS_LOCAL_PROD_BUILD) {
        sentryInit(APP_VERSION_WEBPACK);
    }
    const isPreviewMode = isInPreviewMode();
    const isTestingMode = isInTestingMode();

    const publicKey = extractPublickeyFromScriptTag();
    if (isLaunchedFromWebdriver()) {
        return undefined;
    }
    if (!(isPreviewMode || isTestingMode) && publicKey === false) {
        // we're not in preview mode but publicKey is false, abort
        return undefined;
    }

    const isSandboxMode = isInSandboxMode();
    const isDesignMode = isInDesignMode();

    let persistedState;
    if (!isPreviewMode && !isSandboxMode && !isTestingMode && !isDesignMode) {
        persistedState = loadState();
    }

    if (persistedState) {
        persistedState = rebuildStateIfVersionsDiffer(persistedState, defaultState);
    }
    const middlewares = [viewStateMiddleware, reducerSideEffectsMiddleware];
    const previewModeData = window.parent.document.tidioChatPreviewModeData;
    let lsCache;
    if (!isPreviewMode && !isTestingMode) {
        lsCache = getKeyFromStorage('cache');
        middlewares.unshift(cachedVisitorRegisterDataMiddleware(lsCache));
    }
    if (isPreviewMode && previewModeData) {
        // allow for preMiddleware injected from preview mode
        if (typeof previewModeData.preMiddleware === 'function') {
            middlewares.unshift(previewModeData.preMiddleware);
        }
    }

    let connectionManager;
    if (!isPreviewMode && !isTestingMode) {
        connectionManager = createConnectionManager(lsCache);
        middlewares.push(socketEmitsMiddleware(connectionManager));
    }
    if (!isPreviewMode && !isSandboxMode && !isTestingMode) {
        middlewares.push(syncStateMiddleware);
    }

    const enhancers = [];
    if (process.env.NODE_ENV !== 'development') {
        enhancers.push(sentryReduxEnhancer);
    }

    const store = createStore(
        reducer,
        persistedState || undefined,
        composeEnhancers(applyMiddleware(...middlewares), ...enhancers),
    );

    if (isTestingMode) {
        import(/* webpackChunkName: "visualRegresionHelpers" */ './visualRegresionHelpers').then(
            ({ default: loadStateFromPayload }) => {
                const parsed = loadStateFromPayload();
                if (parsed) {
                    store.dispatch(replaceStateWithSaved(parsed));
                }
            },
        );
    }

    if (process.env.NODE_ENV !== 'development') {
        const storeState = store.getState();
        setSentryTags({
            publicKey: storeState.publicKey,
            visitorId: storeState.visitor.id,
            originalVisitorId: storeState.visitor.originalVisitorId,
            designVersion: storeState.designVersion,
        });
        const visitorEmail = storeState.visitor.email;
        const visitorName = storeState.visitor.name;
        const visitorData: Record<string, unknown> = {
            id: storeState.visitor.id,
        };
        if (visitorEmail) {
            visitorData.email = visitorEmail;
        }
        if (visitorName) {
            visitorData.username = visitorName;
        }

        setSentryUserData(visitorData);
    }
    if (persistedState) {
        store.dispatch(persistedStateLoaded(persistedState));
    } else {
        store.dispatch(initializeVisitorData(initializeVisitor()));
    }

    const identifyData = getTidioIdentifyData();
    store.dispatch(compareTidioIdentifyData(identifyData));

    // send new url to sockets on some SPA pages
    try {
        if (window.parent?.history) {
            /*
             *
             * We are adding support for window.parent.onpushstate (which is
             * not a native browser function) to native pushState. Later in
             * code we can add function to window.parent.onpushstate and it
             * will be run on every pushState on SPA pages (for example those
             * using react-router). To add a new function to url change action
             * there is a new function - addSPAAction.
             *
             */

            const oldHistory = window.parent.history;
            const { pushState } = window.parent.history;
            window.parent.history.pushState = function pushFunc(): void {
                try {
                    if (typeof window.onpushstate === 'function') {
                        // eslint-disable-next-line prefer-rest-params
                        window.onpushstate(arguments);
                    }
                } catch {
                    //
                }

                return pushState.apply(
                    oldHistory,
                    // eslint-disable-next-line prefer-rest-params
                    arguments as unknown as Parameters<typeof window.parent.history.pushState>,
                );
            };
        }
    } catch (e) {
        // in case we dont have permissions to access parent history
        ravenCaptureException("Can't access window.parent when trying to patch pushState", {
            e,
        });
    }

    const updateUrl = (): void => {
        setTimeout(() => {
            const url = getCurrentUrl();
            if (!url.includes(mobileWidgetHash)) {
                store.dispatch(updateVisitorUrl(url));
            }
        });
    };

    addSPAAction(updateUrl);

    if (!isPreviewMode && connectionManager) {
        getMetricsCollectorInstance().markDuration('widget_ws_initial_connection_in_ms', 'start');
        const storeState = store.getState();
        const visitorId = storeState?.visitor?.id;
        const query = {
            ppk: publicKey,
            device: getIsMobileByUserAgent() ? 'mobile' : 'desktop',
            cmv: '2_0',
            ver: 'dev',
            seid: sessionId,
            ...(visitorId && { vid: obfuscateVisitorId(visitorId) }),
        };
        if (process.env.NODE_ENV === 'development') {
            (window.parent as unknown as Record<string, unknown>).deobfuscateVisitorId =
                deobfuscateVisitorId;
        }
        if (process.env.NODE_ENV !== 'development' && !IS_LOCAL_PROD_BUILD) {
            query.ver = APP_VERSION_WEBPACK || 'unknown';
        }
        connectionManager.connectToSockets(
            store,
            {
                push: (...args) => {
                    // eslint-disable-next-line no-console
                    console.log('history.push', args);
                },
            },
            () => {}, // connect callback
            () => {}, // disconnect callback
            {
                query,
            },
        );
    }
    bindTidioChatApiMethods(store);

    if (process.env.NODE_ENV === 'development' && isSandboxMode) {
        // eslint-disable-next-line no-console
        console.debug('%csandbox mode', 'background: pink; color: #fff; font-size:24px');
    }

    if (isPreviewMode) {
        // eslint-disable-next-line no-console
        console.debug(
            // eslint-disable-next-line no-template-curly-in-string
            'preview mode, go to http://localhost:3000/preview.html?=${publicKey} to connect to WS',
        );
        store.dispatch(setPreviewData('previewModeEnabled', true));
        window.parent.addEventListener(
            'message',
            (event) => {
                if (
                    !(
                        event.origin.includes('tidiochat.com') ||
                        event.origin.includes('tidio.com') ||
                        event.origin.includes('tidio.dev') ||
                        event.origin.includes('tidio.in') ||
                        event.origin.includes('tidio-local') ||
                        event.origin.includes('panel.tidio.localhost')
                    ) &&
                    event.origin !== 'http://tidio.local' &&
                    event.origin !== 'http://localhost:3456' &&
                    event.origin !== 'https://widget.tidio.localhost'
                ) {
                    return false;
                }
                let { data } = event;
                data = JSON.parse(data);
                // eslint-disable-next-line no-console
                console.debug('setPreviewData', data);
                store.dispatch(setPreviewData(data.prop, data.payload));
                store.dispatch(setIframeView(IframeViews.CHAT_SIZE_1));
                return true;
            },
            false,
        );
        if (previewModeData) {
            if (previewModeData.preformData) {
                store.dispatch(setPreviewData('preChatData', previewModeData.preformData));
            }
            if (previewModeData.routingRules) {
                store.dispatch(setPreviewData('routingRules', previewModeData.routingRules));
            }
            if (previewModeData.operators) {
                store.dispatch(setPreviewData('operators', previewModeData.operators));
            }
            if (previewModeData.color) {
                store.dispatch(setPreviewData('color', previewModeData.color));
            }
            if (previewModeData.bannerImage) {
                store.dispatch(setPreviewData('bannerImage', previewModeData.bannerImage));
            }
            if (previewModeData.translations) {
                setCurrentTranslations(
                    previewModeData.translations,
                    'en', // TODO change for getUserLanguage(),
                );
            }
            if (previewModeData.sidebar !== undefined) {
                store.dispatch(setPreviewData('sidebar', previewModeData.sidebar));
            }
            if (previewModeData.messages) {
                store.dispatch(setPreviewData('messages', previewModeData.messages));
            }
            if (previewModeData.previewView) {
                store.dispatch(setPreviewData('previewView', previewModeData.previewView));
            }
            if (previewModeData.hideWhenOffline) {
                store.dispatch(setPreviewData('hideWhenOffline', previewModeData.hideWhenOffline));
            }
            if (previewModeData.widgetLabelStatus) {
                store.dispatch(
                    setPreviewData('widgetLabelStatus', previewModeData.widgetLabelStatus),
                );
            }
            if (previewModeData.widgetSoundStatus === false) {
                store.dispatch(
                    setPreviewData('widgetSoundStatus', previewModeData.widgetSoundStatus),
                );
            }
            if (previewModeData.chatOnSite) {
                store.dispatch(setPreviewData('chatOnSite', previewModeData.chatOnSite));
            }
            if (previewModeData.messageForFly) {
                store.dispatch(setPreviewData('messageForFly', previewModeData.messageForFly));
            }
            if (previewModeData.showBranding === false) {
                store.dispatch(setPreviewData('showBranding', previewModeData.showBranding));
            }
            if (previewModeData.customBranding) {
                store.dispatch(setPreviewData('customBranding', previewModeData.customBranding));
            }
            if (previewModeData.customAvatar) {
                store.dispatch(setPreviewData('customAvatar', previewModeData.customAvatar));
            }
            if (previewModeData.conversationStarters) {
                store.dispatch(
                    setPreviewData('conversationStarters', previewModeData.conversationStarters),
                );
            }
            if (previewModeData.designVersion) {
                store.dispatch(setPreviewData('designVersion', previewModeData.designVersion));
            }
            if (previewModeData.isPrivacyPolicyEnabled) {
                store.dispatch(
                    setPreviewData(
                        'isPrivacyPolicyEnabled',
                        previewModeData.isPrivacyPolicyEnabled,
                    ),
                );
            }
            if (previewModeData.platform) {
                store.dispatch(setPreviewData('platform', previewModeData.platform));
            }
        }
        store.dispatch(setWidgetMountState());
    }

    return store;
}

export default initializeStore;
