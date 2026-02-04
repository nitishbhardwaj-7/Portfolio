import { SerializedStyles, css } from '@emotion/react';

const container = css({
    overflow: 'hidden',
    border: '1px solid #E6E8EF',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
});

const image = css({
    width: '100%',
    height: 174,
    objectFit: 'cover',
    objectPosition: 'center center',
    pointerEvents: 'none',
    userSelect: 'none',
});

const getContentContainer = (newSkin: boolean, hasImage?: boolean): SerializedStyles =>
    css({
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: '20px 24px',
        borderRadius: 16,
        ...(hasImage && {
            marginTop: newSkin ? -8 : -16,
            position: 'relative',
            overflow: 'hidden',
            background:
                'linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1))',
            WebkitBackdropFilter: 'blur(20px)',
            backdropFilter: 'blur(20px)',
            ...(newSkin && {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
            }),
        }),
    });

const textsContainer = css({
    display: 'flex',
    justifyContent: 'space-between',
    gap: 4,
    zIndex: 1,
});

const buttonsContainer = css({
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    zIndex: 1,
});

const titleText = css({
    fontWeight: 600,
});

const currencyText = css({
    color: '#4C596B',
    fontSize: 14,
});

const primaryButton = (isLoading: boolean, newSkin: boolean): SerializedStyles =>
    css({
        width: '100%',
        padding: newSkin ? '12px 0px' : '10px 0px',
        borderRadius: 'var(--radius-component, 6px)',
        ...(!newSkin && {
            fontWeight: 600,
        }),
        position: 'relative',

        '&:disabled:hover': {
            cursor: isLoading ? 'progress' : 'default',
        },

        '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            borderRadius: 'var(--radius-component, 6px)',
            background: 'transparent',
            transition: 'background .5s ease',
        },

        '&:disabled:before': {
            background: 'rgba(255, 242, 246, 0.5)',
        },

        transition: 'filter .2s',
        '&:not(:disabled):hover': {
            filter: 'brightness(90%)',
        },
    });

const addedToCartButton = (newSkin: boolean): SerializedStyles =>
    css({
        padding: '10px 0px',
        borderRadius: 'var(--radius-component, 6px)',
        ...(!newSkin && {
            fontWeight: 600,
        }),
        backgroundColor: '#EFF2F6',
        color: '#647491',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        '& svg': {
            fill: '#34B857',
            width: 19,
            height: 19,
        },

        '&:disabled:hover': {
            cursor: 'default',
        },
    });

const secondaryButton = (newSkin: boolean): SerializedStyles =>
    css({
        width: '100%',
        ...(!newSkin && {
            fontWeight: 600,
        }),
        '&:focus': {
            outline: 'none',
        },
        '&:hover': {
            textDecoration: 'underline',
        },
    });

export default {
    container,
    image,
    getContentContainer,
    textsContainer,
    buttonsContainer,
    titleText,
    currencyText,
    primaryButton,
    secondaryButton,
    addedToCartButton,
};
