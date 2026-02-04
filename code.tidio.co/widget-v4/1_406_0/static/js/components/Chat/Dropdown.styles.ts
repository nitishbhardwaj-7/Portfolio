import { SerializedStyles, css } from '@emotion/react';

const getOptionsDropdownStyles = (newSkin: boolean): SerializedStyles =>
    css({
        position: 'absolute',
        background: '#fff',
        borderRadius: 'var(--radius-small-component, 8px)',
        boxShadow: newSkin
            ? '0px 2px 2px 0px rgba(8, 15, 26, 0.12), 0px 2px 8px 0px rgba(8, 15, 26, 0.08)'
            : '0 6px 32px 0 rgba(0, 18, 46, 0.16)',

        padding: newSkin ? '4px' : '12px 6px',
        zIndex: 6,
        right: newSkin ? '18px' : '24px',

        ul: {
            margin: 0,
            padding: 0,
        },

        li: {
            borderRadius: '6px',
            display: 'flex',
        },

        button: {
            padding: newSkin ? '8px' : '8px 16px',
            display: 'flex',
            margin: 0,
            position: 'initial',
            float: 'initial',
            width: '100%',
            borderRadius: '6px',
            alignItems: 'center',

            '&:hover, &:focus': {
                '&:not(.mobile), #body:not(.mobile) &': {
                    background: '#eff2f6',
                },
            },

            svg: {
                fill: '#8894ab',
                height: '20px',
                width: '20px',
            },

            span: {
                marginLeft: '8px',
                color: '#06132b',
            },

            '&::before': {
                content: 'none',
            },
        },
    });

export default getOptionsDropdownStyles;
