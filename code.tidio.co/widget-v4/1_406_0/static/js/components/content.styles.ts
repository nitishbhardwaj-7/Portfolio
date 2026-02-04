import asesomeIframeStyles from '../styles/awesomeIframe.styles';
import globalStyles from '../styles/global.styles';
import interFontStyles from '../styles/interFont.styles';
import mobileStyles from '../styles/mobile.styles';
import mulishFontStyles from '../styles/mulishFont.styles';
import tempDuplicates from '../styles/tempDuplicates.styles';
import emojiStyles from '../styles/vendor/emoji-mart.styles';
import animationStyles from './Animations/Animations.styles';
import chatStyles from './Chat/Chat.styles';
import messageStyles from './Message/Message.styles';
import widgetBubble from './WidgetBubble/WidgetBubble.styles';

const contentStyles = [
    tempDuplicates,
    widgetBubble,
    emojiStyles,
    chatStyles,
    animationStyles,
    messageStyles,
    mobileStyles,
    asesomeIframeStyles,
    globalStyles,
];

export const newSkinContentStyles = [...contentStyles, interFontStyles];
export const oldSkinContentStyles = [...contentStyles, mulishFontStyles];

export default { newSkinContentStyles, oldSkinContentStyles };
