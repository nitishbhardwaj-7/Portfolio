import { css } from '@emotion/react';

// We won't use this direct import anymore
// import { isNewSkin } from '../helpers/skin';

export const newTextStyles = {
    text24Bold: css`
        font-size: 24px;
        font-weight: bold;
        line-height: 31px;
    `,
    text20Semi: css`
        font-size: 20px;
        font-weight: 600;
        line-height: 31px;
    `,
    text16: css`
        font-size: 16px;
        line-height: 20px;
    `,
    text14Medium: css`
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
    `,
    text14: css`
        font-size: 14px;
        line-height: 20px;
    `,
    text12Bold: css`
        font-size: 12px;
        font-weight: bold;
        line-height: 16px;
    `,
    text12Medium: css`
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
    `,
    text12: css`
        font-size: 12px;
        line-height: 16px;
    `,
    text10: css`
        font-size: 10px;
        line-height: 14px;
    `,
};

type TextStyles = typeof newTextStyles;

export const emptyTextStyles: TextStyles = {
    text24Bold: css(),
    text20Semi: css(),
    text16: css(),
    text14Medium: css(),
    text14: css(),
    text12Bold: css(),
    text12Medium: css(),
    text12: css(),
    text10: css(),
};

export const getTextStyles = (isNewSkinEnabled: boolean): TextStyles =>
    isNewSkinEnabled ? newTextStyles : emptyTextStyles;
