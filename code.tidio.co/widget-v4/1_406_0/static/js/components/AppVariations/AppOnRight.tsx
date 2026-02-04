import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { views } from '../../helpers/views';

import { getView, getWidgetLabelStatus } from '../../store/selectors';
import { DefaultRootState } from '../../store/typings';
import CSSAnimation from '../Animations/CSSAnimation';
import Chat from '../Chat/Chat';
import FlyMessage from '../FlyMessage/FlyMessage';
import { useVideoCallOffer } from '../VideoCall/VideoCallContext';
import WidgetBubble from '../WidgetBubble/WidgetBubble';
import WidgetLabel from '../WidgetLabel/WidgetLabel';
import ChatOpeningAnimation from './ChatOpeningAnimation';

const noop = (): void => {};

const AppOnRight = (): ReactElement => {
    const view = useSelector(getView);
    const isMobile = useSelector((state: DefaultRootState) => state.isMobile);
    const widgetLabelEnabled = useSelector(getWidgetLabelStatus);
    const hasVideoCall = Boolean(useVideoCallOffer().state);

    const isNotClosed = view !== views.closed;
    if (isMobile) {
        return (
            <>
                <CSSAnimation in={view === views.fly} classNames="moveFromRight" timeout={300}>
                    <FlyMessage />
                </CSSAnimation>
                <CSSAnimation
                    in={isNotClosed && view !== views.fly}
                    classNames="moveFromRight"
                    timeout={300}
                >
                    <Chat />
                </CSSAnimation>
                <CSSAnimation
                    in={!(view === views.chat && hasVideoCall)}
                    classNames="bubbleAnimation"
                >
                    <WidgetBubble />
                </CSSAnimation>
            </>
        );
    }

    // desktop
    return (
        <ChatOpeningAnimation>
            {({ hasAnimationEnded, onAnimationEnded }): ReactElement => (
                <>
                    <CSSAnimation
                        in={view === views.fly}
                        classNames="moveFromRight"
                        timeout={300}
                        onExited={view === views.closed ? onAnimationEnded : noop}
                    >
                        <FlyMessage />
                    </CSSAnimation>
                    <CSSAnimation
                        in={isNotClosed && view !== views.fly}
                        classNames="moveFromRight"
                        timeout={300}
                        onExited={onAnimationEnded}
                    >
                        <Chat />
                    </CSSAnimation>
                    {widgetLabelEnabled && (
                        <CSSAnimation
                            in={!isNotClosed && view !== views.fly && hasAnimationEnded}
                            classNames="moveFromRightLabel"
                            onExited={onAnimationEnded}
                            timeout={300}
                        >
                            <WidgetLabel />
                        </CSSAnimation>
                    )}

                    <CSSAnimation
                        in={!(view === views.chat && hasVideoCall)}
                        classNames="bubbleAnimation"
                        onEntered={onAnimationEnded}
                    >
                        <WidgetBubble />
                    </CSSAnimation>
                </>
            )}
        </ChatOpeningAnimation>
    );
};

export default AppOnRight;
