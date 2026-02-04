import { SocketEventListener } from '@tidio/tidio-chat-connection-manager';

import { BOT_IS_TYPING_TIMEOUT } from '../helpers';
import { EmitterEvents } from '../helpers/eventEmitter/EmitterEvents';
import eventEmitter from '../helpers/eventEmitter/eventEmitter';

import {
    addMessage,
    closeSocketConnection,
    fetchShopifyCartContent,
    mergeVisitor,
    operatorAssignedDepartment,
    operatorChangedStatus,
    operatorLeftConversation,
    operatorOpenedConversation,
    operatorTransferredConversation,
    setAiAssistantIsThinking,
    setBotStatus,
    setDisableTextInput,
    setOperatorIsTypingStatus,
    setProjectStatus,
    setSatisfactionSurveyConfig,
    setVisitorMergedEmitQueue,
    setVisitorMessagesAsRead,
    setWidgetMountState,
    toggleEmojiPanel,
    updateVisitorData,
} from '../store/actions';
import { removeSavedStateFromStorage } from '../store/savedState';
import {
    DefaultRootState,
    MessageFromSockets,
    MessageType,
    Operator,
    SatisfactionSurveyConfig,
    VisitorDataUpdate,
} from '../store/typings';
import { getGoogleTracker } from '../tracking/GoogleTracker/GoogleTracker';
import { visitorRegister } from './emitsTS';
import { parseMessageFromSockets, transformToAutomaticSurveyMessage } from './parsers';

export const projectStatusUpdateListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on('projectDataUpdate', ({ type }: { type: string }) => {
        if (type === 'online' || type === 'offline') {
            dispatch(setProjectStatus(type));
        }
    });
};

export const newMessageFromSocketsListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on('newMessage', (payload: { data: MessageFromSockets }) => {
        const parsedMessage = parseMessageFromSockets(payload);
        if (parsedMessage) {
            dispatch(addMessage(parsedMessage));
        }
    });
};

export const operatorIsTypingListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on(
        'operatorIsTyping',
        ({ operator_id: operatorId }: { operator_id: Operator['id'] }) => {
            dispatch(setOperatorIsTypingStatus(operatorId));
        },
    );
};

export const botIsTypingListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on('botIsTyping', ({ type }: { type: string }) => {
        if (type === 'aiAssistant') {
            dispatch(setAiAssistantIsThinking(true));
        } else {
            dispatch(setOperatorIsTypingStatus(true, BOT_IS_TYPING_TIMEOUT));
        }
    });
};

export const visitorIsBannedListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on('visitorIsBanned', () => {
        dispatch(closeSocketConnection());
        dispatch(setWidgetMountState(false));
    });
};

export const visitorAskForRatingListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on(
        'visitorInsideAction',
        ({
            action,
            value,
        }: {
            action: string;
            value: {
                satisfactionSurvey: SatisfactionSurveyConfig;
                threadSource: SatisfactionSurveyConfig['threadSource'];
                threadId: number;
                messageId: number;
            };
        }) => {
            if (action !== 'visitorShowCustomerSurvey') {
                return false;
            }

            const { satisfactionSurvey, threadId, threadSource, messageId } = value;
            dispatch(
                setSatisfactionSurveyConfig(satisfactionSurvey, threadSource, threadId, messageId),
            );
            const message = transformToAutomaticSurveyMessage(
                threadSource,
                threadId,
                messageId,
                MessageType.AUTOMATIC_SURVEY,
            );

            dispatch(addMessage(message));
            return true;
        },
    );
};

export const visitorMergedListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on(
        'visitorMerged',
        ({ visitor_target_id: newVisitorId }: { visitor_target_id: string }) => {
            if (newVisitorId) {
                dispatch(mergeVisitor(newVisitorId));
                dispatch(setVisitorMergedEmitQueue(visitorRegister as () => void));
            }
        },
    );
};

export const operatorOpenConversationListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on(
        'operatorOpenConversation',
        ({
            operator_id: operatorId,
            operator_name: operatorName,
        }: {
            operator_id: Operator['id'];
            operator_name: string;
        }) => {
            const { assignedOperators } = getState();
            const operatorAlreadyInConversation = assignedOperators.find(
                (assignedOperatorId) => assignedOperatorId === operatorId,
            );
            if (!operatorId || operatorAlreadyInConversation) {
                return false;
            }
            dispatch(operatorOpenedConversation(operatorId, operatorName));
            return true;
        },
    );
};

export const operatorAssignDepartmentListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on(
        'operatorAssignDepartment',
        ({ department_id: departmentId }: { department_id: number }) => {
            if (!departmentId) {
                return false;
            }

            dispatch(operatorAssignedDepartment(departmentId));

            return true;
        },
    );
};

export const operatorLeaveConversationListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on(
        'operatorLeaveConversation',
        ({ operator_id: operatorId }: { operator_id: Operator['id'] }) => {
            if (operatorId) {
                dispatch(operatorLeftConversation(operatorId));
            }
        },
    );
};

export const operatorTransferConversationListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on(
        'operatorTransferConversation',
        ({
            operator_current_id: sourceOperatorId,
            operator_target_id: targetOperatorId,
            operator_target_name: targetOperatorName,
        }: {
            operator_current_id: Operator['id'];
            operator_target_id: Operator['id'];
            operator_target_name: string;
        }) => {
            const { assignedOperators } = getState();
            const operatorAlreadyInConversation = assignedOperators.find(
                (assignedOperatorId) => assignedOperatorId === targetOperatorId,
            );
            if (operatorAlreadyInConversation) {
                return false;
            }
            dispatch(
                operatorTransferredConversation({
                    sourceOperatorId,
                    targetOperatorId,
                    targetOperatorName,
                }),
            );
            return true;
        },
    );
};

export const operatorsTransferConversationsListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on(
        'operatorsTransferConversations',
        (
            payload: {
                visitor_id: string;
                operator_current_id: Operator['id'];
                operator_target_id: Operator['id'];
                operator_target_name: string;
            }[],
        ) => {
            payload.forEach(
                ({
                    operator_current_id: sourceOperatorId,
                    operator_target_id: targetOperatorId,
                    operator_target_name: targetOperatorName,
                    visitor_id: visitorId,
                }) => {
                    const { assignedOperators, visitor } = getState();
                    if (visitor.id !== visitorId) {
                        return false;
                    }
                    const operatorAlreadyInConversation = assignedOperators.find(
                        (assignedOperatorId) => assignedOperatorId === targetOperatorId,
                    );
                    if (operatorAlreadyInConversation) {
                        return false;
                    }
                    dispatch(
                        operatorTransferredConversation({
                            sourceOperatorId,
                            targetOperatorId,
                            targetOperatorName,
                        }),
                    );
                    return true;
                },
            );
        },
    );
};

export const botAppStartedListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on('botAppStarted', () => {
        dispatch(setBotStatus(true));
    });
};
export const botAppStoppedListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on('botAppStopped', () => {
        dispatch(setBotStatus(false));
    });
};
export const botAppTransferredListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on('botAppTransferred', () => {
        dispatch(setBotStatus(false));
    });
};
export const botAppSuccessListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on('botAppSuccess', () => {
        dispatch(setBotStatus(false));
    });
};
export const botAppFailedListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on('botAppFailed', () => {
        dispatch(setBotStatus(false));
    });
};

export const visitorUpdateDataListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on('visitorUpdateData', (payload: VisitorDataUpdate) => {
        dispatch(updateVisitorData(payload, false));
    });
};

export const operatorStatusHasBeenChangedListener: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on(
        'operatorStatusHasBeenChanged',
        ({
            operator_id: operatorId,
            status,
            dnd_forced_status: dndForced,
            dnd_is_in_interval: dndInterval,
        }: {
            operator_id: Operator['id'];
            status: string;
            dnd_forced_status: boolean;
            dnd_is_in_interval: boolean;
        }) => {
            const isOnline = !(Boolean(dndForced) || Boolean(dndInterval) || status === 'offline');
            dispatch(operatorChangedStatus(operatorId, isOnline));
        },
    );
};

export const visitorDeleted: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on('visitorDeleted', () => {
        dispatch(closeSocketConnection());
        dispatch(setWidgetMountState(false));
        setTimeout(() => {
            removeSavedStateFromStorage();
        }, 1000);
    });
};

export const visitorMarkMessagesAsRead: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on('markMessagesAsRead', () => {
        dispatch(setVisitorMessagesAsRead());
    });
};

export const updateCart: SocketEventListener<DefaultRootState> = (socket, getState, dispatch) => {
    socket.on('updateCart', () => {
        const { platform } = getState();
        if (platform === 'shopify') {
            dispatch(fetchShopifyCartContent());
        }
    });
};

export const disableTextInput: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on('disableTextInput', () => {
        dispatch(setDisableTextInput(true));
        dispatch(toggleEmojiPanel(false));
    });
};

export const enableTextInput: SocketEventListener<DefaultRootState> = (
    socket,
    getState,
    dispatch,
) => {
    socket.on('enableTextInput', () => {
        dispatch(setDisableTextInput(false));
    });
};

export const operatorVideoCallOffered: SocketEventListener<DefaultRootState> = (socket) => {
    socket.on('operatorVideoCallOffer', (data: EmitterEvents['operatorVideoCallOffered']) => {
        eventEmitter.publish('operatorVideoCallOffered', data);
    });
};

export const visitorVideoCallOffered: SocketEventListener<DefaultRootState> = (socket) => {
    socket.on('visitorVideoCallOffer', (data: EmitterEvents['visitorVideoCallOffer']) => {
        eventEmitter.publish('visitorVideoCallOffer', data);
    });
};

export const operatorVideoCallIceCandidatesOffered: SocketEventListener<DefaultRootState> = (
    socket,
) => {
    socket.on(
        'operatorVideoCallIceCandidates',
        (data: EmitterEvents['operatorVideoCallIceCandidatesOffered']) => {
            eventEmitter.publish('operatorVideoCallIceCandidatesOffered', data);
        },
    );
};

export const sendEventToGoogleAnalytics: SocketEventListener<DefaultRootState> = (socket) => {
    socket.on('sendEventToGoogleAnalytics', ({ eventName }: { eventName: unknown }) => {
        if (typeof eventName === 'string') {
            getGoogleTracker().trackEvent({ type: 'custom', eventName });
        }
    });
};
