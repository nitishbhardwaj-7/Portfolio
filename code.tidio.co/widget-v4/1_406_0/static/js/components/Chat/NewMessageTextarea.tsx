import React from 'react';
import { connect } from 'react-redux';

import { css } from '@emotion/react';
import { Dispatch } from 'redux';
import uuid from 'uuid';

import useNewSkin from '../../hooks/useNewSkin';

import { getOs } from '../../helpers';
import { measureTextWidthInCanvas } from '../../helpers/canvasHelper';
import { focusLastActiveInput, getWindowRef } from '../../helpers/focusManager';
import { newMessageLineHeight } from '../../helpers/iframe';
import { trans } from '../../helpers/translations';

import { messageTypes } from '../../connection/parsers';
import withShakeHOC from '../../hocs/withShakeHOC';
import {
    addEmojiToNewMessageTextarea,
    addPendingAttachment,
    hideHeader,
    sendMessageFromVisitor,
    sendPendingAttachments,
    setBlockedMessage,
    setFlagForSendingMessageFromVisitor,
    setIframeView,
    setVisitorIsTyping,
    showAlert,
    toggleEmojiPanel,
} from '../../store/actions';
import {
    getIsNewMessageDisabled,
    getLastMessage,
    hasConnectionIssues as hasConnectionIssuesSelector,
    isLastMessage24hOld,
} from '../../store/selectors';
import {
    DefaultRootState,
    IframeViews,
    Message,
    MessageType,
    PendingAttachment,
} from '../../store/typings';
import { getTextStyles } from '../../styles/text.styles';
import Translation from '../Translation';
import SendMessageButton from './SendMessageButton';

const inputLineHeight = newMessageLineHeight;
const minInputRows = 1;
const enterKeyCode = 13;

const container = css({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
});

const isMessageWithButtons = (message?: Message): boolean => {
    if (!message) {
        return false;
    }
    // we have to check operator_id to exclude product cards
    const messageHasCardGallery =
        message.type === messageTypes.cards && typeof message.operator_id !== 'number';
    const messageHasQuickReplies = message.quickReplies && message.quickReplies.length > 0;
    const messageHasButtons = message.buttons && message.buttons.length > 0;
    if (messageHasCardGallery || messageHasQuickReplies || messageHasButtons) {
        return true;
    }
    return false;
};

const isPlaceholderToLong = (placeholder: string, containerWidth: number): boolean => {
    const textareaWidth = measureTextWidthInCanvas(placeholder, '17px "Mulish", sans-serif');
    return textareaWidth > containerWidth;
};

function getRecursiveActiveElement(root: ShadowRoot | Document): Element | null {
    const activeEl = root?.activeElement;

    if (!activeEl) {
        return null;
    }

    if (activeEl.shadowRoot) {
        return getRecursiveActiveElement(activeEl.shadowRoot);
    }
    return activeEl;
}

/**
 * This is a workaround to fix the target of the event in the shadow DOM
 * external scripts which are not aware of the shadow DOM can't access the real target and get shadow root as target instead
 * because of that scripts like one below will prevent spacebar from working in new skin
 * 
 * window.onkeydown = function (e) {
 *     var tag = e.target.tagName.toLowerCase();
 *     var isTypingField =
 *         tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
    if (e.keyCode === 32 && !isTypingField) {
 *         e.preventDefault();
 *     }
 * };
 */
const fixShadowRootTargetEvent = (event: KeyboardEvent | InputEvent): void => {
    try {
        let realTarget = event.target as Element | null;
        if (realTarget?.shadowRoot?.activeElement) {
            while (realTarget?.shadowRoot?.activeElement) {
                realTarget = realTarget.shadowRoot.activeElement;
            }
            Object.defineProperty(event, 'target', {
                value: realTarget,
                writable: false,
                configurable: true,
            });
            if (event.srcElement) {
                // srcElement is deprecated, but we need to support it and patch it if it exists
                Object.defineProperty(event, 'srcElement', {
                    value: realTarget,
                    writable: false,
                    configurable: true,
                });
            }
        }
    } catch {
        // cant do much in this case
    }
};

const applyListenersForShadowRootTargetFix = (): void => {
    try {
        window.parent.addEventListener('keydown', fixShadowRootTargetEvent, true);
        window.parent.addEventListener('keyup', fixShadowRootTargetEvent, true);
        window.parent.addEventListener('keypress', fixShadowRootTargetEvent, true);
        window.parent.addEventListener('beforeinput', fixShadowRootTargetEvent, true);
    } catch {
        // window.parent can be not accessible in some cases
    }
};

const removeListenersForShadowRootTargetFix = (): void => {
    try {
        window.parent.removeEventListener('keydown', fixShadowRootTargetEvent, true);
        window.parent.removeEventListener('keyup', fixShadowRootTargetEvent, true);
        window.parent.removeEventListener('keypress', fixShadowRootTargetEvent, true);
        window.parent.removeEventListener('beforeinput', fixShadowRootTargetEvent, true);
    } catch {
        // window.parent can be not accessible in some cases
    }
};

type NewMessageTextareaState = {
    input: string;
    inputRows: number;
    isPlaceholderToLong: boolean;
};

type NewMessageTextareaProps = {
    dispatch: Dispatch;
    newMessageEmoji: string | null;
    isMobile: boolean;
    sendVisitorMessageFlag: boolean;
    isEmojiPanelVisible: boolean;
    newMessageDisabled: boolean;
    blockedMessage: string | null;
    triggerShake: () => void;
    shakeClassName: string;
    lastMessage: Message | undefined;
    isLastMessage24h: boolean;
    hasConnectionIssues: boolean;
    showUserDataModal: string | boolean;
    fileUploadEnabled: boolean;
    isNewSkin?: boolean;
    pendingAttachments: PendingAttachment[];
};

class NewMessageTextarea extends React.Component<NewMessageTextareaProps, NewMessageTextareaState> {
    state: NewMessageTextareaState = {
        input: '',
        inputRows: minInputRows,
        isPlaceholderToLong: false,
    };

    inputRef: HTMLTextAreaElement | null = null;

    initialInputScrollHeight = 0;

    oldInputRows = 1;

    oldPlaceholder = '';

    windowRef = getWindowRef();

    osName = getOs().name.toLowerCase();

    originalActiveElementDescriptor: PropertyDescriptor | null = null;

    componentDidMount(): void {
        setTimeout(() => {
            if (this.inputRef) {
                this.initialInputScrollHeight = this.inputRef.scrollHeight;
            }
        }, 0);
        setTimeout(() => {
            const shouldRestoreMessageOnMount =
                !this.props.newMessageDisabled && this.props.blockedMessage !== null;
            if (shouldRestoreMessageOnMount) {
                this.restoreMessage();
            }
        }, 0);
        if (this.inputRef) {
            const { placeholder, offsetWidth } = this.inputRef;
            this.oldPlaceholder = placeholder;
            if (isPlaceholderToLong(placeholder, offsetWidth)) {
                this.setState({ inputRows: 2, isPlaceholderToLong: true });
            }
        }
    }

    static getDerivedStateFromProps(
        nextProps: NewMessageTextareaProps,
        prevState: NewMessageTextareaState,
    ): Partial<NewMessageTextareaState> | null {
        if (nextProps.newMessageEmoji) {
            nextProps.dispatch(addEmojiToNewMessageTextarea());
            return {
                input: prevState.input + nextProps.newMessageEmoji,
            };
        }
        if (nextProps.blockedMessage && nextProps.newMessageDisabled) {
            return {
                input: nextProps.blockedMessage,
            };
        }
        return null;
    }

    componentDidUpdate(prevProps: NewMessageTextareaProps): void {
        if (this.props.sendVisitorMessageFlag && !prevProps.sendVisitorMessageFlag) {
            this.sendMessage();
        }
        if (this.inputRef) {
            const { placeholder, offsetWidth } = this.inputRef;
            if (this.oldPlaceholder !== placeholder) {
                this.oldPlaceholder = placeholder;
                if (isPlaceholderToLong(placeholder, offsetWidth)) {
                    this.setState({ inputRows: 2, isPlaceholderToLong: true });
                } else {
                    this.setState({ isPlaceholderToLong: false });
                }
            }
        }
        if (this.props.blockedMessage === null && prevProps.blockedMessage !== null) {
            this.setState({
                input: '',
            });
        }
    }

    componentWillUnmount(): void {
        const { input } = this.state;
        if (input !== '') {
            this.props.dispatch(setBlockedMessage(input));
        }
    }

    setInputRef = (node: HTMLTextAreaElement | null): void => {
        this.inputRef = node;
    };

    onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const oldInputLength = this.state.input.length;
        const input = event.target.value;
        this.setState(
            {
                input,
            },
            () => {
                this.adjustInputRows(oldInputLength);
            },
        );
        this.dispatchVisitorIsTyping(input, this.state.input);
    };

    adjustInputRows = (oldInputLength: number | null = null): boolean => {
        this.oldInputRows = this.state.inputRows;
        if (this.state.input === '' && !this.state.isPlaceholderToLong) {
            this.setState({
                inputRows: minInputRows,
            });
            if (minInputRows !== this.oldInputRows && !this.props.isMobile) {
                this.props.dispatch(setIframeView(IframeViews.CHAT_SIZE_1));
            }
            return true;
        }
        if (
            this.state.inputRows === 3 &&
            oldInputLength !== null &&
            this.state.input.length > oldInputLength
        ) {
            return true;
        }
        const inputRows = this.getCalculatedInputRows();
        if (inputRows !== this.oldInputRows && !this.props.isMobile) {
            const iframeViewMap: Record<number, IframeViews> = {
                1: IframeViews.CHAT_SIZE_1,
                2: IframeViews.CHAT_SIZE_2,
                3: IframeViews.CHAT_SIZE_3,
            };
            this.props.dispatch(setIframeView(iframeViewMap[inputRows] || IframeViews.CHAT_SIZE_1));
        }
        this.setState({
            inputRows,
        });
        return true;
    };

    getCalculatedInputRows = (): number => {
        if (!this.inputRef) {
            return minInputRows;
        }
        let inputRows =
            Math.ceil(
                (this.inputRef.scrollHeight - this.initialInputScrollHeight) / inputLineHeight,
            ) + minInputRows;
        if (this.props.isMobile && inputRows > 2) {
            return 2;
        }
        if (inputRows > 3) {
            inputRows = 3;
        } else if (this.state.isPlaceholderToLong && inputRows < 2) {
            inputRows = 2;
        } else if (inputRows < 1) {
            inputRows = 1;
        }

        return inputRows;
    };

    restoreMessage = (): void => {
        const { blockedMessage } = this.props;
        setTimeout(() => {
            this.setState(
                {
                    input: blockedMessage || '',
                },
                () => {
                    this.adjustInputRows();
                },
            );
        }, 0);
        this.props.dispatch(setBlockedMessage());
    };

    onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): boolean => {
        const isEnter = event.keyCode === enterKeyCode;
        if (!isEnter || (isEnter && event.shiftKey) || this.props.newMessageDisabled) {
            return false;
        }
        event.preventDefault();
        this.props.dispatch(setFlagForSendingMessageFromVisitor(true));
        return true;
    };

    onClick = (): void => {
        if (this.props.newMessageDisabled) {
            focusLastActiveInput();
        }
    };

    dispatchVisitorIsTyping = (message: string, previousMessage: string): boolean => {
        const trimmed = message.trim();
        const previousTrimmed = previousMessage.trim();
        if (trimmed === '' && trimmed === previousTrimmed) {
            return false;
        }
        this.props.dispatch(setVisitorIsTyping(trimmed));
        return true;
    };

    /**
     * Do not use directly except of componentWillReceiveProps because we won't be able to catch message in redux
     * dispatch setFlagForSendingMessageFromVisitor instead
     */
    sendMessage = (): boolean => {
        const { dispatch, isEmojiPanelVisible, triggerShake, pendingAttachments } = this.props;
        let message = this.state.input;
        message = message.trim();

        const hasMessage = message !== '';
        const uploadedAttachments = pendingAttachments
            ? pendingAttachments.filter((attachment) => attachment.uploadStatus === 'uploaded')
            : [];
        const hasUploadedAttachments = uploadedAttachments.length > 0;

        const hasLoadingAttachments = pendingAttachments
            ? pendingAttachments.some((attachment) => attachment.uploadStatus === 'uploading')
            : false;

        if (hasLoadingAttachments) {
            return false;
        }

        if (!hasMessage && !hasUploadedAttachments) {
            triggerShake();
            return false;
        }

        if (hasMessage) {
            dispatch(sendMessageFromVisitor(message));
        }

        if (hasUploadedAttachments) {
            dispatch(sendPendingAttachments());
        }

        this.setState({
            input: '',
        });
        if (isEmojiPanelVisible) {
            dispatch(toggleEmojiPanel(false));
        }
        this.setState({
            inputRows: minInputRows,
        });
        return true;
    };

    fixWebviewTouchAreas = (): void => {
        try {
            if (this.props.isMobile && this.osName === 'ios') {
                if (this.windowRef) {
                    this.windowRef.parent?.scrollTo(
                        this.windowRef.parent.scrollX,
                        this.windowRef.parent.scrollY - 1,
                    );
                    this.windowRef.parent?.scrollTo(
                        this.windowRef.parent.scrollX,
                        this.windowRef.parent.scrollY + 1,
                    );
                }
            }
        } catch {
            //
        }
    };

    onPaste = (event: React.ClipboardEvent<HTMLTextAreaElement>): undefined => {
        if (!this.props.fileUploadEnabled) {
            return undefined;
        }
        if (event.clipboardData?.files?.length === 0) {
            return undefined;
        }
        event.preventDefault();
        const file = Array.from(event.clipboardData.files)[0] as File;
        if (this.props.newMessageDisabled) {
            this.props.dispatch(
                showAlert(trans('newMessageDisabledAlert', null, 'Please enter your email first.')),
            );
        }
        this.props.dispatch(addPendingAttachment(uuid(), file));
        return undefined;
    };

    /**
     * This is a workaround to fix the active element in the shadow DOM
     * external scripts which are not aware of the shadow DOM can't access the real active element and get shadow root as active element instead
     * because of that scripts like one below will stop propagation of the event and backspace will not work
     *
     * document.addEventListener('keydown', (e) => {
     *     const key = e.key;
     *     if (key !== 'Delete' && key !== 'Backspace') {
     *         return;
     *     }
     *     const ae = document.activeElement;
     *     const tag = ae && ae.tagName;
     *     if (tag === 'INPUT' || tag === 'TEXTAREA' || (ae && ae.isContentEditable)) {
     *         return;
     *     }
     *     e.preventDefault();
     * });
     */
    fixActiveElement = (): void => {
        try {
            const activeElement = getRecursiveActiveElement(window.parent.document);
            const originalActiveElementDescriptor = Object.getOwnPropertyDescriptor(
                // @ts-expect-error we want Document function constructor in case document is overwritten later on
                window.parent.Document.prototype,
                'activeElement',
            );
            this.originalActiveElementDescriptor = originalActiveElementDescriptor || null;
            Object.defineProperty(window.parent.document, 'activeElement', {
                value: activeElement,
                writable: false,
                configurable: true,
            });
        } catch {
            // window.parent can be not accessible in some cases or defineProperty can be not allowed
        }
    };

    revertActiveElement = (): void => {
        try {
            if (this.originalActiveElementDescriptor) {
                Object.defineProperty(
                    window.parent.document,
                    'activeElement',
                    this.originalActiveElementDescriptor,
                );
            }
        } catch {
            // window.parent can be not accessible in some cases or defineProperty can be not allowed
        }
    };

    onFocus = (): void => {
        if (this.props.isNewSkin) {
            this.fixActiveElement();
            applyListenersForShadowRootTargetFix();
        }
        if (!this.props.newMessageDisabled && this.props.isMobile) {
            this.props.dispatch(hideHeader(true));
        }
    };

    onBlur = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
        if (this.props.isNewSkin) {
            this.revertActiveElement();
            removeListenersForShadowRootTargetFix();
        }
        if (
            !this.props.newMessageDisabled &&
            this.props.isMobile &&
            event.relatedTarget?.id !== 'send-button'
        ) {
            // Timeout for possible close button click
            setTimeout(() => {
                this.props.dispatch(hideHeader(false));
                this.fixWebviewTouchAreas();
            }, 100);
        }
    };

    render(): React.ReactElement {
        const { lastMessage, newMessageDisabled, hasConnectionIssues, showUserDataModal } =
            this.props;

        const hasUploadingAttachments = this.props.pendingAttachments?.some(
            (attachment: PendingAttachment) => attachment.uploadStatus === 'uploading',
        );
        const hasUploadedAttachments = this.props.pendingAttachments?.some(
            (attachment: PendingAttachment) => attachment.uploadStatus === 'uploaded',
        );
        const isSendButtonDisabled =
            (this.state.input === '' && !hasUploadedAttachments) || hasUploadingAttachments;

        return (
            <Translation
                value={[
                    'clickToProvideEmail',
                    'onlineMessagePlaceholder',
                    'hitTheButtons',
                    'fillOutTheForm',
                ]}
            >
                {({
                    clickToProvideEmail,
                    onlineMessagePlaceholder,
                    hitTheButtons,
                    fillOutTheForm,
                }) => {
                    let placeholder = onlineMessagePlaceholder;
                    if (newMessageDisabled) {
                        if (hasConnectionIssues) {
                            placeholder = onlineMessagePlaceholder;
                        } else if (showUserDataModal) {
                            placeholder = clickToProvideEmail;
                        }
                    } else if (isMessageWithButtons(lastMessage) && !this.props.isLastMessage24h) {
                        placeholder = hitTheButtons;
                    }
                    if (lastMessage && lastMessage.type === MessageType.FORM) {
                        placeholder = fillOutTheForm;
                    }
                    return (
                        <div css={container}>
                            <textarea
                                id="new-message-textarea"
                                value={this.state.input}
                                onChange={this.onInputChange}
                                onKeyDown={this.onKeyDown}
                                onClick={this.onClick}
                                ref={this.setInputRef}
                                rows={this.state.inputRows}
                                placeholder={placeholder}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                readOnly={newMessageDisabled}
                                className={`${newMessageDisabled ? 'disabled' : ''} ${
                                    this.props.shakeClassName
                                }`}
                                aria-label={trans('newMessage', null, 'New message')}
                                data-testid="newMessageTextarea"
                                onPaste={this.onPaste}
                                style={{ padding: '16px 0' }}
                                css={getTextStyles(Boolean(this.props.isNewSkin)).text14}
                            />
                            {this.props.isNewSkin ? (
                                <SendMessageButton disabled={isSendButtonDisabled} />
                            ) : (
                                !isSendButtonDisabled && <SendMessageButton disabled={false} />
                            )}
                        </div>
                    );
                }}
            </Translation>
        );
    }
}

const ConnectedNewMessageTextarea = connect((store: DefaultRootState) => ({
    newMessageEmoji: store.newMessageEmoji,
    isMobile: store.isMobile,
    sendVisitorMessageFlag: store.sendVisitorMessageFlag,
    isEmojiPanelVisible: store.isEmojiPanelVisible,
    newMessageDisabled: getIsNewMessageDisabled(store),
    blockedMessage: store.blockedMessage,
    lastMessage: getLastMessage(store),
    isLastMessage24h: isLastMessage24hOld(store),
    hasConnectionIssues: hasConnectionIssuesSelector(store),
    showUserDataModal: store.showUserDataModal,
    pendingAttachments: store.pendingAttachments,
}))(withShakeHOC(NewMessageTextarea));

type NewMessageTextareaWrapperProps = {
    dispatch: Dispatch;
    fileUploadEnabled: boolean;
};

const NewMessageTextareaWrapper = (props: NewMessageTextareaWrapperProps): React.ReactElement => {
    const { isNewSkin } = useNewSkin();
    return <ConnectedNewMessageTextarea {...props} isNewSkin={isNewSkin} />;
};

export default NewMessageTextareaWrapper;
