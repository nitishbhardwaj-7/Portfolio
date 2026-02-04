import React, { ReactElement } from 'react';

import { Message } from '../../store/typings';
import FlyButtons from './FlyButtons';
import FlyNewMessageButton from './FlyNewMessageButton';

type FlyMessageFooterProps = {
    message: Message;
    hasButtons: boolean;
};

const FlyMessageFooter = (props: FlyMessageFooterProps): ReactElement => (
    <div className="input-group">
        {props.hasButtons ? (
            <FlyButtons message={props.message} />
        ) : (
            <FlyNewMessageButton message={props.message} />
        )}
    </div>
);

export default FlyMessageFooter;
