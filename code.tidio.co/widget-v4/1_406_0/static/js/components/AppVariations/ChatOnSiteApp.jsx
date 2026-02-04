import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { views } from '../../helpers/views';

import { getView } from '../../store/selectors';
import CSSAnimation from '../Animations/CSSAnimation';
import Chat from '../Chat/Chat';
import FlyMessage from '../FlyMessage/FlyMessage';
import WidgetBubble from '../WidgetBubble/WidgetBubble';
import ChatOpeningAnimation from './ChatOpeningAnimation';

const ChatOnSiteApp = (props) => {
    if (props.widgetPosition === 'left' && props.isMobile) {
        const isNotClosed = props.view !== views.closed;
        return (
            <ChatOpeningAnimation>
                {({ hasAnimationEnded, onAnimationEnded }) => (
                    <>
                        <CSSAnimation
                            in={props.view === views.fly}
                            classNames="moveFromRight"
                            onExited={props.view === views.closed ? onAnimationEnded : undefined}
                            timeout={300}
                        >
                            <FlyMessage />
                        </CSSAnimation>
                        <CSSAnimation
                            in={isNotClosed && props.view !== views.fly && hasAnimationEnded}
                            classNames="moveFromRight"
                            onExited={onAnimationEnded}
                            timeout={400}
                        >
                            <Chat />
                        </CSSAnimation>
                        <CSSAnimation
                            in={!isNotClosed && !hasAnimationEnded}
                            classNames="bubbleAnimationReturn"
                            timeout={300}
                            onExited={onAnimationEnded}
                        >
                            <WidgetBubble />
                        </CSSAnimation>
                        <CSSAnimation
                            in={isNotClosed && hasAnimationEnded}
                            classNames="bubbleAnimation"
                            timeout={300}
                            onExited={props.view === views.fly ? onAnimationEnded : undefined}
                        >
                            <WidgetBubble />
                        </CSSAnimation>
                    </>
                )}
            </ChatOpeningAnimation>
        );
    }
    return (
        <>
            <CSSAnimation in={props.view === views.fly} classNames="moveFromRight" timeout={300}>
                <FlyMessage />
            </CSSAnimation>
            <CSSAnimation
                in={props.view !== views.closed && props.view !== views.fly}
                classNames="moveFromRight"
                timeout={300}
            >
                <Chat />
            </CSSAnimation>
            <CSSAnimation in classNames="bubbleAnimation">
                <WidgetBubble />
            </CSSAnimation>
        </>
    );
};

ChatOnSiteApp.propTypes = {
    view: PropTypes.string.isRequired,
    widgetPosition: PropTypes.oneOf(['left', 'right']).isRequired,
    isMobile: PropTypes.bool.isRequired,
};

export default connect((store) => ({
    view: getView(store),
    isMobile: store.isMobile,
}))(ChatOnSiteApp);
