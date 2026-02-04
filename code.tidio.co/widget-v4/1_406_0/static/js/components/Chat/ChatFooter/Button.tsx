import { css } from '@emotion/react';

const button = css({
    width: 38,
    height: 38,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    color: 'currentColor',
    svg: {
        width: 22,
        height: 22,
        fill: 'currentColor',
        transition: 'all 0.16s ease-in-out',
    },
    outline: 'none',
    '.mobile &': {
        width: 44,
        height: 44,
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        width: 38,
        height: 38,
        borderRadius: '50%',
        zIndex: -1,
        transition: 'all 0.16s ease-in-out',
        transform: 'scale(0)',
        top: 'calc(50% - 19px)',
        left: 'calc(50% - 19px)',
    },
    '&:hover::before': {
        transform: 'scale(1)',
    },
    '&:hover': {
        color: 'var(--custom-action-color)',
        '&::before': {
            backgroundColor: 'var(--custom-action-color-hover, rgba(0, 125, 252, 0.12))',
        },
    },

    '.grid-layout:not(.mobile) &': {
        width: 24,
        height: 24,
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

    '&.disabled svg, &.disabled:focus svg': {
        fill: '#c9cbd8',
    },

    '&:disabled': {
        '&::before': {
            background: 'none !important',
        },
        svg: {
            fill: '#c9cbd8',
        },
    },
});
export default button;
