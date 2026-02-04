import React from 'react';

import CSSAnimation from '../Animations/CSSAnimation';

interface OperatorIsTypingProps {
    operatorIsTyping: boolean | number;
}

const OperatorIsTyping = ({ operatorIsTyping }: OperatorIsTypingProps): React.ReactElement => (
    <CSSAnimation in={operatorIsTyping !== false} classNames="operatorTyping">
        <div className="message message-operator typing-indicator">
            <span />
            <span />
            <span />
        </div>
    </CSSAnimation>
);

export default OperatorIsTyping;
