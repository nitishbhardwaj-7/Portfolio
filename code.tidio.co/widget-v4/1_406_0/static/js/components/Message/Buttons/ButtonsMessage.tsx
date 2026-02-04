import React, { ReactNode } from 'react';

import { parseContent } from '../helpers';

import { ButtonsMessageType } from '../types';
import Buttons from './Buttons';

const ButtonsMessage = ({ content, buttons, aiAssistantTask }: ButtonsMessageType): ReactNode => {
    const parsedContent = parseContent(content);

    return (
        <div className="message message-operator buttons-message">
            <div className="message-with-buttons">
                <div
                    className="message-with-buttons-text"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: parsedContent }}
                    data-testid="buttonsText"
                />
                <div className="button-wrapper">
                    <Buttons
                        buttons={buttons}
                        metadata={{ is_ai_assistant_task: aiAssistantTask }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ButtonsMessage;
