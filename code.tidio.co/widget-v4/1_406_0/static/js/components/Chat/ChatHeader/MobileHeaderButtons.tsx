import React from 'react';
import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import useNewSkin from '../../../hooks/useNewSkin';

import { trans } from '../../../helpers/translations';

import {
    hideHeader,
    setChatOpenedState,
    setOpenTab,
    toggleEmojiPanel,
    widgetActivityTracking,
} from '../../../store/actions';
import { trackingEvents } from '../../../store/activityTrackingHelpers';
import { ChevronDown, ChevronLeft, ChevronLeftLight } from '../../svgIcons/SvgIcons';

const wrapperStyles = css({
    position: 'absolute',
    top: 8,
    right: 8,
    left: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1,
});

const buttonStyles = css({
    backgroundColor: '#fff',
    boxShadow: '0 8px 20px 0 #001b473d',
    minWidth: 44,
    height: 44,
    borderRadius: 99,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    svg: {
        fill: '#080f1a',
        width: 28,
        height: 28,
    },
});

const backButtonStyles = css({
    marginInlineEnd: 'auto',
    padding: '8px 16px 8px 8px',
    fontSize: 15,
});

const MobileHeaderButtons = (): React.ReactElement => {
    const dispatch = useDispatch();
    const { isNewSkin } = useNewSkin();

    const handleGoBack = (): void => {
        dispatch(setOpenTab('home'));
        dispatch(widgetActivityTracking(trackingEvents.goBackToConversationStartersClicked));
        dispatch(hideHeader(false));
    };

    const handleClose = (): void => {
        dispatch(widgetActivityTracking(trackingEvents.chatClosed));
        dispatch(toggleEmojiPanel(false));
        dispatch(setChatOpenedState(false));
    };

    return (
        <div css={wrapperStyles}>
            <button type="button" onClick={handleGoBack} css={[buttonStyles, backButtonStyles]}>
                {isNewSkin ? <ChevronLeftLight /> : <ChevronLeft />}
                {trans('goBack', null, 'Go back')}
            </button>

            <button
                type="button"
                onClick={handleClose}
                css={buttonStyles}
                aria-label={trans('minimize', null, 'Minimize')}
            >
                <ChevronDown />
            </button>
        </div>
    );
};

export default MobileHeaderButtons;
