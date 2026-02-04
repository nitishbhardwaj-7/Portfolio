import {
    AI_ASSISTANT_NAME,
    MAX_PENDING_ATTACHMENTS,
    cloneDeep,
    defaultTidioIdentifyKeys,
    extractPublickeyFromScriptTag,
    filterTidioIdentifyData,
    getIsMobileByUserAgent,
    getSandboxParams,
    inferWidgetColor,
    isInPreviewMode,
    isInSandboxMode,
    platforms,
    truthy,
} from '../helpers';
import { getCurrentLanguageKey, setCurrentTranslations } from '../helpers/translations';
import { views } from '../helpers/views';
import { mergeAssignedOperatorsData } from './helpers/mergeAssignedOperatorsData';

import {
    allowedPreChatFieldTypes,
    createUploadedFileMessage,
    getPreChatFields,
    parseMessageFromSockets,
} from '../connection/parsers';
import { generateVisitorMetadata } from '../visitor';
import {
    ADD_EMOJI_TO_NEW_MESSAGE,
    ADD_MESSAGE,
    ADD_PENDING_ATTACHMENT,
    AI_ASSISTANT_IS_THINKING,
    ActionTypes,
    CLEAR_PENDING_ATTACHMENTS,
    CLOSE_IMAGE_POPUP,
    COMMENT_SATISFACTION_SURVEY,
    CREATE_TICKET_WHEN_OPERATORS_OFFLINE,
    DISABLE_BOT_ANIMATION,
    DISMISS_PRIVACY_POLICY,
    HIDE_ALERT,
    HIDE_HEADER,
    HIDE_MESSAGE,
    INITIALIZE_VISITOR_DATA,
    MARK_MESSAGES_AS_READ,
    MERGE_FETCHED_MESSAGES,
    MERGE_VISITOR,
    MERGE_VISITOR_DATA_FROM_IDENTIFY,
    OPEN_IMAGE_POPUP,
    OPERATOR_ASSIGNED_DEPARTMENT,
    OPERATOR_CHANGED_STATUS,
    OPERATOR_IS_TYPING_STATUS,
    OPERATOR_LEFT_CONVERSATION,
    OPERATOR_OPENED_CONVERSATION,
    OPERATOR_TRANSFERRED_CONVERSATION,
    PERSISTED_STATE_LOADED,
    RATE_CHAT_BOT,
    RATE_SATISFACTION_SURVEY,
    REMOVE_PENDING_ATTACHMENT,
    REPLACE_STATE_WITH_SAVED,
    SAVE_TIDIO_IDENTIFY_DATA,
    SEND_FILLED_ALWAYS_ONLINE_MESSAGE,
    SEND_FILLED_PRECHAT,
    SEND_MESSAGE_FROM_VISITOR,
    SEND_RATE_CONVERSATION_COMMENT,
    SET_AWESOME_IFRAME,
    SET_BLOCKED_MESSAGE,
    SET_BOT_STATUS,
    SET_CHAT_OPENED_STATE,
    SET_DEVICE_TYPE,
    SET_DISABLE_TEXT_INPUT,
    SET_DRAG_AND_DROP_STATUS,
    SET_FEATURES_FROM_API,
    SET_FLAG_SEND_MESSAGE_FROM_VISITOR,
    SET_IFRAME_MODAL,
    SET_IFRAME_VIEW,
    SET_MESSAGE_DISABLED_STATE,
    SET_MESSAGE_FOR_FLY,
    SET_NOTIFICATION_STATUS,
    SET_OPEN_TAB,
    SET_OPTION_DROPDOWN_VISIBILITY,
    SET_PAGE_VISIBLITY_STATUS,
    SET_PREVIEW_DATA,
    SET_PROJECT_STATUS,
    SET_RECONNECTION_ATTEMPT_COUNT,
    SET_SATISFACTION_SURVEY_CONFIG,
    SET_VIEW,
    SET_VISITOR_CURRENCY,
    SET_WIDGET_COLOR,
    SET_WIDGET_MOUNT_STATE,
    SHOW_ALERT,
    SHOW_OLDER_MESSAGES,
    SHOW_USER_DATA_MODAL,
    SUBMIT_FORM,
    TOGGLE_EMOJI_PANEL,
    UPDATE_ATTACHMENT,
    UPDATE_ATTACHMENT_LOADED_STATE,
    UPDATE_PENDING_ATTACHMENT_STATUS,
    VISITOR_MARK_MESSAGES_AS_READ,
    VISITOR_MESSAGE_DELIVERY_STATUS,
    VISITOR_REGISTER_IMPORT_DATA,
    VISITOR_UPDATE_DATA,
    setWidgetMountState,
} from './actions';
import filterAndTransformAvailableBots from './helper';
import { changeOperatorIdToFirstOperator, generateMessagesForOpenView } from './previewHelper';
import {
    getCanSendWelcomeMessage,
    getIntegrationPlatformsWithForcedConsent,
    getIsChatOnSite,
    getIsConversationViewActive,
    getIsMobile,
    getIsNewMessageDisabled,
    getNonHiddenMessages,
    isLastMessage24hOld,
} from './selectors';
import {
    DefaultRootState,
    IframeViews,
    Message,
    MobileButtonSize,
    PartialBy,
    Platform,
    PrechatUpdateData,
    RoutingRules,
    SidebarStyles,
    View,
    Visitor,
} from './typings';

const defaultRoutingRules: RoutingRules = {
    areEnabled: false,
    options: [],
};

export const defaultState: DefaultRootState = {
    reconnectAttemptCount: 0,
    previewMode: false,
    isMounted: false,
    isMobile: false,
    isProjectOnline: false,
    view: View.CLOSED,
    showOptionsDropdown: false,
    notificationSnoozed: false,
    messages: [],
    blockedMessage: null,
    unreadMessages: 0,
    preChat: {
        isFilled: false,
        data: null,
    },
    routingRules: defaultRoutingRules,
    selectedDepartment: null,
    operators: [],
    bots: [],
    getStartedActive: false,
    isBotActive: false,
    assignedOperators: [],
    assignedOperatorsData: [],
    operatorIsTyping: false, // false | operatorId: Number
    chatIframeStyles: {
        widgetPosition: 'right',
        iframeView: IframeViews.ONLY_BUBBLE,
        dimensions: null,
    },
    sidebarIframeStyles: false,
    hideWhenOffline: false,
    createTicketWhenOperatorsOffline: false,
    publicKey: extractPublickeyFromScriptTag(),
    tidioIdentifyData: false,
    tidioIdentifyChanged: false,
    visitor: {},
    widgetColor: ['#2a27da', '#00ccff', '#fff', '#004dff'],
    bannerImage: '',
    newMessageEmoji: null,
    isEmojiPanelVisible: false,
    sendVisitorMessageFlag: false,
    alert: {
        content: '',
        isVisible: false,
    },
    showBranding: true,
    // TODO: remove hideHeader after new skin is released
    hideHeader: false,
    mobileButtonSize: MobileButtonSize.LARGE,
    disableBotsButtonAnimation: false,
    widgetLabelStatus: false,
    mobileHash: true,
    allowAttachments: true,
    allowEmojis: true,
    showOldMessages: false,
    showMessagesButtonClickedTimestamp: null,
    isDragAndDropActive: false,
    showUserDataModal: false, // modalType {String} | false {Boolean} // modalType = prechat|alwaysOnline
    platform: Platform.OTHERS,
    isSoundEnabled: true,
    isPageVisible: true,
    isAwesomeIframe: false,
    popupImageSrc: '',
    messageForFly: null,
    disableTextInput: false,
    satisfactionSurvey: {},
    customBranding: '',
    customAvatar: '',
    prechatSubscriptionCheckboxDefaultValue: false,
    aiAssistant: false,
    aiAssistantName: AI_ASSISTANT_NAME,
    aiAssistantIsThinking: false,
    iframeModalUrl: null,
    designMode: false,
    conversationStarters: null,
    openTab: 'home',
    designVersion: 4,
    allowClose: true,
    visitorCurrencyData: {},
    isPrivacyPolicyDismissed: false,
    isPrivacyPolicyEnabled: false,
    pendingAttachments: [],
    /* keep it at the end for better visibility */
    version: 75, // increment this to rebuild state in savedState
};

let sourceOfFirstIsMounted: null | ReturnType<typeof setWidgetMountState>['source'] = null;

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function reducer(state = defaultState, action: ActionTypes): DefaultRootState {
    switch (action.type) {
        case INITIALIZE_VISITOR_DATA: {
            return {
                ...state,
                visitor: { ...action.visitorData },
            };
        }
        case PERSISTED_STATE_LOADED: {
            return {
                ...state,
                visitor: {
                    ...state.visitor,
                    ...generateVisitorMetadata(),
                },
            };
        }
        case REPLACE_STATE_WITH_SAVED: {
            // never replace state with saved state when in design mode
            if (action.state.designMode !== state.designMode) {
                return state;
            }
            // some properties should not be replaced as they are associated only with current widget instance
            return {
                ...action.state,
                visitor: {
                    ...action.state.visitor,
                    is_chat_on_site: state.visitor.is_chat_on_site,
                },
                isPageVisible: state.isPageVisible,
                designMode: state.designMode,
            };
        }
        case MERGE_VISITOR: {
            return {
                ...state,
                visitor: {
                    ...state.visitor,
                    id: action.visitorId,
                },
            };
        }
        case SAVE_TIDIO_IDENTIFY_DATA: {
            const { identifyData } = action;
            const filteredIdentifyData = filterTidioIdentifyData(identifyData);
            if (!filteredIdentifyData) {
                return state;
            }
            return {
                ...state,
                tidioIdentifyData: { ...state.tidioIdentifyData, ...filteredIdentifyData },
                tidioIdentifyChanged: true,
            };
        }
        case MERGE_VISITOR_DATA_FROM_IDENTIFY: {
            const { dataToMerge } = action;
            const { identifyData } = dataToMerge;
            const filteredIdentify = filterTidioIdentifyData(identifyData);
            const defaultsWithoutTags: PartialBy<typeof defaultTidioIdentifyKeys, 'tags'> =
                cloneDeep(defaultTidioIdentifyKeys);
            delete defaultsWithoutTags.tags;

            const withDefaults = { ...defaultsWithoutTags, ...filteredIdentify };
            return {
                ...state,
                visitor: {
                    ...state.visitor,
                    id: dataToMerge.id,
                    ...withDefaults,
                },
            };
        }
        case VISITOR_REGISTER_IMPORT_DATA: {
            const {
                popup: { position: desktopPosition, color_bg: colorBg } = {
                    position: 'right',
                    color_bg: ['#21dbdb'],
                },
                preform: prechatImportedData = false,
                routing_rules: routingRules = defaultRoutingRules,
                current_department_id: selectedDepartment,
                integrations = [],
                translations: importedTranslations,
                hide_when_offline: hideWhenOffline = false,
                create_ticket_when_all_agents_are_offline: createTicketWhenOperatorsOffline = false,
                sidebar = false,
                banner_image: bannerImage = '',
                showBranding = true,
                bots: availableBots = [],
                get_started_active: getStartedActive,
                widget_label_status: widgetLabelStatus,
                platform: platformTracked = '',
                widget_sound_enabled: isSoundEnabled,
                is_awesome_iframe: isAwesomeIframe = false,
                branding_logo_url: customBranding = '',
                widget_avatar_url: customAvatar = '',
                is_text_input_disabled: disableTextInput,
                ai_assistant: aiAssistant,
                ai_assistant_name: aiAssistantName,
                design_mode: designMode,
                conversation_starters: importedConversationStarters,
                design_version: designVersion,
                is_privacy_policy_enabled: isPrivacyPolicyEnabled = false,
            } = action.data.widget_data;

            const { position: mobilePosition, size: mobileWidgetSize } = action.data.widget_data
                .mobile
                ? action.data.widget_data.mobile
                : <const>{
                      position: 'right',
                      size: 125,
                  };
            const {
                unread_messages: unreadMessages,
                assigned_operators: assignedOperators = [],
                is_bot_active: isBotActive,
            } = action.data;
            const oldAssignedOperatorsData = state.assignedOperatorsData || [];
            const newAssignedOperatorsData = action.data.assigned_operators_data || [];
            const assignedOperatorsData = mergeAssignedOperatorsData(
                oldAssignedOperatorsData,
                newAssignedOperatorsData,
            );
            setCurrentTranslations(importedTranslations, state.visitor.lang || '');
            const mobile = getIsMobileByUserAgent();
            let widgetPosition: 'left' | 'right' = 'right';
            if (mobile) {
                widgetPosition = mobilePosition;
            } else {
                const desktopPositionValue =
                    desktopPosition.indexOf('-') > -1
                        ? desktopPosition.split('-')[1]
                        : desktopPosition;
                if (desktopPositionValue === 'left' || desktopPositionValue === 'right') {
                    widgetPosition = desktopPositionValue;
                }
            }

            let sidebarIframeStyles: false | SidebarStyles = false;
            if (!mobile && sidebar && sidebar.visible) {
                sidebarIframeStyles = {
                    position: sidebar.position,
                    color: sidebar.color,
                    fontColor: sidebar.fontColor || '#fff',
                };
            }
            const widgetColor = inferWidgetColor(colorBg);
            const isProjectOnline = action.data.project_status === 'online';
            const { operators = [] } = action.data;
            const mapedOperators = operators.map((operator) => ({
                id: operator.id,
                isOnline: operator.is_online,
                avatarSrc: operator.image,
            }));
            const { messages } = state;
            let preChatData = null;
            let isPreChatFilled = state.preChat.isFilled;
            const isPrechatDisabled = isInSandboxMode() && getSandboxParams()?.isPrechatDisabled;
            if (prechatImportedData && !isPrechatDisabled) {
                if (!prechatImportedData.display || prechatImportedData.fields?.length === 0) {
                    preChatData = null;
                } else {
                    preChatData = {
                        fields: prechatImportedData.fields,
                    };
                    const consentForcingPlatforms = getIntegrationPlatformsWithForcedConsent();
                    const integrationsFields = integrations.filter((integration) =>
                        consentForcingPlatforms.includes(integration.platform),
                    );
                    if (integrationsFields.length > 0) {
                        preChatData.fields.push({
                            type: 'signUpNewsletter',
                            value: integrationsFields.reduce<string[]>(
                                (acc, next) => [...acc, next.platform],
                                [],
                            ),
                        });
                    }
                }

                if (state.routingRules.areEnabled && !selectedDepartment) {
                    isPreChatFilled = false;
                }
            }
            let mobileButtonSize: MobileButtonSize;
            switch (mobileWidgetSize) {
                case 100:
                    mobileButtonSize = MobileButtonSize.MEDIUM;
                    break;
                case 75:
                    mobileButtonSize = MobileButtonSize.SMALL;
                    break;
                default:
                    mobileButtonSize = MobileButtonSize.LARGE;
                    break;
            }
            let platform;
            switch (platformTracked) {
                case platforms.shopify:
                    platform = Platform.SHOPIFY;
                    break;
                case platforms.wordpress:
                    platform = Platform.WORDPRESS;
                    break;
                default:
                    platform = Platform.OTHERS;
                    break;
            }

            const bots = isInSandboxMode() ? [] : filterAndTransformAvailableBots(availableBots);

            const currentLanguageKey = getCurrentLanguageKey();
            const conversationStarters =
                importedConversationStarters?.filter(
                    (conversationStarter) => conversationStarter.lang === currentLanguageKey,
                ) || importedConversationStarters;

            return {
                ...state,
                chatIframeStyles: {
                    ...state.chatIframeStyles,
                    widgetPosition,
                },
                sidebarIframeStyles,
                hideWhenOffline,
                createTicketWhenOperatorsOffline,
                unreadMessages,
                operators: mapedOperators,
                bots,
                getStartedActive,
                isBotActive,
                assignedOperators,
                assignedOperatorsData,
                widgetColor,
                bannerImage,
                isProjectOnline,
                messages,
                preChat: {
                    ...state.preChat,
                    isFilled: isPreChatFilled,
                    data: preChatData,
                },
                selectedDepartment,
                routingRules,
                showBranding,
                mobileButtonSize,
                widgetLabelStatus,
                platform,
                isSoundEnabled,
                isAwesomeIframe,
                isMobile: mobile,
                customBranding,
                customAvatar,
                disableTextInput,
                aiAssistant,
                aiAssistantName: aiAssistantName || state.aiAssistantName,
                designMode,
                conversationStarters,
                designVersion: designVersion === 5 ? 5 : 4,
                isPrivacyPolicyEnabled,
            };
        }
        case MERGE_FETCHED_MESSAGES: {
            const { lastMessageId, messagesToMerge } = action;
            let newMessages = cloneDeep(state.messages);
            if (lastMessageId) {
                const index = newMessages.findIndex(
                    (message) => message.idFromServer === lastMessageId,
                );
                if (index === -1) {
                    // there is no message in log from which we took id
                    const messagesToAdd = cloneDeep(messagesToMerge)
                        .map((messageFromSocket) =>
                            parseMessageFromSockets({
                                data: messageFromSocket,
                            }),
                        )
                        .filter(truthy);
                    newMessages = newMessages.concat(messagesToAdd);
                } else {
                    // message in log, but might not be the last
                    const messagesToAdd = cloneDeep(messagesToMerge)
                        .slice(1)
                        .map((messageFromSocket) =>
                            parseMessageFromSockets({ data: messageFromSocket }),
                        )
                        .filter(truthy);
                    newMessages = [...newMessages.slice(0, index + 1), ...messagesToAdd];
                }
            } else {
                newMessages = cloneDeep(messagesToMerge)
                    .map((messageFromSocket) =>
                        parseMessageFromSockets({ data: messageFromSocket }),
                    )
                    .filter(truthy);
            }

            const isConversationViewActive = getIsConversationViewActive(state);

            const operatorIdsAndNames: { id: number; name: string }[] = [];
            for (const message of messagesToMerge) {
                if (message.operator_id && message.operator_name) {
                    operatorIdsAndNames.push({
                        id: message.operator_id,
                        name: message.operator_name,
                    });
                }
            }

            const newAssignedOperatorsData = mergeAssignedOperatorsData(
                state.assignedOperatorsData,
                operatorIdsAndNames,
            );

            return {
                ...state,
                unreadMessages: isConversationViewActive ? 0 : state.unreadMessages,
                messages: newMessages,
                assignedOperatorsData: newAssignedOperatorsData,
            };
        }
        case SET_PROJECT_STATUS: {
            const isProjectOnline = action.status === 'online';
            return {
                ...state,
                isProjectOnline,
            };
        }
        case SET_WIDGET_MOUNT_STATE: {
            const { status: shouldMount, source } = action;
            // Store first source of widget mount state so we can catch if tidioChatApi.hide() call was made before mount state from websocket VISITOR_REGISTER_IMPORT_DATA callback
            // if so, then we do not want to show widget on VISITOR_REGISTER_IMPORT_DATA callback, rather on tidioChatApi.show() call
            if (sourceOfFirstIsMounted === null) {
                sourceOfFirstIsMounted = source;
            }
            let isMounted = shouldMount;
            if (
                sourceOfFirstIsMounted === 'tidioChatApi' &&
                !state.isMounted &&
                source === 'visitorRegister' &&
                shouldMount
            ) {
                isMounted = false;
            }
            const mobile = getIsMobile(state);
            let iframeView;
            const isChatOnSite = getIsChatOnSite(state);
            const canSendWelcomeMessage = getCanSendWelcomeMessage(state);
            let currentView = state.view;
            let { openTab } = state;
            if (isChatOnSite && (currentView === views.closed || currentView === views.fly)) {
                currentView = View.CHAT;
                openTab = 'home';
            }
            if (openTab === 'home' && !canSendWelcomeMessage) {
                openTab = 'conversations';
            }
            if (mobile && currentView === views.chat) {
                currentView = View.CLOSED;
            }

            if (currentView !== views.closed || isChatOnSite) {
                iframeView = IframeViews.CHAT_SIZE_1;
            } else if (state.sidebarIframeStyles) {
                iframeView = IframeViews.ONLY_SIDEBAR;
            } else {
                iframeView = IframeViews.ONLY_BUBBLE;
            }

            if (mobile) {
                if (currentView === views.chat) {
                    iframeView = IframeViews.MOBILE;
                    currentView = View.CHAT;
                } else if (currentView === views.fly) {
                    iframeView = IframeViews.DYNAMIC;
                } else if (state.sidebarIframeStyles) {
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

            return {
                ...state,
                isMounted,
                isMobile: mobile,
                chatIframeStyles: {
                    ...state.chatIframeStyles,
                    iframeView,
                },
                view: currentView,
                openTab,
            };
        }
        case SET_IFRAME_VIEW: {
            return {
                ...state,
                chatIframeStyles: {
                    ...state.chatIframeStyles,
                    iframeView: action.iframeView,
                    dimensions: action.dimensions,
                },
            };
        }
        case SET_WIDGET_COLOR: {
            return {
                ...state,
                widgetColor: action.color,
            };
        }
        case SET_CHAT_OPENED_STATE: {
            const shouldOpen = action.open;
            const lastMessage24hOld = isLastMessage24hOld(state);
            const isNewMessageDisabled = getIsNewMessageDisabled(state);
            const isConversationViewActive = getIsConversationViewActive(state);
            const nonHiddenMessagesCount = getNonHiddenMessages(state).length;
            const isAnyNewMessage =
                nonHiddenMessagesCount > 0 && (!lastMessage24hOld || state.unreadMessages > 0);
            if (!shouldOpen) {
                return {
                    ...state,
                    view: View.CLOSED,
                };
            }

            let openTab: 'home' | 'conversations' = 'conversations';
            if (!isNewMessageDisabled && !isAnyNewMessage) {
                openTab = 'home';
            }

            return {
                ...state,
                view: View.CHAT,
                unreadMessages: isConversationViewActive ? 0 : state.unreadMessages,
                openTab,
            };
        }
        case SET_OPTION_DROPDOWN_VISIBILITY: {
            return {
                ...state,
                showOptionsDropdown: action.visible,
            };
        }
        case SET_FLAG_SEND_MESSAGE_FROM_VISITOR: {
            return {
                ...state,
                sendVisitorMessageFlag: action.shouldSend,
            };
        }
        case SET_NOTIFICATION_STATUS: {
            return {
                ...state,
                notificationSnoozed: action.status,
            };
        }
        case OPERATOR_IS_TYPING_STATUS: {
            const { operatorIdOrStatus } = action;
            return {
                ...state,
                operatorIsTyping: operatorIdOrStatus,
            };
        }
        case ADD_MESSAGE: {
            const { isPageVisible } = state;
            const isConversationViewActive = getIsConversationViewActive(state);

            return {
                ...state,
                messages: state.messages.concat(action.message),
                unreadMessages:
                    isPageVisible && isConversationViewActive ? 0 : state.unreadMessages + 1,
                operatorIsTyping: false,
            };
        }
        case OPERATOR_ASSIGNED_DEPARTMENT: {
            const { departmentId } = action;
            const { isFilled } = state.preChat;
            const prechatFields = getPreChatFields(state.preChat.data, state.visitor as Visitor);

            // There is a specific situation here. When we do not have any fields
            // in the pre-chat other than the department selection and the operator
            // from VL will write to the visitor, we automatically assign the department
            // (then there is no point in displaying the prechat for the visitor and it can be hidden).
            if (prechatFields.length === 0 && !isFilled) {
                return {
                    ...state,
                    selectedDepartment: departmentId,
                    preChat: {
                        ...state.preChat,
                        isFilled: true,
                    },
                    showUserDataModal: false,
                };
            }

            return {
                ...state,
                selectedDepartment: departmentId,
            };
        }
        case OPERATOR_OPENED_CONVERSATION: {
            const { operatorId, operatorName } = action;
            return {
                ...state,
                assignedOperators: state.assignedOperators.concat(operatorId),
                assignedOperatorsData: mergeAssignedOperatorsData(state.assignedOperatorsData, [
                    {
                        id: operatorId,
                        name: operatorName,
                    },
                ]),
            };
        }
        case OPERATOR_LEFT_CONVERSATION: {
            const { operatorId } = action;
            const index = state.assignedOperators.indexOf(operatorId);
            const assignedOperators = cloneDeep(state.assignedOperators);
            assignedOperators.splice(index, 1);
            return {
                ...state,
                assignedOperators,
            };
        }
        case OPERATOR_TRANSFERRED_CONVERSATION: {
            const { targetOperatorId, targetOperatorName } = action.payload;
            return {
                ...state,
                assignedOperators: [targetOperatorId],
                assignedOperatorsData: mergeAssignedOperatorsData(state.assignedOperatorsData, [
                    {
                        id: targetOperatorId,
                        name: targetOperatorName,
                    },
                ]),
            };
        }
        case OPERATOR_CHANGED_STATUS: {
            const { operatorId, isOnline } = action;
            const operators = cloneDeep(state.operators).map((operator) => {
                if (operator.id === operatorId) {
                    return {
                        ...operator,
                        isOnline,
                    };
                }
                return operator;
            });
            return {
                ...state,
                operators,
            };
        }
        case SHOW_USER_DATA_MODAL: {
            const { modal } = action;
            return {
                ...state,
                showUserDataModal: modal,
            };
        }
        case SEND_FILLED_PRECHAT: {
            let visitorFieldsToUpdate: Partial<PrechatUpdateData> = {};
            allowedPreChatFieldTypes.forEach((field) => {
                const updateDataValue = action.updateData[field];
                if (typeof updateDataValue !== 'undefined') {
                    visitorFieldsToUpdate = {
                        [field]: updateDataValue,
                        ...visitorFieldsToUpdate,
                    };
                }
            });
            return {
                ...state,
                preChat: {
                    ...state.preChat,
                    isFilled: true,
                },
                visitor: {
                    ...state.visitor,
                    ...visitorFieldsToUpdate,
                },
                showUserDataModal: false,
            };
        }
        case SEND_FILLED_ALWAYS_ONLINE_MESSAGE: {
            const { email } = action;
            return {
                ...state,
                visitor: {
                    ...state.visitor,
                    email,
                },
                showUserDataModal: false,
            };
        }
        case CREATE_TICKET_WHEN_OPERATORS_OFFLINE: {
            const { email } = action;
            return {
                ...state,
                visitor: {
                    ...state.visitor,
                    email,
                },
                blockedMessage: null,
            };
        }
        case ADD_EMOJI_TO_NEW_MESSAGE: {
            return {
                ...state,
                newMessageEmoji: action.emoji,
                isEmojiPanelVisible: false,
            };
        }
        case TOGGLE_EMOJI_PANEL: {
            return {
                ...state,
                isEmojiPanelVisible: action.status,
            };
        }
        case SEND_MESSAGE_FROM_VISITOR: {
            // TODO: should have proper types after typing parsers.js
            // TODO tag as not delivered when adding to store but do not display it to user [DZIK-120]
            // TODO when we refresh page we would still have messages marked as not delivered and we could retry sending them
            const { payload } = action;
            payload.isDelivered = true;
            return {
                ...state,
                messages: state.messages.concat(payload),
                blockedMessage: null,
                openTab: 'conversations',
            };
        }
        case SUBMIT_FORM: {
            return {
                ...state,
                messages: state.messages.concat(action.message),
                blockedMessage: null,
            };
        }
        case ADD_PENDING_ATTACHMENT: {
            if (state.pendingAttachments.length >= MAX_PENDING_ATTACHMENTS) {
                return state;
            }
            return {
                ...state,
                pendingAttachments: [
                    ...state.pendingAttachments,
                    {
                        id: action.payload.id,
                        fileName: action.payload.file.name,
                        uploadStatus: 'uploading',
                    },
                ],
            };
        }
        case UPDATE_PENDING_ATTACHMENT_STATUS: {
            return {
                ...state,
                pendingAttachments: state.pendingAttachments.map((attachment) =>
                    attachment.id === action.payload.id
                        ? {
                              ...attachment,
                              uploadStatus: action.payload.status,
                              uploadedUrl: action.payload.uploadedUrl,
                              uploadedThumb: action.payload.uploadedThumb,
                              errorMessage: action.payload.errorMessage,
                          }
                        : attachment,
                ),
            };
        }
        case REMOVE_PENDING_ATTACHMENT: {
            const pendingAttachment = state.pendingAttachments.find(
                (attachment) => attachment.id === action.payload.id,
            );
            if (!pendingAttachment) {
                return state;
            }
            return {
                ...state,
                pendingAttachments: state.pendingAttachments.filter(
                    (attachment) => attachment.id !== action.payload.id,
                ),
            };
        }
        case CLEAR_PENDING_ATTACHMENTS: {
            return {
                ...state,
                pendingAttachments: [],
            };
        }
        case SET_BLOCKED_MESSAGE: {
            return {
                ...state,
                blockedMessage: action.message,
            };
        }
        case VISITOR_MESSAGE_DELIVERY_STATUS: {
            const newMessages = cloneDeep(state.messages);
            const index = newMessages.findIndex((message) => message.id === action.messageId);
            if (index === -1) {
                return state;
            }
            newMessages[index].isDelivered = action.status;
            newMessages[index].idFromServer = action.idFromServer;
            return {
                ...state,
                messages: newMessages,
            };
        }
        case UPDATE_ATTACHMENT: {
            const newMessages = cloneDeep(state.messages);
            const messageIndex = newMessages.findIndex((msg) => msg.id === action.messageId);
            if (messageIndex === -1) {
                return state;
            }

            newMessages[messageIndex].isHidden = true;

            const originalMessage = newMessages[messageIndex];
            const uploadedFileMessage = createUploadedFileMessage(
                originalMessage,
                action.url,
                action.name,
                action.extension,
                action.attachmentType,
                action.thumb,
                action.imageLoaded,
                action.messageId,
            );

            newMessages.splice(messageIndex + 1, 0, uploadedFileMessage);

            return {
                ...state,
                messages: newMessages,
            };
        }
        case UPDATE_ATTACHMENT_LOADED_STATE: {
            const newMessages = cloneDeep(state.messages);
            const message = newMessages.find((msg) => msg.id === action.messageId);
            if (!message) {
                return state;
            }
            message.imageLoaded = true;

            return {
                ...state,
                messages: newMessages,
            };
        }
        case SET_MESSAGE_DISABLED_STATE: {
            // rateConversation, rateConversationComment, alwaysOnlineMessage, messages with buttons
            const newMessages = cloneDeep(state.messages);
            let messageIds = action.messageIdOrArrayOfIds;
            if (!Array.isArray(messageIds)) {
                messageIds = [messageIds];
            }
            const allMessagesAvailable = (
                messages: Message[],
                indexes: Message['id'][],
            ): boolean => {
                for (let i = 0; i < indexes.length; i += 1) {
                    const index = messages.findIndex((message) => message.id === indexes[i]);
                    if (index === -1) {
                        return false;
                    }
                }
                return true;
            };
            if (!allMessagesAvailable(newMessages, messageIds)) {
                return state;
            }
            messageIds.forEach((messageId) => {
                const index = newMessages.findIndex((message) => message.id === messageId);
                newMessages[index].disabled = true;
            });
            return {
                ...state,
                messages: newMessages,
            };
        }
        case SET_BOT_STATUS: {
            const { isActive } = action;
            return {
                ...state,
                isBotActive: isActive,
            };
        }
        case SEND_RATE_CONVERSATION_COMMENT: {
            const newMessages = cloneDeep(state.messages);
            const index = newMessages.findIndex((message) => message.id === action.messageId);
            if (index === -1) {
                return state;
            }
            newMessages[index].disabled = true;
            newMessages[index].content = action.comment;
            return {
                ...state,
                messages: newMessages,
            };
        }
        case SET_VIEW: {
            const { view } = action;
            if (!Object.values(views).includes(view)) {
                return state;
            }
            const isConversationViewActive = getIsConversationViewActive(state);

            return {
                ...state,
                view,
                unreadMessages: isConversationViewActive ? 0 : state.unreadMessages,
            };
        }
        case VISITOR_UPDATE_DATA: {
            // keys filtered using filterTidioIdentifyData in sideEffectsMiddleware
            return {
                ...state,
                visitor: {
                    ...state.visitor,
                    ...action.updateData,
                },
            };
        }
        case SHOW_ALERT: {
            return {
                ...state,
                alert: {
                    isVisible: true,
                    content: action.message,
                },
            };
        }
        case HIDE_ALERT: {
            return {
                ...state,
                alert: {
                    ...state.alert,
                    isVisible: false,
                },
            };
        }
        case HIDE_MESSAGE: {
            const newMessages = cloneDeep(state.messages);
            const index = newMessages.findIndex((message) => message.id === action.messageId);
            if (index === -1) {
                return state;
            }
            newMessages[index].isHidden = true;
            return {
                ...state,
                messages: newMessages,
            };
        }
        case SET_PREVIEW_DATA: {
            // TODO: provide typings for preview data payload
            // Decided to not do it right now, it is only used for our preview purposes so nothing critical; -DM
            if (!isInPreviewMode()) {
                return state;
            }
            const { prop, payload } = action;
            if (prop === 'previewModeEnabled') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    previewMode: payload,
                };
            }
            if (prop === 'color') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    widgetColor: inferWidgetColor(payload),
                };
            }
            if (prop === 'position') {
                return {
                    ...state,
                    chatIframeStyles: {
                        ...state.chatIframeStyles,
                        // @ts-expect-error payload is unknown
                        widgetPosition: payload.indexOf('-') > -1 ? payload.split('-')[1] : payload,
                    },
                };
            }
            if (prop === 'operators') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    operators: payload,
                };
            }
            if (prop === 'translations') {
                // @ts-expect-error payload is unknown
                setCurrentTranslations(payload, 'en');
                return state;
            }
            if (prop === 'bannerImage') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    bannerImage: payload,
                };
            }
            if (prop === 'hideWhenOffline') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    hideWhenOffline: payload,
                };
            }
            if (prop === 'widgetLabelStatus') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    widgetLabelStatus: payload,
                };
            }
            if (prop === 'widgetSoundStatus') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    isSoundEnabled: payload,
                };
            }
            if (prop === 'chatOnSite') {
                return {
                    ...state,
                    visitor: {
                        ...state.visitor,
                        // @ts-expect-error payload is unknown
                        is_chat_on_site: payload,
                    },
                };
            }
            if (prop === 'sidebar') {
                let sidebarIframeStyles: false | SidebarStyles = false;
                const sidebar = action.payload;
                // @ts-expect-error payload is unknown
                if (sidebar?.visible) {
                    sidebarIframeStyles = {
                        // @ts-expect-error property does not exist on type {}
                        position: sidebar.position,
                        // @ts-expect-error property does not exist on type {}
                        color: sidebar.color,
                        // @ts-expect-error property does not exist on type {}
                        fontColor: sidebar.fontColor,
                    };

                    // Add proper iframe view update when sidebar changes
                    return {
                        ...state,
                        sidebarIframeStyles,
                        chatIframeStyles: {
                            ...state.chatIframeStyles,
                            iframeView:
                                state.view === View.CLOSED
                                    ? IframeViews.ONLY_SIDEBAR
                                    : state.chatIframeStyles.iframeView,
                        },
                    };
                }

                // When disabling sidebar, revert to appropriate view
                return {
                    ...state,
                    sidebarIframeStyles,
                    chatIframeStyles: {
                        ...state.chatIframeStyles,
                        iframeView:
                            state.view === View.CLOSED
                                ? IframeViews.ONLY_BUBBLE
                                : state.chatIframeStyles.iframeView,
                    },
                };
            }
            if (prop === 'messages') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    messages: payload === 'clear' ? [] : payload,
                };
            }
            if (prop === 'preChatData') {
                // @ts-expect-error payload is unknown
                if (!payload.status) {
                    return {
                        ...state,
                        preChat: {
                            ...state.preChat,
                            isFilled: false,
                            data: null,
                        },
                        showUserDataModal: false,
                    };
                }

                return {
                    ...state,
                    visitor: {
                        ...state.visitor,
                        name: '',
                        email: '',
                        phone: '',
                    },
                    preChat: {
                        ...state.preChat,
                        isFilled: false,
                        data: {
                            // @ts-expect-error payload is unknown
                            fields: payload.fields,
                        },
                    },
                };
            }

            if (prop === 'routingRules') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    routingRules: payload,
                };
            }

            if (prop === 'previewView') {
                const view = payload;
                let isProjectOnline = true;
                let { messages } = state;
                let widgetView: View = View.CHAT;
                let { visitor } = state;
                let { openTab } = state;
                if (view === 'home' || view === 'homeOffline') {
                    openTab = 'home';
                    widgetView = View.CHAT;
                } else if (view === 'gettingStarted') {
                    messages = [];
                    openTab = 'home';
                    widgetView = View.CHAT;
                } else if (view === 'preform') {
                    visitor = {
                        ...state.visitor,
                        name: '',
                        email: '',
                        phone: '',
                    };
                } else if (view === 'closed') {
                    widgetView = View.CLOSED;
                } else if (view === 'fly') {
                    widgetView = View.FLY;
                } else {
                    openTab = 'conversations';
                    messages = changeOperatorIdToFirstOperator(
                        generateMessagesForOpenView(),
                        state.operators[0].id,
                    );
                }
                let assignedOperators = [state.operators[0].id];
                if (
                    view === 'operatorsOffline' ||
                    view === 'operatorsOfflineModal' ||
                    view === 'homeOffline'
                ) {
                    isProjectOnline = false;
                    assignedOperators = [];
                }

                return {
                    ...state,
                    isProjectOnline,
                    messages,
                    blockedMessage: null,
                    assignedOperators,
                    visitor,
                    view: widgetView,
                    openTab,
                    showUserDataModal: false,
                };
            }
            if (prop === 'messageForFly') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    messageForFly: payload,
                };
            }
            if (prop === 'showBranding') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    showBranding: payload,
                };
            }
            if (prop === 'customBranding') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    customBranding: payload,
                };
            }
            if (prop === 'customAvatar') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    customAvatar: payload,
                };
            }
            if (prop === 'conversationStarters') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    conversationStarters: payload,
                };
            }
            if (prop === 'designVersion') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    designVersion: payload,
                };
            }
            if (prop === 'isPrivacyPolicyEnabled') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    isPrivacyPolicyEnabled: payload,
                };
            }
            if (prop === 'platform') {
                return {
                    ...state,
                    // @ts-expect-error payload is unknown
                    platform: payload,
                };
            }
            return state;
        }
        case HIDE_HEADER: {
            return {
                ...state,
                hideHeader: action.status,
            };
        }
        case DISABLE_BOT_ANIMATION: {
            return {
                ...state,
                disableBotsButtonAnimation: action.status,
            };
        }
        case SET_FEATURES_FROM_API: {
            // keys filtered using filterApiFeatures in sideEffectsMiddleware
            return {
                ...state,
                ...action.features,
            };
        }
        case SHOW_OLDER_MESSAGES: {
            return {
                ...state,
                showOldMessages: action.status,
                showMessagesButtonClickedTimestamp: Math.floor(Date.now() / 1000),
            };
        }
        case SET_DRAG_AND_DROP_STATUS: {
            return {
                ...state,
                isDragAndDropActive: action.status,
            };
        }
        case SET_PAGE_VISIBLITY_STATUS: {
            return {
                ...state,
                isPageVisible: action.status,
            };
        }
        case VISITOR_MARK_MESSAGES_AS_READ:
        case MARK_MESSAGES_AS_READ: {
            return {
                ...state,
                unreadMessages: 0,
            };
        }
        case SET_AWESOME_IFRAME: {
            return {
                ...state,
                isAwesomeIframe: action.status,
            };
        }
        case OPEN_IMAGE_POPUP: {
            return {
                ...state,
                popupImageSrc: action.image,
            };
        }
        case CLOSE_IMAGE_POPUP: {
            return {
                ...state,
                popupImageSrc: '',
            };
        }
        case SET_IFRAME_MODAL: {
            return {
                ...state,
                iframeModalUrl: action.url,
            };
        }
        case SET_MESSAGE_FOR_FLY: {
            return {
                ...state,
                messageForFly: action.message,
            };
        }
        case RATE_CHAT_BOT: {
            const newMessages = cloneDeep(state.messages);
            const index = newMessages.findIndex((message) => message.id === action.messageId);
            if (index === -1) {
                return state;
            }
            newMessages[index].rating = action.rating;
            return {
                ...state,
                messages: newMessages,
            };
        }
        case SET_RECONNECTION_ATTEMPT_COUNT: {
            return {
                ...state,
                reconnectAttemptCount: action.count,
            };
        }
        case SET_DISABLE_TEXT_INPUT: {
            return {
                ...state,
                disableTextInput: action.status,
            };
        }
        case SET_SATISFACTION_SURVEY_CONFIG: {
            return {
                ...state,
                satisfactionSurvey: {
                    ...state.satisfactionSurvey,
                    [action.threadId]: {
                        ...action.config,
                        threadSource: action.threadSource,
                        messageId: action.messageId,
                    },
                },
            };
        }
        case RATE_SATISFACTION_SURVEY: {
            return {
                ...state,
                satisfactionSurvey: {
                    ...state.satisfactionSurvey,
                    [action.threadId]: {
                        ...state.satisfactionSurvey[action.threadId],
                        response: {
                            ...state.satisfactionSurvey[action.threadId].response,
                            rating: action.rating,
                        },
                    },
                },
            };
        }
        case COMMENT_SATISFACTION_SURVEY: {
            return {
                ...state,
                satisfactionSurvey: {
                    ...state.satisfactionSurvey,
                    [action.threadId]: {
                        ...state.satisfactionSurvey[action.threadId],
                        response: {
                            ...state.satisfactionSurvey[action.threadId].response,
                            comment: action.comment,
                        },
                    },
                },
            };
        }
        case AI_ASSISTANT_IS_THINKING: {
            return {
                ...state,
                aiAssistantIsThinking: action.status,
            };
        }
        case SET_OPEN_TAB: {
            return {
                ...state,
                openTab: action.openTab,
            };
        }
        case SET_VISITOR_CURRENCY: {
            return {
                ...state,
                visitorCurrencyData: action.currencyData,
            };
        }
        case SET_DEVICE_TYPE: {
            return {
                ...state,
                isMobile: action.deviceType === 'mobile',
            };
        }
        case DISMISS_PRIVACY_POLICY: {
            return {
                ...state,
                isPrivacyPolicyDismissed: true,
            };
        }
        default: {
            return state;
        }
    }
}
