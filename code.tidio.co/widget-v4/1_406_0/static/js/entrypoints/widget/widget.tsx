/* eslint-disable import/no-import-module-exports */
// eslint-disable-next-line @tidio/rules/always-require-default-export
import React from 'react';
import { Root, createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { Store } from 'redux';

import { disableUnnecessaryWarnings, isInPreviewMode } from '../../helpers';
import { getMetricsCollectorInstance } from '../../helpers/metricsCollector/MetricsCollector';
import { isNewSkin } from '../../helpers/skin';

import LazyWidgetIframe from '../../components/LazyWidgetIframe';
import { getDesignVersion, getIsChatOnSite, getIsMobile } from '../../store/selectors';
import { CustomWindow } from '../../store/typings';
import TidioChatApi from '../render/TidioChatApi';

/* eslint-enable import/no-import-module-exports */

disableUnnecessaryWarnings();

declare let window: CustomWindow;

const prepareAppContainer = (
    newSkin: boolean,
    isChatOnSite?: boolean,
    isInPreview?: boolean,
): Element | null => {
    const { document } = window.parent;

    const existingTidioChat = document.getElementById('tidio-chat');
    if (existingTidioChat) {
        existingTidioChat.remove();
    }

    const tidioChat = document.createElement('div');
    tidioChat.id = 'tidio-chat';
    document.body.appendChild(tidioChat);

    tidioChat.style.setProperty('z-index', '999999999', 'important');

    if (isInPreview || !isChatOnSite) {
        tidioChat.style.setProperty('position', 'fixed');
    } else {
        const refNode = document.body.querySelector('.right');
        if (refNode?.parentNode) {
            let centerContainer = document.querySelector('section.center');
            if (!centerContainer) {
                centerContainer = document.createElement('section');
                centerContainer.className = 'center';
                refNode.parentNode.insertBefore(centerContainer, refNode);
            }
            tidioChat.remove();
            centerContainer.appendChild(tidioChat);
        }
    }

    if (!newSkin) {
        return tidioChat;
    }

    if (isChatOnSite) {
        tidioChat.style.setProperty('position', 'relative');
        tidioChat.style.setProperty('width', '100%');
        tidioChat.style.setProperty('height', '100%');
    }

    // if there is need to change this settings please test it thoroughly
    // please check desktop and mobile devices, also make sure to test in different browsers
    // android and ios devices behave differently, so please test every change on both devices
    // some of the test cases:
    // - ios -> first load with toolbar on the bottom - should not cover the widget (this behavior was observed with 100vh 100vw)
    // - android -> fast swipe down or up - should not make widget jump (this behavior was observed with inset: 0)
    tidioChat.style.width = '100%';
    tidioChat.style.height = '100%';
    tidioChat.style.bottom = '0';
    tidioChat.style.right = '0';
    tidioChat.style.pointerEvents = 'none';

    const shadowRoot = tidioChat.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    // Reset inheritable styles to their initial values when they cross the shadow boundary
    // This ensures proper style isolation within the shadow DOM
    style.textContent = `
        :host {
            all: initial;
        }
    `;
    shadowRoot.appendChild(style);

    const appContainer = document.createElement('div');
    appContainer.id = 'body';
    appContainer.classList.add('awesome-iframe');
    shadowRoot.appendChild(appContainer);

    return appContainer;
};

const renderWidget = (store: Store): (() => void) => {
    const state = store.getState();
    const isChatOnSite = getIsChatOnSite(state);
    const isInPreview = isInPreviewMode();
    let currentDesignVersion = getDesignVersion(state);
    let currentIsMobile = getIsMobile(state);
    let appContainer: Element | null = null;
    let root: Root | null = null;

    const renderApp = (): void => {
        if (root) {
            root.unmount();
            root = null;
        }

        const newSkin = currentDesignVersion === 5 || isNewSkin();
        appContainer = prepareAppContainer(newSkin, isChatOnSite, isInPreview);

        if (appContainer) {
            root = createRoot(appContainer);
            root.render(
                <Provider store={store}>
                    <LazyWidgetIframe />
                </Provider>,
            );
        }
    };

    // we get information from the ws about the design version after the element is already mounted on the page
    // since this is temporary, we do not want to wait for the ws for the initial render, remove this after the full release
    const unsubscribe = store.subscribe(() => {
        const designVersion = getDesignVersion(store.getState());
        const isMobile = getIsMobile(store.getState());

        if (designVersion !== currentDesignVersion) {
            currentDesignVersion = designVersion;
            renderApp();
        }
        if (isMobile !== currentIsMobile) {
            currentIsMobile = isMobile;
            renderApp();
        }
    });

    renderApp();

    return () => {
        root?.unmount();
        unsubscribe();
    };
};

window.tidioChatApi = window.tidioChatApi || new TidioChatApi();

window.requestIdleCallback =
    window.requestIdleCallback ||
    function requestIdleCb(cb): ReturnType<typeof setTimeout> {
        const start = Date.now();
        return setTimeout(() => {
            cb({
                didTimeout: false,
                timeRemaining() {
                    return Math.max(0, 50 - (Date.now() - start));
                },
            });
        }, 1);
    };

window.cancelIdleCallback =
    window.cancelIdleCallback ||
    function cancelIdleCb(id): void {
        clearTimeout(id);
    };

// setTimeout here is to split initial script execution into smaller chunks
window.requestIdleCallback(
    () => {
        // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports
        const initializeStore = require('../../store').default;

        window.requestIdleCallback(
            () => {
                const store = initializeStore();
                window.requestIdleCallback(
                    () => {
                        getMetricsCollectorInstance().markDuration(
                            'widget_total_load_in_ms',
                            'start',
                            window.FIRST_POSSIBLE_JS_EXECUTION,
                        );
                        getMetricsCollectorInstance().markDuration(
                            'widget_js_total_load_in_ms',
                            'start',
                            window.FIRST_POSSIBLE_JS_EXECUTION,
                        );
                        getMetricsCollectorInstance().markDuration(
                            'widget_js_total_load_in_ms',
                            'end',
                        );
                        if (store) {
                            const unmount = renderWidget(store);

                            if (process.env.NODE_ENV === 'development' && module.hot) {
                                if (module.hot) {
                                    window.addEventListener('beforeunload', () => {
                                        const node =
                                            window.parent.document.getElementById('tidio-chat');
                                        unmount();
                                        node?.remove();
                                    });
                                }
                            }
                        }
                    },
                    { timeout: 50 },
                );
            },
            { timeout: 100 },
        );
    },
    { timeout: 100 },
);
