import { css } from '@emotion/react';

const button = css({
    '&&': {
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--custom-text-color)',
        svg: {
            width: 24,
            height: 24,
            fill: 'currentColor',
            transition: 'all 0.16s ease-in-out',
        },
        position: 'relative',
        outline: 'none',
        '.mobile &': {
            width: 44,
            height: 44,
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            background: '#080F1A29',
            width: 40,
            height: 40,
            borderRadius: '50%',
            zIndex: -1,
            transition: 'all 0.16s ease-in-out',
            transform: 'scale(0)',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 20px)',
        },
        '@media (hover: hover)': {
            '&:hover::before': {
                transform: 'scale(1)',
            },
        },
        '.grid-layout:not(.mobile) &': {
            width: 28,
            height: 28,
            color: 'currentColor',
            svg: {
                width: 20,
                height: 20,
            },
            '&::before': {
                width: 28,
                height: 28,
                transform: 'scale(1)',
                top: 'calc(50% - 14px)',
                left: 'calc(50% - 14px)',
                background: 'var(--custom-action-color-hover)',
                borderRadius: 'var(--radius-small-component, 8px)',
                opacity: 0,
            },
            '&:hover': {
                color: 'var(--custom-action-color)',
                '&::before': {
                    opacity: 1,
                },
            },
        },
        '.grid-layout:not(.mobile) .chat-header &': {
            color: 'var(--custom-text-color)',
            '&::before': {
                background: '#080F1A29',
            },
            '&:hover': {
                color: 'var(--custom-text-color)',
            },
        },
    },
});

export default button;
