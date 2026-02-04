import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { SerializedStyles, css } from '@emotion/react';

import useNewSkin from '../../hooks/useNewSkin';

import { disableBotsButtonAnimation } from '../../store/actions';

const getAnimationStyles = (newSkin: boolean): SerializedStyles =>
    css({
        marginInlineStart: 0,
        '.pulse, .pulse-white': {
            willChange: 'transform',
            display: 'block',
            width: newSkin ? 24 : 38,
            height: newSkin ? 24 : 38,
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: '50%',
            animationIterationCount: '1',
            marginInlineStart: 0,
        },
        '.pulse': {
            background: '#c9cbd8',
            zIndex: '-4',
            animation: 'waterPulse 3s',
            '&.animation-delay': {
                zIndex: '-2',
            },
        },
        '.pulse-white': {
            background: '#fff',
            zIndex: '-3',
            animation: 'waterPulseWhite 3s',
            '&.animation-delay': {
                zIndex: '-1',
            },
            marginInlineStart: 0,
        },
        '.animation-delay': {
            animationDelay: '0.8s',
        },
        '@keyframes waterPulseWhite': {
            from: {
                transform: 'scale(0.7)',
            },
            '29%': {
                transform: 'scale(0.7)',
            },
            '60%': {
                transform: 'scale(2.8)',
            },
        },

        '@keyframes waterPulse': {
            from: {
                opacity: 0,
                transform: 'scale(0.8)',
            },
            '19%': {
                opacity: 0.3,
            },
            '23%': {
                transform: 'scale(0.8)',
            },
            '24%': {
                opacity: 0.5,
                transform: 'scale(0.8)',
            },
            '31%': {
                opacity: 0.4,
            },
            '55%': {
                opacity: 0.1,
                transform: 'scale(2.8)',
            },
            '100%': {
                opacity: 0,
            },
        },
    });

const BotsButtonAnimation = (): ReactElement => {
    const dispatch = useDispatch();
    const { isNewSkin } = useNewSkin();

    return (
        <span css={getAnimationStyles(isNewSkin)}>
            <span className="pulse" />
            <span className="pulse-white" />
            <span
                className="pulse animation-delay"
                onAnimationEnd={(): void => {
                    dispatch(disableBotsButtonAnimation());
                }}
            />
            <span className="pulse-white animation-delay" />
        </span>
    );
};

export default BotsButtonAnimation;
