import { css } from '@emotion/react';

const mobileStyles = css`
    @keyframes ripple {
        from {
            background: rgba(239, 242, 246, 0);
            transform: scale(0.5);
        }
        50% {
            background: rgba(239, 242, 246, 0.6);
            transform: scale(1);
        }
        to {
            background: rgba(239, 242, 246, 0);
            transform: scale(2);
        }
    }

    .mobile {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        .chat {
            width: 100%;
            height: 100%;
            bottom: 0;
            background: #fff;
            display: flex;
            flex-direction: column;
            border-radius: 0;
            right: 0;
            left: auto;
            max-height: none;
        }
        .input-group {
            align-self: flex-end;
            textarea {
                padding-right: 50px;
            }
            button,
            .button-url {
                margin-bottom: 0;
            }
        }
        #conversation-group {
            max-height: none;
            flex: 1 1 auto;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
        }
        #button {
            width: 80px;
            height: 100px;
            bottom: 0;
            transition: transform 0.2s;
            transform: translateY(-12px);
            &.chat-open {
                right: 0px;
                left: auto;
            }
            /*! @noflip */
            right: 0px;
            /*! @noflip */
            left: auto;
            &.sidebar {
                width: 50px;
            }
            &.chat-closed:not(.sidebar) {
                &.mobile-size {
                    &__small {
                        transform: scale(0.6);
                    }
                    &__medium {
                        transform: scale(0.8);
                    }
                }
            }
        }

        #new-message {
            top: 17px;
            right: 13px;
            & + #dnd-indicator {
                right: 2px;
            }
            &.active {
                animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
            }
        }

        #dnd-indicator {
            top: 17px;
            right: 13px;
        }
        // How briliant it is, just look at it!
        button.ripple {
            touch-action: manipulation;
            &::after {
                content: '';
                position: absolute;
                height: 50px;
                width: 0px;
                top: calc(50% - 25px);
                background: rgba(239, 242, 246, 0);
                border-radius: 50%;
                z-index: -1;
                will-change: transform, opacity;
                left: calc(50% - 25px);
            }

            &:not(:active)::after {
                animation: ripple 0.3s ease-in-out;
                transition: width 0.3s step-end;
            }

            &:active::after {
                width: 50px;
                transition: width 0s step-start;
            }
        }
        .widget-position-left #button.chat-open {
            right: 0;
            left: auto;
        }

        .chat-header {
            padding: 12px 16px 16px;
        }
    }
`;
export default mobileStyles;
