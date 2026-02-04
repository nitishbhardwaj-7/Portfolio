import React from 'react';
import { useSelector } from 'react-redux';

import { DefaultRootState } from '../../../store/typings';
import Translation from '../../Translation';
import PreChatField from '../PreChatField/PreChatField';
import { PreChatMessage as PreChatMessageTypes } from '../types';

type PreChatMessageProps = Omit<PreChatMessageTypes, 'content'>;

const PreChatMessage = ({ preChatFields }: PreChatMessageProps): React.ReactElement => {
    const visitor = useSelector((state: DefaultRootState) => state.visitor);

    return (
        <div className="message message-operator pre-chat">
            <Translation value="preformMessage" emojify linkify />
            {preChatFields.map((field) => (
                <PreChatField
                    key={field.type}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={visitor[field.type]}
                    disabled
                />
            ))}
        </div>
    );
};

export default PreChatMessage;
