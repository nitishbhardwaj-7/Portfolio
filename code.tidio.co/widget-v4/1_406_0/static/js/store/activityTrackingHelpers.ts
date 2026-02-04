import { getKeyFromStorage, saveKeyToStorage } from './savedState';

export const trackingEvents = {
    widgetLoaded: 'widgetLoaded',
    prechatOpened: 'prechatOpened',
    alwaysOnlineOpened: 'alwaysOnlineOpened',
    closeModalClicked: 'closeModalClicked',
    cardsScrolled: 'cardsScrolled',
    quickReplyClicked: 'quickReplyClicked',
    buttonClicked: 'buttonClicked',
    flyMessageDisplayed: 'flyMessageDisplayed', // TODO: add param if with buttons, if message was image or text
    flyMessageClosed: 'flyMessageClosed',
    flyMessageClicked: 'flyMessageClicked', // TODO: add param if image or textarea clicked
    widgetLabelClicked: 'widgetLabelClicked',
    widgetIconClicked: 'widgetIconClicked',
    emojiPanelOpened: 'emojiPanelOpened',
    emojiAdded: 'emojiAdded',
    notificationsTurnedOff: 'notificationsTurnedOff',
    notificationsTurnedOn: 'notificationsTurnedOn',
    botsButtonClicked: 'botsButtonClicked',
    flyMessageButtonsClicked: 'flyMessageButtonsClicked',
    botStartedFromBotsMenu: 'botStartedFromBotsMenu',
    botCanceled: 'botCanceled',
    uploadButtonClicked: 'uploadButtonClicked',
    chatClosed: 'chatClosed',
    optionsButtonClicked: 'optionsButtonClicked',
    showPreviousMessagesClicked: 'showPreviousMessagesClicked',
    tidioChatApiFunctionCall: 'tidioChatApiFunctionCall',
    imageModalDisplayed: 'imageModalDisplayed',
    imageModalClosed: 'imageModalClosed',
    fullConversationHistoryRequested: 'fullConversationHistoryRequested',
    whitelabelingEnabled: 'whitelabelingEnabled',
    couponCodeCopyClicked: 'couponCodeCopyClicked',
    iframeModalDisplayed: 'iframeModalDisplayed',
    iframeModalClosed: 'iframeModalClosed',
    iframeModalButtonClicked: 'iframeModalButtonClicked',
    textInputDisabled: 'textInputDisabled',
    textInputEnabled: 'textInputEnabled',
    productRecommendationAddToCartClicked: 'productRecommendationAddToCartClicked',
    productRecommendationLearnMoreClicked: 'productRecommendationLearnMoreClicked',
    chatTabClicked: 'chatTabClicked',
    conversationStarterClicked: 'conversationStarterClicked',
    goBackToConversationStartersClicked: 'goBackToConversationStartersClicked',
    chatWithUsHomeTabClicked: 'chatWithUsHomeTabClicked',
    homeTabVisible: 'homeTabVisible',
} as const;

export const wasEventAlreadyTracked = (eventName: keyof typeof trackingEvents): boolean => {
    const eventId = `trackWidgetEvent_${eventName}`;
    if (getKeyFromStorage(eventId)) {
        return true;
    }
    saveKeyToStorage(eventId, 1);
    return false;
};
