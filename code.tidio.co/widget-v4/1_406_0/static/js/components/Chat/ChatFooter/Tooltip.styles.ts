import { css } from '@emotion/react';

const tooltip = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6px 8px',
    background: '#fff',
    borderRadius: 4,
    boxShadow: '0px 8px 20px rgba(0, 27, 71, 0.24)',
    fontSize: 13,
    position: 'absolute',
    bottom: 'calc(100% - 4px)',
    left: '50%',
    transform: 'translate(-50%, 10px)',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.16s ease-in-out, transform 0.16s ease-in-out',
    zIndex: 1,
    whiteSpace: 'nowrap',
    gap: '8px',
});

const tooltipButton = css({
    span: {
        color: '#080F1A',
        bottom: 'calc(100% - 4px)',
    },
    '@media (hover: hover)': {
        '&:not([disabled]):hover .tooltip:not(.clicked)': {
            opacity: 1,
            transform: 'translate(-50%, -10px)',
        },
    },
    '&:not([disabled]):active .tooltip': {
        opacity: 0,
        pointerEvents: 'none',
    },
});

export default { tooltipButton, tooltip };
