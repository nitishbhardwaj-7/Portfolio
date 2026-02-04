import { SerializedStyles, css } from '@emotion/react';

const getContentContainer = (hasImage: boolean): SerializedStyles =>
    css({
        padding: '9px 12px 8px',
        border: '1px solid #ebeef0',
        borderTop: 'none',

        ...(!hasImage && {
            borderRadius: '14px 14px 0 0',
            borderTop: '1px solid #ebeef0',
        }),

        '& a': {
            textDecoration: 'none',
            color: '#00122e',
            '&:hover, &:focus, &:active, &:visited': {
                color: '#00122e',
                outline: 'none',
            },
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    });

const image = css({
    borderRadius: '14px 14px 0 0',
    height: 122,
    background: '#fff no-repeat center center',
    backgroundSize: 'cover',
    border: '1px solid #ebeef0',
    borderBottom: 0,
});

const title = css({
    fontSize: '15px',
    lineHeight: '19px',
    fontWeight: 'bold',
    color: '#00122e',
});

const subtitle = css({
    margin: '4px 0 0',
    lineHeight: '16.5px',
    fontSize: 14,
    color: '#4c596b',
    whiteSpace: 'pre-line',
    '& .emoji': {
        width: 14,
        margin: '0 0 -2px 2px',
    },
});

const url = css({
    fontSize: 14,
    lineHeight: '17px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: '#00122e',
    '& a': {
        opacity: '0.5',
    },
});

const buttons = css({
    '&& .button-wrapper': {
        marginTop: 0,
        marginBottom: 1,
        '&:before': {
            content: 'none',
        },
        button: {
            width: '100%',
        },
    },
});

export default {
    getContentContainer,
    image,
    title,
    subtitle,
    url,
    buttons,
};
