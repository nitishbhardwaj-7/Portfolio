import { css } from '@emotion/react';

// TidioInter - see comment in fontFace.ts
const interFontStyles = css`
    body,
    #body,
    :host,
    input,
    textarea,
    select,
    button {
        font-family: 'TidioInter', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #080f1a;
        letter-spacing: normal;
    }
`;

export default interFontStyles;
