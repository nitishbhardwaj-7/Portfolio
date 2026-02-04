import { transformToVisitorMessageFormat } from '../connection/parsers';
import {
    ApiFeatures,
    DefaultRootState,
    DynamicIframeView,
    FormResponseMessage,
    HistoryImportedMessageFromSockets,
    IframeViewDimensions,
    IframeViews,
    Message,
    ModalType,
    Operator,
    PrechatUpdateData,
    SatisfactionSurveyConfig,
    ShopifyCartTokenUpdatedParams,
    ShopifyCheckoutCreatedParams,
    ShopifyOrderCreatedParams,
    TidioIdentify,
    TrackingEvent,
    UploadMessage,
    View,
    Visitor,
    VisitorCurrencyData,
    VisitorDataUpdate,
    VisitorRegisterImportData,
    VisitorWidgetPositionParams,
} from './typings';

export const SET_WIDGET_MOUNT_STATE = 'SET_WIDGET_MOUNT_STATE';
export function setWidgetMountState(
    status = true,
    source: 'none' | 'visitorRegister' | 'tidioChatApi' = 'none',
) {
    return <const>{
        type: SET_WIDGET_MOUNT_STATE,
        status,
        source,
    };
}

export const PERSISTED_STATE_LOADED = 'PERSISTED_STATE_LOADED';
export function persistedStateLoaded(state: DefaultRootState) {
    return <const>{
        type: PERSISTED_STATE_LOADED,
        state,
    };
}

export const REPLACE_STATE_WITH_SAVED = 'REPLACE_STATE_WITH_SAVED';
export function replaceStateWithSaved(state: DefaultRootState) {
    return <const>{
        type: REPLACE_STATE_WITH_SAVED,
        state,
    };
}

export const MERGE_VISITOR = 'MERGE_VISITOR';
export function mergeVisitor(visitorId: string) {
    return <const>{
        type: MERGE_VISITOR,
        visitorId,
    };
}

export const INITIALIZE_VISITOR_DATA = 'INITIALIZE_VISITOR_DATA';
export function initializeVisitorData(visitorData: Visitor) {
    return <const>{
        type: INITIALIZE_VISITOR_DATA,
        visitorData,
    };
}

export const COMPARE_TIDIO_IDENTIFY_DATA = 'COMPARE_TIDIO_IDENTIFY_DATA';
export function compareTidioIdentifyData(identifyData: TidioIdentify | null) {
    return <const>{
        type: COMPARE_TIDIO_IDENTIFY_DATA,
        identifyData,
    };
}

export const MERGE_VISITOR_DATA_FROM_IDENTIFY = 'MERGE_VISITOR_DATA_FROM_IDENTIFY';
export function mergeVisitorDataFromIdentify(
    dataToMerge: Partial<Visitor> & { identifyData: TidioIdentify },
) {
    return <const>{
        type: MERGE_VISITOR_DATA_FROM_IDENTIFY,
        dataToMerge,
    };
}

export const SAVE_TIDIO_IDENTIFY_DATA = 'SAVE_TIDIO_IDENTIFY_DATA';
export function saveTidioIdentifyData(identifyData: TidioIdentify) {
    return <const>{
        type: SAVE_TIDIO_IDENTIFY_DATA,
        identifyData,
    };
}

export const VISITOR_REGISTER_IMPORT_DATA = 'VISITOR_REGISTER_IMPORT_DATA';
export function visitorRegisterImportData(
    data: VisitorRegisterImportData,
    callback: (shouldMount: boolean) => void = () => {},
) {
    return <const>{
        type: VISITOR_REGISTER_IMPORT_DATA,
        data,
        callback,
    };
}

export const SET_PROJECT_STATUS = 'SET_PROJECT_STATUS';
export function setProjectStatus(status: 'online' | 'offline') {
    return <const>{
        type: SET_PROJECT_STATUS,
        status,
    };
}

export const SET_CHAT_OPENED_STATE = 'SET_CHAT_OPENED_STATE';
export function setChatOpenedState(open: boolean) {
    return <const>{
        type: SET_CHAT_OPENED_STATE,
        open,
    };
}
export const SET_IFRAME_VIEW = 'SET_IFRAME_VIEW';
export function setIframeView(
    iframeView: IframeViews | DynamicIframeView,
    dimensions: IframeViewDimensions = null,
) {
    return <const>{
        type: SET_IFRAME_VIEW,
        iframeView,
        dimensions,
    };
}

export const SET_WIDGET_COLOR = 'SET_WIDGET_COLOR';
export function setWidgetColor(color: DefaultRootState['widgetColor']) {
    return <const>{
        type: SET_WIDGET_COLOR,
        color,
    };
}

export const SET_FLAG_SEND_MESSAGE_FROM_VISITOR = 'SET_FLAG_SEND_MESSAGE_FROM_VISITOR';
export function setFlagForSendingMessageFromVisitor(shouldSend: boolean) {
    return <const>{
        type: SET_FLAG_SEND_MESSAGE_FROM_VISITOR,
        shouldSend,
    };
}

export const SET_OPTION_DROPDOWN_VISIBILITY = 'SET_OPTION_DROPDOWN_VISIBILITY';
export function setOptionDropdownVisibility(visible: boolean) {
    return <const>{
        type: SET_OPTION_DROPDOWN_VISIBILITY,
        visible,
    };
}

export const SET_NOTIFICATION_STATUS = 'SET_NOTIFICATION_STATUS';
export function setNotificationStatus(status: boolean) {
    return <const>{
        type: SET_NOTIFICATION_STATUS,
        status,
    };
}

export const OPERATOR_IS_TYPING_STATUS = 'OPERATOR_IS_TYPING_STATUS';
export function setOperatorIsTypingStatus(
    operatorIdOrStatus: Operator['id'] | boolean = false,
    timeoutValue: number | undefined = undefined,
) {
    return <const>{
        type: OPERATOR_IS_TYPING_STATUS,
        operatorIdOrStatus,
        timeoutValue,
    };
}

export const VISITOR_IS_TYPING = 'VISITOR_IS_TYPING';
export function setVisitorIsTyping(message = '') {
    return <const>{
        type: VISITOR_IS_TYPING,
        message,
    };
}

export const ADD_MESSAGE = 'ADD_MESSAGE';
export function addMessage(message: Message) {
    return <const>{
        type: ADD_MESSAGE,
        message,
    };
}

export const ADD_PENDING_ATTACHMENT = 'ADD_PENDING_ATTACHMENT';
export function addPendingAttachment(id: string, file: File) {
    return <const>{
        type: ADD_PENDING_ATTACHMENT,
        payload: {
            id,
            file,
        },
    };
}

export const UPDATE_PENDING_ATTACHMENT_STATUS = 'UPDATE_PENDING_ATTACHMENT_STATUS';
export function updatePendingAttachmentStatus(
    id: string,
    status: 'uploading' | 'uploaded' | 'error',
    data?: {
        uploadedUrl?: string;
        uploadedThumb?: string;
        errorMessage?: string;
    },
) {
    return <const>{
        type: UPDATE_PENDING_ATTACHMENT_STATUS,
        payload: {
            id,
            status,
            uploadedUrl: data?.uploadedUrl,
            uploadedThumb: data?.uploadedThumb,
            errorMessage: data?.errorMessage,
        },
    };
}

export const REMOVE_PENDING_ATTACHMENT = 'REMOVE_PENDING_ATTACHMENT';
export function removePendingAttachment(id: string) {
    return <const>{
        type: REMOVE_PENDING_ATTACHMENT,
        payload: { id },
    };
}

export const CLEAR_PENDING_ATTACHMENTS = 'CLEAR_PENDING_ATTACHMENTS';
export function clearPendingAttachments() {
    return <const>{
        type: CLEAR_PENDING_ATTACHMENTS,
    };
}

export const UPDATE_ATTACHMENT = 'UPDATE_ATTACHMENT';
export function updateAttachment(
    messageId: UploadMessage['id'],
    attachmentType: UploadMessage['attachmentType'],
    url: UploadMessage['content'],
    name: UploadMessage['name'],
    extension: UploadMessage['extension'],
    thumb: UploadMessage['thumb'],
    imageLoaded: UploadMessage['imageLoaded'] = false,
) {
    return <const>{
        type: UPDATE_ATTACHMENT,
        messageId,
        attachmentType,
        url,
        name,
        extension,
        thumb,
        imageLoaded,
    };
}

export const SUBMIT_FORM = 'SUBMIT_FORM';
export function submitForm(message: FormResponseMessage) {
    return <const>{
        type: SUBMIT_FORM,
        message: transformToVisitorMessageFormat(message),
    };
}

export const UPDATE_ATTACHMENT_LOADED_STATE = 'UPDATE_ATTACHMENT_LOADED_STATE';
export function updateAttachmentLoadedState(
    messageId: UploadMessage['id'],
    imageLoaded: UploadMessage['imageLoaded'],
) {
    return <const>{
        type: UPDATE_ATTACHMENT_LOADED_STATE,
        messageId,
        imageLoaded,
    };
}

export const SEND_MESSAGE_FROM_VISITOR = 'SEND_MESSAGE_FROM_VISITOR';
export function sendMessageFromVisitor(message: Message['content'], emit = true) {
    return <const>{
        type: SEND_MESSAGE_FROM_VISITOR,
        message,
        payload: transformToVisitorMessageFormat(message),
        emit,
    };
}

export const SEND_PENDING_ATTACHMENTS = 'SEND_PENDING_ATTACHMENTS';
export function sendPendingAttachments() {
    return <const>{
        type: SEND_PENDING_ATTACHMENTS,
    };
}

export function sendMessageFromVisitorWithBotPayload(
    message: Message['content'],
    payload: string,
    metadata?: { is_ai_assistant_task?: Message['aiAssistantTask'] },
) {
    const messageObj = sendMessageFromVisitor(message, true);
    return <const>{
        ...messageObj,
        payload: {
            ...messageObj.payload,
            payload,
            metadata,
        },
    };
}

export const OPERATOR_ASSIGNED_DEPARTMENT = 'OPERATOR_ASSIGNED_DEPARTMENT';
export function operatorAssignedDepartment(departmentId: number) {
    return <const>{
        type: OPERATOR_ASSIGNED_DEPARTMENT,
        departmentId,
    };
}

export const OPERATOR_OPENED_CONVERSATION = 'OPERATOR_JOINED_CONVERSATION';
export function operatorOpenedConversation(operatorId: Operator['id'], operatorName: string) {
    return <const>{
        type: OPERATOR_OPENED_CONVERSATION,
        operatorId,
        operatorName,
    };
}

export const OPERATOR_LEFT_CONVERSATION = 'OPERATOR_LEFT_CONVERSATION';
export function operatorLeftConversation(operatorId: Operator['id']) {
    return <const>{
        type: OPERATOR_LEFT_CONVERSATION,
        operatorId,
    };
}

export const OPERATOR_TRANSFERRED_CONVERSATION = 'OPERATOR_TRANSFERRED_CONVERSATION';
export function operatorTransferredConversation(payload: {
    sourceOperatorId: Operator['id'];
    targetOperatorId: Operator['id'];
    targetOperatorName: string;
}) {
    return <const>{
        type: OPERATOR_TRANSFERRED_CONVERSATION,
        payload,
    };
}

export const OPERATOR_CHANGED_STATUS = 'OPERATOR_CHANGED_STATUS';
export function operatorChangedStatus(operatorId: Operator['id'], isOnline: Operator['isOnline']) {
    return <const>{
        type: OPERATOR_CHANGED_STATUS,
        operatorId,
        isOnline,
    };
}

export const SET_BLOCKED_MESSAGE = 'SET_BLOCKED_MESSAGE';
export function setBlockedMessage(message: string | null = null) {
    return <const>{
        type: SET_BLOCKED_MESSAGE,
        message,
    };
}

export const SEND_FILLED_PRECHAT = 'SEND_FILLED_PRECHAT';
export function sendFilledPreChat(updateData: Partial<PrechatUpdateData>) {
    return <const>{
        type: SEND_FILLED_PRECHAT,
        updateData,
    };
}

export const SEND_FILLED_ALWAYS_ONLINE_MESSAGE = 'SEND_FILLED_ALWAYS_ONLINE_MESSAGE';
export function sendFilledAlwaysOnlineMessage(email: Visitor['email']) {
    return <const>{
        type: SEND_FILLED_ALWAYS_ONLINE_MESSAGE,
        email,
    };
}

export const CREATE_TICKET_WHEN_OPERATORS_OFFLINE = 'CREATE_TICKET_WHEN_OPERATORS_OFFLINE';
export function createTicketWhenOperatorsOffline(email: Visitor['email'], message: string) {
    return <const>{
        type: CREATE_TICKET_WHEN_OPERATORS_OFFLINE,
        email,
        message,
    };
}

export const VISITOR_SET_RATING = 'VISITOR_SET_RATING';
export function visitorSetRating(ratingIsGood: boolean) {
    return <const>{
        type: VISITOR_SET_RATING,
        ratingIsGood,
    };
}

export const ADD_EMOJI_TO_NEW_MESSAGE = 'ADD_NEW_MESSAGE_EMOJI';
export function addEmojiToNewMessageTextarea(emoji: null | string = null) {
    return <const>{
        type: ADD_EMOJI_TO_NEW_MESSAGE,
        emoji,
    };
}

export const TOGGLE_EMOJI_PANEL = 'TOGGLE_EMOJI_PANEL';
export function toggleEmojiPanel(status: DefaultRootState['isEmojiPanelVisible']) {
    return <const>{
        type: TOGGLE_EMOJI_PANEL,
        status,
    };
}

export const VISITOR_MESSAGE_DELIVERY_STATUS = 'VISITOR_MESSAGE_DELIVERY_STATUS';
export function setVisitorMessageDeliveryStatus(
    messageId: Message['id'],
    idFromServer: number | null,
    status: boolean,
) {
    return <const>{
        type: VISITOR_MESSAGE_DELIVERY_STATUS,
        messageId,
        idFromServer,
        status,
    };
}

export const SET_MESSAGE_DISABLED_STATE = 'SET_MESSAGE_DISABLED_STATE';
/**
 * Pass messageId or array of ids to change message's disabled property to true
 * @param {String|String[]} messageIdOrArrayOfIds
 * @returns {{type: string, messageId: String|String[]}}
 */
export function setMessageDisabledState(messageIdOrArrayOfIds: Message['id'] | Message['id'][]) {
    return <const>{
        type: SET_MESSAGE_DISABLED_STATE,
        messageIdOrArrayOfIds,
    };
}

export const SEND_RATE_CONVERSATION_COMMENT = 'SEND_RATE_CONVERSATION_COMMENT';
export function sendRateConversationComment(messageId: Message['id'], comment: Message['content']) {
    return <const>{
        type: SEND_RATE_CONVERSATION_COMMENT,
        messageId,
        comment,
    };
}

export const VISITOR_UPDATE_DATA = 'VISITOR_UPDATE_DATA';
export function updateVisitorData(updateData: VisitorDataUpdate, emit = true) {
    return <const>{
        type: VISITOR_UPDATE_DATA,
        updateData,
        emit,
    };
}

export const VISITOR_ADD_TAGS = 'VISITOR_ADD_TAGS';
export function addVisitorTags(tags: string[]) {
    return <const>{
        type: VISITOR_ADD_TAGS,
        tags,
    };
}

export const SET_CONTACT_PROPERTIES = 'SET_CONTACT_PROPERTIES';
export function setContactProperties(properties: Record<string, string | number | boolean>) {
    return <const>{
        type: SET_CONTACT_PROPERTIES,
        properties,
    };
}

export const MERGE_FETCHED_MESSAGES = 'MERGE_FETCHED_MESSAGES';
export function mergeFetchedMessages(
    messagesToMerge: HistoryImportedMessageFromSockets[],
    lastMessageId: number | null,
) {
    return <const>{
        type: MERGE_FETCHED_MESSAGES,
        messagesToMerge,
        lastMessageId,
    };
}

export const BOTS_GET_STARTED = 'BOTS_GET_STARTED';
export function botsGetStarted() {
    return <const>{
        type: BOTS_GET_STARTED,
    };
}

export const SHOW_ALERT = 'SHOW_ALERT';
export function showAlert(message: DefaultRootState['alert']['content']) {
    return <const>{
        type: SHOW_ALERT,
        message,
    };
}

export const HIDE_ALERT = 'HIDE_ALERT';
export function hideAlert() {
    return <const>{
        type: HIDE_ALERT,
    };
}

export const HIDE_MESSAGE = 'HIDE_MESSAGE';
export function hideMessage(messageId: Message['id']) {
    return <const>{
        type: HIDE_MESSAGE,
        messageId,
    };
}

export const TIDIOCHATAPI_FUNCTION_CALL = 'TIDIOCHATAPI_FUNCTION_CALL';
export function tidioChatApiFunctionCall(functionName: string, args: unknown) {
    return <const>{
        type: TIDIOCHATAPI_FUNCTION_CALL,
        functionName,
        args,
    };
}

export const TIDIOCHATAPI_TRACK = 'TIDIOCHATAPI_TRACK';
// TODO: beter tidioChatApiTrack types
export function tidioChatApiTrack(
    eventName: string,
    eventData: unknown,
    successCallback: () => void | undefined,
) {
    return <const>{
        type: TIDIOCHATAPI_TRACK,
        eventName,
        eventData,
        successCallback,
    };
}

export const BOT_TRIGGER = 'BOT_TRIGGER';
export function botTrigger(ids: number[]) {
    return <const>{
        type: BOT_TRIGGER,
        ids,
    };
}

export const SET_PREVIEW_DATA = 'SET_PREVIEW_DATA';
// TODO: better types for setPreviewData
export function setPreviewData(prop: string, payload: unknown) {
    return <const>{
        type: SET_PREVIEW_DATA,
        prop,
        payload,
    };
}

export const SET_BOT_STATUS = 'SET_BOT_STATUS';
export function setBotStatus(isActive = true) {
    return <const>{
        type: SET_BOT_STATUS,
        isActive,
    };
}

export const CANCEL_BOTS = 'CANCEL_BOTS';
export function cancelBots() {
    return <const>{
        type: CANCEL_BOTS,
    };
}

export const HIDE_HEADER = 'HIDE_HEADER';
export function hideHeader(status = true) {
    return <const>{
        type: HIDE_HEADER,
        status,
    };
}

export const DISABLE_BOT_ANIMATION = 'DISABLE_BOT_ANIMATION';
export function disableBotsButtonAnimation(status = true) {
    return <const>{
        type: DISABLE_BOT_ANIMATION,
        status,
    };
}

export const SET_VIEW = 'SET_VIEW';
export function setView(view: View) {
    return <const>{
        type: SET_VIEW,
        view,
    };
}

export const UPDATE_VISITOR_URL = 'UPDATE_VISITOR_URL';
export function updateVisitorUrl(url: string) {
    return <const>{
        type: UPDATE_VISITOR_URL,
        url,
    };
}

export const SHOW_USER_DATA_MODAL = 'SHOW_USER_DATA_MODAL';
export function showUserDataModal(modal: ModalType | false) {
    return <const>{
        type: SHOW_USER_DATA_MODAL,
        modal,
    };
}

export const SET_FEATURES_FROM_API = 'SET_FEATURES_FROM_API';
export function setFeaturesFromApi(features: ApiFeatures) {
    return <const>{
        type: SET_FEATURES_FROM_API,
        features,
    };
}

export const SHOW_OLDER_MESSAGES = 'SHOW_OLDER_MESSAGES';
export function showOlderMessages(status: boolean) {
    return <const>{
        type: SHOW_OLDER_MESSAGES,
        status,
    };
}

export const SET_DRAG_AND_DROP_STATUS = 'SET_DRAG_AND_DROP_STATUS';
export function setDragAndDropStatus(status: boolean) {
    return <const>{
        type: SET_DRAG_AND_DROP_STATUS,
        status,
    };
}

export const CLOSE_SOCKET_CONNECTION = 'CLOSE_SOCKET_CONNECTION';
export function closeSocketConnection() {
    return <const>{
        type: CLOSE_SOCKET_CONNECTION,
    };
}

export const SET_VISITOR_MERGED_EMIT_QUEUE = 'SET_VISITOR_MERGED_EMIT_QUEUE';
export function setVisitorMergedEmitQueue(callback: () => void) {
    return <const>{
        type: SET_VISITOR_MERGED_EMIT_QUEUE,
        callback,
    };
}

export const VISITOR_CLICKS_ON_CHAT_ICON = 'VISITOR_CLICKS_ON_CHAT_ICON';
export function visitorClicksOnChatIcon() {
    return <const>{
        type: VISITOR_CLICKS_ON_CHAT_ICON,
    };
}

export const SET_PAGE_VISIBLITY_STATUS = 'SET_PAGE_VISIBLITY_STATUS';
export function setPageVisiblityStatus(status: boolean) {
    return <const>{
        type: SET_PAGE_VISIBLITY_STATUS,
        status,
    };
}

export const VISITOR_MARK_MESSAGES_AS_READ = 'VISITOR_MARK_MESSAGES_AS_READ';
export function setVisitorMessagesAsRead() {
    return <const>{
        type: VISITOR_MARK_MESSAGES_AS_READ,
    };
}

export const SHOPIFY_ORDER_CREATED = 'SHOPIFY_ORDER_CREATED';
export function shopifyOrderCreated(params: ShopifyOrderCreatedParams) {
    return <const>{
        type: SHOPIFY_ORDER_CREATED,
        params,
    };
}

export const SHOPIFY_CART_TOKEN_UPDATED = 'SHOPIFY_CART_TOKEN_UPDATED';
export function shopifyCartTokenUpdated(params: ShopifyCartTokenUpdatedParams) {
    return <const>{
        type: SHOPIFY_CART_TOKEN_UPDATED,
        params,
    };
}

export const SHOPIFY_CHECKOUT_CREATED = 'SHOPIFY_CHECKOUT_CREATED';
export function shopifyCheckoutCreated(params: ShopifyCheckoutCreatedParams) {
    return <const>{
        type: SHOPIFY_CHECKOUT_CREATED,
        params,
    };
}

export const VISITOR_WIDGET_POSITION = 'VISITOR_WIDGET_POSITION';
export function setVisitorWidgetPosition(params: VisitorWidgetPositionParams) {
    return <const>{
        type: VISITOR_WIDGET_POSITION,
        params,
    };
}

export const SET_AWESOME_IFRAME = 'SET_AWESOME_IFRAME';
export function setAwesomeIframe(status: boolean) {
    return <const>{
        type: SET_AWESOME_IFRAME,
        status,
    };
}

export const OPEN_IMAGE_POPUP = 'OPEN-IMAGE-POPUP';
export function openImagePopup(image: string) {
    return <const>{
        type: OPEN_IMAGE_POPUP,
        image,
    };
}

export const CLOSE_IMAGE_POPUP = 'CLOSE-IMAGE-POPUP';
export function closeImagePopup() {
    return <const>{
        type: CLOSE_IMAGE_POPUP,
    };
}

export const SET_IFRAME_MODAL = 'SET-IFRAME-MODAL';
export function setIframeModal(url: DefaultRootState['iframeModalUrl']) {
    return <const>{
        type: SET_IFRAME_MODAL,
        url,
    };
}

export const WIDGET_ACTIVITY_TRACKING = 'WIDGET-ACTIVITY-TRACKING';
export function widgetActivityTracking(
    event: TrackingEvent,
    additionalData?: Record<string, string | number | boolean>,
) {
    return <const>{
        type: WIDGET_ACTIVITY_TRACKING,
        event,
        additionalData,
    };
}

export const FETCH_SHOPIFY_CART_CONTENT = 'FETCH-SHOPIFY-CART-CONTENT';
export function fetchShopifyCartContent() {
    return <const>{
        type: FETCH_SHOPIFY_CART_CONTENT,
    };
}

export const CLEAR_SHOPIFY_CART_ATTRIBUTES = 'CLEAR-SHOPIFY-CART-ATTRIBUTES';
export function clearShopifyCartAttributes() {
    return <const>{
        type: CLEAR_SHOPIFY_CART_ATTRIBUTES,
    };
}

export const SET_MESSAGE_FOR_FLY = 'SET-MESSAGE-FOR-FLY';
export function setMessageForFly(message: Message) {
    return <const>{
        type: SET_MESSAGE_FOR_FLY,
        message,
    };
}

export const RATE_CHAT_BOT = 'RATE-CHAT-BOT';
export function rateChatBot(
    messageId: Message['id'],
    ratingId: Message['ratingId'],
    rating: Message['rating'],
) {
    return <const>{
        type: RATE_CHAT_BOT,
        messageId,
        ratingId,
        rating,
    };
}

export const SET_RECONNECTION_ATTEMPT_COUNT = 'SET_RECONNECTION_ATTEMPT_COUNT';
export function setReconnectionAttemptCount(count: number) {
    return <const>{
        type: SET_RECONNECTION_ATTEMPT_COUNT,
        count,
    };
}

export const SET_DISABLE_TEXT_INPUT = 'SET_DISABLE_TEXT_INPUT';
export function setDisableTextInput(status: boolean) {
    return <const>{
        type: SET_DISABLE_TEXT_INPUT,
        status,
    };
}

export const SET_SATISFACTION_SURVEY_CONFIG = 'SET-SATISFACTION-SURVEY-CONFIG';
export function setSatisfactionSurveyConfig(
    config: SatisfactionSurveyConfig,
    threadSource: SatisfactionSurveyConfig['threadSource'],
    threadId: number,
    messageId: number,
) {
    return <const>{
        type: SET_SATISFACTION_SURVEY_CONFIG,
        config,
        threadSource,
        threadId,
        messageId,
    };
}

export const RATE_SATISFACTION_SURVEY = 'RATE-SATISFACTION-SURVEY';
export function rateSatisfactionSurvey(
    rating: SatisfactionSurveyConfig['response']['rating'],
    threadSource: SatisfactionSurveyConfig['threadSource'],
    threadId: number,
    messageId: number,
) {
    return <const>{
        type: RATE_SATISFACTION_SURVEY,
        rating,
        threadSource,
        threadId,
        messageId,
    };
}

export const COMMENT_SATISFACTION_SURVEY = 'COMMENT-SATISFACTION-SURVEY';
export function commentSatisfactionSurvey(
    comment: SatisfactionSurveyConfig['response']['comment'],
    threadSource: SatisfactionSurveyConfig['threadSource'],
    threadId: number,
    messageId: number,
) {
    return <const>{
        type: COMMENT_SATISFACTION_SURVEY,
        comment,
        threadSource,
        threadId,
        messageId,
    };
}

export const JUDGE_ME_RATING_CLICK = 'JUDGE_ME_RATING_CLICK';
export function judgeMeRatingClick(rating: number) {
    return <const>{
        type: JUDGE_ME_RATING_CLICK,
        rating,
    };
}

export const JUDGE_ME_REVIEW_SENT = 'JUDGE_ME_REVIEW_SENT';
export function judgeMeReviewSent(rating: number) {
    return <const>{
        type: JUDGE_ME_REVIEW_SENT,
        rating,
    };
}

export const CART_VALUE_CHANGED_SENT = 'CART_VALUE_CHANGED_SENT';
export function cartValueChangedSend(eventData: {
    cartCurrency: string;
    cartValue: number;
    currencyRate: string;
}) {
    return <const>{
        type: CART_VALUE_CHANGED_SENT,
        eventData,
    };
}

export const TRIGGER_SATISFACTION_SURVEY = 'TRIGGER_SATISFACTION_SURVEY';
export function triggerSatisfactionSurvey() {
    return <const>{
        type: TRIGGER_SATISFACTION_SURVEY,
    };
}

export const SEND_VIDEO_CALL_OFFER = 'SEND-VIDEO-CALL-OFFER';
export function sendVideoCallOffer(payload: {
    operatorId: number;
    offer: { sdp: string; type: string; instanceId: string } | null;
}) {
    return <const>{
        type: SEND_VIDEO_CALL_OFFER,
        payload,
    };
}

export const SEND_VIDEO_CALL_ICE_CANDIDATES = 'SEND-VIDEO-CALL-ICE-CANDIDATES';
export function sendVideoCallIceCandidates(payload: {
    operatorId: number;
    iceCandidates: string[];
}) {
    return <const>{
        type: SEND_VIDEO_CALL_ICE_CANDIDATES,
        payload,
    };
}

export const AI_ASSISTANT_IS_THINKING = 'AI-ASSISTANT-IS-THINKING';
export function setAiAssistantIsThinking(status: boolean) {
    return <const>{
        type: AI_ASSISTANT_IS_THINKING,
        status,
    };
}

export const PRODUCT_RECOMMENDATION_CLICKED = 'PRODUCT-RECOMMENDATION-CLICKED';
export function productRecommendationClicked(payload: { productId: number; chatBotId: number }) {
    return <const>{
        type: PRODUCT_RECOMMENDATION_CLICKED,
        ...payload,
    };
}

export const SET_OPEN_TAB = 'SET-OPEN-TAB';
export function setOpenTab(openTab: DefaultRootState['openTab']) {
    return <const>{
        type: SET_OPEN_TAB,
        openTab,
    };
}

export const MARK_MESSAGES_AS_READ = 'MARK-MESSAGES-AS-READ';
export function markMessagesAsRead() {
    return <const>{
        type: MARK_MESSAGES_AS_READ,
    };
}

export const ADJUST_STYLES = 'ADJUST-STYLES';
export function adjustStyles(styles: unknown) {
    return <const>{
        type: ADJUST_STYLES,
        styles,
    };
}

export const REMOVE_STYLES = 'REMOVE-STYLES';
export function removeStyles(styleId: unknown) {
    return <const>{
        type: REMOVE_STYLES,
        styleId,
    };
}

export const SET_VISITOR_CURRENCY = 'SET_VISITOR_CURRENCY';
export function setVisitorCurrency(currencyData: VisitorCurrencyData, emit = true) {
    return <const>{
        type: SET_VISITOR_CURRENCY,
        currencyData,
        emit,
    };
}

export const SET_DEVICE_TYPE = 'SET-DEVICE-TYPE';
export function setDeviceType(deviceType: 'mobile' | 'desktop') {
    return <const>{
        type: SET_DEVICE_TYPE,
        deviceType,
    };
}

export const DISMISS_PRIVACY_POLICY = 'DISMISS-PRIVACY-POLICY';
export function dismissPrivacyPolicy() {
    return <const>{
        type: DISMISS_PRIVACY_POLICY,
    };
}

export type ActionTypes =
    | ReturnType<typeof closeImagePopup>
    | ReturnType<typeof openImagePopup>
    | ReturnType<typeof setAwesomeIframe>
    | ReturnType<typeof setVisitorWidgetPosition>
    | ReturnType<typeof shopifyOrderCreated>
    | ReturnType<typeof shopifyCartTokenUpdated>
    | ReturnType<typeof shopifyCheckoutCreated>
    | ReturnType<typeof setVisitorMessagesAsRead>
    | ReturnType<typeof setPageVisiblityStatus>
    | ReturnType<typeof visitorClicksOnChatIcon>
    | ReturnType<typeof setVisitorMergedEmitQueue>
    | ReturnType<typeof closeSocketConnection>
    | ReturnType<typeof setDragAndDropStatus>
    | ReturnType<typeof showOlderMessages>
    | ReturnType<typeof setFeaturesFromApi>
    | ReturnType<typeof showUserDataModal>
    | ReturnType<typeof updateVisitorUrl>
    | ReturnType<typeof setView>
    | ReturnType<typeof disableBotsButtonAnimation>
    | ReturnType<typeof hideHeader>
    | ReturnType<typeof cancelBots>
    | ReturnType<typeof setBotStatus>
    | ReturnType<typeof setPreviewData>
    | ReturnType<typeof botTrigger>
    | ReturnType<typeof tidioChatApiTrack>
    | ReturnType<typeof tidioChatApiFunctionCall>
    | ReturnType<typeof hideMessage>
    | ReturnType<typeof hideAlert>
    | ReturnType<typeof showAlert>
    | ReturnType<typeof botsGetStarted>
    | ReturnType<typeof mergeFetchedMessages>
    | ReturnType<typeof setContactProperties>
    | ReturnType<typeof addVisitorTags>
    | ReturnType<typeof updateVisitorData>
    | ReturnType<typeof sendRateConversationComment>
    | ReturnType<typeof setMessageDisabledState>
    | ReturnType<typeof setVisitorMessageDeliveryStatus>
    | ReturnType<typeof toggleEmojiPanel>
    | ReturnType<typeof addEmojiToNewMessageTextarea>
    | ReturnType<typeof visitorSetRating>
    | ReturnType<typeof sendFilledAlwaysOnlineMessage>
    | ReturnType<typeof createTicketWhenOperatorsOffline>
    | ReturnType<typeof setBlockedMessage>
    | ReturnType<typeof sendFilledPreChat>
    | ReturnType<typeof operatorChangedStatus>
    | ReturnType<typeof operatorTransferredConversation>
    | ReturnType<typeof operatorLeftConversation>
    | ReturnType<typeof operatorOpenedConversation>
    | ReturnType<typeof operatorAssignedDepartment>
    | ReturnType<typeof sendMessageFromVisitor>
    | ReturnType<typeof updateAttachmentLoadedState>
    | ReturnType<typeof updateAttachment>
    | ReturnType<typeof submitForm>
    | ReturnType<typeof addMessage>
    | ReturnType<typeof setVisitorIsTyping>
    | ReturnType<typeof setOperatorIsTypingStatus>
    | ReturnType<typeof setNotificationStatus>
    | ReturnType<typeof setOptionDropdownVisibility>
    | ReturnType<typeof setFlagForSendingMessageFromVisitor>
    | ReturnType<typeof setWidgetColor>
    | ReturnType<typeof setIframeView>
    | ReturnType<typeof setChatOpenedState>
    | ReturnType<typeof setProjectStatus>
    | ReturnType<typeof visitorRegisterImportData>
    | ReturnType<typeof saveTidioIdentifyData>
    | ReturnType<typeof mergeVisitorDataFromIdentify>
    | ReturnType<typeof compareTidioIdentifyData>
    | ReturnType<typeof initializeVisitorData>
    | ReturnType<typeof mergeVisitor>
    | ReturnType<typeof persistedStateLoaded>
    | ReturnType<typeof replaceStateWithSaved>
    | ReturnType<typeof addPendingAttachment>
    | ReturnType<typeof updatePendingAttachmentStatus>
    | ReturnType<typeof removePendingAttachment>
    | ReturnType<typeof sendPendingAttachments>
    | ReturnType<typeof clearPendingAttachments>
    | ReturnType<typeof setMessageForFly>
    | ReturnType<typeof fetchShopifyCartContent>
    | ReturnType<typeof clearShopifyCartAttributes>
    | ReturnType<typeof widgetActivityTracking>
    | ReturnType<typeof setWidgetMountState>
    | ReturnType<typeof rateChatBot>
    | ReturnType<typeof setReconnectionAttemptCount>
    | ReturnType<typeof setDisableTextInput>
    | ReturnType<typeof setSatisfactionSurveyConfig>
    | ReturnType<typeof rateSatisfactionSurvey>
    | ReturnType<typeof commentSatisfactionSurvey>
    | ReturnType<typeof judgeMeRatingClick>
    | ReturnType<typeof judgeMeReviewSent>
    | ReturnType<typeof cartValueChangedSend>
    | ReturnType<typeof triggerSatisfactionSurvey>
    | ReturnType<typeof sendVideoCallOffer>
    | ReturnType<typeof sendVideoCallIceCandidates>
    | ReturnType<typeof setAiAssistantIsThinking>
    | ReturnType<typeof setIframeModal>
    | ReturnType<typeof productRecommendationClicked>
    | ReturnType<typeof setOpenTab>
    | ReturnType<typeof markMessagesAsRead>
    | ReturnType<typeof adjustStyles>
    | ReturnType<typeof removeStyles>
    | ReturnType<typeof setVisitorCurrency>
    | ReturnType<typeof setDeviceType>
    | ReturnType<typeof dismissPrivacyPolicy>;
