import SocketConnectionManager, {
    ConnectionManager,
    EventCallback,
    SocketEventEmitter,
} from '@tidio/tidio-chat-connection-manager';

import { getMetricsCollectorInstance } from '../helpers/metricsCollector/MetricsCollector';
import { ravenCaptureException } from '../helpers/raven';

import { setReconnectionAttemptCount } from '../store/actions';
import { DefaultRootState } from '../store/typings';
import { visitorIdentify, visitorRegister } from './emitsTS';
import {
    botAppFailedListener,
    botAppStartedListener,
    botAppStoppedListener,
    botAppSuccessListener,
    botAppTransferredListener,
    botIsTypingListener,
    disableTextInput,
    enableTextInput,
    newMessageFromSocketsListener,
    operatorAssignDepartmentListener,
    operatorIsTypingListener,
    operatorLeaveConversationListener,
    operatorOpenConversationListener,
    operatorStatusHasBeenChangedListener,
    operatorTransferConversationListener,
    operatorVideoCallIceCandidatesOffered,
    operatorVideoCallOffered,
    operatorsTransferConversationsListener,
    projectStatusUpdateListener,
    sendEventToGoogleAnalytics,
    updateCart,
    visitorAskForRatingListener,
    visitorDeleted,
    visitorIsBannedListener,
    visitorMarkMessagesAsRead,
    visitorMergedListener,
    visitorUpdateDataListener,
    visitorVideoCallOffered,
} from './listeners';

export type PrechatArgs = {
    updateData?: {
        department_id?: string;
    };
};

export default function createConnectionManager(
    lsCache: ReturnType<typeof JSON.parse>,
): ConnectionManager<DefaultRootState> {
    let waitingForPrechatAck = false;
    const preChatAckEmitsQueue: [string, Record<string, unknown>, EventCallback | null][] = [];
    let reconnectionAttempts = 0;
    let isInitialConnection = true;
    let hasConnectedToWSOnce = false;

    const setDefaultParameters = (
        newArgs: {
            visitorId?: DefaultRootState['visitor']['id'];
            projectPublicKey?: DefaultRootState['publicKey'];
            device?: 'mobile' | 'desktop';
        },
        emitName: string,
        currentState: DefaultRootState,
    ): void => {
        const argsRef = newArgs;
        if (emitName !== 'visitorRegister' && emitName !== 'visitorIdentify') {
            if (!argsRef.visitorId) {
                argsRef.visitorId = currentState.visitor.id;
            }
            if (!argsRef.projectPublicKey) {
                argsRef.projectPublicKey = currentState.publicKey;
            }
            if (!argsRef.device) {
                argsRef.device = currentState.isMobile ? 'mobile' : 'desktop';
            }
        }
    };

    const socketsConnection = new SocketConnectionManager<DefaultRootState>(
        process.env.NEW_WIDGET_URL_SOCKET ?? '',
        false,
        {
            reconnectionDelay: 0.5 * 1000,
            reconnectionDelayMax: 60 * 1000,
            randomizationFactor: 0.8,
            reconnectionAttempts: 500,
            transports: ['websocket'],
        },
        setDefaultParameters,
    );

    const { closeConnection } = socketsConnection.connectionManager();

    socketsConnection.setListeners([
        projectStatusUpdateListener,
        newMessageFromSocketsListener,
        operatorIsTypingListener,
        botIsTypingListener,
        visitorAskForRatingListener,
        visitorIsBannedListener,
        visitorMergedListener,
        operatorAssignDepartmentListener,
        operatorOpenConversationListener,
        operatorLeaveConversationListener,
        operatorTransferConversationListener,
        operatorsTransferConversationsListener,
        botAppStartedListener,
        botAppStoppedListener,
        botAppTransferredListener,
        botAppSuccessListener,
        botAppFailedListener,
        visitorUpdateDataListener,
        operatorStatusHasBeenChangedListener,
        visitorDeleted,
        visitorMarkMessagesAsRead,
        updateCart,
        disableTextInput,
        enableTextInput,
        operatorVideoCallOffered,
        visitorVideoCallOffered,
        operatorVideoCallIceCandidatesOffered,
        sendEventToGoogleAnalytics,
    ]);

    function onPreChatAck(
        preChatArgs: PrechatArgs,
        preChatAckArgs: [
            result: boolean | string | Record<string, string | boolean | number | unknown>,
            message: { visitor_id: string | unknown },
        ],
        // we dont care about the callback type, since we will pass there everything with new visitor ID
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: SocketEventEmitter<any>,
    ): void {
        try {
            waitingForPrechatAck = false;
            const [, message] = preChatAckArgs;
            const { visitor_id: visitorId } = message;
            if (typeof visitorId !== 'string') {
                ravenCaptureException('Prechat non string visitorId', {
                    preChatArgs,
                    preChatAckArgs,
                });
            }
            const departmentId = preChatArgs?.updateData?.department_id;
            while (preChatAckEmitsQueue.length > 0) {
                const shiftedValue = preChatAckEmitsQueue.shift();
                if (shiftedValue) {
                    const [emitName, newArgs, newAck] = shiftedValue;
                    const argsWithModifiedVisitorId = {
                        ...newArgs,
                        visitorId,
                        ...(departmentId && { justSelectedDepartmentId: departmentId }),
                    };
                    callback(emitName, argsWithModifiedVisitorId, newAck);
                }
            }
        } catch (e) {
            ravenCaptureException(e);
        }
    }

    socketsConnection.setManagerEventsActions('connect', (store, toEmitQueue) => {
        if (!hasConnectedToWSOnce) {
            getMetricsCollectorInstance().markDuration('widget_ws_initial_connection_in_ms', 'end');
            hasConnectedToWSOnce = true;
        }
        reconnectionAttempts = 0;
        store.dispatch(setReconnectionAttemptCount(reconnectionAttempts));
        const { tidioIdentifyChanged } = store.getState();
        if (tidioIdentifyChanged) {
            socketsConnection.setRequiredEmitsAck(['visitorIdentify', 'visitorRegister']);
            toEmitQueue(visitorIdentify, () => {
                toEmitQueue(visitorRegister, lsCache, isInitialConnection, closeConnection);
            });
        } else {
            socketsConnection.setRequiredEmitsAck(['visitorRegister']);
            toEmitQueue(visitorRegister, lsCache, isInitialConnection, closeConnection);
        }
    });

    socketsConnection.setManagerEventsActions('reconnect_attempt', (store) => {
        if (hasConnectedToWSOnce) {
            isInitialConnection = false;
        }
        reconnectionAttempts += 1;
        store.dispatch(setReconnectionAttemptCount(reconnectionAttempts));
    });

    socketsConnection.setManagerEventsActions('disconnect', () => {
        // after reconnection, we want to make sure that all buffered emits
        // will be processed after the new visitorRegister ack
        socketsConnection.setRequiredEmitsAck(['visitorRegister']);
        getMetricsCollectorInstance().markDuration('widget_ws_reconnect_time_in_ms', 'start');
    });
    socketsConnection.setManagerEventsActions('reconnect', () => {
        getMetricsCollectorInstance().markDuration(
            'widget_ws_reconnect_time_in_ms',
            'end',
            undefined,
            false,
        );
        getMetricsCollectorInstance().setNumericValue(
            'widget_ws_reconnect_attempts',
            reconnectionAttempts,
            false,
        );
        getMetricsCollectorInstance().sendMetrics([
            'widget_ws_reconnect_time_in_ms',
            'widget_ws_reconnect_attempts',
        ]);
    });

    socketsConnection.setSocketEmitWrapper((emitName, newArgs, ack, callback) => {
        let newAck = ack;
        if (emitName === 'visitorPreForm') {
            waitingForPrechatAck = true;
            newAck = (...ackArgs): void => {
                ack?.(...ackArgs);
                onPreChatAck(newArgs, ackArgs, callback);
            };
        }
        if (waitingForPrechatAck && emitName === 'visitorNewMessage') {
            preChatAckEmitsQueue.push([emitName, newArgs, newAck]);
        } else {
            callback(emitName, newArgs, newAck);
        }
    });

    return socketsConnection.connectionManager();
}
