import { css } from '@emotion/react';

const globalStyles = css`
    html,
    :host {
        box-sizing: border-box !important;
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    input::placeholder,
    textarea::placeholder {
        color: #8894ab;
        opacity: 1;
    }

    input:focus,
    input:active,
    textarea:focus,
    textarea:active,
    select:focus,
    select:active {
        border: 0;
        outline: 0;
    }

    table {
        border-spacing: 0;
    }

    i {
        user-select: none;
    }

    ul {
        list-style-type: none;
    }

    p {
        margin: 0;
    }

    .emoji {
        width: 20px;
        margin: 0 2px -5px 2px;
        user-select: none;
    }

    .lang-rtl {
        /*! @noflip */
        direction: rtl;
        unicode-bidi: embed;
    }

    .widget-position-left {
        .chat {
            right: 26px;
            left: auto;
            .mobile & {
                /*! @noflip */
                right: 0;
            }
        }
        #button {
            &:not(.sidebar) {
                /*! @noflip */
                left: 0px;
                /*! @noflip */
                right: auto;
            }
            &.bubbleAnimation-exit {
                right: 0px;
                left: auto;
            }
            &.chat-open {
                right: 0px;
                left: auto;
                .mobile & {
                    right: 0px;
                    left: auto;
                }
            }
        }
    }

    .lang-rtl .directional-icon {
        transform: scaleX(-1);
    }

    @media print {
        .frame-content {
            display: none !important;
        }
    }

    .grid-layout {
        &.widget-position-right {
            position: absolute;
            inset: 0 0 0 auto;
        }
        &.sidebar-position-right:has(.sidebar) {
            position: absolute;
            inset: 0 0 0 auto;
        }

        &.widget-position-left {
            position: absolute;
            inset: 0 auto 0 0;
        }
        &.sidebar-position-left:has(.sidebar) {
            position: absolute;
            inset: 0 auto 0 0;
        }

        &.mobile.chat-on-site {
            position: fixed;
        }
        &:not(.mobile).chat-on-site {
            inset: 0;
            margin: 20px auto;
        }
        & > * {
            pointer-events: auto;
        }

        max-width: 372px;

        margin: 24px 24px 52px 24px;
        &.mobile {
            margin: 14px;
        }
        &:has(.sidebar) {
            margin: 0;
        }

        display: grid;
        grid-template:
            'content' 1fr
            'bubble' auto;
        gap: 12px;

        .flyMessage {
            grid-area: content;
            min-width: 220px;
            max-width: 320px;
            padding: 10px;

            .message-container {
                padding: 10px 10px 1px;
                max-width: 320px;
                font-size: 14px;
                line-height: 18px;
                :after {
                    display: none;
                }
                &.image-content {
                    margin: -10px -10px 0;
                    border-top-left-radius: var(--radius-surface);
                    border-top-right-radius: var(--radius-surface);
                    padding: 0;
                    width: 320px;
                    max-width: calc(100% + 20px);
                    span {
                        margin-top: 20px;
                        padding-inline: 20px;
                    }
                    .image-preview {
                        border-radius: 0;
                    }
                }
            }
            .input-group {
                padding: 20px 10px 10px;
                border: none;
                display: flex;
                .fly-new-message-button {
                    padding: 12px 16px;
                    border-radius: var(--radius-component);
                    border: 1px solid rgb(211, 219, 229);
                    font-size: 14px;
                    line-height: 18px;
                    flex: 1;
                }
            }
            .button-wrapper {
                border-top: 1px solid rgb(211, 219, 229);
                padding-top: 20px;
                display: flex;
                flex-direction: column;
                gap: 8px;
                align-items: flex-start;
                button,
                .button-url {
                    font-size: 14px;
                    line-height: 18px;
                    margin: 0;
                }
                button.more-replies {
                    width: 32px;
                    height: 18px;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    align-self: flex-start;
                }
            }
        }
        .chat {
            grid-area: content;
            position: absolute;
            inset: auto 0 0;
            justify-self: center;
            align-self: end;
            max-height: 100%;
            .mobile& {
                position: fixed;
            }
        }
        &:not(.mobile).chat-on-site {
            .chat {
                align-self: center;
                inset: auto 0;
            }
        }
        #button:not(.sidebar) {
            grid-area: bubble;
            position: relative;
            inset: 0;
            width: auto;
            height: auto;
            justify-self: right;
            transform-origin: bottom right;
            .widget-position-left& {
                justify-self: left;
            }
            .mobile & {
                transform: none;
                transform-origin: bottom right;
            }
            .mobile .widget-position-left& {
                transform-origin: bottom left;
            }
        }
        .widgetLabel {
            grid-area: bubble;
            justify-self: right;
            bottom: initial;
            align-self: center;
            right: 68px !important;
            .widget-position-left& {
                justify-self: left;
                right: initial !important;
                left: 68px !important;
            }
        }

        #new-message,
        #dnd-indicator {
            top: -4px;
            right: -4px;
        }
        #button {
            #new-message:not(:last-child) {
                right: 4px;
            }
            #new-message + #dnd-indicator:last-child {
                right: -8px;
            }
        }
        .flyMessage {
            inset: initial;
            align-self: end;
            justify-self: end;
            margin: 0;
            .widget-position-left& {
                justify-self: start;
            }
        }
    }
`;
export default globalStyles;
