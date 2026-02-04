import { css } from '@emotion/react';

const tempDuplicatesStyles = css`
    .chat {
        width: 372px;
        position: absolute;
        bottom: 26px;
        border-radius: var(--radius-surface, 16px);
        pointer-events: auto;
        box-shadow: 0 8px 18px 0 rgba(0, 18, 46, 0.16);
        overflow: hidden;
        z-index: 1;
        right: 26px;
        left: auto;
    }

    textarea {
        border: 0;
        width: 100%;
        font-size: 16px;
        padding: 20px 0 14px 0;
        resize: none;
        line-height: 20px;
        overflow-x: hidden;
        -ms-overflow-style: none;
    }

    @keyframes shake {
        10%,
        90% {
            transform: translateX(1px);
        }

        20%,
        80% {
            transform: translateX(-1px);
        }

        30%,
        50%,
        70% {
            transform: translateX(2px);
        }

        40%,
        60% {
            transform: translateX(-2px);
        }
    }

    button,
    button.material-icons {
        background: none;
        border: 0;
        color: inherit;
        font: inherit;
        line-height: normal;
        overflow: visible;
        padding: 0;
        user-select: none;
        outline: none;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    button.material-icons::-moz-focus-inner {
        border: 0;
        padding: 0;
    }
    button.link {
        border-bottom: 1px solid #444;
    }
`;

export default tempDuplicatesStyles;
