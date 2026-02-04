import { Dispatch, Middleware } from 'redux';

import {
    ADD_MESSAGE,
    SEND_MESSAGE_FROM_VISITOR,
    setMessageForFly,
    setOpenTab,
    setView,
} from './actions';
import { DefaultRootState, View } from './typings';

const viewStateMiddleware: Middleware =
    ({ getState, dispatch }: { getState: () => DefaultRootState; dispatch: Dispatch }) =>
    (next) =>
    (action) => {
        switch (action.type) {
            case ADD_MESSAGE: {
                const state = getState();
                if (state.isSoundEnabled && state.notificationSnoozed) {
                    return next(action);
                }
                const { type: messageType } = action.message;
                if (state.view === View.CLOSED) {
                    const shouldOpenChatView = messageType === 'rateConversation';
                    const view = shouldOpenChatView ? View.CHAT : View.FLY;
                    setTimeout(() => {
                        dispatch(setMessageForFly(action.message));
                        dispatch(setView(view));
                    }, 0);
                } else if (state.view === View.FLY) {
                    const shouldOpenChatView = messageType === 'rateConversation';
                    if (shouldOpenChatView) {
                        setTimeout(() => {
                            dispatch(setView(View.CHAT));
                        }, 0);
                    }
                } else if (state.view === View.CHAT) {
                    setTimeout(() => {
                        dispatch(setOpenTab('conversations'));
                    }, 0);
                }
                return next(action);
            }
            case SEND_MESSAGE_FROM_VISITOR: {
                const state = getState();
                if (state.view !== View.CHAT) {
                    dispatch(setView(View.CHAT));
                }
                return next(action);
            }
            default: {
                return next(action);
            }
        }
    };

export default viewStateMiddleware;
