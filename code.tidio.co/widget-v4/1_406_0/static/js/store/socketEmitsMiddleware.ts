import debounce from 'lodash.debounce';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';

import { ConnectionManager } from '@tidio/tidio-chat-connection-manager';

import { shallowIsObjectEqual } from '../helpers';
import { ravenCaptureException } from '../helpers/raven';
import { shopifyCartRequest, shopifyCartUpdateRequest } from '../helpers/shopifyApiData';
import { uploadPendingAttachment } from '../helpers/uploadPendingAttachment';
import { views } from '../helpers/views';

import {
    botCancelBotApps,
    botGetStarted,
    botTrigger,
    cartValueChanged,
    chatBotRated,
    judgeMeRatingClick,
    judgeMeReviewSent,
    satisfactionRatingCommentSet,
    satisfactionRatingSet,
    sendCartData,
    sendVideoCallIceCandidates,
    sendVideoCallOffer,
    setVisitorWidgetPosition,
    shopifyCartTokenUpdated,
    shopifyCheckoutCreated,
    shopifyOrderCreated,
    trackWidgetActivity,
    triggerSatisfactionSurvey,
    updateVisitorUrl,
    visitorAddTags,
    visitorClicksOnChatIcon,
    visitorCreateTicket,
    visitorCurrencySet,
    visitorGetConversationHistory,
    visitorIsTyping,
    visitorNewMessage,
    visitorPreChat,
    visitorProductRecommendationClicked,
    visitorReadMessages,
    visitorSetComment,
    visitorSetRating,
    visitorTracking,
    visitorUpdateData,
} from '../connection/emitsTS';
import { senders, transformPendingAttachmentToMessage } from '../connection/parsers';
import { getGoogleTracker, initGoogleTracker } from '../tracking/GoogleTracker/GoogleTracker';
import {
    ADD_MESSAGE,
    ADD_PENDING_ATTACHMENT,
    ActionTypes,
    BOTS_GET_STARTED,
    BOT_TRIGGER,
    CANCEL_BOTS,
    CART_VALUE_CHANGED_SENT,
    CLEAR_SHOPIFY_CART_ATTRIBUTES,
    CLOSE_SOCKET_CONNECTION,
    COMMENT_SATISFACTION_SURVEY,
    CREATE_TICKET_WHEN_OPERATORS_OFFLINE,
    FETCH_SHOPIFY_CART_CONTENT,
    JUDGE_ME_RATING_CLICK,
    JUDGE_ME_REVIEW_SENT,
    MARK_MESSAGES_AS_READ,
    MERGE_FETCHED_MESSAGES,
    PRODUCT_RECOMMENDATION_CLICKED,
    RATE_CHAT_BOT,
    RATE_SATISFACTION_SURVEY,
    SEND_FILLED_ALWAYS_ONLINE_MESSAGE,
    SEND_FILLED_PRECHAT,
    SEND_MESSAGE_FROM_VISITOR,
    SEND_PENDING_ATTACHMENTS,
    SEND_RATE_CONVERSATION_COMMENT,
    SEND_VIDEO_CALL_ICE_CANDIDATES,
    SEND_VIDEO_CALL_OFFER,
    SET_CHAT_OPENED_STATE,
    SET_CONTACT_PROPERTIES,
    SET_DISABLE_TEXT_INPUT,
    SET_NOTIFICATION_STATUS,
    SET_VIEW,
    SET_VISITOR_CURRENCY,
    SET_VISITOR_MERGED_EMIT_QUEUE,
    SET_WIDGET_MOUNT_STATE,
    SHOPIFY_CART_TOKEN_UPDATED,
    SHOPIFY_CHECKOUT_CREATED,
    SHOPIFY_ORDER_CREATED,
    SHOW_USER_DATA_MODAL,
    SUBMIT_FORM,
    TIDIOCHATAPI_TRACK,
    TOGGLE_EMOJI_PANEL,
    TRIGGER_SATISFACTION_SURVEY,
    UPDATE_ATTACHMENT,
    UPDATE_VISITOR_URL,
    VISITOR_ADD_TAGS,
    VISITOR_CLICKS_ON_CHAT_ICON,
    VISITOR_IS_TYPING,
    VISITOR_REGISTER_IMPORT_DATA,
    VISITOR_SET_RATING,
    VISITOR_UPDATE_DATA,
    VISITOR_WIDGET_POSITION,
    WIDGET_ACTIVITY_TRACKING,
    clearPendingAttachments,
    sendMessageFromVisitor,
} from './actions';
import { trackingEvents } from './activityTrackingHelpers';
import {
    getIsConversationViewActive,
    getNonHiddenMessages,
    getOperatorStatus,
    getVisitorId,
} from './selectors';
import { CustomWindow, DefaultRootState } from './typings';

declare let window: CustomWindow;

const defaultDebounceEmitTime = 500;

const fullDay = 86400;

export const generateTicketSubject = (message: string): string =>
    [...message.split(' ').slice(0, 5).join(' ')].slice(0, 255).join('');

export default function socketEmitsMiddleware({
    emitQueue,
    closeConnection,
}: ConnectionManager<DefaultRootState>) {
    return ({
        getState,
        dispatch,
    }: MiddlewareAPI<Dispatch<ActionTypes>, DefaultRootState>): ReturnType<Middleware> => {
        const emit = emitQueue(getState, dispatch);
        const debounceEmit = debounce(emit, defaultDebounceEmitTime, {
            maxWait: defaultDebounceEmitTime,
        });

        return (next) =>
            (action: ActionTypes): ReturnType<typeof dispatch> | boolean => {
                switch (action.type) {
                    case VISITOR_REGISTER_IMPORT_DATA: {
                        if (
                            action.data.visitor_status === 'banned' ||
                            action.data.visitor_status === 'blacklisted'
                        ) {
                            closeConnection();
                            action.callback(false);
                            return false;
                        }
                        const integrationsPlatforms = action.data.widget_data?.integrations?.map(
                            (integration) => integration.platform,
                        );
                        initGoogleTracker({ integrationsPlatforms, emit });

                        const { unread_messages: unreadMessages = 0 } = action.data;
                        if (unreadMessages > 0) {
                            emit(visitorGetConversationHistory);
                        }
                        const retVal = next(action);
                        action.callback(true);
                        return retVal;
                    }
                    case MERGE_FETCHED_MESSAGES: {
                        const { messagesToMerge, lastMessageId } = action;
                        const state = getState();
                        const { isPageVisible } = state;
                        const isConversationViewActive = getIsConversationViewActive(state);
                        const isVisitorActive = isConversationViewActive && isPageVisible;
                        if (messagesToMerge.length > 0) {
                            const lastMessageToMergeId =
                                messagesToMerge[messagesToMerge.length - 1].id;
                            if (lastMessageToMergeId !== lastMessageId && isVisitorActive) {
                                emit(visitorReadMessages, lastMessageToMergeId);
                            }
                        }
                        return next(action);
                    }
                    case SEND_MESSAGE_FROM_VISITOR: {
                        if (action.emit) {
                            debounceEmit.cancel();
                            emit(visitorNewMessage, action.payload);
                            const state = getState();
                            const { assignedOperators } = state;
                            const nonHiddenMessages = getNonHiddenMessages(state);
                            const messagesLength = nonHiddenMessages.length;
                            const isOperatorAssigned = assignedOperators.length > 0;

                            getGoogleTracker().trackEventOnce({
                                eventName: 'tidio_conversation_started',
                                params: {
                                    visitor_id: getVisitorId(state),
                                    source: action.payload.sender,
                                    operator_status: getOperatorStatus(state),
                                },
                            });

                            try {
                                const lastMessageOlderThanOneDay =
                                    messagesLength > 0 &&
                                    action.payload.time_sent -
                                        nonHiddenMessages[messagesLength - 1].time_sent >
                                        fullDay;
                                if (
                                    messagesLength === 0 ||
                                    (!isOperatorAssigned && lastMessageOlderThanOneDay)
                                ) {
                                    getGoogleTracker().trackEvent({
                                        eventName: 'tidio_conversation_started',
                                        params: {
                                            visitor_id: getVisitorId(state),
                                            source: action.payload.sender,
                                            operator_status: getOperatorStatus(state),
                                        },
                                    });
                                }
                            } catch {
                                //
                            }
                        }
                        return next(action);
                    }
                    case SEND_FILLED_PRECHAT: {
                        const { updateData } = action;
                        if (updateData) {
                            emit(visitorPreChat, updateData);

                            getGoogleTracker().trackEvent({
                                eventName: 'tidio_prechat_finished',
                                params: {
                                    email: Boolean(updateData.email),
                                    phone: Boolean(updateData.phone),
                                    name: Boolean(updateData.name),
                                    consent_given: Boolean(
                                        updateData.emailConsent?.value === 'subscribed',
                                    ),
                                },
                            });
                        }
                        return next(action);
                    }
                    case SEND_FILLED_ALWAYS_ONLINE_MESSAGE: {
                        const { email } = action;
                        if (email) {
                            emit(visitorPreChat, { email });
                        }
                        return next(action);
                    }
                    case CREATE_TICKET_WHEN_OPERATORS_OFFLINE: {
                        const { email, message } = action;
                        emit(visitorCreateTicket, {
                            ticket: {
                                contactEmail: email,
                                subject: generateTicketSubject(message),
                            },
                            message: {
                                content: message,
                            },
                        });
                        return next(action);
                    }
                    case SET_CHAT_OPENED_STATE: {
                        const state = getState();
                        const visitorId = getVisitorId(state);

                        const shouldOpen = action.open;

                        if (shouldOpen) {
                            getGoogleTracker().trackEvent({
                                eventName: 'tidio_widget_open',
                                params: {
                                    visitor_id: visitorId,
                                },
                            });
                        } else {
                            getGoogleTracker().trackEvent({
                                eventName: 'tidio_widget_close',
                                params: {
                                    visitor_id: visitorId,
                                },
                            });
                        }
                        return next(action);
                    }
                    case ADD_MESSAGE: {
                        const addedMessageAction = next(action);

                        const state = getState();
                        if (action.message.type === 'alwaysOnline') {
                            getGoogleTracker().trackEvent({
                                eventName: 'tidio_conversation_reply',
                                params: {
                                    visitor_id: getVisitorId(state),
                                    source: 'offline_message',
                                    message_type: action.message.type,
                                    operator_status: getOperatorStatus(state),
                                },
                            });
                        }

                        const nonHiddenMessages = getNonHiddenMessages(state);
                        const messagesLength = nonHiddenMessages.length;
                        const lastMessageOlderThanOneDay =
                            messagesLength > 0 &&
                            action.message.time_sent -
                                nonHiddenMessages[messagesLength - 1].time_sent >
                                fullDay;
                        if (
                            action.message.sender === senders.operator &&
                            action.message.type !== 'alwaysOnline' &&
                            (messagesLength === 0 || lastMessageOlderThanOneDay)
                        ) {
                            getGoogleTracker().trackEvent({
                                eventName: 'tidio_conversation_started',
                                params: {
                                    visitor_id: getVisitorId(state),
                                    source: action.message.sender,
                                    operator_status: getOperatorStatus(state),
                                },
                            });
                        }
                        if (
                            action.message.sender === senders.bot &&
                            (messagesLength === 0 || lastMessageOlderThanOneDay)
                        ) {
                            getGoogleTracker().trackEvent({
                                eventName: 'tidio_conversation_started',
                                params: {
                                    visitor_id: getVisitorId(state),
                                    source: 'chatbot',
                                    chatbot_name: action.message.chat_bot_name,
                                    message_type: action.message.type,
                                    operator_status: getOperatorStatus(state),
                                },
                            });
                        }

                        return addedMessageAction;
                    }
                    case VISITOR_SET_RATING: {
                        emit(visitorSetRating, action.ratingIsGood);

                        return next(action);
                    }
                    case VISITOR_IS_TYPING: {
                        debounceEmit(visitorIsTyping, action.message);
                        return next(action);
                    }
                    case SEND_RATE_CONVERSATION_COMMENT: {
                        emit(visitorSetComment, action.comment);
                        return next(action);
                    }
                    case UPDATE_ATTACHMENT: {
                        const result = next(action);
                        const { messages } = getState();
                        const uploadMessage = messages.find(
                            (message) => message.originalMessageId === action.messageId,
                        );
                        if (uploadMessage) {
                            debounceEmit.cancel();
                            window?.tidioChatApi?.trigger('messageFromVisitor', {
                                message: action.url,
                                fromBot: false,
                                type: 'upload',
                            });
                            emit(visitorNewMessage, uploadMessage);
                        }
                        return result;
                    }
                    case SUBMIT_FORM: {
                        debounceEmit.cancel();
                        emit(visitorNewMessage, {
                            ...action.message,
                            content: {
                                type: action.message.type,
                                formResponse: action.message.formResponse,
                                message: '',
                            },
                        });
                        return next(action);
                    }
                    case VISITOR_UPDATE_DATA: {
                        if (action.emit) {
                            emit(visitorUpdateData, action.updateData);
                        }
                        return next(action);
                    }
                    case VISITOR_ADD_TAGS: {
                        emit(visitorAddTags, action.tags);
                        return next(action);
                    }
                    case SET_CONTACT_PROPERTIES: {
                        emit(visitorUpdateData, { properties: action.properties });
                        return next(action);
                    }
                    case TIDIOCHATAPI_TRACK: {
                        emit(
                            visitorTracking,
                            action.eventName,
                            action.eventData,
                            action.successCallback,
                        );
                        return next(action);
                    }
                    case BOT_TRIGGER: {
                        const { ids } = action;
                        emit(botTrigger, ids);
                        return next(action);
                    }
                    case CANCEL_BOTS: {
                        emit(botCancelBotApps);
                        return next(action);
                    }
                    case BOTS_GET_STARTED: {
                        emit(botGetStarted);
                        const state = getState();
                        getGoogleTracker().trackEventOnceInInterval({
                            eventName: 'tidio_widget_visitor_started_bot',
                            params: {
                                visitor_id: getVisitorId(state),
                            },
                        });
                        return next(action);
                    }
                    case UPDATE_VISITOR_URL: {
                        emit(updateVisitorUrl, action.url);
                        return next(action);
                    }
                    case SET_NOTIFICATION_STATUS: {
                        if (action.status) {
                            const state = getState();
                            getGoogleTracker().trackEvent({
                                eventName: 'tidio_widget_mute_notifications',
                                params: {
                                    visitor_id: getVisitorId(state),
                                },
                            });
                            emit(trackWidgetActivity, trackingEvents.notificationsTurnedOff);
                        } else {
                            emit(trackWidgetActivity, trackingEvents.notificationsTurnedOn);
                        }
                        return next(action);
                    }
                    case SET_VIEW: {
                        if (action.view === views.fly) {
                            emit(trackWidgetActivity, trackingEvents.flyMessageDisplayed);
                        }
                        return next(action);
                    }
                    case CLOSE_SOCKET_CONNECTION: {
                        closeConnection();
                        return next(action);
                    }
                    case SET_VISITOR_MERGED_EMIT_QUEUE: {
                        emit(action.callback, closeConnection);
                        return next(action);
                    }
                    case VISITOR_CLICKS_ON_CHAT_ICON: {
                        emit(visitorClicksOnChatIcon);
                        return next(action);
                    }
                    case SHOPIFY_ORDER_CREATED: {
                        emit(shopifyOrderCreated, action.params);
                        return next(action);
                    }
                    case SHOPIFY_CART_TOKEN_UPDATED: {
                        emit(shopifyCartTokenUpdated, action.params);
                        return next(action);
                    }
                    case SHOPIFY_CHECKOUT_CREATED: {
                        emit(shopifyCheckoutCreated, action.params);
                        return next(action);
                    }
                    case VISITOR_WIDGET_POSITION: {
                        emit(setVisitorWidgetPosition, action.params);
                        return next(action);
                    }
                    case SET_WIDGET_MOUNT_STATE: {
                        if (action.status) {
                            emit(trackWidgetActivity, trackingEvents.widgetLoaded);
                        }
                        return next(action);
                    }
                    case SHOW_USER_DATA_MODAL: {
                        const { modal } = action;
                        if (modal) {
                            emit(
                                trackWidgetActivity,
                                modal === 'prechat'
                                    ? trackingEvents.prechatOpened
                                    : trackingEvents.alwaysOnlineOpened,
                            );
                        }

                        return next(action);
                    }
                    case TOGGLE_EMOJI_PANEL: {
                        if (action.status === true) {
                            emit(trackWidgetActivity, trackingEvents.emojiPanelOpened);
                        }
                        return next(action);
                    }
                    case SET_DISABLE_TEXT_INPUT: {
                        emit(
                            trackWidgetActivity,
                            action.status
                                ? trackingEvents.textInputDisabled
                                : trackingEvents.textInputEnabled,
                        );
                        return next(action);
                    }
                    case WIDGET_ACTIVITY_TRACKING: {
                        emit(trackWidgetActivity, action.event, action.additionalData);
                        return next(action);
                    }
                    case FETCH_SHOPIFY_CART_CONTENT: {
                        shopifyCartRequest()
                            .then((data) => {
                                emit(sendCartData, { data });
                            })
                            .catch((error) => {
                                ravenCaptureException('Shopify Cart request error', {
                                    message: error?.message,
                                });
                            });
                        return next(action);
                    }
                    case CLEAR_SHOPIFY_CART_ATTRIBUTES: {
                        try {
                            shopifyCartUpdateRequest().catch((error) => {
                                ravenCaptureException('Shopify Cart Update request error', {
                                    message: error?.message,
                                });
                            });
                        } catch (error) {
                            if (error instanceof Error) {
                                ravenCaptureException('Shopify update visitor id error ', {
                                    message: error.message,
                                });
                            }
                        }
                        return next(action);
                    }
                    case RATE_CHAT_BOT: {
                        emit(chatBotRated, action.ratingId, action.rating);
                        return next(action);
                    }
                    case RATE_SATISFACTION_SURVEY: {
                        emit(
                            satisfactionRatingSet,
                            action.rating,
                            action.threadSource ?? 'conversation',
                            action.threadId,
                            action.messageId,
                        );

                        const state = getState();
                        getGoogleTracker().trackEvent({
                            eventName: 'tidio_conversation_rated',
                            params: {
                                thread_id: action.threadId,
                                visitor_id: getVisitorId(state),
                                rating: action.rating,
                            },
                        });

                        window?.tidioChatApi?.trigger('messageFromVisitor', {
                            message: String(action.rating),
                            fromBot: false,
                            type: 'satisfaction_survey_rating',
                        });

                        return next(action);
                    }
                    case COMMENT_SATISFACTION_SURVEY: {
                        emit(
                            satisfactionRatingCommentSet,
                            action.comment,
                            action.threadSource ?? 'conversation',
                            action.threadId,
                            action.messageId,
                        );
                        return next(action);
                    }
                    case JUDGE_ME_RATING_CLICK: {
                        emit(judgeMeRatingClick, action.rating);
                        return next(action);
                    }
                    case JUDGE_ME_REVIEW_SENT: {
                        emit(judgeMeReviewSent, action.rating);
                        return next(action);
                    }
                    case CART_VALUE_CHANGED_SENT: {
                        emit(cartValueChanged, action.eventData);
                        return next(action);
                    }
                    case TRIGGER_SATISFACTION_SURVEY: {
                        emit(triggerSatisfactionSurvey);
                        return next(action);
                    }
                    case SEND_VIDEO_CALL_OFFER: {
                        emit(sendVideoCallOffer, action.payload);
                        return next(action);
                    }
                    case SEND_VIDEO_CALL_ICE_CANDIDATES: {
                        emit(sendVideoCallIceCandidates, action.payload);
                        return next(action);
                    }
                    case PRODUCT_RECOMMENDATION_CLICKED: {
                        emit(visitorProductRecommendationClicked, {
                            productId: action.productId,
                            chatBotId: action.chatBotId,
                        });
                        return next(action);
                    }
                    case MARK_MESSAGES_AS_READ: {
                        emit(visitorReadMessages);
                        return next(action);
                    }
                    case SET_VISITOR_CURRENCY: {
                        const state = getState();
                        const areEqual = shallowIsObjectEqual(
                            state.visitorCurrencyData,
                            action.currencyData,
                        );
                        if (!areEqual) {
                            emit(visitorCurrencySet, action.currencyData);
                        }
                        return next(action);
                    }
                    case ADD_PENDING_ATTACHMENT: {
                        const retVal = next(action);
                        const state = getState();
                        const { publicKey, visitor } = state;

                        if (publicKey && visitor.id) {
                            uploadPendingAttachment(
                                action.payload.id,
                                action.payload.file,
                                publicKey,
                                visitor.id,
                                dispatch,
                            );
                        }
                        return retVal;
                    }
                    case SEND_PENDING_ATTACHMENTS: {
                        const result = next(action);
                        const { pendingAttachments } = getState();
                        const uploadedAttachments = pendingAttachments.filter(
                            (attachment) => attachment.uploadStatus === 'uploaded',
                        );

                        if (uploadedAttachments.length > 0) {
                            debounceEmit.cancel();

                            uploadedAttachments.forEach((attachment) => {
                                const uploadedMessage =
                                    transformPendingAttachmentToMessage(attachment);
                                dispatch(sendMessageFromVisitor(uploadedMessage.content, false));
                                window?.tidioChatApi?.trigger('messageFromVisitor', {
                                    message: uploadedMessage.content,
                                    fromBot: false,
                                    type: 'upload',
                                });
                                emit(visitorNewMessage, uploadedMessage);
                            });

                            dispatch(clearPendingAttachments());
                        }

                        return result;
                    }
                    default: {
                        return next(action);
                    }
                }
            };
    };
}
