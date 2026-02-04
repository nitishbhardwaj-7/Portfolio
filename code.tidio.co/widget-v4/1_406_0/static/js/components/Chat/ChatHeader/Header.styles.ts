import { SerializedStyles, css } from '@emotion/react';

const options = css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

const optionsChatOld = css({
    marginTop: '-4px',
});

const optionsButtons = css({
    height: 40,
    marginInlineStart: 'auto',
    marginInlineEnd: '-12px',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    '.mobile &': {
        marginInlineEnd: '0',
    },
});

const wave = css({
    '@media (min-width: 594px)': {
        display: 'none',
    },
    svg: {
        position: 'absolute',
        width: 'calc(100% + 10px)',
        bottom: '-12px',
        left: '-4px',
    },
});

const backButton = css({
    marginInlineStart: '-14px',
    span: {
        top: '50%',
        insetInlineStart: 'calc(100% + 4px)',
        marginInlineStart: 'unset',
        insetInlineEnd: 'unset',
        transform: 'translate(-5px, -50%)',
    },
    '@media (hover: hover)': {
        '&:hover span': {
            opacity: 1,
            transform: 'translate(0, -50%)',
        },
    },
});

const getBannerStyles = (bannerImage: string): SerializedStyles =>
    css({
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
        opacity: 0.16,
        backgroundSize: 'cover',
        backgroundImage: `url(${bannerImage})`,
    });

const header = css({
    padding: '20px 20px 16px',
    '--custom-text-color': '#647495',
    color: 'var(--custom-text-color)',
    '.header-ava': {
        width: '24px !important',
        height: '24px !important',
    },
});

const getNewHomeHeader = (isMobile: boolean): SerializedStyles =>
    css({
        height: isMobile ? '206px' : '284px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    });

const newOptions = css({
    gap: '12px',
    height: 24,
    span: {
        color: '#080F1A',
    },
    h2: {
        color: '#080F1A',
    },
});

const newOptionsButtons = css({
    marginInlineEnd: '-2px',
    '.mobile &': {
        marginInlineEnd: '-12px',
    },
});

const newBackButton = css({
    marginInline: '-2px',
    '.mobile &': {
        marginInline: '-12px',
    },
});

export default {
    options,
    optionsChatOld,
    optionsButtons,
    wave,
    backButton,
    getBannerStyles,
    header,
    getNewHomeHeader,
    newOptions,
    newOptionsButtons,
    newBackButton,
};
