import { css } from '@emotion/react';

const flyMessageStyles = css`
    background-color: #fff;
    padding-block: var(--fly-padding, 0);
    padding-inline: var(--fly-padding, 20px);
    max-width: 340px;
    position: absolute;
    bottom: 26px;
    border-radius: var(--radius-surface, 12px);
    box-shadow: var(--fly-shadow);
    display: flex;
    flex-direction: column;
    z-index: 1;
    max-height: calc(100% - 76px);

    .chat-in-preview & {
        box-shadow: 0 8px 13px 0 rgba(0, 18, 46, 0.16);
    }
    right: 48px;
    margin-left: 20px;
    .mobile & {
        max-width: calc(100% - 48px - 55px);
        &.with-buttons {
            width: calc(100% - 48px - 55px);
            max-width: 250px;
        }
    }

    &.narrower {
        max-width: 300px;
    }

    &:hover .close-button-wrapper {
        opacity: 1;
        transform: translateY(8px);
    }

    .close-button-wrapper {
        position: absolute;
        bottom: 100%;
        opacity: 0;
        width: 100%;
        height: 45px;
        transition: transform 0.3s opacity 0.3s;
        transform: translateY(10px);
        left: 0;
        .mobile & {
            opacity: 1;
            transform: translateY(2px);
        }
    }
    .grid-layout & {
        .close-button-wrapper {
            transition: opacity 0.3s;
            transform: translate(12px, 33px);
        }
        &:hover .close-button-wrapper {
            transform: translate(12px, 33px);
        }
    }
    .grid-layout.mobile & {
        .close-button-wrapper {
            transform: translate(6px, 33px);
        }
        &:hover .close-button-wrapper {
            transform: translate(6px, 33px);
        }
    }

    button.exit-chat {
        position: absolute;
        top: 0;
        right: 0;

        height: 28px;
        width: 28px;
        .mobile & {
            height: 32px;
            width: 32px;
        }
        .mobile.grid-layout & {
            height: 28px;
            width: 28px;
        }

        border-radius: 50%;

        box-shadow: 0px 2px 6px 0px #001b471f;
        .grid-layout & {
            box-shadow: 0px 2px 8px 0px rgba(8, 15, 26, 0.08);
        }

        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;

        svg {
            width: 20px;
            height: 20px;
            fill: #8894ab;
        }
        .mobile & {
            svg {
                width: 24px;
                height: 24px;
            }
        }
        .mobile.grid-layout & {
            svg {
                width: 20px;
                height: 20px;
            }
        }

        &:hover {
            background-color: var(--custom-action-color-background, #dce9ff);
            svg {
                fill: var(--custom-action-color, #0566ff);
            }
        }

        .mobile &:before {
            content: '';
            width: 44px;
            height: 44px;
            position: absolute;
            top: calc(50% - 22px);
            left: calc(50% - 22px);
        }
    }

    .input-group {
        padding: 9px 22px 9px 0;
    }

    .input-group .fly-new-message-button {
        transition: min-width 0.3s;
        min-width: 180px;
        padding: 4px 0 8px;
        line-height: 21px;
        text-align: left;
        cursor: pointer;
        font-size: 17px;
        color: #8894ab;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &::-webkit-input-placeholder {
            /* Chrome/Opera/Safari */
            white-space: nowrap;
        }
        &::-moz-placeholder {
            /* Firefox 19+ */
            white-space: nowrap;
        }
        &:-ms-input-placeholder {
            /* IE 10+ */
            white-space: nowrap;
        }
        &:-moz-placeholder {
            /* Firefox 18- */
            white-space: nowrap;
        }
    }

    .message-container {
        padding: 19px 0;
        max-width: 290px;
        font-size: 17px;
        background: #fff;
        position: relative;
        word-wrap: break-word;
        overflow-y: auto;
        white-space: pre-line;
        padding-right: 38px;
        ul {
            list-style-type: disc;
        }
        ol {
            list-style-type: decimal;
        }
        ul,
        ol {
            margin: 12px 0;
            padding-left: 16px;
        }
        li {
            padding-left: 4px;
            margin-bottom: 8px;
        }
        &.image-content {
            overflow-y: hidden;
            padding-left: 0;
            padding-right: 0;
            button {
                float: left;
                height: 200px;
                width: 100%;
                min-width: 200px;
                background-color: #fff;
                .image-preview {
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                    border-radius: 8px;
                    height: 100%;
                }
            }
            span {
                display: inline-block;
                margin-top: 10px;
            }
        }
        .mobile & {
            width: 100%;
            font-size: 15px;
            padding-right: 22px;
            &.image-content {
                padding-left: 0;
                padding-right: 0;
                button {
                    height: 132px;
                    min-width: auto;
                }
            }
        }
        &.recommend-products-message {
            padding-right: 0px;
            padding-bottom: 30px;
            overflow-y: visible;
        }
        &:after {
            content: '';
            border-bottom: 1px solid #dedede;
            display: block;
            position: absolute;
            bottom: 0;
            width: calc(100% - 38px);
            .mobile & {
                width: calc(100% - 22px);
            }
        }
    }

    .button-wrapper {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .mobile & {
            flex-direction: column;
            align-items: flex-start;
        }
        button,
        .button-url {
            font-size: 17px;
            color: var(--custom-action-color, #0566ff);
            background: #fff;
            line-height: 21px;
            margin-top: 6px;
            margin-bottom: 6px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border-bottom: 1px solid transparent;
            transition: border-color 0.2s;
            &:hover {
                border-color: var(--custom-action-color, #0566ff);
            }
            margin-right: 16px;
            text-align: left;
            .mobile & {
                max-width: 100%;
                display: block;
                padding: 4px 0;
            }
            .emoji {
                vertical-align: top;
            }
        }
        .button-url__anchor {
            color: var(--custom-action-color, #0566ff);
            text-decoration: none;
        }
        .more-replies {
            border: 1px solid var(--custom-action-color, #0566ff);
            border-radius: 20px;
            padding: 3px 10px;
            line-height: 7px;
            align-self: center;
            .mobile & {
                align-self: flex-start;
                padding: 3px 10px;
                margin: 6px 0;
            }

            svg {
                transform: rotate(90deg);
                width: 13px;
                height: 13px;
                fill: var(--custom-action-color, #0566ff);
            }
        }
    }
    img {
        max-width: 100%;
    }
`;

export default flyMessageStyles;
