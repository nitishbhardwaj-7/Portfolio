import { css } from '@emotion/react';

import defaultAvatar from '../../styles/img/default.jpg';

const messageStyles = css`
    .message {
        padding-block: var(--message-padding-block, 10px);
        padding-inline: var(--message-padding-inline, 16px);
        border-radius: var(--radius-component, 20px);
        margin: 2px 0;
        font-size: var(--message-font-size, 15px);
        line-height: var(--message-line-height, 20px);
        word-wrap: break-word;
        display: inline-block;
        max-width: 85%;
        clear: both;
        position: relative;
        transition: margin 0.28s ease-in-out;
        &.timestamp-visible {
            margin-bottom: 28px;
        }
        &.rating-visible {
            margin-bottom: 35px;
        }
        span.message-content {
            white-space: pre-line;
        }
        span.message-content--markdown {
            white-space: break-spaces;

            .markdown-image {
                display: block;
                max-width: 100%;
                margin: 2px 0;
                border-radius: var(--radius-component, 20px);
            }

            a .markdown-image {
                cursor: pointer;
            }
        }
        .message-content {
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
        }
        img {
            max-width: 100%;
            &:not(.emoji) {
                cursor: zoom-in;
            }
        }
    }

    .rating-visible + .message,
    .rating-visible + .slideshow {
        margin-top: 10px;
    }

    .message-visitor {
        color: #fff;
        background: linear-gradient(332deg, #21dbdb, #2979ff);
        float: right;

        & + .message-operator {
            margin-top: 9px;
        }
        span a {
            color: currentColor;
        }
        &.not-delivered {
            outline: 1px solid #e2e8ef;
            background: #fff;
            color: #647491;
            margin-bottom: 22px;
            .resend-message {
                position: absolute;
                bottom: -22px;
                font-size: 12px;
                right: 0;
                color: #e81332;
            }
        }
    }
    .message-operator {
        color: #06132b;
        background: var(--operator-message, #f0f2f7);
        float: left;

        &.message-form {
            width: 100%;
            padding: 16px;
        }

        span a {
            color: #06132b;
        }
        & + .message-visitor {
            margin-top: 9px;
        }
        &.timestamp-visible ~ .bots-quick-replies {
            padding-top: 0;
        }
        &.message-with-buttons,
        .message-with-buttons,
        &.bots-quick-replies {
            padding-left: 0;
            padding-right: 0;
            padding-bottom: 0;
            transition: padding 0.28s ease-in-out;

            &.buttons-hidden {
                padding-bottom: 10px;
            }
            > span {
                padding: 0 16px;
                display: inline-block;
                word-break: break-word;
            }
            .button-wrapper {
                background: #fff;
                width: 100%;
                margin-top: 10px;
                border: 1px solid var(--border-color, #ebeef0);
                border-bottom-left-radius: var(--radius-component, 20px);
                border-bottom-right-radius: var(--radius-component, 20px);
                border-top: 0;
                position: relative;
            }

            .button-icon {
                display: flex;
                justify-content: center;
                transition: background-color 0.2s ease-in-out;
                padding: 8px 16px;
                border-bottom-left-radius: var(--radius-component, 20px);
                border-bottom-right-radius: var(--radius-component, 20px);
                cursor: pointer;
                outline: none;

                & svg {
                    fill: var(--custom-action-color, #0566ff);
                    width: 20px;
                    height: 20px;
                }

                &:hover {
                    background-color: var(--custom-action-color-hover, #f6f8fb);
                }
            }

            button,
            .button-url {
                margin: 0 auto;
                min-width: 100%;
                display: block;
                font-size: 16px;
                line-height: 19px;
                padding: 8px 16px;
                border-bottom: 1px solid var(--border-color, #ebeef0);
                color: var(--custom-action-color, #0566ff);
                background: transparent;
                position: relative;
                z-index: 2;
                outline: none;
                word-break: break-word;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        .message-with-buttons,
        &.message-with-buttons {
            button:last-child,
            .button-url:last-child {
                border-bottom: 0;
            }
            .grid-layout & {
                .button-wrapper {
                    border-top: 1px solid var(--border-color);
                }
            }
        }
        &.bots-quick-replies {
            width: 85%;
            background-color: #fff;
            margin-top: 0;
            float: right;

            .button-wrapper {
                margin-top: 0;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-end;
                width: 100%;
                border: none;
            }
            button {
                font-size: 15px;
                padding: 10px 14px;
                border: 1px solid;
                border-radius: var(--radius-component, 20px);
                margin: 3px;
                min-width: inherit;
            }
            span {
                text-align: left;
                overflow: hidden;

                &.line-clamp {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
            }
        }
        &.buttons-message {
            padding: 0;
            max-width: 90%;
            .message-with-buttons {
                max-width: 100%;
                &-text {
                    padding: 9px 16px 1px;
                    line-height: 19px;
                    white-space: pre-line;
                    .grid-layout & {
                        padding-top: 16px;
                    }
                }
            }
        }
        &.coupon-code-message {
            padding: 10px 14px 14px;
            width: 100%;
        }
        &.message-alert {
            border: 2px solid #dee3e8;
            background: #fff !important;
            margin-bottom: 22px;
            position: relative;
            svg.alert-icon {
                height: 20px;
                width: 20px;
                fill: red;
                position: absolute;
                top: -5px;
                background: #fff;
                right: -5px;
            }
        }
        &.typing-indicator {
            text-align: left;
            span {
                height: 4px;
                width: 4px;
                margin: 11px 1px 0 1px;
                background-color: #000;
                display: inline-block;
                border-radius: 50%;
                opacity: 0.4;
                animation: blink 1.3s linear infinite;
                &:first-child {
                    margin-left: 4px;
                }
                &:nth-child(2) {
                    animation-delay: -1.1s;
                }
                &:nth-child(3) {
                    animation-delay: -0.9s;
                }
            }
        }

        .button-url {
            font-size: 16px;
            line-height: 19px;
            padding: 8px 16px;
            text-align: center;
        }
        .button-url__anchor {
            text-decoration: none;
            color: var(--custom-action-color, #0566ff);

            &:hover {
                text-decoration: underline;
            }
        }

        @keyframes blink {
            0%,
            60%,
            100% {
                transform: initial;
            }

            30% {
                transform: translateY(-5px);
            }
        }
    }

    .message .emoji {
        margin: 0 1px 0 2px;
        vertical-align: -5px;
    }

    .messageTimestamp {
        bottom: -24px;
        font-size: 12px;
        color: #8894ab;
        position: absolute;
        transition: all 0.2s;
        white-space: nowrap;

        .message-operator & {
            height: 23px;
            display: flex;
            align-items: center;
            top: calc(100% + 4px);
            left: 12px;
        }
        .message-visitor & {
            right: 12px;
        }
        svg {
            width: 16px;
            height: 16px;
            margin-right: 4px;
        }
    }

    .shake {
        animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }

    .rate-comment {
        max-width: 95%;
    }

    .pre-chat,
    .rate-comment,
    .always-online {
        .field-wrapper {
            &.field-wrapper-with-error {
                input,
                textarea {
                    border-color: #f6303a;
                }
            }
        }
        svg {
            width: 19px;
            height: 19px;
            position: absolute;
            top: 8px;
            fill: green;
            left: 9px;

            &#ic_arrow {
                fill: var(--custom-action-color, #0566ff);
                transform: rotate(45deg);
            }
            &#ic_close {
                fill: red;
            }
        }

        input,
        textarea {
            display: block;
            width: 100%;
            font-size: 16px;
            padding: 12px 16px;
            border-radius: var(--radius-component, 5px);
            margin: 10px 0 5px;
            border: solid 1px rgba(108, 125, 159, 0.24);

            &:active:not([type='checkbox']),
            &:focus:not([type='checkbox']) {
                border: solid 1px rgba(108, 125, 159, 0.24);
            }

            &[type='checkbox'] {
                width: auto;
                display: inline-block;
                margin: 0;
                padding: 0;
                min-height: 14px;
                min-width: 14px;
                border: none;
                .mobile .firefox & {
                    outline: solid 1px rgba(108, 125, 159, 0.24);
                }
            }
        }
        label {
            font-size: 12px;
            line-height: 14px;
            text-align: justify;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 8px;
            padding: 4px;
            a {
                word-break: break-all;
            }
        }
    }

    .timestamp-avatar {
        width: 23px;
        height: 23px;
        position: absolute;
        top: 0;
        background-position: center;
        background-size: cover;
        border-radius: 25px;
        background-image: url(${defaultAvatar});
        padding-left: 23px;
        left: 0;

        & + span {
            margin-left: 30px;
        }
    }
    .timestamp-operator {
        margin-right: 2px;
    }

    .loader-icon {
        &.circular {
            animation: rotate 2s linear infinite;
            height: 100%;
            transform-origin: center center;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: 0;
            left: 10px;
            right: 0;
        }

        .path {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
            animation: dash 1.5s ease-in-out infinite;
            stroke-linecap: round;
        }

        @keyframes rotate {
            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes dash {
            0% {
                stroke-dasharray: 1, 200;
                stroke-dashoffset: 0;
            }
            50% {
                stroke-dasharray: 89, 200;
                stroke-dashoffset: -35px;
            }
            100% {
                stroke-dasharray: 89, 200;
                stroke-dashoffset: -124px;
            }
        }
    }

    .message-upload {
        max-width: 75%;
        span {
            padding-left: 25px;
        }
        #ic_download {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }

        &.message-operator {
            #ic_download {
                right: -35px;
            }
        }
        &.message-visitor {
            #ic_download {
                left: -35px;
            }
        }
        a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            outline: none;

            &:hover > svg {
                opacity: 1;
            }
            > svg {
                opacity: 0;
                fill: #bfc5d7;
            }
        }
        &.message-image {
            span {
                padding-left: 0;
            }
            background: none;
            padding: 0;

            img {
                width: 100%;
                border-radius: var(--radius-component, 20px);
            }
        }
        &.message-file {
            span {
                display: inline-block;
                word-break: break-all;
                padding-left: 0;
            }
            a {
                color: inherit;
                text-decoration: none;
                display: inline-block;
                padding-left: 35px;
                svg {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 17px;
                }
            }
        }
    }
    .attachment-img {
        background: white;
        color: white;
        border: none;
        outline: none;
    }
`;
export default messageStyles;
