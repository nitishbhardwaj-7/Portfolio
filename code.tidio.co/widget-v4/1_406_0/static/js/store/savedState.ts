import { cloneDeep, extractPublickeyFromScriptTag, isInDesignMode } from '../helpers';
import { ravenCaptureException } from '../helpers/raven';
import { views } from '../helpers/views';

import {
    ADD_TO_CART_CLICKED_KEY,
    LEARN_MORE_CLICKED_KEY,
} from '../components/ProductCard/contants';
import { generateVisitorMetadata } from '../visitor';
import { DefaultRootState, Message, View, VisitorRegisterWidgetData } from './typings';
import { withReadLock, withWriteLock } from './webLock';

let tidioStateStorageKey: string | null = null;
const getStorageKey = (): string => {
    if (!tidioStateStorageKey) {
        const publicKey = extractPublickeyFromScriptTag() || 'preview';
        tidioStateStorageKey = `tidio_state_${publicKey}`;

        if (isInDesignMode()) {
            tidioStateStorageKey += '_designmode';
        }
    }
    return tidioStateStorageKey;
};

let localStorageAvailable = true;

/**
 * Internal function that performs the actual save without locking
 * Used by both sync and async save variants
 */
const saveStateInternal = (state: DefaultRootState): boolean => {
    if (!localStorageAvailable) {
        return false;
    }
    try {
        const copiedState: DefaultRootState = cloneDeep(state);
        const serializedState = JSON.stringify(copiedState);
        localStorage.setItem(getStorageKey(), serializedState);
        return true;
    } catch {
        localStorageAvailable = false;
        return false;
    }
};

/**
 * Save state to localStorage with write lock protection
 * Uses exclusive writer lock to prevent concurrent writes and reads during write
 */
export const saveStateAsync = async (state: DefaultRootState): Promise<boolean> =>
    withWriteLock(() => saveStateInternal(state));

/**
 * Synchronous save state function
 * Note: This doesn't use locks. Use saveStateAsync for lock protection.
 *
 * @deprecated Use saveStateAsync instead for proper lock protection
 */
export const saveState = (state: DefaultRootState): boolean => saveStateInternal(state);

export const removeKeyFromStorage = (key: string): unknown | boolean => {
    if (!localStorageAvailable) {
        return undefined;
    }
    try {
        localStorage.removeItem(`${getStorageKey()}_${key}`);
        return true;
    } catch {
        localStorageAvailable = false;
        return undefined;
    }
};

const transformMessagesOnLoad = (messages: Message[]): Message[] =>
    messages.map((message) => {
        if (message.type === 'uploadedFile' && message.attachmentType === 'image') {
            const tmpMessage = message;
            tmpMessage.imageLoaded = false;
            return tmpMessage;
        }
        return message;
    });

type PropertiesNotToReset =
    | 'visitor'
    | 'tidioIdentifyData'
    | 'preChat'
    | 'routingRules'
    | 'operators'
    | 'bots'
    | 'getStartedActive'
    | 'isBotActive'
    | 'assignedOperators'
    | 'assignedOperatorsData'
    | 'conversationStarters'
    | 'openTab'
    | 'designVersion'
    | 'visitorCurrencyData'
    | 'isPrivacyPolicyEnabled'
    | 'isPrivacyPolicyDismissed'
    | 'version'
    | 'previewMode'
    | 'isMobile'
    | 'isProjectOnline'
    | 'notificationSnoozed'
    | 'messages'
    | 'unreadMessages'
    | 'selectedDepartment'
    | 'chatIframeStyles'
    | 'sidebarIframeStyles'
    | 'hideWhenOffline'
    | 'createTicketWhenOperatorsOffline'
    | 'publicKey'
    | 'widgetColor'
    | 'bannerImage'
    | 'alert'
    | 'showBranding'
    | 'hideHeader'
    | 'mobileButtonSize'
    | 'disableBotsButtonAnimation'
    | 'platform'
    | 'isSoundEnabled'
    | 'isAwesomeIframe'
    | 'disableTextInput'
    | 'satisfactionSurvey'
    | 'aiAssistantName'
    | 'widgetLabelStatus';

type RessettableState = Omit<DefaultRootState, PropertiesNotToReset>;

/**
 * Internal function that performs the actual load without locking
 * Used by both sync and async load variants
 */
const loadStateInternal = (resetToDefaults = true): false | undefined | DefaultRootState => {
    try {
        if (!localStorageAvailable) {
            return false;
        }
        const serializedState = localStorage.getItem(getStorageKey());
        if (!serializedState) {
            return undefined;
        }
        try {
            const oneDay = 24 * 60 * 60;
            const parsed: DefaultRootState = JSON.parse(serializedState);
            if (!parsed.visitor?.id) {
                return undefined;
            }
            if (resetToDefaults) {
                let oldView = parsed.view;
                if (parsed.view === views.fly) {
                    oldView = View.CLOSED;
                }
                let oldShowMessagesButtonClickedTimestamp =
                    parsed.showMessagesButtonClickedTimestamp;
                let oldShowOldMessages = parsed.showOldMessages;
                if (
                    parsed.showMessagesButtonClickedTimestamp &&
                    Math.floor(Date.now() / 1000) - parsed.showMessagesButtonClickedTimestamp >
                        oneDay
                ) {
                    oldShowMessagesButtonClickedTimestamp = null;
                    oldShowOldMessages = false;
                }
                /**
                 * when adding new global state to the widget (DefaultRootState) you have to explicitly decide
                 * what should happen with new property when data is loaded from localStorage
                 * to make this process typesafe and force decision on compilation level, you have to either:
                 * 1. explicitly define the property in the PropertiesNotToReset type, so that you can omit changing it's value in `stateToReset` object
                 * 2. explicitly define the reset value in `stateToReset` object
                 *
                 * examples:
                 * 1. we do not want to preserve "isMounted" property as this should be recomputed on reconnect to ws, so we omit it from PropertiesNotToReset type and set property value in `stateToReset` object
                 * 2. we want to preserve `publicKey` property, so we define it in PropertiesNotToReset type, this way we can omit changing it's value in `stateToReset` object
                 */
                const stateToReset: RessettableState = {
                    reconnectAttemptCount: 0,
                    isMounted: false,
                    tidioIdentifyChanged: false,
                    operatorIsTyping: false,
                    showOptionsDropdown: false,
                    newMessageEmoji: null,
                    blockedMessage: null,
                    isEmojiPanelVisible: false,
                    sendVisitorMessageFlag: false,
                    isDragAndDropActive: false,
                    showUserDataModal: false,
                    isPageVisible: true,
                    popupImageSrc: '',
                    customBranding: '',
                    customAvatar: '',
                    mobileHash: true,
                    allowAttachments: true,
                    allowEmojis: true,
                    messageForFly: null,
                    prechatSubscriptionCheckboxDefaultValue: false,
                    aiAssistant: false,
                    aiAssistantIsThinking: false,
                    iframeModalUrl: null,
                    designMode: false,
                    allowClose: true,
                    pendingAttachments: [],
                    view: oldView,
                    showMessagesButtonClickedTimestamp: oldShowMessagesButtonClickedTimestamp,
                    showOldMessages: oldShowOldMessages,
                };
                Object.assign(parsed, stateToReset);
            }
            if (parsed.messages) {
                parsed.messages = transformMessagesOnLoad(parsed.messages);
            }
            return parsed;
        } catch (e) {
            ravenCaptureException(e);
            return undefined;
        }
    } catch {
        return undefined;
    }
};

/**
 * Load state from localStorage with read lock protection
 * Uses shared reader lock to allow multiple concurrent reads while preventing writes
 */
export const loadStateAsync = async (
    resetToDefaults = true,
): Promise<false | undefined | DefaultRootState> =>
    withReadLock(() => loadStateInternal(resetToDefaults));

/**
 * Synchronous load state function
 * Note: This doesn't use locks. Use loadStateAsync for lock protection.
 */
export const loadState = (resetToDefaults = true): false | undefined | DefaultRootState =>
    loadStateInternal(resetToDefaults);

export function rebuildStateIfVersionsDiffer(
    savedState: DefaultRootState,
    defaultState: DefaultRootState,
): DefaultRootState {
    try {
        if (savedState.version === defaultState.version) {
            return savedState;
        }
        const defaultStateCopy = cloneDeep(defaultState);
        const messages = cloneDeep(savedState.messages);
        // preserve following visitor data:
        // id
        // originalVisitorId,
        // distinct_id
        const visitor = {
            ...savedState.visitor,
            ...generateVisitorMetadata(),
        };
        const preChat = {
            ...savedState.preChat,
        };
        const tidioIdentifyData = cloneDeep(savedState.tidioIdentifyData);
        removeKeyFromStorage('cache');
        return {
            ...defaultStateCopy,
            messages,
            visitor,
            tidioIdentifyData,
            preChat,
        };
    } catch (e) {
        ravenCaptureException(e);
        removeKeyFromStorage('cache');
        return cloneDeep(defaultState);
    }
}

type Storage = {
    automation_formLeft: number;
    [LEARN_MORE_CLICKED_KEY]: string;
    [ADD_TO_CART_CLICKED_KEY]: string;
    cartData: {
        cartCurrency: string;
        cartValue: number;
    };
    cartItemCount: number;
    removeFromCart: boolean;
    addToCart: boolean;
    addedProductProperties: {
        localization: string;
        variantId?: string;
        productId?: string;
    };
    goToCheckout: boolean;
    cartToken: string;
    sentCartToken: string;
    cache: VisitorRegisterWidgetData;
    test: 'test';
    wasMissingProductIdTracked: boolean;
    lastMessageFromVisitorTimestamp: number;
};

type StorageValueTypes<T> = {
    [K in keyof T]: T[K];
};

// Extract the keys from Storage
type StorageKeys = keyof Storage;

// Map each key to its corresponding value type
type StorageKeyToValueType<K extends StorageKeys> = StorageValueTypes<Pick<Storage, K>>[K];

type LiteralUnion<T extends U, U = string> = T | (U & {});

const saveKeyToStorageInternal = <K extends StorageKeys>(
    key: LiteralUnion<K>,
    value: StorageKeyToValueType<K> | unknown,
): boolean => {
    if (!localStorageAvailable) {
        return false;
    }
    try {
        const serializedValue = JSON.stringify(value);
        if (typeof serializedValue === 'undefined') {
            return true;
        }
        localStorage.setItem(`${getStorageKey()}_${key}`, serializedValue);
        return true;
    } catch {
        localStorageAvailable = false;
        return false;
    }
};

/**
 * Save a key-value pair to localStorage with write lock protection
 */
export const saveKeyToStorageAsync = async <K extends StorageKeys>(
    key: LiteralUnion<K>,
    value: StorageKeyToValueType<K> | unknown,
): Promise<boolean> => withWriteLock(() => saveKeyToStorageInternal(key, value));

/**
 * Synchronous save key to storage (for backward compatibility)
 * Note: This doesn't use locks. Use saveKeyToStorageAsync for lock protection.
 *
 * @deprecated Use saveKeyToStorageAsync instead for proper lock protection
 */
export const saveKeyToStorage = <K extends StorageKeys>(
    key: LiteralUnion<K>,
    value: StorageKeyToValueType<K> | unknown,
): boolean => saveKeyToStorageInternal(key, value);

const getKeyFromStorageInternal = <K extends StorageKeys>(
    key: LiteralUnion<K>,
): StorageKeyToValueType<K> | undefined | null => {
    if (!localStorageAvailable) {
        return undefined;
    }
    try {
        const serializedValue = localStorage.getItem(`${getStorageKey()}_${key}`);
        if (serializedValue === 'undefined') {
            return undefined;
        }
        // @ts-expect-error - we know that JSON parse can be called with null
        return JSON.parse(serializedValue);
    } catch {
        localStorageAvailable = false;
        return undefined;
    }
};

/**
 * Get a key from localStorage with read lock protection
 */
export const getKeyFromStorageAsync = async <K extends StorageKeys>(
    key: LiteralUnion<K>,
): Promise<StorageKeyToValueType<K> | undefined | null> =>
    withReadLock(() => getKeyFromStorageInternal(key));

/**
 * Synchronous get key from storage (for backward compatibility)
 * Note: This doesn't use locks. Use getKeyFromStorageAsync for lock protection.
 */
export const getKeyFromStorage = <K extends StorageKeys>(
    key: LiteralUnion<K>,
): StorageKeyToValueType<K> | undefined | null => getKeyFromStorageInternal(key);

export const removeSavedStateFromStorage = (): boolean => {
    if (!localStorageAvailable) {
        return false;
    }
    try {
        localStorage.removeItem(getStorageKey());
        return true;
    } catch {
        localStorageAvailable = false;
        return false;
    }
};
