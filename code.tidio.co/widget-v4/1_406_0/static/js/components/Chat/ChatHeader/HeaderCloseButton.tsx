import React, { ReactElement, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import useNewSkin from '../../../hooks/useNewSkin';

import { trans } from '../../../helpers/translations';

import {
    setChatOpenedState,
    toggleEmojiPanel,
    widgetActivityTracking,
} from '../../../store/actions';
import { trackingEvents } from '../../../store/activityTrackingHelpers';
import { CustomWindow } from '../../../store/typings';
import { ChevronDown, Close } from '../../svgIcons/SvgIcons';
import button from './Button';
import buttonLabel from './ButtonLabel';

declare let window: CustomWindow;

const HeaderCloseButton = (): ReactElement => {
    const dispatch = useDispatch();
    const { isNewSkin } = useNewSkin();

    const onCloseClick = (): void => {
        dispatch(widgetActivityTracking(trackingEvents.chatClosed));
        dispatch(toggleEmojiPanel(false));
        dispatch(setChatOpenedState(false));
    };

    const isHovered = useRef(false);

    useEffect(
        // make headerCloseHover symetric as onMouseLeave is not triggered
        () => (): void => {
            if (isHovered.current) {
                window.tidioChatApi?.trigger('headerCloseHover', { type: 'off' });
            }
        },
        [],
    );

    return (
        <button
            className="ripple"
            onClick={onCloseClick}
            onMouseEnter={(): void => {
                isHovered.current = true;
                window.tidioChatApi?.trigger('headerCloseHover', { type: 'on' });
            }}
            onMouseLeave={(): void => {
                isHovered.current = false;
                window.tidioChatApi?.trigger('headerCloseHover', { type: 'off' });
            }}
            type="button"
            aria-label={trans('minimize', null, 'Minimize')}
            css={[button, buttonLabel]}
        >
            {isNewSkin ? <Close /> : <ChevronDown />}
            <span>{trans('minimize', null, 'Minimize')}</span>
        </button>
    );
};

export default HeaderCloseButton;
