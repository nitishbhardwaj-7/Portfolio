import { SerializedStyles, css, keyframes } from '@emotion/react';

const slideInFromRight = keyframes({
    '0%': { transform: 'translateX(8%)' },
    '100%': { transform: 'translateX(0)' },
});

const fadeOut = keyframes({
    '0%': { opacity: 1, zIndex: 1 },
    '100%': { opacity: 0, zIndex: -1 },
});

const container = css({
    position: 'relative',
    clear: 'both',
    width: '100%',
    float: 'left',
});

const getButton = (direction: 'left' | 'right', isWithoutImages: boolean): SerializedStyles =>
    css({
        position: 'absolute',
        background: '#fff',
        borderRadius: '50%',
        width: 40,
        height: 40,
        boxShadow: '0px 8px 20px 0px rgba(0, 27, 71, 0.24)',
        zIndex: 3,
        top: 140,
        transition: 'box-shadow 0.2s, opacity 0.2s',
        '&:hover': {
            boxShadow: '0px 10px 20px 0px rgba(0, 27, 71, 0.24)',
        },

        ...(isWithoutImages && {
            top: 22,
        }),

        ...(direction === 'left' && {
            left: 0,
        }),

        ...(direction === 'right' && {
            right: 0,
        }),

        '& svg': {
            width: 40,
            height: 40,
            ...(direction === 'left' && {
                transform: 'rotate(90deg)',

                '.lang-rtl &': {
                    transform: 'rotate(-90deg)',
                },
            }),
            ...(direction === 'right' && {
                transform: 'rotate(-90deg)',

                '.lang-rtl &': {
                    transform: 'rotate(90deg)',
                },
            }),
        },
    });

const flyMessagePadding = 20;
const conversationGroupPadding = 28;

const getItemsContainer = (isFlyMessage: boolean): SerializedStyles => {
    const space = isFlyMessage ? flyMessagePadding : conversationGroupPadding;

    return css({
        padding: `0px ${space}px`,
        maxWidth: `calc(100% + ${space * 2}px)`,
        background: 'transparent',
        overflow: 'auto',
        borderRadius: 0,
        display: 'flex',
        scrollSnapType: 'x mandatory',
        scrollPadding: space,
        scrollBehavior: 'smooth',
        marginBottom: 5,
        marginLeft: -space,
        gap: 10,

        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
            display: 'none',
        },

        '.ios-ipad &': {
            WebkitOverflowScrolling: 'touch',
        },
        '.safari &': {
            scrollSnapType: 'x mandatory',
            '.lang-rtl &': {
                scrollSnapType: 'none',
            },
        },
    });
};

const getItemWrapper = (width: number, isSingleItem: boolean): SerializedStyles =>
    css({
        maxWidth: '100%',
        minWidth: width,
        scrollSnapAlign: 'center',

        willChange: 'transform',
        transform: 'translateX(8%)',
        animation: `${slideInFromRight} .5s .2s ease-out forwards`,

        position: 'relative',
        // Opacity transition breaks the ProductCard backdrop-filter if it's the same stacking context, that why it have to be in separated by pseudo-element.
        '&:before': {
            content: '""',
            position: 'absolute',
            zIndex: 1,
            pointerEvents: 'none',
            backgroundColor: '#fff',
            willChange: 'opacity',
            opacity: 1,
            animation: `${fadeOut} .5s .2s ease-out forwards`,
        },

        // Max 2 items visible at start, so it's sufficent to delay only 2nd item
        '&:nth-child(2)': {
            animationDelay: '.4s',
            '&:before': {
                animationDelay: '.4s',
            },
        },

        ...(isSingleItem && {
            maxWidth: width,
        }),
    });

export default {
    container,
    getButton,
    getItemsContainer,
    getItemWrapper,
};
