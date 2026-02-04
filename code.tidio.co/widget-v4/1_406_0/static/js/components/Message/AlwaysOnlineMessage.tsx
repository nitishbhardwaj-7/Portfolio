import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { getVisitorEmail } from '../../store/selectors';
import Translation from '../Translation';
import InputWithValidation from './InputWithValidation';

const AlwaysOnlineMessage = (): ReactElement => {
    const visitorEmail = useSelector(getVisitorEmail);

    return (
        <div className="message message-operator always-online">
            <Translation value="alwaysOnlineEngageMessage" emojify linkify />
            <InputWithValidation
                type="email"
                placeholder="preformInput_email"
                value={visitorEmail}
                disabled
            />
        </div>
    );
};

export default AlwaysOnlineMessage;
