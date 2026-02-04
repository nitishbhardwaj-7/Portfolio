import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SerializedStyles, css } from '@emotion/react';

import { trans } from '../../helpers/translations';

import { setFlagForSendingMessageFromVisitor } from '../../store/actions';
import { getIsNewMessageDisabled } from '../../store/selectors';
import { Enter, SendIcon } from '../svgIcons/SvgIcons';
import button from './ChatFooter/Button';
import tooltipStyles from './ChatFooter/Tooltip.styles';

const shortcut = css({
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 12,
    color: '#647491',
});

const sendTooltip = css({
    left: '0%',
});

const getSendButtonStyles = (disabled: boolean): SerializedStyles =>
    css({
        flex: '0 0 38px',
        color: disabled ? '#B1B9C8' : 'var(--custom-action-color)',
        transform: 'translateX(8px)',
        '.grid-layout &': {
            flex: '0 0 24px',
            color: disabled ? '#64749180' : 'var(--custom-action-color)',
            transform: 'translateX(0px)',
        },
        '.mobile &': {
            flex: '0 0 44px',
            transform: 'translateX(10px)',
        },
    });

const SendMessageButton = ({ disabled }: { disabled: boolean }): ReactElement => {
    const dispatch = useDispatch();
    const newMessageDisabled = useSelector(getIsNewMessageDisabled);

    const onSendButtonClick = (): void => {
        if (!newMessageDisabled) {
            dispatch(setFlagForSendingMessageFromVisitor(true));
        }
    };

    return (
        <button
            id="send-button"
            type="button"
            onClick={onSendButtonClick}
            disabled={disabled}
            css={[button, getSendButtonStyles(disabled), tooltipStyles.tooltipButton]}
        >
            <SendIcon />
            <span className="tooltip" css={[tooltipStyles.tooltip, sendTooltip]}>
                {trans('send', null, 'Send')}
                <div css={shortcut}>
                    {trans('shortcut', null, 'Shortcut')} <Enter />
                </div>
            </span>
        </button>
    );
};

export default SendMessageButton;
