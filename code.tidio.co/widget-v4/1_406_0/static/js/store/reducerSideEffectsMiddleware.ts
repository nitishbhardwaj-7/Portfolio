import { Middleware } from 'redux';

import {
    AI_ASSISTANT_TIMEOUT,
    filterApiFeatures,
    filterTidioIdentifyData,
    filterVisitorCurrencyData,
    filterVisitorUpdateData,
    getCurrentTime,
    getSandboxParams,
    isInSandboxMode,
    shallowIsObjectEqual,
} from '../helpers';
import { adjustIframeStyles, removeIframeStyles } from '../helpers/adjustStyles/iframeTS';
import { adjustShadowRootStyles, removeShadowRootStyles } from '../helpers/adjustStyles/shadowRoot';
import {
    focusNewMessageTextarea,
    getDocumentRef,
    getIframeRef,
    scrollConversationToRateMessageButtons,
} from '../helpers/focusManager';
import { dynamic, getIframeSizes, iframeViews } from '../helpers/iframe';
import { ravenCaptureException } from '../helpers/raven';
import { isNewSkin } from '../helpers/skin';
import { playNotificationSound } from '../helpers/sounds';
import { trans } from '../helpers/translations';

import {
    getPreChatFields,
    messageTypes,
    senders,
    transformToAlwaysOnlineMessageFormat,
    transformToCreateTicketMessageFormat,
    transformToPreChatMessageFormat,
    transformToRateCommentMessageFormat,
    transformToSystemMessageFormat,
} from '../connection/parsers';
import {
    ADD_MESSAGE,
    ADJUST_STYLES,
    AI_ASSISTANT_IS_THINKING,
    BOTS_GET_STARTED,
    COMPARE_TIDIO_IDENTIFY_DATA,
    CREATE_TICKET_WHEN_OPERATORS_OFFLINE,
    OPERATOR_IS_TYPING_STATUS,
    OPERATOR_LEFT_CONVERSATION,
    OPERATOR_OPENED_CONVERSATION,
    REMOVE_STYLES,
    SEND_FILLED_ALWAYS_ONLINE_MESSAGE,
    SEND_FILLED_PRECHAT,
    SEND_MESSAGE_FROM_VISITOR,
    SET_CHAT_OPENED_STATE,
    SET_FEATURES_FROM_API,
    SET_FLAG_SEND_MESSAGE_FROM_VISITOR,
    SET_IFRAME_VIEW,
    SET_PREVIEW_DATA,
    SET_PROJECT_STATUS,
    SET_VIEW,
    SET_VISITOR_CURRENCY,
    SET_WIDGET_MOUNT_STATE,
    VISITOR_REGISTER_IMPORT_DATA,
    VISITOR_SET_RATING,
    VISITOR_UPDATE_DATA,
    addMessage,
    compareTidioIdentifyData,
    saveTidioIdentifyData,
    setAiAssistantIsThinking,
    setBlockedMessage,
    setChatOpenedState,
    setFeaturesFromApi,
    setFlagForSendingMessageFromVisitor,
    setIframeView,
    setOpenTab,
    setOperatorIsTypingStatus,
    setView,
    showUserDataModal,
    widgetActivityTracking,
} from './actions';
import { trackingEvents, wasEventAlreadyTracked } from './activityTrackingHelpers';
import { getKeyFromStorage, saveKeyToStorage } from './savedState';
import {
    alwaysOnlineMessagesExist,
    getAllMessagesByType,
    getAreDepartmentsEnabled,
    getCreateTicketWhenOperatorsOffline,
    getIsDepartmentSelected,
    getLastMessage,
    getPreChatMessage,
    getWidgetLabelStatus,
    hasLatestAlwaysOnlineMessageExpired,
} from './selectors';
import { CustomWindow, DefaultRootState, IframeViews, MessageType, View } from './typings';

let operatorIsTypingClearId: null | ReturnType<typeof setTimeout> = null;
const operatorIsTypingTimeout = 3000;
let changeIframeViewClearId: null | ReturnType<typeof setTimeout> = null;
let changeIframeViewTimeoutIn = 270;
const changeIframeViewTimeoutOut = 300;
let isWaitingForAnswer = false;

let featuresOverridesFromApi = {};
const oneDay = 60 * 60 * 24;

let aiAssistantIsThinkingTimeoutId: null | ReturnType<typeof setTimeout> = null;

const MAX_DISTINCT_ID_PROPERTY_LENGTH = 55;

declare let window: CustomWindow;

function shouldFocusNewMessageTextarea(state: DefaultRootState, docRef: Document): boolean {
    if (state.isMobile) {
        // do not focus newMessageTextarea if on mobile
        return false;
    }
    if (!docRef?.activeElement) {
        return false;
    }
    if (state.previewMode) {
        return false;
    }
    if (docRef.activeElement.tagName !== 'INPUT') {
        const lastMessage = getLastMessage(state);
        if (!lastMessage) {
            return true;
        }
        if (
            lastMessage.type === messageTypes.cards ||
            (lastMessage.quickReplies && lastMessage.quickReplies.length > 0)
        ) {
            // do not focus newMessageTextarea if there are quick replies or card gallery
            return false;
        }
        return true;
    }
    return false;
}

const reducerSideEffectsMiddleware: Middleware =
    ({ getState, dispatch }) =>
    (next) =>
    (action) => {
        switch (action.type) {
            case SET_FLAG_SEND_MESSAGE_FROM_VISITOR: {
                const { shouldSend } = action;
                if (shouldSend) {
                    setTimeout(() => {
                        dispatch(setFlagForSendingMessageFromVisitor(false));
                    }, 0);
                }
                return next(action);
            }
            case COMPARE_TIDIO_IDENTIFY_DATA: {
                const state = getState();
                const { identifyData: newIdentifyData } = action as ReturnType<
                    typeof compareTidioIdentifyData
                >;
                let emptyIdentifyInStore = true;
                try {
                    emptyIdentifyInStore =
                        !state.tidioIdentifyData ||
                        Object.keys(state.tidioIdentifyData).length === 0;
                } catch (e) {
                    ravenCaptureException(e);
                    return next(action);
                }
                if (!newIdentifyData && emptyIdentifyInStore) {
                    return next(action);
                }
                const filteredIdentifyData = filterTidioIdentifyData(newIdentifyData);
                if (!filteredIdentifyData) {
                    return next(action);
                }
                const { distinct_id: distinctId } = filteredIdentifyData;
                if (distinctId) {
                    let distinctString = String(distinctId);
                    if (distinctString.length > MAX_DISTINCT_ID_PROPERTY_LENGTH) {
                        // we want to notify the user about improper usage of distinct_id
                        // eslint-disable-next-line no-console
                        console.warn(
                            'tidioIdentify - distinct_id property value cannot be longer than 55 characters. Current value will be trimmed.',
                        );
                        distinctString = distinctString.substring(
                            0,
                            MAX_DISTINCT_ID_PROPERTY_LENGTH,
                        );
                        filteredIdentifyData.distinct_id = distinctString;
                    }
                }
                const areEqual = shallowIsObjectEqual(
                    state.tidioIdentifyData || {}, // state.tidioIdentifyData can be null
                    filteredIdentifyData,
                );
                if (!areEqual) {
                    const result = next(action);
                    dispatch(saveTidioIdentifyData(filteredIdentifyData));
                    return result;
                }
                return next(action);
            }
            case SET_WIDGET_MOUNT_STATE: {
                const shouldMount = action.status;
                if (shouldMount) {
                    const state = getState();
                    if (state.isMounted) {
                        return false;
                    }
                    // check if we should disable textarea
                    const lastMessage = getLastMessage(state);
                    if (lastMessage?.isWaitingForAnswer) {
                        isWaitingForAnswer = true;
                    }
                    const retVal = next(action);
                    const { width, height } = getIframeSizes(state.chatIframeStyles.iframeView);
                    window.tidioChatApi?.trigger('resize', {
                        width,
                        height,
                        iframe: getIframeRef(),
                    });
                    return retVal;
                }
                window.tidioChatApi?.trigger('resize', {
                    width: 0,
                    height: 0,
                    iframe: null,
                });
                return next(action);
            }
            case SET_CHAT_OPENED_STATE: {
                const shouldOpen = action.open;
                const state = getState();
                const { designMode } = state;
                if (designMode && shouldOpen) {
                    return false;
                }
                if (!shouldOpen && state.view === View.CLOSED) {
                    return false;
                }
                if (shouldOpen && state.view !== View.CLOSED) {
                    return false;
                }
                const sidebarEnabled = state.sidebarIframeStyles !== false;
                const widgetPositionLeft = state.chatIframeStyles.widgetPosition === 'left';
                const enableIframeTimeout = widgetPositionLeft || sidebarEnabled;

                let iframeView: IframeViews | undefined;
                if (shouldOpen) {
                    iframeView = IframeViews.CHAT_SIZE_1;
                } else if (sidebarEnabled) {
                    iframeView = IframeViews.ONLY_SIDEBAR;
                } else {
                    iframeView = IframeViews.ONLY_BUBBLE;
                }

                if (state.isMobile) {
                    if (shouldOpen) {
                        iframeView = IframeViews.MOBILE;
                    } else if (sidebarEnabled) {
                        iframeView = IframeViews.ONLY_SIDEBAR;
                    } else {
                        iframeView = IframeViews.ONLY_BUBBLE;
                        if (state.mobileButtonSize === 'small') {
                            iframeView = IframeViews.ONLY_BUBBLE_SMALL;
                        } else if (state.mobileButtonSize === 'medium') {
                            iframeView = IframeViews.ONLY_BUBBLE_MEDIUM;
                        }
                    }
                }
                if (changeIframeViewClearId) {
                    clearTimeout(changeIframeViewClearId);
                    changeIframeViewClearId = null;
                }

                changeIframeViewTimeoutIn = enableIframeTimeout ? 270 : 50;
                if (shouldOpen) {
                    if (!enableIframeTimeout) {
                        dispatch(setIframeView(iframeView));
                    }
                    window.tidioChatApi?.trigger('beforeOpen');
                    changeIframeViewClearId = setTimeout(() => {
                        if (enableIframeTimeout && iframeView) {
                            dispatch(setIframeView(iframeView));
                        }
                        setTimeout(() => {
                            const docRef = getDocumentRef();
                            if (shouldFocusNewMessageTextarea(state, docRef)) {
                                focusNewMessageTextarea();
                            }
                        }, 0);
                        window.tidioChatApi?.trigger('open');
                        window.tidioChatApi?.trigger('popUpShow'); // deprecated
                    }, changeIframeViewTimeoutIn);
                    return next(action);
                }
                window.tidioChatApi?.trigger('beforeClose');
                changeIframeViewClearId = setTimeout(() => {
                    window.tidioChatApi?.trigger('close');
                    window.tidioChatApi?.trigger('popUpHide'); // deprecated
                    /*
                Condition bellow is made to prevent faulty iframe resizng when widgetLabel is enabled
                Both resize events are fired almost simultaneously and sometimes onlyBubble view overrides dynamic resizing
                */
                    const currenState = getState();
                    const isWidgetLabelActive = getWidgetLabelStatus(currenState);
                    const isTryingToClose =
                        iframeView === iframeViews.onlyBubble ||
                        iframeView === iframeViews.onlyBubbleMedium ||
                        iframeView === iframeViews.onlyBubbleSmall ||
                        iframeView === iframeViews.onlySidebar;
                    if (
                        (isTryingToClose && currenState.view !== View.CLOSED) ||
                        (isWidgetLabelActive && isTryingToClose)
                    ) {
                        return false;
                    }
                    if (iframeView) {
                        dispatch(setIframeView(iframeView));
                    }
                    return true;
                }, changeIframeViewTimeoutOut);
                return next(action);
            }
            case SET_VIEW: {
                setTimeout(() => {
                    const state = getState();
                    const docRef = getDocumentRef();
                    if (shouldFocusNewMessageTextarea(state, docRef)) {
                        focusNewMessageTextarea();
                    }
                }, 0);
                if (action.view === View.CHAT) {
                    window.tidioChatApi?.trigger('open');
                }
                return next(action);
            }
            case OPERATOR_IS_TYPING_STATUS: {
                if (action.operatorIdOrStatus !== false) {
                    if (operatorIsTypingClearId) {
                        clearTimeout(operatorIsTypingClearId);
                    }
                    operatorIsTypingClearId = setTimeout(
                        () => dispatch(setOperatorIsTypingStatus(false)),
                        action.timeoutValue ?? operatorIsTypingTimeout,
                    );
                }
                return next(action);
            }
            case AI_ASSISTANT_IS_THINKING: {
                if (action.status) {
                    if (aiAssistantIsThinkingTimeoutId) {
                        clearTimeout(aiAssistantIsThinkingTimeoutId);
                    }
                    aiAssistantIsThinkingTimeoutId = setTimeout(
                        () => dispatch(setAiAssistantIsThinking(false)),
                        AI_ASSISTANT_TIMEOUT,
                    );
                }
                return next(action);
            }
            case SEND_MESSAGE_FROM_VISITOR: {
                const state = getState();

                if (state.isBotActive) {
                    window.tidioChatApi?.trigger('messageFromVisitor', {
                        message: action.message,
                        fromBot: true,
                        type: 'text',
                    });
                    return next(action);
                }
                if (isWaitingForAnswer) {
                    isWaitingForAnswer = false;
                    window.tidioChatApi?.trigger('messageFromVisitor', {
                        message: action.message,
                        fromBot: true,
                        type: 'text',
                    });
                    return next(action);
                }

                const { payload: messageData } = action;
                // Move to next middleware if there is bot payload in message
                if (messageData.payload) {
                    window.tidioChatApi?.trigger('messageFromVisitor', {
                        message: action.message,
                        fromBot: true,
                        type: 'text',
                    });
                    return next(action);
                }
                const areDepartmentsEnabled = getAreDepartmentsEnabled(state);
                const isDepartmentSelected = getIsDepartmentSelected(state);
                const preChatFields = getPreChatFields(state.preChat.data, state.visitor);
                const hasPreChatFields =
                    preChatFields.length || (areDepartmentsEnabled && !isDepartmentSelected);
                if (
                    !state.aiAssistant &&
                    !state.isProjectOnline &&
                    getCreateTicketWhenOperatorsOffline(state)
                ) {
                    dispatch(setBlockedMessage(action.message));
                    dispatch(showUserDataModal('createTicket'));
                    return false;
                }
                if (!state.preChat.isFilled && hasPreChatFields) {
                    // preChat
                    const preChatAlreadyAdded = getPreChatMessage(state);
                    // When the departments are turned on, we want to be able to display the prechat again
                    // with the selection of a new department each time, e.g. after closing a thread.
                    if (!preChatAlreadyAdded || areDepartmentsEnabled) {
                        dispatch(setBlockedMessage(action.message));
                        dispatch(showUserDataModal('prechat'));
                        return false;
                    }
                } else if (
                    !state.isProjectOnline &&
                    (!alwaysOnlineMessagesExist(state) ||
                        hasLatestAlwaysOnlineMessageExpired(state))
                ) {
                    // alwaysOnline
                    const alwaysOnlineMessage = transformToAlwaysOnlineMessageFormat();
                    if (!alwaysOnlineMessage) {
                        return next(action);
                    }
                    const isLyroPlayground =
                        isInSandboxMode() && getSandboxParams()?.isLyroPlayground;
                    const visitorEmail = state.visitor.email;
                    if (!state.aiAssistant && !isLyroPlayground) {
                        if (visitorEmail) {
                            // add new alwaysOnline message to log
                            alwaysOnlineMessage.content = visitorEmail;
                            alwaysOnlineMessage.disabled = true;
                            setTimeout(() => {
                                dispatch(addMessage(alwaysOnlineMessage));
                            });
                        } else {
                            dispatch(setBlockedMessage(action.message));
                            dispatch(showUserDataModal('alwaysOnline'));
                            return false;
                        }
                    }
                }
                const lastTriggerTimestamp =
                    getKeyFromStorage('lastMessageFromVisitorTimestamp') || 0;
                const now = getCurrentTime();
                if (now - lastTriggerTimestamp > oneDay) {
                    window.tidioChatApi?.trigger('conversationStart');
                }
                saveKeyToStorage('lastMessageFromVisitorTimestamp', now);

                window.tidioChatApi?.trigger('messageFromVisitor', {
                    message: action.message,
                    fromBot: false,
                    type: 'text',
                });
                return next(action);
            }
            case SEND_FILLED_ALWAYS_ONLINE_MESSAGE: {
                // the order of getState and retVal is important
                // we want to display always online message with visitor email filled
                const alwaysOnlineMessage = transformToAlwaysOnlineMessageFormat();
                const retVal = next(action);
                {
                    const state = getState();
                    if (alwaysOnlineMessage && !state.aiAssistant) {
                        dispatch(addMessage(alwaysOnlineMessage));
                    }
                }
                dispatch(setFlagForSendingMessageFromVisitor(true));
                setTimeout(() => {
                    const state = getState();
                    if (!state.aiAssistant) {
                        dispatch(
                            addMessage(transformToSystemMessageFormat(trans('alwaysOnlineThanks'))),
                        );
                    }
                }, 0);
                return retVal;
            }
            case CREATE_TICKET_WHEN_OPERATORS_OFFLINE: {
                const createTicketSuccessMessage = transformToCreateTicketMessageFormat();
                const retVal = next(action);
                dispatch(addMessage(createTicketSuccessMessage));
                return retVal;
            }
            case ADD_MESSAGE: {
                const state = getState();
                if (action.message.type === 'rateConversation') {
                    const rateMessage = getAllMessagesByType(
                        state,
                        MessageType.RATE_CONVERSATION,
                    ).filter((message) => !message.disabled);
                    if (rateMessage.length > 0) {
                        scrollConversationToRateMessageButtons();
                        return false;
                    }
                }
                // Check isMounted too as widget could be hidden by tidioChatApi
                const isChatHidden =
                    state.hideWhenOffline &&
                    !state.isProjectOnline &&
                    !state.visitor.is_chat_on_site;
                if (
                    state.isSoundEnabled &&
                    !state.notificationSnoozed &&
                    state.isMounted &&
                    !isChatHidden
                ) {
                    try {
                        const newSkin = state.designVersion === 5 || isNewSkin();
                        playNotificationSound(newSkin);
                    } catch (e) {
                        ravenCaptureException(e);
                    }
                }
                if (state.aiAssistantIsThinking) {
                    dispatch(setAiAssistantIsThinking(false));
                }
                window.tidioChatApi?.trigger('messageFromOperator', {
                    message: action.message.content,
                    fromBot: action.message.sender === senders.bot,
                });
                const { isWaitingForAnswer: isLastMessageWaitingForAnswer } = action.message;
                if (isLastMessageWaitingForAnswer) {
                    isWaitingForAnswer = true;
                }
                return next(action);
            }
            case OPERATOR_OPENED_CONVERSATION: {
                const { operatorId } = action;
                const index = getState().assignedOperators.indexOf(operatorId);
                if (index > -1) {
                    return false;
                }
                return next(action);
            }
            case OPERATOR_LEFT_CONVERSATION: {
                const { operatorId } = action;
                const index = getState().assignedOperators.indexOf(operatorId);
                if (index === -1) {
                    ravenCaptureException(
                        `${action.type} - No operatorId found in assignedOperators`,
                        {
                            operatorId,
                        },
                    );
                    return false;
                }
                return next(action);
            }
            case VISITOR_SET_RATING: {
                // TODO trans for commentForGoodRating
                const commentMessage = transformToRateCommentMessageFormat(action.ratingIsGood);
                dispatch(addMessage(commentMessage));
                return next(action);
            }
            case VISITOR_UPDATE_DATA: {
                const filtered = filterVisitorUpdateData(action.updateData);
                if (typeof action.updateData !== 'object' || !filtered) {
                    return false;
                }
                return next({
                    ...action,
                    updateData: filterVisitorUpdateData(action.updateData),
                });
            }
            case SET_PROJECT_STATUS: {
                window.tidioChatApi?.trigger('setStatus', action.status);
                return next(action);
            }
            case SEND_FILLED_PRECHAT: {
                if (action.updateData) {
                    window.tidioChatApi?.trigger('preFormFilled', {
                        form_data: action.updateData,
                    });
                }
                // the order of getState and retVal is important
                // we want to display prechat message with fields which were not present on visitor object before
                // filling them with data from action.updateData
                const state = getState();
                const preChatMessage = transformToPreChatMessageFormat(
                    state.preChat.data,
                    state.visitor,
                );
                const retVal = next(action);
                if (preChatMessage) {
                    dispatch(addMessage(preChatMessage));
                }
                dispatch(setFlagForSendingMessageFromVisitor(true));

                return retVal;
            }
            case SET_IFRAME_VIEW: {
                const { iframeView, dimensions } = action;
                let width;
                let height;
                if (dimensions) {
                    ({ width, height } = dimensions);
                    dynamic(width, height);
                } else {
                    ({ width, height } = getIframeSizes(iframeView));
                }
                window.tidioChatApi?.trigger('resize', {
                    width,
                    height,
                    iframe: getIframeRef(),
                });
                return next(action);
            }
            case BOTS_GET_STARTED: {
                setTimeout(() => {
                    dispatch(setView(View.CHAT));
                }, 200);
                return next(action);
            }
            case SET_PREVIEW_DATA: {
                const { prop, payload } = action;
                if (prop === 'previewView') {
                    // after refactoring connect to useSelector in our top level components in App (AppOnRight, AppOnLeft, etc) we had a race condition when setting previewView resulted in non working translations in tour
                    // this is a workaround for that
                    // TODO SET_PREVIEW_DATA should be refactored probably to queue, which will be processed in order in span of X ms as current solution is not maintainable in the long run
                    setTimeout(() => {
                        const view = payload;
                        if (view === 'closed') {
                            dispatch(setChatOpenedState(false));
                        } else {
                            dispatch(setChatOpenedState(true));
                            if (view === 'operatorsOffline') {
                                setTimeout(() => {
                                    dispatch(setOpenTab('conversations'));
                                    dispatch(setView(View.CHAT));
                                }, 0);
                            }
                            if (view === 'operatorsOfflineModal') {
                                setTimeout(() => {
                                    dispatch(setOpenTab('conversations'));
                                    dispatch(setView(View.CHAT));
                                    dispatch(showUserDataModal('alwaysOnline'));
                                }, 0);
                            }
                            if (view === 'createTicket') {
                                setTimeout(() => {
                                    dispatch(setOpenTab('conversations'));
                                    dispatch(setView(View.CHAT));
                                    dispatch(showUserDataModal('createTicket'));
                                }, 0);
                            }
                            if (view === 'preform') {
                                setTimeout(() => {
                                    dispatch(setOpenTab('conversations'));
                                    dispatch(setView(View.CHAT));
                                    dispatch(showUserDataModal('prechat'));
                                }, 0);
                            }
                        }
                    });
                }
                return next(action);
            }
            case VISITOR_REGISTER_IMPORT_DATA: {
                const retVal = next(action);
                if (Object.keys(featuresOverridesFromApi).length > 0) {
                    dispatch(setFeaturesFromApi(featuresOverridesFromApi));
                }
                return retVal;
            }
            case SET_FEATURES_FROM_API: {
                const filtered = filterApiFeatures(action.features);
                if (typeof action.features !== 'object' || !filtered) {
                    return false;
                }
                const modifiedAction = {
                    ...action,
                    features: filtered,
                };
                featuresOverridesFromApi = {
                    ...featuresOverridesFromApi,
                    ...filtered,
                };
                if (filtered.customBranding) {
                    if (!wasEventAlreadyTracked(trackingEvents.whitelabelingEnabled)) {
                        dispatch(widgetActivityTracking(trackingEvents.whitelabelingEnabled));
                    }
                }
                return next(modifiedAction);
            }
            case ADJUST_STYLES: {
                const { styles } = action;
                const state = getState();
                const { designVersion } = state;
                let val: undefined | string;
                if (designVersion === 5 || isNewSkin()) {
                    val = adjustShadowRootStyles(styles);
                } else {
                    val = adjustIframeStyles(styles);
                }
                next(action);
                return val;
            }
            case REMOVE_STYLES: {
                const { styleId } = action;
                const state = getState();
                const { designVersion } = state;
                if (designVersion === 5 || isNewSkin()) {
                    removeShadowRootStyles(styleId);
                } else {
                    removeIframeStyles(styleId);
                }
                return next(action);
            }
            case SET_VISITOR_CURRENCY: {
                const filtered = filterVisitorCurrencyData(action.currencyData);
                if (typeof action.currencyData !== 'object' || !filtered) {
                    return false;
                }
                return next({
                    ...action,
                    currencyData: filtered,
                });
            }
            default: {
                return next(action);
            }
        }
    };

export default reducerSideEffectsMiddleware;
