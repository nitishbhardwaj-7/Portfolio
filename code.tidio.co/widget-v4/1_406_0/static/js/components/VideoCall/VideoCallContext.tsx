import React, {
    MutableRefObject,
    ReactElement,
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import uuid from 'uuid/v4';

import { cloneDeep } from '../../helpers';
import eventEmitter from '../../helpers/eventEmitter/eventEmitter';

import { sendVideoCallOffer, setOpenTab, setView } from '../../store/actions';
import { getOpenTab, getView } from '../../store/selectors';
import { View } from '../../store/typings';

const instanceId = uuid();

type VideoCallData = {
    visitorId: string;
    operatorId: number;
    offer: {
        sdp: string;
        type: 'offer' | 'answer' | 'rollback';
    } | null;
    iceCandidatesUrl: string;
    instanceId?: string;
} | null;

type Action =
    | { type: 'SET_OPERATOR_VIDEO_CALL_OFFER'; payload: VideoCallData }
    | { type: 'RESET_OPERATOR_VIDEO_CALL_OFFER' }
    | { type: 'SET_VIDEOCALL_INSTANCE_ID'; payload: { instanceId: string } };

const VideoCallOfferContext = createContext<{
    state: VideoCallData;
    dispatch: React.Dispatch<Action>;
    iceCandidatesQueueRef: MutableRefObject<string[]> | null;
}>({ state: null, dispatch: () => {}, iceCandidatesQueueRef: null });

const videoCallOfferReducer = (state: VideoCallData, action: Action): VideoCallData => {
    switch (action.type) {
        case 'SET_OPERATOR_VIDEO_CALL_OFFER': {
            if (!state) {
                return action.payload;
            }
            return { ...state, ...action.payload };
        }
        case 'RESET_OPERATOR_VIDEO_CALL_OFFER': {
            return null;
        }
        case 'SET_VIDEOCALL_INSTANCE_ID': {
            if (!state) {
                return null;
            }
            return { ...state, instanceId: action.payload.instanceId };
        }
        default: {
            return state;
        }
    }
};

/**
 * We are storing video call offer in context so it does not synchronize between tabs, as per our global state
 */
const VideoCallProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [state, videoCallDispatch] = useReducer(videoCallOfferReducer, null);
    const iceCandidatesQueueRef = useRef<string[]>([]);
    const view = useSelector(getView);
    const dispatch = useDispatch();
    const storedIncomingInstanceId = state?.instanceId;
    const openTab = useSelector(getOpenTab);

    useEffect(() => {
        const unsubscribe = eventEmitter.subscribe('operatorVideoCallOffered', (data) => {
            if (data?.offer) {
                // if instanceId is not set, it means that it is a new offer for all widget instances to accept
                // if instanceId is set, it means that it is a new offer for a specific widget instance to accept
                if (
                    (typeof data.offer.instanceId === 'string' &&
                        data.offer.instanceId === instanceId) ||
                    data.offer.instanceId === undefined
                ) {
                    if (view !== View.CHAT) {
                        dispatch(setView(View.CHAT));
                    }
                    if (openTab !== 'conversations') {
                        dispatch(setOpenTab('conversations'));
                    }
                    videoCallDispatch({ type: 'SET_OPERATOR_VIDEO_CALL_OFFER', payload: data });
                }
            } else {
                videoCallDispatch({ type: 'RESET_OPERATOR_VIDEO_CALL_OFFER' });
                iceCandidatesQueueRef.current = [];
            }
        });
        return unsubscribe;
    }, [view, openTab, dispatch]);

    useEffect(() => {
        const unsubscribe = eventEmitter.subscribe(
            'operatorVideoCallIceCandidatesOffered',
            (data) => {
                data.iceCandidates.forEach((candidate: string) => {
                    if (candidate) {
                        iceCandidatesQueueRef.current.push(candidate);
                    }
                });
            },
        );

        return unsubscribe;
    }, []);

    useEffect(() => {
        const unsubscribe = eventEmitter.subscribe('visitorVideoCallOffer', (data) => {
            const incomingInstanceId = data?.offer?.instanceId;
            if (incomingInstanceId !== instanceId) {
                videoCallDispatch({ type: 'RESET_OPERATOR_VIDEO_CALL_OFFER' });
            } else if (storedIncomingInstanceId !== incomingInstanceId) {
                videoCallDispatch({
                    type: 'SET_VIDEOCALL_INSTANCE_ID',
                    payload: { instanceId: incomingInstanceId },
                });
            }
        });

        return unsubscribe;
    }, [storedIncomingInstanceId]);

    const value = useMemo(
        () => ({ state, dispatch: videoCallDispatch, iceCandidatesQueueRef }),
        [state],
    );

    return (
        <VideoCallOfferContext.Provider value={value}>{children}</VideoCallOfferContext.Provider>
    );
};

type ResetOptions = {
    force: boolean;
};

export const useVideoCallOffer = (): {
    state: VideoCallData;
    resetVideoCall: (options?: ResetOptions) => void;
    instanceId: string;
} => {
    const context = useContext(VideoCallOfferContext);
    if (context === undefined) {
        throw new Error('useVideoCallOffer must be used within a VideoCallProvider');
    }
    const dispatch = useDispatch();
    const contextDispatch = context.dispatch;
    const { state } = context;
    const operatorId = state?.operatorId;
    const hasOffer = Boolean(state?.offer);
    const instanceIdMatchesIncomingInstanceId = state?.instanceId === instanceId;
    const resetVideoCall = useCallback(
        (options?: ResetOptions): void => {
            if (operatorId && hasOffer && (instanceIdMatchesIncomingInstanceId || options?.force)) {
                dispatch(
                    sendVideoCallOffer({
                        operatorId,
                        offer: null,
                    }),
                );
            }
            contextDispatch({ type: 'RESET_OPERATOR_VIDEO_CALL_OFFER' });
        },
        [contextDispatch, dispatch, operatorId, hasOffer, instanceIdMatchesIncomingInstanceId],
    );

    return { state, resetVideoCall, instanceId };
};

export const useVideoCallOperatorIceCandidates = (
    onIceCandidate: (iceCandidate: string) => void,
): { popInitialOperatorIceCandidatesPool: () => string[] } => {
    const context = useContext(VideoCallOfferContext);
    if (context === undefined) {
        throw new Error('useVideoCallOffer must be used within a VideoCallProvider');
    }
    const { iceCandidatesQueueRef } = context;

    useEffect(() => {
        const unsubscribe = eventEmitter.subscribe(
            'operatorVideoCallIceCandidatesOffered',
            (data) => {
                data.iceCandidates.forEach((candidate: string) => {
                    if (candidate) {
                        onIceCandidate(candidate);
                    }
                });
            },
        );

        return unsubscribe;
    }, [onIceCandidate]);

    const popInitialOperatorIceCandidatesPool = useCallback((): string[] => {
        if (!iceCandidatesQueueRef) {
            return [];
        }
        const candidates = cloneDeep(iceCandidatesQueueRef.current);
        // this is explicitly disabled as we want to clear the queue after returning the candidates
        // eslint-disable-next-line react-compiler/react-compiler
        iceCandidatesQueueRef.current = [];

        return candidates;
    }, [iceCandidatesQueueRef]);
    return { popInitialOperatorIceCandidatesPool };
};

export default VideoCallProvider;
