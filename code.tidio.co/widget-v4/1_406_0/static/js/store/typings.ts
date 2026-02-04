import { CSSProperties } from 'react';

import { Middleware, compose } from 'redux';

import { trackingEvents } from './activityTrackingHelpers';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type DefaultRootState = {
    version: number;
    reconnectAttemptCount: number;
    previewMode: boolean;
    isMounted: boolean;
    isMobile: boolean;
    isProjectOnline: boolean;
    view: View;
    showOptionsDropdown: boolean;
    notificationSnoozed: boolean;
    messages: Message[];
    blockedMessage: string | null;
    unreadMessages: number;
    preChat: PrechatData;
    selectedDepartment: number | null;
    routingRules: RoutingRules;
    operators: {
        id: Operator['id'];
        avatarSrc: Operator['avatarSrc'];
        isOnline: Operator['isOnline'];
    }[];
    bots: Bot[];
    getStartedActive: boolean;
    isBotActive: boolean;
    assignedOperators: number[];
    assignedOperatorsData: {
        id: Operator['id'];
        name: Operator['name'];
    }[];
    operatorIsTyping: Operator['id'] | boolean;
    chatIframeStyles: {
        widgetPosition: 'left' | 'right';
        iframeView: IframeViews | DynamicIframeView;
        dimensions: IframeViewDimensions;
    };
    sidebarIframeStyles: false | SidebarStyles;
    hideWhenOffline: boolean;
    createTicketWhenOperatorsOffline: boolean;
    publicKey: string | false;
    tidioIdentifyData: false | TidioIdentify;
    tidioIdentifyChanged: boolean;
    visitor: Visitor | Partial<Visitor>;
    widgetColor: WidgetColor;
    bannerImage: string;
    newMessageEmoji: null | string;
    isEmojiPanelVisible: boolean;
    sendVisitorMessageFlag: boolean;
    alert: { content: string; isVisible: boolean };
    showBranding: boolean;
    // TODO: remove hideHeader after new skin is released
    hideHeader: boolean;
    mobileButtonSize: MobileButtonSize;
    disableBotsButtonAnimation: boolean;
    showOldMessages: boolean;
    showMessagesButtonClickedTimestamp: number | null;
    isDragAndDropActive: boolean;
    showUserDataModal: ModalType | false;
    platform: Platform;
    isSoundEnabled: boolean;
    isPageVisible: boolean;
    isAwesomeIframe: boolean;
    popupImageSrc: string;
    messageForFly: Message | null;
    disableTextInput: boolean;
    satisfactionSurvey: Record<number, SatisfactionSurveyConfig>;
    customAvatar: string;
    aiAssistant: boolean;
    aiAssistantName: string;
    aiAssistantIsThinking: boolean;
    iframeModalUrl: string | null;
    designMode: boolean;
    conversationStarters: ConversationStarter[] | null;
    openTab: 'home' | 'conversations';
    designVersion: 4 | 5;
    visitorCurrencyData: VisitorCurrencyData;
    isPrivacyPolicyEnabled: boolean;
    isPrivacyPolicyDismissed: boolean;
    pendingAttachments: PendingAttachment[];
} & AllowedApiFeatures;

export type PendingAttachment = {
    id: string;
    uploadStatus: 'uploading' | 'uploaded' | 'error';
    fileName?: string;
    uploadedUrl?: string;
    uploadedThumb?: string;
    errorMessage?: string;
};

export type ConversationStarter = {
    id: number;
    action: 'redirect_to_operator' | 'run_flow' | 'run_lyro';
    answer: string;
    isActive: 0 | 1;
    flowId: number | null;
    lang: string;
};

export enum Platform {
    SHOPIFY = 'shopify',
    WORDPRESS = 'wordpress',
    OTHERS = 'others',
}
export type ModalType = 'prechat' | 'alwaysOnline' | 'createTicket';

export enum MobileButtonSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export type Visitor = {
    id: string;
    originalVisitorId: string;
    distinct_id: null | string | number;
    country: null | string;
    name: string;
    city: null | string;
    browser_session_id: string;
    created: number;
    email: string;
    project_public_key: string | false;
    phone: string;
} & VisitorMetadata &
    Partial<Pick<PrechatUpdateData, 'emailConsent' | 'gdprConsent' | 'signUpNewsletter'>>;

export type TidioIdentify = {
    distinct_id?: string | number;
    name?: string;
    email?: string;
    phone?: string;
    tags?: string[];
};

export interface SidebarStyles {
    position: 'left' | 'right';
    color: string;
    fontColor: string;
}

export enum IframeViews {
    ONLY_BUBBLE = 'onlyBubble',
    ONLY_BUBBLE_SMALL = 'onlyBubbleSmall',
    ONLY_BUBBLE_MEDIUM = 'onlyBubbleMedium',
    ONLY_BUBBLE_LARGE = 'onlyBubbleLarge',
    ONLY_SIDEBAR = 'onlySidebar',
    BUBBLE_WITH_LABEL = 'bubbleWithLabel',
    CHAT_SIZE_1 = 'chatSize1',
    CHAT_SIZE_2 = 'chatSize2',
    CHAT_SIZE_3 = 'chatSize3',
    MOBILE = 'mobile',
    DYNAMIC = 'dynamic',
}

export type DynamicIframeView =
    | `dynamic${number}_${number}`
    | `dynamic${string}_100%`
    | `dynamic${number}_100%`;

export type IframeViewDimensions = Record<'width' | 'height', number | string> | null;

export interface Bot {
    triggerId: number;
    displayName: string;
    offlineDisabled: boolean;
    botAppIds: string[];
}

export interface Operator {
    id: number;
    name: string;
    avatarSrc: null | string;
    isOnline: boolean;
}

export enum View {
    CLOSED = 'closed',
    FLY = 'fly',
    CHAT = 'chat',
}

interface ImageMessage {
    imageLoaded: boolean;
    thumb: string;
    file: File | string;
    extension: string;
    attachmentType: 'image' | 'file';
    name: string;
}

export type SurveyScales = 'emotes';
type SurveyScaleValue = { value: string; rating: number };
export type SurveyValues = SurveyScaleValue[];

export interface Card {
    id: number;
    title: string;
    proxyUrl: null | string;
    position: number;
    imageUrl?: string;
    subtitle?: string;
    buttons: DecisionButton[];
    url?: string;
}

export interface DecisionButton {
    type: 'action' | 'url';
    payload: string;
    title: string;
    chatBotId?: number;
    url?: string;
    cardClicked?: string;
}

interface PrechatData {
    isFilled: boolean;
    data: null | { fields: PrechatField[] };
}

export type PrechatField =
    | { type: 'email' | 'name' | 'phone' | 'gdprConsent' | 'firstmsg'; value: string }
    | { type: 'emailConsent'; value: boolean }
    | { type: 'signUpNewsletter'; value: string[] };

export interface RoutingRules {
    areEnabled: boolean;
    options: RoutingRule[];
}

export type RoutingRule = {
    id: number;
    departmentId: number;
    alias: string;
    position: number;
};

export interface PrechatUpdateData {
    email: string;
    name: string;
    phone: string;
    gdprConsent: string;
    signUpNewsletter: boolean;
    emailConsent: {
        value: 'subscribed' | 'unsubscribed';
        date: number;
        setBy: 'user' | 'operator';
    };
    firstmsg: string;
}

export interface PrechatMessage {
    preChatFields: (
        | {
              type: 'email' | 'name' | 'phone' | 'gdprConsent';
              value?: string;
              placeholder: string;
          }
        | { type: 'emailConsent'; value?: PrechatUpdateData['emailConsent']; placeholder: string }
    )[];
}

export type PrechatModalField =
    | { type: 'phone' | 'email' | 'name'; placeholder: string; value?: string }
    | { type: 'gdprConsent' | 'emailConsent'; placeholder: string; value?: boolean };

export type RateConversationCommentMessage = Message & {
    isRateGood: boolean;
};

export interface SurveyMessage {
    threadId: number;
    messageId: number;
    threadSource: 'conversation' | 'aiAssistant';
}

export interface SatisfactionSurveyConfig extends Partial<SurveyMessage> {
    commentQuestion: string;
    endMessage: string;
    rateQuestion: string;
    scaleType: SurveyScales;
    response: {
        rating: number | null;
        comment: string | null;
    };
}

export enum FormFieldType {
    EMAIL = 'email',
    TEXT = 'text',
    LONG_TEXT = 'long-text',
    NUMBER = 'number',
    NAME = 'name',
    PHONE = 'phone',
    URL = 'url',
    SELECT = 'select',
    MULTISELECT = 'multiselect',
    CHECKBOX = 'checkbox',
    FILE = 'file',
}

export interface FormMessageField {
    id: string;
    name: string;
    type: FormFieldType;
    required: boolean;
    contact_property: string | null;
    choices?: { name: string }[]; // choices available for FormFieldType.SELECT/MULTISELECT type
}

export interface IframeField {
    title: string;
    subtitle: string;
    buttons: DecisionButton[];
}

export interface RecommendedProduct {
    id: number;
    title: string;
    url: string;
    imageUrl: string | null;
    price: number;
    currency: string;
    variants: {
        id: number;
        title: string;
        price: number;
        currency: string;
    }[];
}

export interface RecommendedProductsField {
    title: string;
    buttonPayload: string;
    products: RecommendedProduct[];
}

export type Message = {
    id: string;
    type: MessageType;
    content: string;
    sender: MessageSender;
    time_sent: number;
    ratingId?: string | null;
    rating?: 'yes' | 'no';
    disabled?: boolean;
    // messages should never be removed from the conversation, only hidden
    isHidden?: boolean;
    quickReplies?: QuickReply[];
    idFromServer?: number | null;
    isDelivered?: boolean;
    operator_id?: number | null;
    isWaitingForAnswer?: boolean;
    isAIAssistant?: boolean;
    cards?: Card[];
    buttons?: DecisionButton[];
    couponCode?: string;
    url?: string;
    disableTextInput?: boolean;
    satisfactionSurvey?: SatisfactionSurveyConfig;
    chat_bot_name?: string;
    chatBotId?: number;
    form?: FormMessageField[];
    formResponse?: FilledFormField[];
    iframe?: IframeField;
    recommendedProducts?: RecommendedProductsField;
    aiAssistantResponseType?: 'answer_generated' | 'knowledge_missing' | 'error';
    questionMessageId?: number;
    aiAssistantTask?: boolean;
    hasAiAssistantAnswerSources?: boolean;
    aiAssistantActionLogId?: number;
    // Links uploaded file message to its original uploading message
    originalMessageId?: string;
} & Partial<ImageMessage> &
    Partial<PrechatMessage> &
    Partial<SurveyMessage>;

export type FileFormFieldValue = {
    name: string;
    url: string;
    extension: string;
};

export type FormFieldValue = string | boolean | FileFormFieldValue[];
export interface FilledFormField {
    name: string;
    value: FormFieldValue;
    id: string;
}

export interface FormResponseMessage {
    formResponse: FilledFormField[];
}

export type UploadMessage = Message & {
    attachmentType: AttachmentType;
    name: string;
    extension: string;
    content: string;
    thumb: string;
    file?: File;
    imageLoaded: boolean;
};

export type AttachmentType = 'image' | 'file';

export enum MessageType {
    TEXT = 'text',
    PRECHAT = 'preChat',
    RATE_CONVERSATION = 'rateConversation',
    ALWAYS_ONLINE = 'alwaysOnline',
    RATE_COMMENT_GOOD = 'rateConversationCommentRateWasGood',
    RATE_COMMENT_BAD = 'rateConversationCommentRateWasBad',
    UPLOADING_FILE = 'uploadingFile',
    UPLOADED_FILE = 'uploadedFile',
    CARD_GALLERY = 'cardGallery',
    BUTTONS = 'buttons',
    COUPON_CODE = 'couponCode',
    SYSTEM = 'system',
    CONVERSATION_MARKED_AS_SOLVED = 'conversationMarkedAsSolved',
    AUTOMATIC_SURVEY = 'rateAutomaticSurvey',
    AUTOMATIC_SURVEY_RATED = 'ratedAutomaticSurvey',
    AUTOMATIC_SURVEY_COMMENTED = 'commentAutomaticSurvey',
    CREATE_TICKET_SUCCESS = 'createTicketSuccess',
    FORM = 'form',
    FORM_RESPONSE = 'formResponse',
    IFRAME = 'iframe',
    RECOMMENDED_PRODUCTS = 'recommendedProducts',
}

export type AutomaticSurveyMessages =
    | MessageType.AUTOMATIC_SURVEY
    | MessageType.AUTOMATIC_SURVEY_RATED
    | MessageType.AUTOMATIC_SURVEY_COMMENTED;

export enum MessageSender {
    OPERATOR = 'operator',
    VISITOR = 'visitor',
    BOT = 'bot',
    SYSTEM = 'system',
    LOG = 'log',
}

export interface QuickReply {
    type: QuickReplyType;
    title: string;
    payload: string;
    url?: string;
    chatBotId?: number;
}

type QuickReplyType = 'text' | 'bot' | 'url' | 'action';
type TrackingEventKeys = keyof typeof trackingEvents;

export type TrackingEvent = (typeof trackingEvents)[TrackingEventKeys];

export type VisitorWidgetPositionParams = {
    initialX: number;
    initialY: number;
};

export type ShopifyOrderCreatedParams = {
    customerId: number;
    orderId: number;
};

export type ShopifyCartTokenUpdatedParams = {
    cartToken: string;
};

export type ShopifyCheckoutCreatedParams = {
    checkoutToken: string;
};

interface AllowedApiFeatures {
    mobileHash: boolean;
    widgetLabelStatus: boolean;
    allowAttachments: boolean;
    customBranding: string;
    prechatSubscriptionCheckboxDefaultValue: boolean;
    allowClose: boolean;
    allowEmojis: boolean;
}
export type ApiFeatures = Partial<AllowedApiFeatures>;

export type VisitorDataUpdate = Omit<TidioIdentify, 'distinct_id'> & {
    properties?: Record<string, string | number | boolean>;
};

export interface SocketMessagePayload {
    id: string;
    type: 'text' | 'bot';
    sender: MessageSender;
    isDelivered: boolean;
    url: string;
}

export interface VisitorMetadata {
    ip: null | string;
    lang: string;
    browser: Browser['name'];
    browser_version: Browser['version'];
    url: string;
    refer: Window['document']['referrer'];
    os_name: string;
    os_version: string;
    screen_width: Window['screen']['width'];
    screen_height: Window['screen']['height'];
    user_agent: Window['navigator']['userAgent'];
    timezone: string;
    mobile: boolean;
    is_chat_on_site: boolean;
    /**
     * navigator.webdriver with obfuscated value so it's not picked up by simple static analysis tools
     * values:
     * u: unknown
     * t: false
     * f: true
     * e: error
     * m: mangled
     */
    wd: 'u' | 't' | 'f' | 'e' | 'm';
}

export enum UrlMatch {
    EXACT = 'exact',
    PARTIAL = 'partial',
}

export type ScrollPercentageValues = 10 | 25 | 50 | 75;

export type BotData = {
    type: string;
    trigger_id: number;
    payload?: {
        disabled?: boolean;
        position?: number;
        offline_disabled: boolean;
        display_name: string;
        bot_app_ids: string[];
        url?: string;
        match?: UrlMatch;
        percentage?: ScrollPercentageValues;
    };
};

export type VisitorRegisterWidgetData = {
    cache_hash: null | string;
    popup: { position: string; color_bg: string[] };
    mobile: { position: 'left' | 'right'; size: number } | null;
    preform: false | { display: boolean; fields: PrechatField[] };
    routing_rules: RoutingRules;
    current_department_id: number | null;
    integrations: { id: number; platform: IntegrationPlatform }[];
    translations: { lang: string; data: Record<string, string>; isDefault: 0 | 1 }[];
    hide_when_offline: DefaultRootState['hideWhenOffline'];
    create_ticket_when_all_agents_are_offline: DefaultRootState['createTicketWhenOperatorsOffline'];
    sidebar:
        | false
        | {
              visible: boolean;
              position: 'left' | 'right';
              color: string;
              fontColor: string | undefined;
          };
    banner_image: DefaultRootState['bannerImage'];
    showBranding: DefaultRootState['showBranding'];
    bots: BotData[];
    get_started_active: DefaultRootState['getStartedActive'];
    widget_label_status: DefaultRootState['widgetLabelStatus'];
    platform: string;
    widget_sound_enabled: DefaultRootState['isSoundEnabled'];
    is_awesome_iframe: DefaultRootState['isAwesomeIframe'];
    branding_logo_url?: DefaultRootState['customBranding'];
    widget_avatar_url?: DefaultRootState['customAvatar'];
    automations: unknown[];
    tracking: {
        generic: Record<string, unknown>;
        platform_tracked: string;
    };
    is_text_input_disabled: boolean;
    ai_assistant: boolean;
    ai_assistant_name: null | string;
    design_mode: boolean;
    conversation_starters: ConversationStarter[] | null;
    is_privacy_policy_enabled: boolean;
} & NotUsedWidgetData;

/**
 * This data is not used in the widget, but it's still sent by the server frequently
 * do not rely on these
 */
type NotUsedWidgetData = Partial<{
    addons: unknown;
    departments: unknown;
    timezone: string;
    display: unknown;
    offline: unknown;
    image: unknown;
    design_version: number;
    install: unknown;
    opening_hours: unknown;
    welcome_message: unknown;
    chat_on_site_background: unknown;
    chat_on_site_logo: unknown;
    always_online: unknown;
    chat_on_site: unknown;
}>;

export interface VisitorRegisterImportData extends Record<string, unknown> {
    unread_messages: DefaultRootState['unreadMessages'];
    assigned_operators: DefaultRootState['assignedOperators'];
    assigned_operators_data: {
        id: Operator['id'];
        name: Operator['name'];
    }[];
    is_bot_active: DefaultRootState['isBotActive'];
    project_status: 'online' | 'offline';
    widget_data: VisitorRegisterWidgetData;
    connection_uuid?: string;
    operators: {
        id: Operator['id'];
        is_online: Operator['isOnline'];
        image: Operator['avatarSrc'];
        last_seen?: number;
    }[];
    visitor_status?: string;
}

export enum Os {
    UNKNOWN = 'unknown',
    WINDOWS = 'Windows',
    ANDROID = 'Android',
    IOS = 'iOS',
    OSX = 'OS X',
    UNIX = 'Unix',
    LINUX = 'Linux',
}

export interface GetOsReturnData {
    name: Os;
    version: '';
}

type SingleWidgetColor = Exclude<CSSProperties['color'], undefined>;

export type WidgetColor = [
    SingleWidgetColor,
    SingleWidgetColor,
    SingleWidgetColor,
    SingleWidgetColor,
];

export type Browser = {
    name: string;
    version: number;
};

export type BrowserNames = 'chrome' | 'firefox' | 'safari' | 'mobile safari' | 'opera' | 'ie'; // there are more

export type ParsedUrl = {
    protocol: string;
    host: string;
    pathname: string;
    search: string;
    hash: string;
} | null;

export type AiAssistantSandboxGuidance = {
    id?: string;
    prompt: string | null;
    subType?: 'toneOfVoice' | null;
    template?: 'neutral' | 'formal' | 'friendly' | null;
    type: 'communication' | 'handoff' | 'other';
};

export interface CustomDocument extends Document {
    tidioLocationURL?: string;
    tidioChatTestingMode?: boolean;
    tidioChatPreviewMode?: boolean;
    tidioSandbox?: {
        automationId?: number;
        aiAssistantSandboxTriggerId?: number;
        aiAssistantSandboxActionId?: string;
        aiAssistantSandboxGuidance?: AiAssistantSandboxGuidance;
        timeout?: number;
        isPrechatDisabled?: boolean;
        isLyroPlayground?: boolean;
    };
    tidioChatPreviewModeData?: {
        isInTour: boolean;
        preMiddleware: Middleware;
        preformData?: unknown;
        routingRules?: unknown;
        operators?: unknown;
        color?: unknown;
        bannerImage?: unknown;
        translations?: {
            lang: string;
            data: Record<string, unknown>;
        }[];
        sidebar?: unknown;
        messages?: unknown;
        previewView?: unknown;
        hideWhenOffline?: unknown;
        widgetLabelStatus?: unknown;
        widgetSoundStatus?: unknown;
        chatOnSite?: unknown;
        messageForFly?: unknown;
        showBranding?: unknown;
        customBranding?: unknown;
        customAvatar?: unknown;
        conversationStarters?: unknown;
        designVersion?: unknown;
        isPrivacyPolicyEnabled?: unknown;
        platform?: unknown;
    };
    tidioChatOnSite?: boolean;
    tidioChatLang?: string;
    tidioIdentify?: Record<string, string>;
}

export type ParentWindow = typeof window & {
    document: CustomDocument;
    Shopify?: {
        designMode?: boolean;
        currency: {
            active: string;
            rate: string;
        };
    };
};

interface TidioChatApiTrigger {
    (type: 'ready'): void;
    (
        type: 'messageFromVisitor',
        data: {
            message: string;
            fromBot: boolean;
            type: 'upload' | 'text' | 'satisfaction_survey_rating';
        },
    ): void;
    (type: 'messageFromOperator', data: { message: string; fromBot: boolean }): void;
    (type: 'headerCloseHover', data: { type: 'on' | 'off' }): void;
    (type: 'addAnswerClicked', data: { content?: string }): void;
    (
        type: 'resize',
        data: { width: string | number; height: string | number; iframe: Element | null },
    ): void;
    (type: 'addAnswerDisplayed'): void;
    (
        type: 'reviewSourcesClicked',
        data: {
            questionMessageId: number;
            messageId: Message['idFromServer'];
            aiAssistantActionLogId: Message['aiAssistantActionLogId'];
        },
    ): void;
    (type: 'reviewSourcesDisplayed'): void;
    (type: 'beforeOpen'): void;
    (type: 'beforeClose'): void;
    (type: 'open'): void;
    (type: 'close'): void;
    (type: 'popUpShow'): void;
    (type: 'popUpHide'): void;
    (type: 'conversationStart'): void;
    (type: 'setStatus', data: { setStatus: 'online' | 'offline' }): void;
    (type: 'preFormFilled', data: { form_data: Partial<PrechatUpdateData> }): void;
}

export interface CustomWindow extends Window {
    ResizeObserver?: typeof ResizeObserver;
    MutationObserver?: typeof MutationObserver;
    parent: ParentWindow;
    document: CustomDocument;
    tidioChatApi?: {
        open: () => void;
        track: (
            eventName: string,
            eventData?: unknown,
            successCallback?: () => void | undefined,
        ) => void;
        on: (event: 'ready' | 'open', callback: () => void) => void;
        display: (shouldBeVisible: boolean) => void;
        trigger: TidioChatApiTrigger;
    };
    onpushstate?: (args: unknown) => void;
    FIRST_POSSIBLE_JS_EXECUTION?: number;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

export interface HistoryImportedMessageFromSockets extends MessageFromSockets {
    operator_name: string;
}

export interface MessageFromSockets {
    id: number;
    project_public_key: string;
    channel: 'chat';
    type: MessageSender;
    visitor_id: string;
    operator_id: number | null;
    auto: '0' | '1';
    time_sent: number;
    is_waiting_for_answer: boolean;
    is_ai_assistant: boolean;
    bot_id: null | string | number;
    chat_bot_name?: string;
    chat_bot_id?: number;
    message: {
        type: MessageFromSocketType;
        message: string;
        quick_replies: QuickReply[];
        cards?: Card[];
        buttons?: DecisionButton[];
        couponCode?: {
            couponCode: string;
        };
        satisfactionSurvey: SatisfactionSurveyConfig;
        form?: {
            form: FormMessageField[];
            text: string;
        };
        formResponse?: FilledFormField[];
        iframe?: IframeField;
        recommendedProducts?: RecommendedProductsField;
    };
    metadata?: {
        ai_assistant_response_type?: 'answer_generated' | 'knowledge_missing' | 'error';
        question_message_id?: number;
        is_ai_assistant_task?: boolean;
        has_ai_assistant_answer_sources?: boolean;
        ai_assistant_action_state_id?: number;
    };
    rating_id?: string | null;
    disable_text_input?: boolean;
}

type MessageFromSocketType =
    | 'text'
    | 'cards'
    | 'buttons'
    | 'couponCode'
    | 'uploadedFile'
    | 'rateAutomaticSurvey'
    | 'form'
    | 'formResponse'
    | 'recommendedProducts';

export type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T;

export enum IntegrationPlatform {
    MAILCHIMP = 'mailchimp',
    KLAVIYO = 'klaviyo',
    MAILCHIMP_V2 = 'mailchimp_v2',
    GOOGLE_ANALYTICS_GA4 = 'ga_ga4',
    GOOGLE_TAG_MANAGER = 'google_tag_manager',
}

export type VisitorCurrencyData = {
    currencyCode?: string;
    currencyRate?: number;
};
