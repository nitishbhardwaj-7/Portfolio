import { Dispatch } from 'redux';

import { SocketEventEmitter } from '@tidio/tidio-chat-connection-manager';

import {
    AI_ASSISTANT_TIMEOUT,
    generateHash,
    getCurrentTime,
    getCurrentUrl,
    getSandboxParams,
    isInDesignMode,
    isInSandboxMode,
} from '../helpers';
import { getLastReadableMessageId } from '../helpers/messageReadHelper';
import { ravenCaptureException, ravenCaptureInfo } from '../helpers/raven';
import { trans } from '../helpers/translations';

import Automation from '../Automation';
import {
    botTrigger as botTriggerAction,
    mergeFetchedMessages,
    mergeVisitorDataFromIdentify,
    setChatOpenedState,
    setDisableTextInput,
    setVisitorMessageDeliveryStatus,
    setWidgetMountState,
    showAlert,
    visitorRegisterImportData,
    widgetActivityTracking,
} from '../store/actions';
import { trackingEvents } from '../store/activityTrackingHelpers';
import { removeSavedStateFromStorage } from '../store/savedState';
import bindTidioChatApiMethods from '../store/tidioChatApiHelper';
import {
    AiAssistantSandboxGuidance,
    CustomWindow,
    DefaultRootState,
    HistoryImportedMessageFromSockets,
    Message,
    PrechatUpdateData,
    ShopifyCartTokenUpdatedParams,
    ShopifyCheckoutCreatedParams,
    ShopifyOrderCreatedParams,
    TidioIdentify,
    Visitor,
    VisitorCurrencyData,
    VisitorDataUpdate,
    VisitorRegisterImportData,
    VisitorWidgetPositionParams,
} from '../store/typings';
import GenericTracker from '../tracking/GenericTracker';
import ShopifyTracker from '../tracking/ShopifyTracker';
import { VisitorNewMessageContent } from './types';

declare let window: CustomWindow;

type VisitorData = Partial<Visitor> & {
    identifyData: TidioIdentify;
};

// all emits except visitorRegister and visitorIdentify have visitorId and projectPublicKey automatically passed later in connectionManager

let genericEventsTracker: GenericTracker | undefined;
let shopifyEventsTracker: ShopifyTracker | undefined;
let automation: Automation | undefined;
let firstVisitorRegister = true;

const handleInsufficientData = (originalVisitorId: Visitor['originalVisitorId']): VisitorData => {
    if (typeof originalVisitorId === 'string' && originalVisitorId.length === 32) {
        return { id: originalVisitorId, identifyData: {} };
    }
    const newId = generateHash();
    return { id: newId, originalVisitorId: newId, identifyData: {} };
};

const getMergeData = (
    visitorIdFromIdentify: string | boolean,
    identifyData: TidioIdentify | false,
    originalVisitorId: Visitor['originalVisitorId'],
): VisitorData => {
    if (identifyData) {
        if (typeof visitorIdFromIdentify === 'string' && visitorIdFromIdentify.length === 32) {
            return { identifyData, id: visitorIdFromIdentify };
        }
        if (identifyData.distinct_id || identifyData.email) {
            return { identifyData, id: generateHash() };
        }
    }

    const visitorData = handleInsufficientData(originalVisitorId);
    return { ...visitorData, identifyData: identifyData || {} };
};

export const visitorIdentify = (
    emit: SocketEventEmitter<
        {
            identifyData: DefaultRootState['tidioIdentifyData'];
            projectPublicKey: DefaultRootState['publicKey'];
        },
        // we know that the frame will return string | boolean
        string | boolean,
        { message: string } | undefined
    >,
    {
        tidioIdentifyData: identifyData,
        publicKey: projectPublicKey,
        visitor: { originalVisitorId = '' },
    }: DefaultRootState,
    dispatch: Dispatch,
    callback: () => void,
): void => {
    emit(
        'visitorIdentify',
        { identifyData, projectPublicKey },
        (visitorIdFromIdentify, errorData) => {
            // eslint-disable-next-line no-console
            console.debug('visitorIdentifyAck', visitorIdFromIdentify);

            if (errorData) {
                const visitorData = handleInsufficientData(originalVisitorId);
                dispatch(mergeVisitorDataFromIdentify(visitorData));
                callback();
                return true;
            }

            const mergeData = getMergeData(visitorIdFromIdentify, identifyData, originalVisitorId);
            dispatch(mergeVisitorDataFromIdentify(mergeData));
            callback();
            return true;
        },
    );
};

export const visitorRegister = (
    emit: SocketEventEmitter<
        DefaultRootState['visitor'] & {
            sandbox: boolean;
            isDesignMode: boolean;
            aiAssistantSandboxTriggerId: number | undefined;
            aiAssistantSandboxActionId: string | undefined;
            aiAssistantSandboxGuidance?: AiAssistantSandboxGuidance;
            isProjectOnline: boolean;
            cache_hash: string | null;
            after_reconnect: boolean;
        },
        VisitorRegisterImportData,
        string
    >,
    state: DefaultRootState,
    dispatch: Dispatch,
    lsCache: undefined | Required<VisitorRegisterImportData['widget_data']>,
    isInitialConnection: boolean,
    closeConnection: (closeCallback?: () => void) => void,
): void => {
    const {
        visitor,
        isProjectOnline,
        hideWhenOffline,
        visitor: { is_chat_on_site: isChatOnSite = false },
    } = state;

    const isSandboxMode = isInSandboxMode();
    const isDesignMode = isInDesignMode();
    const aiAssistantSandboxTriggerId = isSandboxMode
        ? getSandboxParams()?.aiAssistantSandboxTriggerId
        : undefined;
    const aiAssistantSandboxActionId = isSandboxMode
        ? getSandboxParams()?.aiAssistantSandboxActionId
        : undefined;

    const aiAssistantSandboxGuidance = isSandboxMode
        ? getSandboxParams()?.aiAssistantSandboxGuidance
        : undefined;

    emit(
        'visitorRegister',
        {
            ...visitor,
            sandbox: isSandboxMode,
            isDesignMode,
            aiAssistantSandboxTriggerId,
            aiAssistantSandboxActionId,
            aiAssistantSandboxGuidance,
            isProjectOnline,
            cache_hash: lsCache?.cache_hash || null,
            after_reconnect: !isInitialConnection,
        },
        (data, error) => {
            // eslint-disable-next-line no-console
            console.debug('visitorRegisterAck', data, error);

            if (error === 'INVALID_PROJECT_PUBLIC_KEY') {
                ravenCaptureInfo('visitorId collision', {
                    visitorId: visitor.id,
                });
            }

            if (!data) {
                closeConnection();
                setTimeout(() => {
                    removeSavedStateFromStorage();
                    window.location.reload();
                }, 1000 * 10);

                return false;
            }

            const widgetData = lsCache ? { ...lsCache, ...data?.widget_data } : data?.widget_data;

            if (data?.widget_data && typeof data.widget_data === 'object') {
                // eslint-disable-next-line no-param-reassign
                data.widget_data.design_mode = isDesignMode;
            }

            dispatch(
                visitorRegisterImportData(data, (shouldMount) => {
                    if (isSandboxMode) {
                        const { automationId, timeout = 100 } = getSandboxParams() || {};

                        if (automationId) {
                            setTimeout(() => {
                                dispatch(botTriggerAction([+automationId]));
                            }, timeout);
                        }
                    } else if (!isDesignMode) {
                        if (
                            widgetData?.tracking?.generic &&
                            !(genericEventsTracker instanceof GenericTracker)
                        ) {
                            const genericEvents = widgetData.tracking.generic;
                            genericEventsTracker = new GenericTracker(genericEvents);
                        }

                        if (
                            widgetData?.tracking?.platform_tracked === 'shopify' &&
                            !(shopifyEventsTracker instanceof ShopifyTracker)
                        ) {
                            shopifyEventsTracker = new ShopifyTracker({
                                dispatch,
                                mode: 'advanced',
                            });
                        }

                        if (widgetData?.is_text_input_disabled) {
                            dispatch(setDisableTextInput(true));
                        }

                        if (
                            widgetData?.platform === 'shopify' &&
                            !(shopifyEventsTracker instanceof ShopifyTracker)
                        ) {
                            shopifyEventsTracker = new ShopifyTracker({
                                dispatch,
                                mode: 'simple',
                            });
                        }

                        if (
                            widgetData?.bots &&
                            Array.isArray(widgetData.bots) &&
                            widgetData.bots.length > 0 &&
                            visitor.id
                        ) {
                            if (!(automation instanceof Automation)) {
                                const projectOnline = isProjectOnline;
                                automation = new Automation(
                                    widgetData.bots,
                                    visitor.id,
                                    dispatch,
                                    projectOnline,
                                    hideWhenOffline,
                                    isChatOnSite,
                                );
                            } else {
                                automation.setVisitorId(visitor.id);
                            }
                        }
                    }
                    // ready is triggered here as we want to make sure all data is loaded to the store
                    // is user is using only tidioChatApi on live site then it does not matter much but there are usecases where we need to make sure all data is loaded:
                    // 1. lyro preview
                    // document.tidioSandbox = {
                    //     aiAssistantSandboxTriggerId: 1,
                    //     isPrechatDisabled: true,
                    // };
                    // 2. hiding widget on page init
                    // function onTidioChatApiReady() {
                    //     console.log('ABC.onTidioChatApiRedy 000');
                    //     tidioChatApi.hide();
                    // }

                    // if (window.tidioChatApi) {
                    //     window.tidioChatApi.on('ready', onTidioChatApiReady);
                    // } else {
                    //     document.addEventListener('tidioChat-ready', onTidioChatApiReady);
                    // }
                    window.tidioChatApi?.trigger('ready');

                    if (!shouldMount) {
                        // if shouldMount here = false it means visitor is banned/blacklisted. Do not allow to modify widget state via tidioChatApi
                        bindTidioChatApiMethods({ dispatch: () => {} });
                    }

                    if (firstVisitorRegister) {
                        dispatch(setWidgetMountState(shouldMount, 'visitorRegister'));
                        firstVisitorRegister = false;
                    }

                    if (isDesignMode) {
                        closeConnection();
                        dispatch(setChatOpenedState(false));
                    }
                }),
            );

            return true;
        },
    );
};

export const visitorGetConversationHistory = (
    emit: SocketEventEmitter<
        { lastMessageId: number | null },
        {
            messages: HistoryImportedMessageFromSockets[];
        }
    >,
    { messages }: DefaultRootState,
    dispatch: Dispatch,
): void => {
    const withIdFromServer = messages.filter((message) => message.idFromServer);
    const lastMessageId = withIdFromServer[withIdFromServer.length - 1]?.idFromServer || null;

    emit(
        'visitorGetConversationHistory',
        {
            lastMessageId,
        },
        (ack) => {
            if (!ack) {
                return false;
            }
            dispatch(mergeFetchedMessages(ack.messages, lastMessageId));
            return true;
        },
    );
    if (!lastMessageId) {
        dispatch(widgetActivityTracking(trackingEvents.fullConversationHistoryRequested));
    }
};

export function visitorReadMessages(
    emit: SocketEventEmitter<{
        lastReadMessageId?: number | null;
        lastReadMessageTime: string;
    }>,
    { messages }: DefaultRootState,
    dispatch: Dispatch,
    lastMessageId?: number,
): void {
    const lastReadMessageId = lastMessageId ?? getLastReadableMessageId(messages);

    emit('visitorReadMessages', {
        lastReadMessageId,
        lastReadMessageTime: new Date().toISOString(),
    });
}

export function visitorNewMessage(
    emit: SocketEventEmitter<VisitorNewMessageContent, boolean, { id: number }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    messagePayload: Omit<Message, 'content'> & {
        payload?: string;
        content: VisitorNewMessageContent['message'];
        metadata?: { is_ai_assistant_task?: Message['aiAssistantTask'] };
    },
): void {
    const { id: messageId } = messagePayload;
    // timeout increased for lyro
    // we want to avoid "not delivered" state until we reach the maximum response time from the API (15s timeout)
    const isAiAssistant =
        state.aiAssistant || (isInSandboxMode() && getSandboxParams()?.aiAssistantSandboxTriggerId);
    const timeoutTime = isAiAssistant ? AI_ASSISTANT_TIMEOUT : 6000;
    const isNotDeliveredTimeout = setTimeout(() => {
        const idFromServer = null;
        dispatch(setVisitorMessageDeliveryStatus(messageId, idFromServer, false));
    }, timeoutTime);
    emit(
        'visitorNewMessage',
        {
            message: messagePayload.content,
            messageId,
            payload: messagePayload.payload,
            url: messagePayload.url,
            metadata: messagePayload.metadata,
        },
        (ack, { id: idFromServer }) => {
            if (!ack) {
                return false;
            }
            clearTimeout(isNotDeliveredTimeout);
            dispatch(setVisitorMessageDeliveryStatus(messageId, idFromServer, true));
            return true;
        },
    );
}

export function visitorIsTyping(
    emit: SocketEventEmitter<{
        message: string;
        time: number;
    }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    message: string,
): void {
    emit('visitorIsTyping', {
        message,
        time: getCurrentTime(),
    });
}

export function visitorUpdateData(
    emit: SocketEventEmitter<
        {
            updateData: VisitorDataUpdate;
        },
        { visitorIdFromIdentify: string; errorData: { message: string } }
    >,
    state: DefaultRootState,
    dispatch: Dispatch,
    updateData: VisitorDataUpdate,
): void {
    emit('visitorUpdateData', { updateData });
}

export function visitorAddTags(
    emit: SocketEventEmitter<{
        tags: string[];
    }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    tags: string[],
): void {
    emit('visitorAddTags', { tags });
}

export function visitorSetRating(
    emit: SocketEventEmitter<{
        value: string;
    }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    ratingIsGood: boolean,
): void {
    emit('visitorSetRating', { value: ratingIsGood ? '1' : '0' });
}

export function visitorPreChat(
    emit: SocketEventEmitter<{
        updateData: Partial<PrechatUpdateData>;
    }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    updateData: Partial<PrechatUpdateData>,
): void {
    emit('visitorPreForm', { updateData: { ...updateData } }, () => {});
}

export function visitorSetComment(
    emit: SocketEventEmitter<{
        comment: string;
    }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    comment: string,
): void {
    emit('visitorSetComment', { comment });
}

export function visitorTracking(
    emit: SocketEventEmitter<
        Record<string, unknown> & {
            event: string;
        }
    >,
    state: DefaultRootState,
    dispatch: Dispatch,
    eventName: string,
    eventData: unknown,
    successCallback: () => void | undefined,
): void {
    emit('visitorTracking', { ...(eventData as object), event: eventName }, successCallback);
}

export function botTrigger(
    emit: SocketEventEmitter<{
        bots: number[];
    }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    ids: number[],
): void {
    emit('botTrigger', { bots: ids });
}

export function botCancelBotApps(emit: SocketEventEmitter<never>): void {
    emit('botCancelBotApps');
}

export function botGetStarted(emit: SocketEventEmitter<never>): void {
    emit('botGetStarted');
}

let lastUrl = getCurrentUrl();

export function updateVisitorUrl(
    emit: SocketEventEmitter<{
        url: string;
    }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    url: string,
): void {
    if (url !== lastUrl) {
        lastUrl = url;
        emit('visitorEnterPage', {
            url,
        });
    }
}

export function visitorClicksOnChatIcon(emit: SocketEventEmitter<never>): void {
    emit('visitorClicksOnChatIcon');
}

export function setVisitorWidgetPosition(
    emit: SocketEventEmitter<VisitorWidgetPositionParams>,
    state: DefaultRootState,
    dispatch: Dispatch,
    params: VisitorWidgetPositionParams,
): void {
    emit('visitorWidgetPosition', params);
}

export function shopifyOrderCreated(
    emit: SocketEventEmitter<ShopifyOrderCreatedParams>,
    state: DefaultRootState,
    dispatch: Dispatch,
    params: ShopifyOrderCreatedParams,
): void {
    emit('shopifyOrderCreated', params);
}

export function shopifyCheckoutCreated(
    emit: SocketEventEmitter<ShopifyCheckoutCreatedParams>,
    state: DefaultRootState,
    dispatch: Dispatch,
    params: ShopifyCheckoutCreatedParams,
): void {
    emit('shopifyCheckoutCreated', params);
}

export function shopifyCartTokenUpdated(
    emit: SocketEventEmitter<ShopifyCartTokenUpdatedParams>,
    state: DefaultRootState,
    dispatch: Dispatch,
    params: ShopifyCartTokenUpdatedParams,
): void {
    emit('shopifyCartTokenUpdated', params);
}

export function trackWidgetActivity(
    emit: SocketEventEmitter<{ eventName: string }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    eventName: string,
    params?: Record<string, string | number | boolean>,
): void {
    emit('widgetAnalytics', { eventName, ...params });
}

export function sendCartData(
    emit: SocketEventEmitter<{ data: unknown }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    params: { data: unknown },
): void {
    emit('sendCartData', params);
}

export function chatBotRated(
    emit: SocketEventEmitter<{ ratingId?: string | null; rating?: 'yes' | 'no' }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    ratingId?: string | null,
    rating?: 'yes' | 'no',
): void {
    emit('chatBotRated', {
        ratingId,
        rating,
    });
}

export function satisfactionRatingSet(
    emit: SocketEventEmitter<{
        rating: number | null;
        threadId: number;
        threadSource: 'conversation' | 'aiAssistant';
        messageId: number;
    }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    rating: number | null,
    threadSource: 'conversation' | 'aiAssistant',
    threadId: number,
    messageId: number,
): void {
    emit('satisfactionRatingSet', {
        rating,
        threadSource,
        threadId,
        messageId,
    });
}

export function satisfactionRatingCommentSet(
    emit: SocketEventEmitter<{
        comment: string | null;
        threadId: number;
        threadSource: 'conversation' | 'aiAssistant';
        messageId: number;
    }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    comment: string | null,
    threadSource: 'conversation' | 'aiAssistant',
    threadId: number,
    messageId: number,
): void {
    emit('satisfactionRatingCommentSet', {
        comment,
        threadSource,
        threadId,
        messageId,
    });
}

export function judgeMeRatingClick(
    emit: SocketEventEmitter<{ rating: number }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    rating: number,
): void {
    emit('judgeMeRatingClick', {
        rating,
    });
}

export function judgeMeReviewSent(
    emit: SocketEventEmitter<{ rating: number }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    rating: number,
): void {
    emit('judgeMeReviewSent', {
        rating,
    });
}

export function cartValueChanged(
    emit: SocketEventEmitter<{ cartCurrency: string; cartValue: number; currencyRate: string }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    eventData: { cartCurrency: string; cartValue: number; currencyRate: string },
): void {
    emit('cartValueChanged', eventData);
}

export function visitorCreateTicket(
    emit: SocketEventEmitter<{
        ticket: {
            contactEmail: string;
            subject: string;
        };
        message: {
            content: string;
        };
    }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    eventData: {
        ticket: {
            contactEmail: string;
            subject: string;
        };
        message: {
            content: string;
        };
    },
): void {
    emit('visitorCreatesTicket', eventData);
}

export function triggerSatisfactionSurvey(
    emit: SocketEventEmitter<Record<string, never>, boolean>,
    state: DefaultRootState,
    dispatch: Dispatch,
): void {
    emit('visitorSendSatisfactionSurveyQuestion', {}, (ack) => {
        if (!ack) {
            ravenCaptureException('Could not trigger manual satisfaction survey');
            dispatch(
                showAlert(
                    trans(
                        'satisfactionSurveyAlert',
                        null,
                        'Sorry, something went wrong. Please try again.',
                    ),
                ),
            );
            return false;
        }

        return true;
    });
}

export function sendVideoCallOffer(
    emit: SocketEventEmitter<{
        operatorId: number;
        offer: {
            sdp: string;
            type: string;
            instanceId: string;
        } | null;
    }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    payload: {
        operatorId: number;
        offer: {
            sdp: string;
            type: string;
            instanceId: string;
        } | null;
    },
): void {
    emit('visitorVideoCallOffer', {
        ...payload,
    });
}

export function sendVideoCallIceCandidates(
    emit: SocketEventEmitter<{
        operatorId: number;
        iceCandidates: string[];
    }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    payload: {
        operatorId: number;
        iceCandidates: string[];
    },
): void {
    emit('visitorSendVideoCallIceCandidates', {
        ...payload,
    });
}

export function fetchGoogleAnalyticsTagId(
    emit: SocketEventEmitter<Record<string, never>, { tagId?: string }>,
    state: DefaultRootState,
    dispatch: Dispatch,
    successCallback: ({ tagId }: { tagId?: string }) => void,
): void {
    emit('fetchGoogleAnalyticsTagId', {}, successCallback);
}

export async function visitorProductRecommendationClicked(
    emit: SocketEventEmitter<{
        productId: number;
        chatBotId: number;
    }>,
    _state: DefaultRootState,
    _dispatch: Dispatch,
    payload: {
        productId: number;
        chatBotId: number;
    },
): Promise<void> {
    emit('visitorProductRecommendationClicked', {
        productId: payload.productId,
        chatBotId: payload.chatBotId,
    });
}

export function visitorCurrencySet(
    emit: SocketEventEmitter<VisitorCurrencyData>,
    _state: DefaultRootState,
    _dispatch: Dispatch,
    params: VisitorCurrencyData,
): void {
    emit('visitorCurrencySet', {
        currencyCode: params.currencyCode,
        currencyRate: params.currencyRate,
    });
}
