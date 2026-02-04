import { css } from '@emotion/react';

const buttonLabel = css({
    span: {
        background: '#fff',
        padding: '6px 8px',
        borderRadius: 4,
        boxShadow: '0px 8px 20px 0px rgba(0, 27, 71, 0.24)',
        fontSize: 13,
        position: 'absolute',
        opacity: 0,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        transition: 'all 0.16s ease-in-out',
        zIndex: 1,
        top: '50%',
        color: '#06132b',
        marginInlineEnd: '10px',
        insetInlineEnd: '100%',
        transform: 'translate(5px, -50%)',
    },
    '@media (hover: hover)': {
        '&:hover': {
            span: {
                opacity: 1,
                transform: 'translate(0,-50%)',
            },
        },
    },
});

export default buttonLabel;
