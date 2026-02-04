import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { css } from '@emotion/react';

import { AI_ASSISTANT_COLORS } from '../../helpers';
import { trans } from '../../helpers/translations';

import { getAiAssistantName } from '../../store/selectors';
import CSSAnimation from '../Animations/CSSAnimation';

const messsageStyles = css({
    border: '1px solid transparent',
    background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, ${AI_ASSISTANT_COLORS[0]}, ${AI_ASSISTANT_COLORS[1]}) border-box`,
    color: AI_ASSISTANT_COLORS[0],
});

const dotsStyles = css({
    display: 'inline-block',
    marginLeft: 8,
    span: {
        display: 'inline-block',
        height: 5,
        width: 5,
        margin: '11px 1px 0 2px',
        backgroundColor: AI_ASSISTANT_COLORS[0],
        borderRadius: '50%',
        animation: 'blink 1.3s linear infinite',
        '&:nth-child(2)': {
            animationDelay: '-1.1s',
        },
        '&:nth-child(3)': {
            animationDelay: '-0.9s',
        },
    },
});

const AiAssistantIsThinking = (): ReactElement => {
    const aiAssistantName = useSelector(getAiAssistantName);

    return (
        <div className="message message-operator" css={messsageStyles}>
            <span>
                {aiAssistantName} {trans('isTyping', null, 'is typing')}
            </span>
            <CSSAnimation in classNames="operatorTyping">
                <div css={dotsStyles}>
                    <span />
                    <span />
                    <span />
                </div>
            </CSSAnimation>
        </div>
    );
};
export default AiAssistantIsThinking;
