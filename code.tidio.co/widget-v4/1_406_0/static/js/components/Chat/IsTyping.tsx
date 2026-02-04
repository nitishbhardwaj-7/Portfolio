import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { css, keyframes } from '@emotion/react';
import { animated, useSpring } from '@react-spring/web';

import useNewSkin from '../../hooks/useNewSkin';
import useAssignedOperators from './ChatHeader/useAssignedOperators';

import { transformOperatorAvatarUrl } from '../../helpers';
import { trans } from '../../helpers/translations';

import { getAiAssistantName } from '../../store/selectors';
import { Operator } from '../../store/typings';
import { getTextStyles } from '../../styles/text.styles';
import { Lyro } from '../svgIcons/SvgIcons';
import AiAssistantIsThinking from './AiAssistantIsThinking';
import OperatorIsTyping from './OperatorIsTyping';

import defaultAvatar from '../../styles/img/default.jpg';

const textAnimation = keyframes({
    '0%': { backgroundPosition: '-50% 50%' },
    '100%': { backgroundPosition: '50% 50%' },
});

const messageStyles = css({
    clear: 'both',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
    svg: {
        width: 16,
        height: 16,
    },
    backgroundImage: 'linear-gradient(90deg, #647491 42%, #080F1A 46%, #080F1A 54%, #647491 58%)',
    backgroundSize: '50% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `${textAnimation} 2s linear infinite`,
});

const avatarStyles = css({ width: 24, height: 24, borderRadius: '50%' });

type IsTypingProps = {
    operatorIsTyping: boolean | Operator['id'];
    aiAssistantIsThinking: boolean;
};

const IsTypingNewSkin = ({
    operatorIsTyping,
    aiAssistantIsThinking,
}: IsTypingProps): ReactElement | null => {
    const { assignedOperatorsData } = useAssignedOperators();
    const aiAssistantName = useSelector(getAiAssistantName);

    const assignedOperator = useMemo(
        () => assignedOperatorsData.find((operator) => operator.id === operatorIsTyping),
        [assignedOperatorsData, operatorIsTyping],
    );

    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);

    const animation = useSpring({
        from: { opacity: 0.01, transform: 'translateY(10px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        config: { tension: 200, friction: 20 },
    });

    if (!aiAssistantIsThinking && !operatorIsTyping) {
        return null;
    }

    if (aiAssistantIsThinking) {
        return (
            <animated.div css={[textStyles.text14, messageStyles]} style={animation}>
                <Lyro /> {aiAssistantName} {trans('isTyping', null, 'is typing...')}…
            </animated.div>
        );
    }

    if (assignedOperator) {
        return (
            <animated.div css={[textStyles.text14, messageStyles]} style={animation}>
                <img
                    src={
                        assignedOperator.avatarSrc
                            ? transformOperatorAvatarUrl(assignedOperator.avatarSrc)
                            : defaultAvatar
                    }
                    alt={`${assignedOperator.name} avatar`}
                    css={avatarStyles}
                />
                {assignedOperator.name} {trans('isTyping', null, 'is typing...')}…
            </animated.div>
        );
    }

    return (
        <animated.div css={[textStyles.text14, messageStyles]} style={animation}>
            {trans('typing', null, 'Typing')}…
        </animated.div>
    );
};

const IsTyping = ({
    operatorIsTyping,
    aiAssistantIsThinking,
}: IsTypingProps): ReactElement | null => {
    const { isNewSkin } = useNewSkin();

    if (isNewSkin) {
        return (
            <IsTypingNewSkin
                operatorIsTyping={operatorIsTyping}
                aiAssistantIsThinking={aiAssistantIsThinking}
            />
        );
    }

    return (
        <>
            <OperatorIsTyping operatorIsTyping={operatorIsTyping} />
            {aiAssistantIsThinking && <AiAssistantIsThinking />}
        </>
    );
};

export default IsTyping;
