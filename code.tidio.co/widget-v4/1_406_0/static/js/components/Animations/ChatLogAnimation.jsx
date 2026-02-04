import React from 'react';
import Transition from 'react-transition-group/Transition';

import PropTypes from 'prop-types';

const ChatLogAnimation = (props) => (
    <Transition
        in={props.in}
        timeout={props.timeout}
        appear
        addEndListener={(node) => {
            node.addEventListener('transitionend', props.onAnimationEnded, false);
        }}
    >
        {(state) => (
            <div
                className="transition-container"
                style={{
                    ...props.defaultStyle,
                    ...props.transitionStyles[state],
                }}
            >
                {props.children}
            </div>
        )}
    </Transition>
);

ChatLogAnimation.propTypes = {
    in: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    defaultStyle: PropTypes.shape().isRequired,
    transitionStyles: PropTypes.shape().isRequired,
    timeout: PropTypes.number.isRequired,
    onAnimationEnded: PropTypes.func.isRequired,
};

export default ChatLogAnimation;
