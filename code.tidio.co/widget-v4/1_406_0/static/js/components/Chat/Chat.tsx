import React, {
    ReactElement,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { css } from '@emotion/react';
import { animated, useTransition } from '@react-spring/web';

import useNewSkin from '../../hooks/useNewSkin';
import useViewportMeta from '../../hooks/useViewportMeta';
import useDropzone from './useDropzone';

import { browserNameLowerCase, getOs, isInPreviewMode } from '../../helpers';
import { getWindowRef } from '../../helpers/focusManager';
import { getIframeSizes } from '../../helpers/iframe';
import { ravenCaptureException } from '../../helpers/raven';
import { views } from '../../helpers/views';

import { setIframeView } from '../../store/actions';
import {
    getNonHiddenMessages,
    getOpenTab,
    getView,
    isLastMessage24hOld,
} from '../../store/selectors';
import { DefaultRootState, IframeViews, View } from '../../store/typings';
import ChatLogAnimation from '../Animations/ChatLogAnimation';
import UserDataModal from '../Modals/UserDataModal';
import LazyIncomingVideoCallModal from '../VideoCall/LazyVideoCallModal';
import ChatFooter from './ChatFooter/ChatFooter';
import ConversationHeader from './ChatHeader/ConversationHeader';
import HomeHeader from './ChatHeader/HomeHeader';
import MobileHeaderButtons from './ChatHeader/MobileHeaderButtons';
import ChatStarters from './ChatStarters';
import ChatTabs from './ChatTabs';
import Conversation from './Conversation';

const chatLogDefaultStyle = {
    transition: 'max-height 200ms',
};
const osName = getOs().name.toLowerCase();
const isInPreview = isInPreviewMode();

const shadowOffsets = 51;

const transitionCss = css({
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
});

const Chat = (): ReactElement => {
    const viewFromProps = useSelector(getView);
    const isMobile = useSelector((store: DefaultRootState) => store.isMobile);
    const hideHeader = useSelector((store: DefaultRootState) => store.hideHeader);
    const message24hOld = useSelector(isLastMessage24hOld);
    const messages = useSelector(getNonHiddenMessages);
    const [messagesLength] = useState(messages.length);
    const [shouldChatAnimate, setShouldChatAnimate] = useState(message24hOld && !isMobile);

    const iosOffset = useRef(0);
    const clientBodyStyles = useRef('');
    const clientDocumentStyles = useRef('');

    const [view, setView] = useState(viewFromProps);

    const dispatch = useDispatch();

    const { isNewSkin } = useNewSkin();

    // TODO: remove hideHeader after new skin is released
    const shouldDisplayMobileHeader = hideHeader && isMobile && !isNewSkin;

    useViewportMeta({ disableScaling: isMobile && osName === 'ios' && isNewSkin });

    const welcomeMessageHeight = useRef(100);
    const mobileWidgetHasLoaded = useRef(isMobile && osName === 'ios');
    const chatLogTransitionStyles = useRef({
        entering: { maxHeight: `${welcomeMessageHeight.current}px` },
        entered: { maxHeight: '399px' },
    });

    const chatViewRef = useRef<HTMLDivElement>(null);
    const openTab = useSelector(getOpenTab);

    const { dropzoneProps } = useDropzone();

    const iOSSetScrollPosition = useCallback(() => {
        const windowRef = getWindowRef();

        if (mobileWidgetHasLoaded.current) {
            try {
                if (windowRef) {
                    windowRef.parent?.scrollTo(0, iosOffset.current);
                }
            } catch (e) {
                ravenCaptureException(e);
            }
        }
    }, []);

    const clearMobileStyles = useCallback(() => {
        const windowRef = getWindowRef();

        if (isMobile && windowRef) {
            try {
                windowRef.parent.document.body.style.cssText = clientBodyStyles.current;
                windowRef.parent.document.documentElement.style.cssText =
                    clientDocumentStyles.current;
            } catch (error) {
                ravenCaptureException('clearMobileStyles error', { error });
            }
        }
    }, [isMobile]);

    useLayoutEffect(
        () => (): void => {
            clearMobileStyles();
            iOSSetScrollPosition();
        },
        [clearMobileStyles, iOSSetScrollPosition],
    );

    useEffect(() => {
        const windowRef = getWindowRef();

        if (mobileWidgetHasLoaded.current && iosOffset.current === 0 && windowRef) {
            iosOffset.current = windowRef.parent.scrollY;
        }
    }, []);

    useEffect(() => {
        const windowRef = getWindowRef();

        if (viewFromProps === views.chat && isMobile && windowRef) {
            try {
                clientDocumentStyles.current =
                    windowRef.parent.document.documentElement.style.cssText;
                clientBodyStyles.current = windowRef.parent.document.body.style.cssText;
                let bodyStyles =
                    'overflow: hidden; height: 100%; width: 100%; visibility: visible; opacity: 1 !important; display: block; left: 0; top:0; right: auto; bottom: auto; margin: 0;';

                if (osName === 'ios' && browserNameLowerCase !== 'chrome') {
                    bodyStyles += 'position:fixed;';
                }

                windowRef.parent.document.body.style.cssText = bodyStyles;
                windowRef.parent.document.documentElement.style.cssText =
                    'overflow: hidden; margin: 0 !important;';
            } catch {
                //
            }
        }
    }, [isMobile, viewFromProps]);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        if (view === views.chat && openTab === 'home' && !isMobile && !isInPreview) {
            const { width } = getIframeSizes(IframeViews.CHAT_SIZE_1);
            timeoutId = setTimeout(() => {
                if (chatViewRef.current) {
                    const { clientHeight } = chatViewRef.current;
                    chatViewRef.current.style.height = `${clientHeight}px`;
                    dispatch(
                        setIframeView(IframeViews.DYNAMIC, {
                            width,
                            height: clientHeight + shadowOffsets,
                        }),
                    );
                }
            }, 500);
        }
        return (): void => {
            clearTimeout(timeoutId);
        };
    }, [dispatch, isMobile, openTab, view]);

    useEffect(() => {
        if (messages.length > messagesLength) {
            setView(View.CHAT);
        }
    }, [messages.length, messagesLength]);

    const isConversation = openTab === 'conversations';
    const conversationTransition = useTransition(isConversation, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    return (
        <div
            className={`chat no-clip-path ${browserNameLowerCase}`}
            style={{
                background: '#fff',
                ...(!isMobile && {
                    height: isConversation ? 700 : 'auto',
                    interpolateSize: 'allow-keywords',
                    transition: 'height 200ms ease-in-out',
                }),
            }}
            ref={chatViewRef}
        >
            <UserDataModal />
            <LazyIncomingVideoCallModal />
            {shouldDisplayMobileHeader && <MobileHeaderButtons />}
            {conversationTransition((style, item) =>
                item ? (
                    <animated.div
                        style={{ ...style, position: isConversation ? 'relative' : 'absolute' }}
                        css={transitionCss}
                        {...dropzoneProps}
                    >
                        {!shouldDisplayMobileHeader && (
                            <ConversationHeader chatViewRef={chatViewRef} />
                        )}
                        {shouldChatAnimate ? (
                            <ChatLogAnimation
                                in
                                timeout={1}
                                defaultStyle={chatLogDefaultStyle}
                                transitionStyles={chatLogTransitionStyles.current}
                                onAnimationEnded={(): void => {
                                    setShouldChatAnimate(false);
                                }}
                            >
                                <Conversation />
                            </ChatLogAnimation>
                        ) : (
                            <Conversation />
                        )}
                        <ChatFooter hasSeparator />
                    </animated.div>
                ) : (
                    <animated.div
                        style={{ ...style, position: !isConversation ? 'relative' : 'absolute' }}
                        css={transitionCss}
                        data-testid="home"
                    >
                        <HomeHeader />
                        <ChatStarters />
                        <ChatTabs />
                    </animated.div>
                ),
            )}
        </div>
    );
};

export default Chat;
