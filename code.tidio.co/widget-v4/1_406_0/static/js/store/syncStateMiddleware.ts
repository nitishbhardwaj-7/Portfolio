import debounce from 'lodash.debounce';
import { Middleware } from 'redux';
import uuid from 'uuid/v4';

import { extractPublickeyFromScriptTag, isInDesignMode } from '../helpers';
import { trans } from '../helpers/translations';

import {
    REPLACE_STATE_WITH_SAVED,
    SET_DRAG_AND_DROP_STATUS,
    SHOW_USER_DATA_MODAL,
    VISITOR_IS_TYPING,
    replaceStateWithSaved,
    showAlert,
} from './actions';
import { saveState, saveStateAsync } from './savedState';
import { DefaultRootState } from './typings';

const tabId = uuid();

let lastLocalUpdateTimestamp = 0;
let lastAcceptedRemoteTimestamp = 0;

let broadcastChannel: BroadcastChannel | null = null;
let isBroadcastChannelAvailable = typeof BroadcastChannel !== 'undefined';
let storageEventListener: ((event: StorageEvent) => void) | null = null;
let localStorageAvailable: null | boolean = null;
let alertDisplayed = false;

const getChannelName = (): string => {
    const publicKey = extractPublickeyFromScriptTag() || 'preview';
    let channelName = `tidio_sync_${publicKey}`;

    if (isInDesignMode()) {
        channelName += '_designmode';
    }

    return channelName;
};

const getStorageKey = (): string => {
    const publicKey = extractPublickeyFromScriptTag() || 'preview';
    let storageKey = `tidio_state_${publicKey}`;

    if (isInDesignMode()) {
        storageKey += '_designmode';
    }

    return storageKey;
};

const debounceTime = 1000;

const isVisitorMatching = (
    currentState: DefaultRootState,
    incomingState: DefaultRootState,
): boolean => {
    const currentVisitorId = currentState.visitor?.id;
    const currentOriginalVisitorId = currentState.visitor?.originalVisitorId;
    const incomingVisitorId = incomingState.visitor?.id;
    const incomingOriginalVisitorId = incomingState.visitor?.originalVisitorId;

    return (
        currentVisitorId === incomingVisitorId ||
        currentVisitorId === incomingOriginalVisitorId ||
        currentOriginalVisitorId === incomingVisitorId ||
        (currentOriginalVisitorId !== undefined &&
            currentOriginalVisitorId === incomingOriginalVisitorId)
    );
};

const persistAndBroadcastState = debounce(async (state: DefaultRootState) => {
    if (localStorageAvailable !== false) {
        saveStateAsync(state);
    }

    if (broadcastChannel && isBroadcastChannelAvailable) {
        try {
            broadcastChannel.postMessage({
                type: 'STATE_UPDATE',
                state,
                sourceTabId: tabId,
                timestamp: lastLocalUpdateTimestamp,
            });
        } catch {
            isBroadcastChannelAvailable = false;
        }
    }
}, debounceTime);

const syncStateMiddleware: Middleware =
    ({ getState, dispatch }) =>
    (next) => {
        if (isBroadcastChannelAvailable && !broadcastChannel) {
            try {
                broadcastChannel = new BroadcastChannel(getChannelName());

                broadcastChannel.onmessage = (event: MessageEvent): void => {
                    if (event.data.type === 'STATE_UPDATE') {
                        if (event.data.sourceTabId === tabId) {
                            return undefined;
                        }

                        const currentState = getState();
                        const incomingState = event.data.state;
                        const incomingTimestamp = event.data.timestamp || 0;

                        if (!isVisitorMatching(currentState, incomingState)) {
                            return undefined;
                        }

                        const currentMessageCount = currentState.messages?.length || 0;
                        const incomingMessageCount = incomingState.messages?.length || 0;

                        if (incomingMessageCount < currentMessageCount) {
                            return undefined;
                        }

                        if (incomingMessageCount === currentMessageCount) {
                            const ourLatestTimestamp = Math.max(
                                lastLocalUpdateTimestamp,
                                lastAcceptedRemoteTimestamp,
                            );
                            if (incomingTimestamp <= ourLatestTimestamp) {
                                return undefined;
                            }
                        }

                        lastAcceptedRemoteTimestamp = incomingTimestamp;
                        dispatch(replaceStateWithSaved(incomingState));
                    }
                    return undefined;
                };
            } catch {
                isBroadcastChannelAvailable = false;
                broadcastChannel = null;
            }
        }

        // fallback: use storage event listener if BroadcastChannel is not available
        if (!isBroadcastChannelAvailable && !storageEventListener) {
            storageEventListener = (event: StorageEvent): void => {
                if (event.key !== getStorageKey() || !event.newValue) {
                    return undefined;
                }

                try {
                    const currentState = getState();
                    const incomingState: DefaultRootState = JSON.parse(event.newValue);

                    if (!isVisitorMatching(currentState, incomingState)) {
                        return undefined;
                    }

                    // Storage events don't include timestamp, so we use current time
                    // This is less accurate than BroadcastChannel but still prevents loops
                    const incomingTimestamp = Date.now();

                    const currentMessageCount = currentState.messages?.length || 0;
                    const incomingMessageCount = incomingState.messages?.length || 0;

                    if (incomingMessageCount < currentMessageCount) {
                        return undefined;
                    }

                    if (incomingMessageCount === currentMessageCount) {
                        const ourLatestTimestamp = Math.max(
                            lastLocalUpdateTimestamp,
                            lastAcceptedRemoteTimestamp,
                        );
                        if (incomingTimestamp <= ourLatestTimestamp) {
                            return undefined;
                        }
                    }

                    lastAcceptedRemoteTimestamp = incomingTimestamp;
                    dispatch(replaceStateWithSaved(incomingState));
                } catch {
                    // failed to parse or update state, ignore
                }

                return undefined;
            };

            window.addEventListener('storage', storageEventListener);
        }

        return (action) => {
            switch (action.type) {
                case REPLACE_STATE_WITH_SAVED:
                case VISITOR_IS_TYPING:
                case SET_DRAG_AND_DROP_STATUS:
                case SHOW_USER_DATA_MODAL: {
                    return next(action);
                }
                default: {
                    const retVal = next(action);

                    // Handle localStorage unavailability alert
                    if (localStorageAvailable === false) {
                        if (!alertDisplayed) {
                            alertDisplayed = true;
                            // there are no translations yet, so we postpone a dispatch
                            setTimeout(() => {
                                dispatch(
                                    showAlert(
                                        trans(
                                            'localStorageNotAvailable',
                                            null,
                                            "You're viewing this page in Private/Incognito mode and your messages aren't saved when you go to other pages. Alternatively, you can enable localStorage if it's blocked in your browser.",
                                        ),
                                    ),
                                );
                            }, 1000);
                        }
                        return retVal;
                    }

                    const state = getState();
                    if (localStorageAvailable === null) {
                        localStorageAvailable = saveState(state);
                    } else {
                        lastLocalUpdateTimestamp = Date.now();
                        persistAndBroadcastState(state);
                    }

                    return retVal;
                }
            }
        };
    };

export const closeSyncStateMiddleware = (): void => {
    if (broadcastChannel) {
        broadcastChannel.close();
        broadcastChannel = null;
    }

    if (storageEventListener) {
        window.removeEventListener('storage', storageEventListener);
        storageEventListener = null;
    }
};

export default syncStateMiddleware;
