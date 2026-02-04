import { css } from '@emotion/react';

const widgetBubbleStyles = css`
    body {
        overflow: hidden;
        margin: 0;
    }

    svg {
        fill: #fff;
        transition: all 0.2s ease-in-out;
    }

    #button {
        position: absolute;
        width: 112px;
        height: 140px;
        bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 1;
        /*! @noflip */
        right: 0;

        &.chat-open:not(.sidebar) {
            right: 0;
            left: auto;
        }

        button {
            i {
                height: 26px;
                width: 26px;
                position: absolute;
                opacity: 0;
                transition: all 0.2s ease-in-out;
                display: flex;
                align-items: center;
                justify-content: center;
                &.active {
                    opacity: 1;
                }

                &.type1 {
                    svg {
                        fill: currentColor;
                    }
                    &.for-opened {
                        width: 28px;
                        height: 28px;
                        svg {
                            width: 28px;
                            height: 28px;
                        }
                    }
                }

                &.for-closed {
                    /*! @noflip */
                    transform: translateX(-10px);
                    &.active {
                        /*! @noflip */
                        transform: translateX(0);
                    }
                }

                &.for-opened {
                    /*! @noflip */
                    transform: translateX(10px);
                    &.active {
                        /*! @noflip */
                        transform: translateX(0);
                    }
                }
            }
            &:hover,
            &:focus {
                transform: scale(1.1);
            }
            &:active {
                transform: scale(0.9);
            }
        }

        .sidebar-content:hover {
            ~ #button-body {
                body:not(.mobile) &,
                #body:not(.mobile) & {
                    transform: scale(1.1);
                }
            }
        }

        &.sidebar {
            width: 50px;
            pointer-events: auto;
            bottom: calc(50% - 100px);
            svg {
                width: 15px;
                height: 15px;
            }

            .sidebar-position-left & {
                /*! @noflip */
                left: 0;
                /*! @noflip */
                right: auto;

                .sidebar-content {
                    /*! @noflip */
                    transform-origin: left top;
                    /*! @noflip */
                    transform: rotate(270deg);
                    /*! @noflip */
                    left: 0;
                    /*! @noflip */
                    right: auto;
                    /*! @noflip */
                    border-bottom-right-radius: 4px;
                    /*! @noflip */
                    border-bottom-left-radius: 28px;
                    /*! @noflip */
                    padding: 0 20px 0 30px;
                }

                #button-body {
                    /*! @noflip */
                    left: 7px;
                }
            }

            .sidebar-content {
                //INFO: Sidebar is rotated by 90deg with handle on top right corner to make it stick to the side of a browser
                // and still be able to somehow control it with css bottom value instead of top;
                // Sidebar content is then rotated by 180 deg so it will appear as rotated by 270deg as per design.

                background: #313fa0;
                color: #fff;
                /*! @noflip */
                padding: 0 30px 0 20px;
                font-size: 14px;
                line-height: 30px;
                height: 30px;
                font-weight: 700;
                position: relative;
                overflow: hidden;
                /*! @noflip */
                border-bottom-right-radius: 28px;
                /*! @noflip */
                border-bottom-left-radius: 4px;
                /*! @noflip */
                transform: rotate(90deg);
                /*! @noflip */
                transform-origin: right top;
                position: absolute;
                bottom: 0;
                /*! @noflip */
                right: 0;
                white-space: nowrap;
                max-width: 400px;

                span {
                    display: inline-block;
                    transform: rotate(180deg);
                    max-width: 265px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                &:hover {
                    cursor: pointer;
                }
            }
            #button-body {
                position: absolute;
                /*! @noflip */
                right: 7px;
                bottom: 20px;
                width: 32px;
                height: 32px;
                box-shadow: 0 6px 20px 0 rgba(0, 18, 46, 0.24);
            }
            button {
                i.material-icons.type1 {
                    width: 15px;
                    height: 15px;
                }
            }
        }
    }

    #button-body {
        width: var(--bubble-size, 60px);
        height: var(--bubble-size, 60px);
        border-radius: 28px;
        display: inherit;
        align-items: center;
        justify-content: center;
        pointer-events: initial;
        background-size: 130% 130%;
        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        color: #0566ff;
        background: var(--custom-background);

        &::before {
            content: '';
            transition: opacity 0.5s ease-in-out;
            position: absolute;
            top: -1px;
            right: -1px;
            bottom: -1px;
            left: -1px;
            opacity: 0;
            border-radius: 50%;
            background-color: #c6ccdc;
        }

        &:hover,
        &:focus {
            outline: none;
            body:not(.mobile) &,
            #body:not(.mobile) & {
                transform: scale(1.1);
            }
        }
        &:active {
            outline: none;
            body:not(.mobile) &,
            #body:not(.mobile) & {
                transform: scale(0.9);
            }
        }
    }

    #new-message,
    #dnd-indicator {
        position: absolute;
        top: 37px;
        font-weight: 700;
        color: #fff;
        right: 23px;
        pointer-events: none;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 20px;
        height: 20px;
    }

    #new-message {
        font-size: 12px;
        background: #e81332;
        z-index: 2;
        line-height: 16px;
        padding: 2px 4px;

        & + #dnd-indicator {
            right: 12px;
        }

        &.active {
            animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
    }

    #dnd-indicator {
        background: #fff;
        outline: 1px solid #e2e8ef;
        color: #080f1a;
        z-index: 1;

        svg {
            fill: #080f1a;
            width: 16px;
            height: 16px;
        }
    }
`;
export default widgetBubbleStyles;
