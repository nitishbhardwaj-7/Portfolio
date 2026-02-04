import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SerializedStyles, css } from '@emotion/react';

import useNewSkin from '../../hooks/useNewSkin';
import useChatTabs from './useChatTabs';

import { widgetActivityTracking } from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import { getCustomBranding, getShowBranding } from '../../store/selectors';
import { DefaultRootState } from '../../store/typings';
import { getTextStyles } from '../../styles/text.styles';
import PoweredByTidio from '../PoweredByTidio';
import Translation from '../Translation';
import { ChatIcon, HomeIcon } from '../svgIcons/SvgIcons';

const backgroundColor = '#fff';

const container = css({
    backgroundColor,
    display: 'flex',
    flexDirection: 'column',
    paddingInline: 'var(--chat-padding, 24px)',
});

const button = css({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    fontSize: '15px',
    fontWeight: 600,
    ':focus': {
        outline: 'none',
    },
    svg: {
        width: 28,
        height: 28,
    },
});

const newButton = css(button, {
    position: 'relative',
    svg: {
        width: 24,
        height: 24,
    },
    '& .newMessage': {
        right: 50,
        bottom: 30,
    },
});

const chatButton = css({
    color: '#647491',
    svg: {
        '.outline': {
            opacity: 1,
        },
        '.fill': {
            opacity: 0,
        },
    },
    '&:hover': {
        color: 'initial',
        svg: {
            '.outline': {
                opacity: 0,
            },
            '.fill': {
                opacity: 1,
            },
        },
    },
});

const newMessageStyle = css({
    position: 'absolute',
    right: 92,
    bottom: 46,
    fontWeight: 700,
    color: '#fff',
    pointerEvents: 'none',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20px',
    height: '20px',
    fontSize: '12px',
    background: '#e81332',
    zIndex: 2,
    lineHeight: 1,
});

const getTabsStyles = (newWidget: boolean): SerializedStyles =>
    css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 4,
        alignSelf: 'stretch',
        borderTop: `1px solid ${newWidget ? 'transparent' : '#E2E8EF'}`,
        backgroundColor,
    });

const poweredByTidioContainer = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    flex: '0 0 40px',
    borderTop: '1px solid #E2E8EF',
});

const ChatTabs = (): ReactElement => {
    const dispatch = useDispatch();
    const unreadMessages = useSelector((store: DefaultRootState) => store.unreadMessages);
    const isMobile = useSelector((store: DefaultRootState) => store.isMobile);
    const showBranding = useSelector(getShowBranding);
    const customBranding = useSelector(getCustomBranding);

    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);
    const { handleTabChange } = useChatTabs();

    return (
        <>
            <div css={container}>
                <div
                    css={getTabsStyles(isNewSkin)}
                    style={{ padding: isMobile ? '10px 20px' : '12px 20px' }}
                >
                    <button
                        css={[isNewSkin ? newButton : button, textStyles.text12Medium]}
                        type="button"
                        onClick={(): void => {
                            handleTabChange('home');
                        }}
                    >
                        <HomeIcon />
                        <Translation value="home" fallback="Home" />
                    </button>
                    <button
                        css={[isNewSkin ? newButton : button, chatButton, textStyles.text12Medium]}
                        type="button"
                        onClick={(): void => {
                            handleTabChange('conversations');
                            dispatch(widgetActivityTracking(trackingEvents.chatTabClicked));
                        }}
                    >
                        <ChatIcon />
                        <Translation value="chat" fallback="Chat" />
                        {unreadMessages > 0 && (
                            <div className="newMessage" css={newMessageStyle}>
                                {unreadMessages <= 9 ? unreadMessages : '9+'}
                            </div>
                        )}
                    </button>
                </div>
            </div>
            {isNewSkin && (showBranding || Boolean(customBranding)) && (
                <div css={poweredByTidioContainer}>
                    <PoweredByTidio />
                </div>
            )}
        </>
    );
};

export default ChatTabs;
