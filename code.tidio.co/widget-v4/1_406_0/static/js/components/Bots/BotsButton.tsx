import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { css } from '@emotion/react';

import useTooltip from '../Chat/ChatFooter/useTooltip';

import { trans } from '../../helpers/translations';

import { getIsMobile } from '../../store/selectors';
import { DefaultRootState } from '../../store/typings';
import button from '../Chat/ChatFooter/Button';
import tooltipStyles from '../Chat/ChatFooter/Tooltip.styles';
import { DeafultStartFlowsIcon } from '../svgIcons/SvgIcons';
import BotsButtonAnimation from './BotsButtonAnimation';

const buttonStyles = css({
    '&.bots-animation': {
        svg: {
            willChange: 'transform',
            animation: 'botsAnimation 3s',
            animationIterationCount: '1',
        },

        '@keyframes botsAnimation': {
            '12%': {
                transform: 'scale(1)',
            },
            '20%': {
                transform: 'scale(1.2)',
            },
            '25%': {
                transform: 'scale(0.9)',
            },
            '29%': {
                transform: 'scale(1.05)',
            },
            '31%': {
                transform: 'scale(1)',
            },
        },
    },
});

const botsTooltip = css({
    left: '100%',
});

type BotsButtonProps = {
    onClick: () => void;
    disableButtonAnimation: boolean;
    ariaLabel: string;
    onBlur?: () => void;
    shouldDisplayTooltip?: boolean;
};

const BotsButton = ({
    onClick,
    disableButtonAnimation,
    ariaLabel,
    onBlur,
    shouldDisplayTooltip = false,
}: BotsButtonProps): ReactElement => {
    const { isClicked, handleClick: handleTooltipClick, handleMouseEnter } = useTooltip();
    const isBotActive = useSelector((state: DefaultRootState) => state.isBotActive);
    const assignedOperators = useSelector((state: DefaultRootState) => state.assignedOperators);
    const isMobile = useSelector(getIsMobile);

    const handleClick = (): void => {
        handleTooltipClick();
        onClick();
    };

    const isAnimationActive =
        !isBotActive && assignedOperators.length === 0 && !disableButtonAnimation && !isMobile;

    return (
        <button
            type="button"
            className={`ripple ${isAnimationActive ? 'bots-animation' : ''}`}
            onClick={handleClick}
            onBlur={onBlur}
            onMouseEnter={handleMouseEnter}
            aria-label={ariaLabel}
            css={
                shouldDisplayTooltip
                    ? [button, buttonStyles, tooltipStyles.tooltipButton]
                    : [button, buttonStyles]
            }
        >
            <DeafultStartFlowsIcon />
            {isAnimationActive && <BotsButtonAnimation />}
            {shouldDisplayTooltip && (
                <span
                    className={`tooltip ${isClicked ? 'clicked' : ''}`}
                    css={[tooltipStyles.tooltip, botsTooltip]}
                >
                    {trans('startTheBot', null, 'Start the Bot')}
                </span>
            )}
        </button>
    );
};

export default BotsButton;
