import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { DefaultRootState } from '../store/typings';
import CSSAnimation from './Animations/CSSAnimation';

const UnreadMessages = (): ReactElement => {
    const unreadMessages = useSelector((store: DefaultRootState) => store.unreadMessages);

    return (
        <CSSAnimation classNames="scale" in={unreadMessages > 0}>
            <div id="new-message" className="active">
                {unreadMessages <= 9 ? unreadMessages : '9+'}
            </div>
        </CSSAnimation>
    );
};

export default UnreadMessages;
