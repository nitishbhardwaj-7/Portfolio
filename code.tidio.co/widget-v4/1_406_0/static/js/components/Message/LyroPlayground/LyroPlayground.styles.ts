import { css } from '@emotion/react';

export const containerStyle = css({
    padding: '8px 12px',
    background: 'rgba(220, 233, 255, 0.40)',
    color: '#647491',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: 13,
    lineHeight: '14px',
    borderRadius: '4px 12px 12px 12px',
    gap: 12,
    svg: {
        width: 16,
        height: 16,
        flexShrink: 0,
    },
});

export const buttonStyles = css({
    color: '#0566FF',
    lineHeight: '20px',
    marginTop: 2,
    '&:focus': {
        outline: 'none',
    },
});
