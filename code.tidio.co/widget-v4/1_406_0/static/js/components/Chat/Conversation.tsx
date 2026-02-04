import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDocumentRef } from '../../helpers/focusManager';
import { browserNameLowerCase, isiPad } from '../../helpers/index';
import { useMarkMessagesAsRead } from '../../helpers/messageReadHelper';
import { ravenCaptureException } from '../../helpers/raven';

import { setIframeView, showOlderMessages, widgetActivityTracking } from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import {
    getAiAssistantIsThinking,
    getIsDragAndDropActive,
    getNonHiddenMessages,
} from '../../store/selectors';
import { DefaultRootState, IframeViews, MessageType } from '../../store/typings';
import Fade from '../Animations/Fade';
import AlertMessage from '../Message/AlertMessage';
import Message from '../Message/Message';
import { YOUTUBE_PREVIEW_LOADED_EVENT } from '../Message/YouTubePreview/YouTubePreview';
import { MessageTypes, UploadedFileMessage, UploadingFileMessage } from '../Message/types';
import ConversationScroll from './ConversationScroll';
import DragAndDrop from './DragAndDrop';
import HistoryButton from './HistoryButton';
import IsTyping from './IsTyping';
import PrivacyPolicy from './PrivacyPolicy';

const ONE_DAY_TIME = 24 * 60 * 60;

const Conversation = (): ReactElement => {
    const dispatch = useDispatch();
    const messages = useSelector(getNonHiddenMessages) as unknown as MessageTypes[];
    const operatorIsTyping = useSelector((store: DefaultRootState) => store.operatorIsTyping);
    const showAlert = useSelector((store: DefaultRootState) => store.alert.isVisible);
    const isMobile = useSelector((store: DefaultRootState) => store.isMobile);
    const shouldShowOldMessages = useSelector((store: DefaultRootState) => store.showOldMessages);
    const isDragAndDropActive = useSelector(getIsDragAndDropActive);
    const aiAssistantIsThinking = useSelector(getAiAssistantIsThinking);

    const documentRef = useRef<Document | ShadowRoot>(getDocumentRef());
    const separatorRef = useRef<HTMLDivElement>(null);
    const conversationRef = useRef<HTMLDivElement>(null);
    const initialLoadTimeout = useRef<NodeJS.Timeout | null>(null);

    const [conversationRefLoaded, setConversationRefLoaded] = useState(false);
    useEffect(() => {
        if (conversationRef.current) {
            setConversationRefLoaded(true);
        }
    }, []);

    // TODO: change to scrollIntoView
    const scrollToBottom = (): void => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop =
                conversationRef.current.scrollHeight - conversationRef.current.clientHeight;
        }
    };

    useEffect(() => {
        dispatch(setIframeView(isMobile ? IframeViews.MOBILE : IframeViews.CHAT_SIZE_1));
        scrollToBottom();
        initialLoadTimeout.current = setTimeout(() => {
            // TODO better workaround for webkit bug where scrollHeight is not correct on mount
            if (
                conversationRef.current &&
                conversationRef.current.scrollTop - conversationRef.current.scrollHeight !==
                    conversationRef.current.clientHeight
            ) {
                scrollToBottom();
            }
        }, 100);

        return (): void => {
            if (initialLoadTimeout.current) {
                clearTimeout(initialLoadTimeout.current);
            }
        };
    }, [dispatch, isMobile]);

    // TODO: check if needed
    const [prevShowOldMessages, setShowOldMessages] = useState(shouldShowOldMessages);
    useEffect(() => {
        if (prevShowOldMessages !== shouldShowOldMessages && separatorRef.current) {
            separatorRef.current.scrollIntoView();
            setShowOldMessages(shouldShowOldMessages);
        }
    }, [shouldShowOldMessages, prevShowOldMessages]);

    const prevMessages = useRef(messages);
    const minMessageHeight = 40;
    const conversationOverflow =
        conversationRef.current &&
        conversationRef.current.scrollHeight >
            conversationRef.current.clientHeight + minMessageHeight;
    const messagesLength = messages.length;
    const lastMessageLoaded = Boolean(
        messages.length > 0 &&
        messages[messagesLength - 1].type === MessageType.UPLOADING_FILE &&
        (messages[messagesLength - 1] as UploadingFileMessage).imageLoaded,
    );

    const wasNewMessageAdded = prevMessages.current.length < messagesLength;

    useMarkMessagesAsRead(messages);

    useEffect(() => {
        const animateMessages = (): void => {
            try {
                const animatedChildren = Array.from(
                    documentRef.current.querySelectorAll<HTMLDivElement>('.message'),
                ).slice(-9);

                const translateValue = animatedChildren[animatedChildren.length - 1].offsetHeight;
                for (let i = 0; i < animatedChildren.length; i += 1) {
                    animatedChildren[i].style.transition = 'none';
                    animatedChildren[i].style.transform = `translateY(${translateValue}px)`;
                }
                setTimeout(() => {
                    for (let i = 0; i < animatedChildren.length; i += 1) {
                        animatedChildren[i].style.transition = 'transform 0.2s, margin 0.2s';
                        animatedChildren[i].style.transform = '';
                    }
                }, 0);
            } catch (e) {
                ravenCaptureException(e);
            }
        };
        if (prevMessages.current.length !== messages.length) {
            scrollToBottom();
        }
        if (conversationOverflow && wasNewMessageAdded) {
            animateMessages();
        }
    }, [conversationOverflow, documentRef, messages, prevMessages, wasNewMessageAdded]);

    useEffect(() => {
        prevMessages.current = messages;
    }, [messages]);

    useEffect(() => {
        if (showAlert || operatorIsTyping || aiAssistantIsThinking || lastMessageLoaded) {
            scrollToBottom();
        }
    }, [showAlert, operatorIsTyping, aiAssistantIsThinking, lastMessageLoaded]);

    const showOldMessages = (): void => {
        dispatch(widgetActivityTracking(trackingEvents.showPreviousMessagesClicked));
        dispatch(showOlderMessages(true));
    };

    const iPad = isiPad();

    const { messagesOlderThanOneDay, messagesLessThanOneDayOld, visibleMessages } = useMemo(() => {
        const olderThanOneDay = messages.filter(
            (message) => Math.floor(Date.now() / 1000) - message.time_sent > ONE_DAY_TIME,
        );
        const lessThanOneDayOld = messages.filter(
            (message) => Math.floor(Date.now() / 1000) - message.time_sent <= ONE_DAY_TIME,
        );
        const visible = shouldShowOldMessages ? messages : lessThanOneDayOld;

        return {
            messagesOlderThanOneDay: olderThanOneDay,
            messagesLessThanOneDayOld: lessThanOneDayOld,
            visibleMessages: visible,
        };
    }, [messages, shouldShowOldMessages]);

    const uploadedImages = useMemo(
        () =>
            visibleMessages
                .filter(
                    (message) =>
                        message.type === MessageType.UPLOADED_FILE &&
                        message.attachmentType === 'image',
                )
                .filter((message) => (message as UploadedFileMessage).imageLoaded),
        [visibleMessages],
    );

    const uploadingImages = useMemo(
        () => visibleMessages.filter((message) => message.type === MessageType.UPLOADING_FILE),
        [visibleMessages],
    );

    useEffect(() => {
        if (uploadedImages.length > 0 || uploadingImages.length > 0) {
            scrollToBottom();
        }
    }, [uploadedImages.length, uploadingImages.length]);

    useEffect(() => {
        const container = conversationRef.current;
        if (!container) {
            return undefined;
        }

        const handleYoutubeLoaded = (event: Event): void => {
            const { target } = event;
            const ytPreviews = container.querySelectorAll('[data-youtube-preview]');
            const lastYtPreview = ytPreviews[ytPreviews.length - 1];
            if (lastYtPreview === target) {
                scrollToBottom();
            }
        };

        container.addEventListener(YOUTUBE_PREVIEW_LOADED_EVENT, handleYoutubeLoaded);
        return (): void => {
            container.removeEventListener(YOUTUBE_PREVIEW_LOADED_EVENT, handleYoutubeLoaded);
        };
    }, []);

    return (
        <div
            id="conversation-group"
            ref={conversationRef}
            className={`${isDragAndDropActive ? 'drag-active' : ''} ${iPad ? 'ios-ipad' : ''}`}
            role="log"
        >
            <PrivacyPolicy />
            <DragAndDrop />
            <div id="messages" aria-live="polite" aria-atomic="false" data-testid="messagesLog">
                {shouldShowOldMessages &&
                    messagesOlderThanOneDay.map((message) => (
                        <Message key={message.id} {...message} />
                    ))}
                {!shouldShowOldMessages && messagesOlderThanOneDay.length > 0 && (
                    <HistoryButton onClick={showOldMessages} />
                )}
                {messagesOlderThanOneDay.length > 0 && (
                    <div
                        ref={separatorRef}
                        style={{
                            float: 'left',
                            clear: 'both',
                            width: '100%',
                        }}
                    />
                )}
                {messagesLessThanOneDayOld.map((message) => (
                    <Message key={message.id} {...message} />
                ))}
                <Fade in={showAlert}>
                    <AlertMessage />
                </Fade>
                <IsTyping
                    operatorIsTyping={operatorIsTyping}
                    aiAssistantIsThinking={aiAssistantIsThinking}
                />
            </div>
            {conversationRefLoaded && browserNameLowerCase !== 'firefox' && !isMobile && (
                <ConversationScroll
                    messagesLength={messages.length}
                    conversationRef={conversationRef.current}
                    documentRef={documentRef.current}
                    showOldMessages={shouldShowOldMessages}
                />
            )}
        </div>
    );
};

export default Conversation;
