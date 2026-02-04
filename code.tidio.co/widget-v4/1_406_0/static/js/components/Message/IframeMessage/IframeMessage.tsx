import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import useNewSkin from '../../../hooks/useNewSkin';

import {
    sendMessageFromVisitorWithBotPayload,
    setIframeModal,
    widgetActivityTracking,
} from '../../../store/actions';
import { trackingEvents } from '../../../store/activityTrackingHelpers';
import type { DecisionButton, IframeField } from '../../../store/typings';
import { getTextStyles } from '../../../styles/text.styles';

const containerStyles = css({
    padding: '0px',
});

const textsContainerStyles = css({
    padding: '10px 16px',
});

const titleStyles = css({
    fontWeight: 600,
    fontSize: '16px',
});

const subtitleStyles = css({
    fontSize: '14px',
    lineHeight: '15px',
    color: '#00122E',
    marginTop: '6px',
    whiteSpace: 'pre-line',
});

const urlStyles = css({
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: '-0.15px',
    color: '#00122E',
    opacity: 0.5,
    marginTop: '4px',
});

const buttonStyles = css({
    fontSize: '16px',
    lineHeight: '20px',
    color: 'var(--custom-action-color, #0566ff)',
    letterSpacing: '-0.17px',
    backgroundColor: 'var(--operator-message, white)',
    width: '100%',
    padding: '8px 16px',
    border: '1px solid var(--operator-message, #E9ECF0)',
    borderTop: 'none',
    '&:last-child': {
        borderBottomLeftRadius: 'var(--radius-component, 20px)',
        borderBottomRightRadius: 'var(--radius-component, 20px)',
    },
    '.grid-layout &:hover': {
        textDecoration: 'underline',
    },
    outline: 'none',
});

const IframeMessage = ({ title, subtitle, buttons }: IframeField): ReactElement => {
    const dispatch = useDispatch();
    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);

    const getUrlDomain = (): string => {
        try {
            return new URL(buttons[0]?.url || '').hostname.replace('www.', '');
        } catch {
            return '';
        }
    };

    const handleClick = (button: DecisionButton): void => {
        if (button.type === 'url' && button.url) {
            dispatch(setIframeModal(button.url));
            dispatch(sendMessageFromVisitorWithBotPayload(button.title, button.payload));
            dispatch(widgetActivityTracking(trackingEvents.iframeModalButtonClicked));
        }
    };

    return (
        <div className="message message-operator" css={containerStyles}>
            <div css={textsContainerStyles}>
                <p css={titleStyles}>{title}</p>
                <p css={subtitleStyles}>{subtitle}</p>
                <p css={urlStyles}>{getUrlDomain()}</p>
            </div>

            {buttons.map((button) => (
                <button
                    key={button.title}
                    type="button"
                    css={[buttonStyles, textStyles.text14]}
                    onClick={(): void => handleClick(button)}
                >
                    {button.title}
                </button>
            ))}
        </div>
    );
};

export default IframeMessage;
