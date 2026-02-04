import { useState } from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { views } from '../../helpers/views';

import { getView } from '../../store/selectors';

const ChatOpeningAnimation = (props) => {
    const view = useSelector(getView);
    const [hasAnimationEnded, setAnimationEnded] = useState(view !== views.closed);
    const onAnimationEnded = () => {
        setAnimationEnded((prevValue) => !prevValue);
    };

    return props.children({ hasAnimationEnded, onAnimationEnded });
};

ChatOpeningAnimation.propTypes = {
    children: PropTypes.func.isRequired,
};

export default ChatOpeningAnimation;
