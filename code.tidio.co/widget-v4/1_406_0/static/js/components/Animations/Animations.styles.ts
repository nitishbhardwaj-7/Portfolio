import { css } from '@emotion/react';

const animationStyles = css`
    .botsListFade-enter {
        opacity: 0;
        transform: translateY(-52px);
        &.botsListFade-enter-active {
            opacity: 1;
            transform: translateY(-60px);
        }
    }
    .botsListFade-appear {
        opacity: 0;
        transform: translateY(-52px);
        &.botsListFade-appear-active {
            opacity: 1;
            transform: translateY(-60px);
        }
    }
    .botsListFade-exit {
        opacity: 1;
        transform: translateY(-60px);
        &.botsListFade-exit-active {
            opacity: 0;
            transform: translateY(-52px);
        }
    }

    .fade-enter {
        opacity: 0.01;
        &.fade-enter-active {
            transition: opacity 0.3s;
            opacity: 1;
        }
    }

    .fade-exit {
        opacity: 1;
        transition: opacity 0.3s;
        &.fade-exit-active {
            opacity: 0.01;
        }
    }

    .fade200-enter {
        opacity: 0.01;
        &.fade200-enter-active {
            transition: opacity 0.2s;
            opacity: 1;
        }
    }

    .fade200-exit {
        opacity: 1;
        transition: opacity 0.2s;
        &.fade200-exit-active {
            opacity: 0.01;
        }
    }

    .emojiFade-enter {
        opacity: 0.01;
        bottom: calc(100% - 10px);
        &.emojiFade-enter-active {
            opacity: 1;
            bottom: 100%;
            transition: all 0.3s;
        }
    }

    .emojiFade-exit {
        opacity: 1;
        bottom: 100%;
        transition: all 0.3s;
        &.emojiFade-exit-active {
            opacity: 0.01;
            bottom: calc(100% - 10px);
        }
    }

    .scale-enter {
        transform: scale(0.01);
        opacity: 0;
        &.scale-enter-active {
            transform: scale(1);
            opacity: 1;
        }
    }

    .scale-exit {
        transform: scale(1);
        opacity: 1;
        &.scale-exit-active {
            transform: scale(0.01);
            opacity: 0;
        }
    }

    #button.sidebar {
        transition:
            opacity 0.3s,
            transform 0.3s;
        &.bubbleAnimation-appear {
            transform: translateX(8px);
            opacity: 0.01;
        }
        &.bubbleAnimation-appear-active {
            opacity: 1;
            transform: translateX(0px);
        }

        &.bubbleAnimation-enter {
            transform: translateX(8px);
            opacity: 0.01;
        }
        &.bubbleAnimation-enter-active {
            opacity: 1;
            transform: translateX(0px);
        }

        &.bubbleAnimation-exit {
            opacity: 1;
            transform: translateX(0px);
        }
        &.bubbleAnimation-exit-active {
            transform: translateX(8px);
            opacity: 0.01;
        }
    }
    [class~='sidebar-enabled']:not([class~='grid-layout']) .chat + #button:not(.sidebar) {
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
    }
    #button:not(.sidebar) {
        &.bubbleAnimation-appear {
            transform: translateX(8px);
            opacity: 0.01;

            &.bubbleAnimation-appear-active {
                opacity: 1;
                transform: translateX(0px);
                transition:
                    opacity 0.3s,
                    transform 0.3s;
            }
        }

        &.bubbleAnimation-enter {
            transform: translateX(8px);
            opacity: 0.01;
            &.bubbleAnimation-enter-active {
                opacity: 1;
                transform: translateX(0px);
            }
        }

        &.bubbleAnimation-exit {
            opacity: 1;
            transform: translateX(0px);
            .lang-rtl & {
                display: none;
            }
            &.bubbleAnimation-exit-active {
                transform: translateX(8px);
                opacity: 0.01;
            }
        }
    }
    .widget-position-left #button:not(.sidebar) {
        &.bubbleAnimation-appear {
            transform: translateX(-8px);
            opacity: 0.01;

            &.bubbleAnimation-appear-active {
                opacity: 1;
                transform: translateX(0px);
                transition:
                    opacity 0.3s,
                    transform 0.3s;
            }
        }

        &.bubbleAnimation-enter {
            transform: translateX(-8px);
            opacity: 0.01;
            &.bubbleAnimation-enter-active {
                opacity: 1;
                transform: translateX(0px);
            }
        }

        &.bubbleAnimation-exit {
            opacity: 1;
            transform: translateX(0px);
            .lang-rtl & {
                display: none;
            }
            &.bubbleAnimation-exit-active {
                transform: translateX(-8px);
                opacity: 0.01;
            }
        }
        .mobile & {
            &.bubbleAnimation-exit {
                display: none;
            }
            &.bubbleAnimationReturn-exit-active {
                display: none;
            }
        }
    }

    .widget-position-left #button:not(.sidebar) {
        &.bubbleAnimationReturn-appear {
            opacity: 0.01;
            &.bubbleAnimationReturn-appear-active {
                opacity: 1;
                transition: opacity 0.3s;
            }
        }

        &.bubbleAnimationReturn-enter {
            opacity: 0.01;
            &.bubbleAnimationReturn-enter-active {
                opacity: 1;
                transition: opacity 0.3s;
            }
        }

        &.bubbleAnimationReturn-exit {
            opacity: 1;
            &.bubbleAnimationReturn-exit-active {
                opacity: 0.01;
            }
        }
        .mobile & {
            &.bubbleAnimation-exit {
                display: none;
            }
            &.bubbleAnimationReturn-exit-active {
                display: none;
            }
        }
    }

    .sidebar-position-left #button.sidebar {
        &.bubbleAnimationLeft-exit {
            opacity: 1;
            /*! @noflip */
            left: 0px;
        }
        &.bubbleAnimationLeft-exit-active {
            /*! @noflip */
            left: -8px;
            opacity: 0.01;
            transition:
                opacity 0.3s,
                left 0.3s;
        }
        &.bubbleAnimationLeft-appear {
            /*! @noflip */
            left: -8px;
            opacity: 0.01;
        }
        &.bubbleAnimationLeft-appear-active {
            opacity: 1;
            /*! @noflip */
            left: 0px;
        }

        &.bubbleAnimationLeft-enter {
            /*! @noflip */
            left: -8px;
            opacity: 0.01;
        }
        &.bubbleAnimationLeft-enter-active {
            opacity: 1;
            /*! @noflip */
            left: 0px;
        }
    }

    .moveFromRight-appear {
        transform: translateX(8px);
        opacity: 0.01;

        &.moveFromRight-appear-active {
            opacity: 1;
            transform: translateX(0px);
            transition:
                opacity 0.3s,
                transform 0.3s;
        }
    }

    .moveFromRight-enter {
        transform: translateX(8px);
        opacity: 0.01;
        &.moveFromRight-enter-active {
            opacity: 1;
            transform: translateX(0px);
            transition:
                opacity 0.3s,
                transform 0.3s;
        }
    }

    .moveFromRight-exit {
        opacity: 1;
        transform: translateX(0px);
        transition:
            opacity 0.3s,
            transform 0.3s;
        &.moveFromRight-exit-active {
            transform: translateX(8px);
            opacity: 0.01;
        }
    }

    .moveFromRightLabel-appear {
        /*! @noflip */
        right: 92px;
        opacity: 0.01;
        &.moveFromRightLabel-appear-active {
            opacity: 1;
            /*! @noflip */
            right: 100px;
            transition:
                opacity 0.3s,
                right 0.3s;
        }
    }

    .moveFromRightLabel-enter {
        /*! @noflip */
        right: 92px;
        opacity: 0.01;
        &.moveFromRightLabel-enter-active {
            opacity: 1;
            /*! @noflip */
            right: 100px;
            transition:
                opacity 0.3s,
                right 0.3s;
        }
    }

    .moveFromRightLabel-exit {
        opacity: 1;
        /*! @noflip */
        right: 100px;
        transition:
            opacity 0.3s,
            right 0.3s;
        &.moveFromRightLabel-exit-active {
            /*! @noflip */
            right: 92px;
            opacity: 0.01;
        }
    }

    .moveFromLeftLabel-appear {
        /*! @noflip */
        transform: translateX(-8px);
        opacity: 0.01;
        &.moveFromLeftLabel-appear-active {
            opacity: 1;
            /*! @noflip */
            transform: translateX(0px);
            transition:
                opacity 0.3s,
                transform 0.3s;
        }
    }

    .moveFromLeftLabel-enter {
        /*! @noflip */
        transform: translateX(-8px);
        opacity: 0.01;
        &.moveFromLeftLabel-enter-active {
            opacity: 1;
            /*! @noflip */
            transform: translateX(0px);
            transition:
                opacity 0.3s,
                transform 0.3s;
        }
    }

    .moveFromLeftLabel-exit {
        opacity: 1;
        /*! @noflip */
        transform: translateX(0px);
        transition:
            opacity 0.3s,
            transform 0.3s;
        &.moveFromLeftLabel-exit-active {
            /*! @noflip */
            transform: translateX(-8px);
            opacity: 0.01;
        }
    }

    body:not(.mobile) .widget-position-left .chat,
    #body:not(.mobile) .widget-position-left .chat {
        &.moveFromRight-appear {
            transform: translateX(8px);
            opacity: 0.01;

            &.moveFromRight-appear-active {
                opacity: 1;
                transform: translateX(0px);
                transition:
                    opacity 0.3s,
                    transform 0.3s;
            }
        }

        &.moveFromRight-enter {
            transform: translateX(8px);
            opacity: 0.01;
            &.moveFromRight-enter-active {
                opacity: 1;
                transform: translateX(0px);
                transition:
                    opacity 0.3s,
                    transform 0.3s;
            }
        }

        &.moveFromRight-exit {
            opacity: 1;
            transform: translateX(0px);
            transition:
                opacity 0.3s,
                transform 0.3s;
            &.moveFromRight-exit-active {
                transform: translateX(8px);
                opacity: 0.01;
            }
        }
    }

    .operatorTyping-enter {
        opacity: 0.01;
        transform: translateY(10px);
        &.operatorTyping-enter-active {
            transform: translateY(0px);
            transition:
                opacity 0.3s,
                transform 0.3s;
            opacity: 1;
        }
    }

    .operatorTyping-exit {
        display: none;
    }
`;
export default animationStyles;
