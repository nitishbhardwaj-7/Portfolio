import { css } from '@emotion/react';

const asesomeIframeStyles = css`
    .awesome-iframe {
        .onlyBubble,
        .bubbleWithLabel {
            #button {
                height: 94px;
                width: 94px;
                bottom: 0;
            }
        }

        .widget-position-left {
            .widgetLabel {
                /*! @noflip */
                left: 100px;
            }

            &.bubbleWithLabel .widgetLabel {
                /*! @noflip */
                left: 91px;
            }
        }

        .widget-position-right {
            .widgetLabel {
                /*! @noflip */
                right: 100px;
            }

            &.bubbleWithLabel .widgetLabel {
                /*! @noflip */
                right: 91px;
            }
        }

        .bubbleWithLabel .widgetLabel {
            bottom: 26px;
        }

        .widgetLabel {
            bottom: 61px;
            transition-property: opacity;
        }

        &.mobile {
            .chat + .chat-closed {
                bottom: 0 !important;
            }

            .flyMessage + .chat-closed {
                bottom: 0 !important;
            }
        }

        [class*='chatSize'] .chat-closed #dnd-indicator {
            transition: none;
        }

        .onlyBubble,
        .bubbleWithLabel {
            #new-message,
            #dnd-indicator {
                top: 14px;
                right: 14px;
                transition: none;
            }

            #new-message + #dnd-indicator {
                right: 3px;
            }
        }

        .onlyBubbleLarge {
            #new-message,
            #dnd-indicator {
                top: 14px;
                right: 20px;
                transition: none;
            }

            #new-message + #dnd-indicator {
                right: 10px;
            }
        }

        .onlyBubbleMedium {
            #new-message,
            #dnd-indicator {
                top: 7px;
                transition: none;
            }
        }

        .onlyBubbleSmall {
            #new-message,
            #dnd-indicator {
                top: -3px;
                transition: none;
                right: 3px;
            }

            #new-message + #dnd-indicator {
                right: -7px;
            }
        }

        .onlyBubbleSmall,
        .onlyBubbleMedium,
        .onlyBubbleLarge {
            #button {
                transition: none;
                transform: translateY(0);
            }
        }

        .onlyBubbleSmall #button {
            width: 60px;
            height: 60px;
        }

        .onlyBubbleMedium #button {
            width: 80px;
            height: 80px;
        }

        .onlyBubbleLarge #button {
            width: 94px;
            height: 94px;
        }
    }
`;
export default asesomeIframeStyles;
