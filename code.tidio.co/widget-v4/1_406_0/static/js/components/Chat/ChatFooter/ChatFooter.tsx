import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { SerializedStyles, css } from '@emotion/react';
import { EmojiData } from 'emoji-mart';
import uuid from 'uuid';

import useNewSkin from '../../../hooks/useNewSkin';
import useTooltip from './useTooltip';

import { MAX_PENDING_ATTACHMENTS, isInPreviewMode } from '../../../helpers';
import { trans } from '../../../helpers/translations';

import {
    addEmojiToNewMessageTextarea,
    addPendingAttachment,
    removePendingAttachment,
    showAlert,
    toggleEmojiPanel,
    widgetActivityTracking,
} from '../../../store/actions';
import { trackingEvents } from '../../../store/activityTrackingHelpers';
import {
    getCustomBranding,
    getIsDragAndDropActive,
    getIsNewMessageDisabled,
    getPendingAttachments,
    getShowBranding,
    isPreChatEnabledButNotFilled,
} from '../../../store/selectors';
import { DefaultRootState } from '../../../store/typings';
import Fade from '../../Animations/Fade';
import FooterBots from '../../Bots/FooterBots';
import LazyEmojiPicker from '../../EmojiPicker/LazyEmojiPicker';
import PoweredByTidio from '../../PoweredByTidio';
import { AttachFile, EmojiSwitch } from '../../svgIcons/SvgIcons';
import AttachmentsPreview from '../AttachmentsPreview/AttachmentsPreview';
import NewMessageTextarea from '../NewMessageTextarea';
import button from './Button';
import tooltipStyles from './Tooltip.styles';

const getAttachmentTooltip = (newSkin: boolean): SerializedStyles =>
    css({
        left: newSkin ? 'calc(100% - 2px)' : 'calc(100% - 8px)',
    });

const getEmojiTooltip = (newSkin: boolean): SerializedStyles =>
    css({
        left: newSkin ? 'calc(100% - 14px)' : 'calc(100% - 18px)',
    });

const footerBottom = css({
    height: 38,
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    '.grid-layout &': {
        height: 30,
    },
    color: '#4C596B',
    '.footer-icons-wrapper': {
        marginInlineStart: -8,
    },
    '.mobile &': {
        '* + *': {
            marginInlineStart: 0,
        },
        '.footer-icons-wrapper': {
            marginInlineStart: -8,
        },
    },
});

const footerInputWrapperNew = css({
    '&.hidden': {
        display: 'none',
    },
});

const footerBottomNew = css({
    color: '#647491',
    '* + *': {
        marginInlineStart: 4,
    },
    '.footer-icons-wrapper': {
        marginInlineStart: 0,
    },
    '.mobile &': {
        '* + *': {
            marginInlineStart: 0,
        },
        '.footer-icons-wrapper': {
            marginInlineStart: -8,
        },
    },
});

interface ChatFooterProps {
    hasSeparator?: boolean;
}

const ChatFooter = ({ hasSeparator = false }: ChatFooterProps): React.ReactElement => {
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const isEmojiPanelVisible = useSelector((store: DefaultRootState) => store.isEmojiPanelVisible);
    const isMobile = useSelector((store: DefaultRootState) => store.isMobile);
    const newMessageDisabled = useSelector(getIsNewMessageDisabled);
    const showBranding = useSelector(getShowBranding);
    const messages = useSelector((store: DefaultRootState) => store.messages);
    const isDragAndDropActive = useSelector(getIsDragAndDropActive);
    const preChatEnabledButNotFilled = useSelector(isPreChatEnabledButNotFilled);
    const allowAttachments = useSelector((store: DefaultRootState) => store.allowAttachments);
    const allowEmojis = useSelector((store: DefaultRootState) => store.allowEmojis);
    const customBranding = useSelector(getCustomBranding);
    const pendingAttachments = useSelector(getPendingAttachments);
    const { isNewSkin } = useNewSkin();
    const attachmentTooltip = useTooltip();
    const emojiTooltip = useTooltip();

    const isAttachmentLimitReached = pendingAttachments.length >= MAX_PENDING_ATTACHMENTS;

    const fileUploadEnabled = Boolean(
        Boolean(messages.find((el) => el.sender === 'visitor')) &&
        !preChatEnabledButNotFilled &&
        allowAttachments,
    );

    const onEmojiClick = (emoji: EmojiData): void => {
        dispatch(widgetActivityTracking(trackingEvents.emojiAdded));
        if ('native' in emoji) {
            dispatch(addEmojiToNewMessageTextarea(emoji.native));
        }
    };

    const handleEmojiPanel = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        emojiTooltip.handleClick();

        if (event) {
            const isTriggeredFromKeybord =
                event.nativeEvent.pageX === 0 && event.nativeEvent.pageY === 0;
            if (!isTriggeredFromKeybord && isEmojiPanelVisible) {
                event.currentTarget.blur();
            }
        }
        if (newMessageDisabled) {
            dispatch(
                showAlert(trans('newMessageDisabledAlert', null, 'Please enter your email first.')),
            );
        } else {
            dispatch(toggleEmojiPanel(!isEmojiPanelVisible));
        }
    };

    const handleUploadButton = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ): boolean => {
        attachmentTooltip.handleClick();

        if (isInPreviewMode() || !fileUploadEnabled) {
            return false;
        }
        if (event) {
            const isTriggeredFromKeybord =
                event.nativeEvent.pageX === 0 && event.nativeEvent.pageY === 0;
            if (!isTriggeredFromKeybord) {
                event.currentTarget.blur();
            }
        }
        if (newMessageDisabled) {
            dispatch(
                showAlert(trans('newMessageDisabledAlert', null, 'Please enter your email first.')),
            );
        } else {
            dispatch(widgetActivityTracking(trackingEvents.uploadButtonClicked));

            if (inputRef.current) {
                inputRef.current.click();
            }
        }
        return true;
    };

    const sendFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (!fileUploadEnabled) {
            return undefined;
        }

        if (event.target.files) {
            const file = event.target.files[0];
            dispatch(addPendingAttachment(uuid(), file));
        }

        if (inputRef.current) {
            inputRef.current.value = '';
        }

        return undefined;
    };

    const handleRemoveAttachment = (id: string): void => {
        dispatch(removePendingAttachment(id));
    };

    return (
        <div className={`input-group ${isDragAndDropActive ? 'drag-active' : ''}`}>
            {allowEmojis && (
                <CSSTransition
                    in={isEmojiPanelVisible}
                    classNames="emojiFade"
                    timeout={200}
                    mountOnEnter
                    unmountOnExit
                    appear
                >
                    <LazyEmojiPicker
                        isMobile={isMobile}
                        onEmojiClick={onEmojiClick}
                        handleEmojiPanel={handleEmojiPanel}
                    />
                </CSSTransition>
            )}
            <div
                className={`drag-active-wrapper footer-input-wrapper ${
                    newMessageDisabled ? 'hidden' : ''
                }`}
                css={isNewSkin ? footerInputWrapperNew : undefined}
            >
                {hasSeparator && <hr />}
                <AttachmentsPreview
                    attachments={pendingAttachments}
                    onRemove={handleRemoveAttachment}
                />
                <NewMessageTextarea dispatch={dispatch} fileUploadEnabled={fileUploadEnabled} />
            </div>
            <div css={isNewSkin ? [footerBottom, footerBottomNew] : [footerBottom]}>
                <div className={`footer-icons-wrapper ${newMessageDisabled ? 'hidden' : ''}`}>
                    <FooterBots />
                    <Fade in={fileUploadEnabled}>
                        <button
                            type="button"
                            className={`ripple ${
                                newMessageDisabled || isAttachmentLimitReached ? 'disabled' : ''
                            }`}
                            onClick={handleUploadButton}
                            disabled={isAttachmentLimitReached}
                            aria-label={trans('attachFile', null, 'Attach file button')}
                            css={[button, tooltipStyles.tooltipButton]}
                            onMouseEnter={attachmentTooltip.handleMouseEnter}
                        >
                            <AttachFile />
                            <span
                                className={`tooltip ${
                                    attachmentTooltip.isClicked ? 'clicked' : ''
                                }`}
                                css={[tooltipStyles.tooltip, getAttachmentTooltip(isNewSkin)]}
                            >
                                {trans('attachment', null, 'Attachment')}
                            </span>
                        </button>
                    </Fade>
                    {!isMobile && allowEmojis && (
                        <button
                            type="button"
                            className={`emoji-switch ripple ${
                                isEmojiPanelVisible ? 'active' : ''
                            } ${newMessageDisabled ? 'disabled' : ''}`}
                            onClick={handleEmojiPanel}
                            aria-label={
                                isEmojiPanelVisible
                                    ? trans('closeEmojiPanel', null, 'Close Emoji picker')
                                    : trans('openEmojiPanel', null, 'Open Emoji picker')
                            }
                            css={[button, tooltipStyles.tooltipButton]}
                            onMouseEnter={emojiTooltip.handleMouseEnter}
                        >
                            <EmojiSwitch />
                            <span
                                className={`tooltip ${emojiTooltip.isClicked ? 'clicked' : ''}`}
                                css={[tooltipStyles.tooltip, getEmojiTooltip(isNewSkin)]}
                            >
                                {trans('emoji', null, 'Emoji')}
                            </span>
                        </button>
                    )}
                    <form>
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            ref={inputRef}
                            name="attachment"
                            onChange={sendFile}
                            aria-label={trans('attachFile', null, 'Attach file input')}
                        />
                    </form>
                </div>

                {(showBranding || Boolean(customBranding)) && <PoweredByTidio />}
            </div>
        </div>
    );
};

export default ChatFooter;
