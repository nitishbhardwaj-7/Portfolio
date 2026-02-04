import { AI_ASSISTANT_NAME, getCurrentTime } from '../helpers';
import { ravenCaptureException } from '../helpers/raven';
import { views } from '../helpers/views';

import { getPreChatFields } from '../connection/parsers';
import {
    DefaultRootState,
    IframeViewDimensions,
    IntegrationPlatform,
    Message,
    MessageType,
    MobileButtonSize,
    Platform,
    RoutingRule,
    SatisfactionSurveyConfig,
    View,
} from './typings';

export const getIsChatOnSite = (state: DefaultRootState): boolean => {
    if (!state?.visitor?.is_chat_on_site) {
        return false;
    }
    return state.visitor.is_chat_on_site;
};

export const getAreDepartmentsEnabled = (state: DefaultRootState): boolean =>
    state.routingRules.areEnabled;

export const getIsDepartmentSelected = (state: DefaultRootState): boolean =>
    state.selectedDepartment !== null;

export const getSelectedDepartmentId = (state: DefaultRootState): number | null =>
    state.selectedDepartment;

const sortRoutingRulesByPosition = (
    { position: positionA }: RoutingRule,
    { position: positionB }: RoutingRule,
): number => positionA - positionB;

export const getRoutingRules = (state: DefaultRootState): RoutingRule[] =>
    state.routingRules.options.slice().sort(sortRoutingRulesByPosition);

export const getOperatorAvatarSrc = (state: DefaultRootState, operatorId: number): string => {
    const foundOperator = state.operators.find((operator) => operator.id === operatorId);
    if (!foundOperator) {
        return '';
    }
    return foundOperator?.avatarSrc || '';
};

export const getOperatorName = (state: DefaultRootState, operatorId: number): string => {
    const foundOperator = state.assignedOperatorsData.find(
        (operator) => operator.id === operatorId,
    );
    if (!foundOperator) {
        return '';
    }
    return foundOperator?.name || '';
};

const MAX_RECONNECT_ATTEMPTS_BEFORE_CONNECTION_ISSUES = 5;
export const hasConnectionIssues = (state: DefaultRootState): boolean =>
    state.reconnectAttemptCount > MAX_RECONNECT_ATTEMPTS_BEFORE_CONNECTION_ISSUES;

export const getNonHiddenMessages = (() => {
    let lastMessages: Message[] | null = null;
    let cachedResult: Message[] | null = null;

    return (state: DefaultRootState): Message[] => {
        if (state.messages === lastMessages && cachedResult !== null) {
            return cachedResult;
        }

        lastMessages = state.messages;
        cachedResult = state.messages.filter((message) => !message.isHidden);
        return cachedResult;
    };
})();

export const getLastMessage = (state: DefaultRootState): Message | undefined => {
    const currentMessages = getNonHiddenMessages(state);
    const messagesAmount = currentMessages.length;
    if (messagesAmount > 0) {
        return currentMessages[messagesAmount - 1];
    }
    return undefined;
};

export const getNextMessage = (state: DefaultRootState, messageId: string): Message | undefined => {
    const currentMessages = getNonHiddenMessages(state);
    const currentIndex = currentMessages.findIndex((message) => message.id === messageId);
    if (currentMessages.length > currentIndex) {
        return currentMessages[currentIndex + 1];
    }
    return undefined;
};

export const getIsLastMessage = (state: DefaultRootState, messageId: Message['id']): boolean =>
    getLastMessage(state)?.id === messageId;

export const getIsLastMessageWithDisableTextInput = (state: DefaultRootState): boolean =>
    Boolean(getLastMessage(state)?.disableTextInput);

export const isLastMessageWaitingForAnswer = (state: DefaultRootState): boolean =>
    Boolean(getLastMessage(state)?.isWaitingForAnswer);

export const getView = (state: DefaultRootState): View => state.view;
export const getMobileButtonSize = (state: DefaultRootState): MobileButtonSize =>
    state.mobileButtonSize;
export const getIframeViewDimensions = (state: DefaultRootState): IframeViewDimensions =>
    state.chatIframeStyles.dimensions;

export const hasDisabledTextInput = (state: DefaultRootState): boolean => state.disableTextInput;

export const getAiAssistantName = (state: DefaultRootState): string =>
    state.aiAssistantName || AI_ASSISTANT_NAME;

export const getIsNewMessageDisabled = (state: DefaultRootState): boolean =>
    (state.showUserDataModal && state.view === views.chat) ||
    hasConnectionIssues(state) ||
    getIsLastMessageWithDisableTextInput(state) ||
    (hasDisabledTextInput(state) && !isLastMessageWaitingForAnswer(state));

export const getPlatform = (state: DefaultRootState): Platform => state.platform;

export const getIsDragAndDropActive = (state: DefaultRootState): boolean =>
    state.isDragAndDropActive && state.allowAttachments;

export const getAlertContent = (state: DefaultRootState): DefaultRootState['alert']['content'] =>
    state.alert.content;

export const getVisitorEmail = (state: DefaultRootState): DefaultRootState['visitor']['email'] =>
    state.visitor.email;

export const getSatisfactionSurveyConfig = (
    state: DefaultRootState,
    threadId?: number,
): SatisfactionSurveyConfig | null => {
    if (!threadId) {
        return null;
    }

    return state.satisfactionSurvey[threadId];
};

export const getWidgetColors = (state: DefaultRootState): DefaultRootState['widgetColor'] =>
    state.widgetColor;

export const getCustomBranding = (state: DefaultRootState): DefaultRootState['customBranding'] =>
    state.customBranding;

export const getCustomAvatar = (state: DefaultRootState): DefaultRootState['customAvatar'] =>
    state.customAvatar;

export const getIntegrationPlatformsWithForcedConsent = (): Array<IntegrationPlatform> => [
    IntegrationPlatform.MAILCHIMP,
    IntegrationPlatform.MAILCHIMP_V2,
];

export const getIntegrationPlatformsUsingTrayProvider = (): Array<IntegrationPlatform> => [
    IntegrationPlatform.KLAVIYO,
    IntegrationPlatform.MAILCHIMP_V2,
];

export const getPrechatSubscriptionCheckboxDefaultValue = (state: DefaultRootState): boolean =>
    state.prechatSubscriptionCheckboxDefaultValue;

export const getBlockedMessage = (state: DefaultRootState): string | null => state.blockedMessage;

export const getCreateTicketWhenOperatorsOffline = (state: DefaultRootState): boolean =>
    state.createTicketWhenOperatorsOffline;

export const getProjectPublicKey = (state: DefaultRootState): DefaultRootState['publicKey'] =>
    state.publicKey;

export const getVisitorId = (state: DefaultRootState): DefaultRootState['visitor']['id'] =>
    state.visitor.id;

export const getWidgetLabelStatus = (state: DefaultRootState): boolean =>
    state.widgetLabelStatus && !state.isMobile && state.sidebarIframeStyles === false;

export const getSidebarPosition = (state: DefaultRootState): string => {
    if (!state.sidebarIframeStyles) {
        return 'right';
    }
    return state.sidebarIframeStyles.position;
};

export const getOperators = (state: DefaultRootState): DefaultRootState['operators'] =>
    state.operators;
export const getOperatorStatus = (state: DefaultRootState): 'offline' | 'online' =>
    state.operators.some((operator) => operator.isOnline) ? 'online' : 'offline';
export const getAssignedOperatorsData = (
    state: DefaultRootState,
): DefaultRootState['assignedOperatorsData'] => state.assignedOperatorsData;

export const getAssignedOperators = (
    state: DefaultRootState,
): DefaultRootState['assignedOperators'] => state.assignedOperators;

export const getAiAssistantIsThinking = (state: DefaultRootState): boolean =>
    state.aiAssistantIsThinking;

export const hasAiAssistant = (state: DefaultRootState): boolean => state.aiAssistant;

export const getIframeModalUrl = (state: DefaultRootState): DefaultRootState['iframeModalUrl'] =>
    state.iframeModalUrl;

export const getIsMobile = (state: DefaultRootState): DefaultRootState['isMobile'] =>
    state.isMobile;

export const getUnansweredQuestion = (
    state: DefaultRootState,
    questionMessageId?: number,
): string | undefined => {
    const currentMessages = getNonHiddenMessages(state);
    const questionMessage = currentMessages.find(
        (message) => message.idFromServer === questionMessageId,
    )?.content;
    return questionMessage;
};

export const getFirstMessageByType = (
    state: DefaultRootState,
    type: MessageType,
): Message | undefined => getNonHiddenMessages(state).find((message) => message.type === type);

export const getPreChatMessage = (state: DefaultRootState): Message | undefined =>
    getFirstMessageByType(state, MessageType.PRECHAT);

export const alwaysOnlineMessagesExist = (state: DefaultRootState): boolean =>
    typeof getFirstMessageByType(state, MessageType.ALWAYS_ONLINE) !== 'undefined';

export const getAllMessagesByType = (state: DefaultRootState, type: MessageType): Message[] =>
    getNonHiddenMessages(state).filter((message) => message.type === type);

export const getLatestAlwaysOnlineMessage = (state: DefaultRootState): Message | undefined => {
    const messages = getAllMessagesByType(state, MessageType.ALWAYS_ONLINE);
    return messages.length > 0 ? messages[messages.length - 1] : undefined;
};

export const alwaysOnlineMessageExpirationThresholdInSeconds = 3600;
export const isAlwaysOnlineMessageExpired = (message: Message): boolean => {
    const currentTimestamp = getCurrentTime();
    return currentTimestamp - alwaysOnlineMessageExpirationThresholdInSeconds >= message.time_sent;
};

export const hasLatestAlwaysOnlineMessageExpired = (state: DefaultRootState): boolean => {
    try {
        const latest = getLatestAlwaysOnlineMessage(state);
        if (!latest) {
            return false;
        }
        return isAlwaysOnlineMessageExpired(latest);
    } catch (e) {
        ravenCaptureException(e);
        return false;
    }
};

export const isLastMessage24hOld = (state: DefaultRootState): boolean => {
    const currentMessages = getNonHiddenMessages(state);
    const hasMessages = currentMessages.length > 0;
    const lastMessageTimestamp = hasMessages
        ? currentMessages[currentMessages.length - 1].time_sent
        : 0;
    const oneDay = 24 * 60 * 60;
    const nowTimestamp = Math.floor(new Date().getTime() / 1000);
    return nowTimestamp - lastMessageTimestamp > oneDay;
};

export const isPreChatFilled = (state: DefaultRootState): boolean => state.preChat.isFilled;

export const isPreChatEnabledButNotFilled = (state: DefaultRootState): boolean => {
    const preChatFields = getPreChatFields(state.preChat.data, state.visitor);
    const preChatFilled = isPreChatFilled(state);
    return !preChatFilled && preChatFields.length !== 0;
};

export const getAwesomeIframe = (state: DefaultRootState): boolean =>
    state.isAwesomeIframe && state.sidebarIframeStyles === false;

export const getFlyMessage = (state: DefaultRootState): DefaultRootState['messageForFly'] =>
    state.messageForFly;

export const getConversationStarters = (
    state: DefaultRootState,
): DefaultRootState['conversationStarters'] => state.conversationStarters;

export const getOpenTab = (state: DefaultRootState): DefaultRootState['openTab'] => state.openTab;

export const getCanSendWelcomeMessage = (state: DefaultRootState): boolean => {
    const hasMessages = getNonHiddenMessages(state).length > 0;
    const lastMessage24hOld = isLastMessage24hOld(state);
    const isNewMessageDisabled = getIsNewMessageDisabled(state);

    return (!hasMessages || lastMessage24hOld) && !isNewMessageDisabled && !state.isMobile;
};

export const getIsConversationViewActive = (state: DefaultRootState): boolean => {
    const openTab = getOpenTab(state);
    const view = getView(state);

    return view === views.chat && openTab === 'conversations';
};

export const getDesignVersion = (state: DefaultRootState): DefaultRootState['designVersion'] =>
    state.designVersion;

export const getAllowClose = (state: DefaultRootState): DefaultRootState['allowClose'] =>
    state.allowClose;

export const getisPrivacyPolicyEnabled = (
    state: DefaultRootState,
): DefaultRootState['isPrivacyPolicyEnabled'] => state.isPrivacyPolicyEnabled;

export const getIsPrivacyPolicyDismissed = (
    state: DefaultRootState,
): DefaultRootState['isPrivacyPolicyDismissed'] => state.isPrivacyPolicyDismissed;

export const getShowBranding = (state: DefaultRootState): boolean =>
    state.showBranding && state.platform !== Platform.SHOPIFY;

/**
 * Whether the mobile hash is enabled
 * Can be modified using tidioChatApi.setFeatures({ mobileHash: false })
 */
export const getMobileHash = (state: DefaultRootState): boolean => state.mobileHash;

export const getPendingAttachments = (
    state: DefaultRootState,
): DefaultRootState['pendingAttachments'] => state.pendingAttachments;
