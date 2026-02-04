import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { views } from '../../helpers/views';

import { getSidebarPosition, getView } from '../../store/selectors';
import CSSAnimation from '../Animations/CSSAnimation';
import Chat from '../Chat/Chat';
import FlyMessage from '../FlyMessage/FlyMessage';
import { useVideoCallOffer } from '../VideoCall/VideoCallContext';
import WidgetBubble from '../WidgetBubble/WidgetBubble';
import ChatOpeningAnimation from './ChatOpeningAnimation';

const AppWithSidebar = (): ReactElement => {
    const view = useSelector(getView);
    const sidebarPosition = useSelector(getSidebarPosition);
    const hasVideoCall = Boolean(useVideoCallOffer().state);

    const isNotClosed = view !== views.closed;
    return (
        <ChatOpeningAnimation>
            {({ hasAnimationEnded, onAnimationEnded }): ReactElement => (
                <>
                    <CSSAnimation
                        in={view === views.fly && hasAnimationEnded}
                        classNames="moveFromRight"
                        timeout={300}
                        onExited={
                            view === views.closed || view === views.fly
                                ? onAnimationEnded
                                : undefined
                        }
                    >
                        <FlyMessage />
                    </CSSAnimation>
                    <CSSAnimation
                        in={isNotClosed && view !== views.fly && hasAnimationEnded}
                        classNames="moveFromRight"
                        timeout={300}
                        onExited={onAnimationEnded}
                    >
                        <Chat />
                    </CSSAnimation>
                    <CSSAnimation
                        in={!isNotClosed && !hasAnimationEnded}
                        classNames={`${
                            sidebarPosition && sidebarPosition === 'left'
                                ? 'bubbleAnimationLeft'
                                : 'bubbleAnimation'
                        }`}
                        timeout={300}
                        onExited={onAnimationEnded}
                    >
                        <WidgetBubble isSidebarComponent />
                    </CSSAnimation>
                    <CSSAnimation
                        in={
                            isNotClosed &&
                            hasAnimationEnded &&
                            !(view === views.chat && hasVideoCall)
                        }
                        timeout={300}
                        classNames="bubbleAnimation"
                    >
                        <WidgetBubble />
                    </CSSAnimation>
                </>
            )}
        </ChatOpeningAnimation>
    );
};

AppWithSidebar.defaultProps = {
    sidebarPosition: 'right',
};

export default AppWithSidebar;
