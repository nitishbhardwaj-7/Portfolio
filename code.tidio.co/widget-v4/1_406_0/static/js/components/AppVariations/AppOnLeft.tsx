import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { views } from '../../helpers/views';

import { getView, getWidgetLabelStatus } from '../../store/selectors';
import CSSAnimation from '../Animations/CSSAnimation';
import Chat from '../Chat/Chat';
import FlyMessage from '../FlyMessage/FlyMessage';
import { useVideoCallOffer } from '../VideoCall/VideoCallContext';
import WidgetBubble from '../WidgetBubble/WidgetBubble';
import WidgetLabel from '../WidgetLabel/WidgetLabel';
import ChatOpeningAnimation from './ChatOpeningAnimation';

const AppOnLeft = (): ReactElement => {
    const view = useSelector(getView);
    const widgetLabelEnabled = useSelector(getWidgetLabelStatus);
    const hasVideoCall = Boolean(useVideoCallOffer().state);
    const isNotClosed = view !== views.closed;
    return (
        <ChatOpeningAnimation>
            {({ hasAnimationEnded, onAnimationEnded }): ReactElement => (
                <>
                    <CSSAnimation
                        in={view === views.fly}
                        classNames="moveFromRight"
                        onExited={view === views.closed ? onAnimationEnded : undefined}
                        timeout={300}
                    >
                        <FlyMessage />
                    </CSSAnimation>
                    <CSSAnimation
                        in={isNotClosed && view !== views.fly && hasAnimationEnded}
                        classNames="moveFromRight"
                        onExited={onAnimationEnded}
                        timeout={400}
                    >
                        <Chat />
                    </CSSAnimation>
                    {widgetLabelEnabled && (
                        <CSSAnimation
                            in={!isNotClosed && view !== views.fly && !hasAnimationEnded}
                            classNames="moveFromLeftLabel"
                            timeout={300}
                        >
                            <WidgetLabel />
                        </CSSAnimation>
                    )}
                    <CSSAnimation
                        in={!isNotClosed && !hasAnimationEnded}
                        classNames="bubbleAnimationReturn"
                        timeout={300}
                        onExited={onAnimationEnded}
                    >
                        <WidgetBubble />
                    </CSSAnimation>
                    <CSSAnimation
                        in={
                            isNotClosed &&
                            hasAnimationEnded &&
                            !(view === views.chat && hasVideoCall)
                        }
                        classNames="bubbleAnimation"
                        timeout={300}
                        onExited={view === views.fly ? onAnimationEnded : undefined}
                    >
                        <WidgetBubble />
                    </CSSAnimation>
                </>
            )}
        </ChatOpeningAnimation>
    );
};

export default AppOnLeft;
