import { css } from '@emotion/react';

const container = css({
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid var(--border-color, #D3DBE5)',
    borderRadius: 'var(--radius-component, 8px)',
});

const content = css({
    display: 'flex',
    flexDirection: 'column',
});

const image = css({
    height: 122,
    background: '#fff no-repeat center center',
    backgroundSize: 'cover',
    borderRadius: 'var(--radius-component, 8px) var(--radius-component, 8px) 0 0',
});

const text = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '16px',
});

const buttons = css({
    display: 'flex',
    flexDirection: 'column',
    button: {
        width: '100%',
        color: 'var(--custom-action-color, #0566ff)',
        outline: 'none',
        padding: '8px 0',
        borderTop: '1px solid var(--border-color, #D3DBE5)',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    svg: {
        fill: 'var(--custom-action-color, #0566ff)',
    },
    a: {
        outline: 'none',
    },
});

const subtitle = css({
    color: '#647491',
    whiteSpace: 'pre-line',
    '.emoji': {
        width: 14,
        margin: '0 0 -2px 2px',
    },
});

const url = css({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    a: {
        textDecoration: 'none',
        color: '#647491',
        '&:hover': {
            textDecoration: 'underline',
        },
        '&:hover, &:focus, &:active, &:visited': {
            outline: 'none',
        },
    },
});

export default {
    subtitle,
    url,
    buttons,
    image,
    container,
    content,
    text,
};
