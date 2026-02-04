import { css } from '@emotion/react';

import defaultAvatar from '../../styles/img/default.jpg';

const chatStyles = css`
    *:focus {
        outline: thin dotted;
    }
    .chat {
        max-height: calc(100% - 47px);
        display: flex;
        flex-direction: column;
    }
    svg {
        width: 24px;
        height: 24px;
    }
    .chat-header {
        padding: var(--chat-padding, 24px);
        background: var(--custom-background);
        color: var(--custom-text-color);
        position: relative;
        z-index: 4;
        flex: 0 0 auto;

        a {
            color: currentColor;
            &:hover {
                text-decoration: none;
            }
        }
    }

    #conversation-group::-webkit-scrollbar,
    #new-message-textarea::-webkit-scrollbar {
        display: none;
    }

    .header-ava {
        border-radius: 24px;
        background-size: cover;
        background-position: center;
        background-image: url(${defaultAvatar});
        float: left;
        .mobile & {
            width: 42px;
            height: 42px;
            border-radius: 19px;
        }
    }

    #conversation-group {
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        -ms-overflow-style: none;
        background: #fff;
        transition: all 0.3s;
        min-height: 160px;
        height: 487px;
        padding-inline: var(--chat-padding, 24px);

        .grid-layout & {
            display: flex;
            flex-direction: column;
            :before {
                content: '';
                display: block;
                width: 100%;
                height: 1px;
                flex: 1;
            }
        }

        &.ios-ipad {
            -webkit-overflow-scrolling: touch;
            width: calc(100% + 6px);
            // webkit overflow scrolling adds second scrollbar which is not affected by browser RTL setting,
            // so no mirroring for styles below

            /*! @noflip */
            margin-right: 0;
            .lang-rtl & {
                /*! @noflip */
                margin-right: -6px;
            }
        }

        .uploadIconWrapper {
            position: absolute;
            display: flex;
            height: 100%;
            width: 100%;
            align-items: center;
            justify-content: center;
            top: 0;
            left: 0;
            right: 0;
            z-index: 3;

            span {
                font-size: 19px;
                max-width: 120px;
                text-align: center;
                color: #080f1a;
                line-height: 1.3;
            }

            .ic_upload {
                fill: #287efc;
                width: 73px;
                height: 73px;
                margin-bottom: 10px;
                margin-top: -5px;
            }
        }

        .upload-circle {
            width: 230px;
            height: 230px;
            border-radius: 50%;
            background: rgba(182, 198, 229, 0.24);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            animation: scale-up 0.3s ease;
            position: relative;
            z-index: 1;
        }

        &.drag-active::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.92);
            z-index: 2;
            animation: fade-in 0.3s ease;
        }
        flex: 1 auto;
        .transition-container & {
            flex: 1;
        }
    }
    .transition-container {
        height: 399px;
        background: #fff;
        flex: 0 1 auto;
        min-height: 160px;
        position: relative;
        display: flex;
        flex-direction: column;
        #conversation-group {
            overflow-y: hidden;
        }
    }

    #messages {
        position: relative;
        -ms-overflow-style: none;
        margin-top: 10px;
        width: 100%;
        padding-bottom: 24px;
        float: left;
        .grid-layout & {
            padding-bottom: 16px;
        }
    }

    #conversation-group #conversation-scroll {
        width: 16px;
        height: calc(339px - 26px);
        position: absolute;
        right: 0;
        padding: 0 4px;
    }

    #conversation-group #conversation-scroll div {
        width: 8px;
        margin: 0 1px;
        background: #00173b;
        opacity: 0;
        top: 0;
        position: absolute;
        border-radius: 4px;
        cursor: pointer;
        transition:
            opacity 0.1s ease-in-out,
            width 0.1s ease-in-out,
            margin 0.1s ease-in-out;
        z-index: 2;
        user-select: none;
    }

    #conversation-group:hover #conversation-scroll div {
        body:not(.mobile) &,
        #body:not(.mobile) & {
            opacity: 0.16;
        }
    }

    #conversation-group #conversation-scroll div:hover {
        body:not(.mobile) &,
        #body:not(.mobile) & {
            opacity: 0.32;
            width: 10px;
            margin: 0;
        }
    }

    hr {
        margin: 0;
        border: 0;
        border-bottom: 1px solid #dbdfe6;
    }

    input,
    textarea {
        &.disabled {
            cursor: not-allowed;
            color: #8894ab;
        }
    }

    button,
    label {
        &.material-icons {
            position: relative;
            z-index: 1;
            margin: 15px 0 8px 11px;
            float: right;
            svg {
                fill: #8894ab;
                &.options-icon {
                    fill: currentColor;
                }
            }

            &::before {
                content: '';
                position: absolute;
                background: #eff2f6;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                z-index: -1;
                transition: all 0.16s ease-in-out;
                transform: scale(0);
                top: calc(50% - 22px);
                left: calc(50% - 20px);
            }
            &:hover::before {
                body:not(.mobile) &,
                #body:not(.mobile) & {
                    transform: scale(1);
                }
            }
            &:focus {
                svg {
                    fill: currentColor;
                }
                svg.bots-icon {
                    fill: var(--custom-action-color, #0566ff);
                }
            }

            &.disabled svg,
            &.disabled:focus svg {
                fill: #c9cbd8;
            }
        }
    }

    .input-group {
        padding-inline: var(--chat-padding, 24px);
        padding-bottom: 16px;
        width: 100%;
        position: relative;
        background: #fff;
        z-index: 3;
        flex: 0 0 auto;

        &.drag-active .drag-active-wrapper::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.7);
            z-index: 1;
            animation: fade-in 0.3s ease;
        }

        .footer-input-wrapper,
        .footer-icons-wrapper {
            transition: all 0.5s ease-in-out;
            opacity: 1;
            transform: translateY(0);
            &.hidden {
                transform: translateY(10px);
                pointer-events: none;
                opacity: 0;
            }
        }
        .footer-icons-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }

    .emoji-wrapper {
        height: 215px;
        position: absolute;
        overflow: hidden;
        width: 340px;
        bottom: 100%;
        z-index: 10;
        left: 18px;
    }

    .emoji-mart {
        border: 0;
        position: absolute;
        width: 100% !important;
        height: 100%;
        right: 0;
        input:focus {
            border: 1px solid #d9d9d9;
        }
        &-scroll {
            height: 140px;
        }
        .emoji-mart-emoji {
            cursor: pointer;
            span {
                cursor: pointer;
            }
        }
    }
    .emoji-mart-anchor {
        -ms-flex: 1 1 auto;
    }

    .bots-dropdown {
        position: absolute;
        top: 72px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 6px 32px 0 rgba(0, 18, 46, 0.16);
        padding: 12px 6px;
        z-index: 6;
        transition: all 0.2s ease-in-out;
        right: 24px;

        ul {
            margin: 0;
            padding: 0;

            li {
                border-radius: 6px;
                display: flex;
                &:nth-of-type(2) button {
                    svg {
                        fill: #ffb926;
                    }
                }
            }
        }

        li button {
            padding: 8px 16px;
            display: flex;
            margin: 0;
            position: initial;
            float: initial;
            width: 100%;
            border-radius: 6px;

            &:hover,
            &:focus {
                body:not(.mobile) &,
                #body:not(.mobile) & {
                    background: #eff2f6;
                }
            }

            svg,
            &:focus svg {
                fill: #8894ab;
                height: 22px;
                width: 22px;
            }

            span {
                margin-left: 10px;
                color: #06132b;
            }

            &::before {
                content: none;
            }
        }
    }

    .bots-dropdown {
        top: auto;
        bottom: 0;
        transform: translateY(-60px);
        max-height: 275px;
        width: max-content;
        overflow-y: auto;
        z-index: 11;
        right: auto;
        left: 0px;

        ul {
            li {
                padding: 0;
                span {
                    cursor: pointer;
                    padding: 8px 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    width: 100%;
                    svg {
                        width: 22px;
                        height: 22px;
                    }
                }
            }
        }
        ul.bots-cancel {
            span {
                color: #0ab6ff;
                display: flex;
                align-items: center;
            }
            svg {
                fill: red;
            }
        }
    }

    .emoji-switch.active svg {
        fill: currentColor;
    }

    @keyframes scale-up {
        0% {
            transform: scale(0.8);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .chat-in-preview--tour {
        .exit-chat,
        .options-icon {
            opacity: 0.3;
        }
        .input-group {
            opacity: 0.4;
        }
    }
`;
export default chatStyles;
