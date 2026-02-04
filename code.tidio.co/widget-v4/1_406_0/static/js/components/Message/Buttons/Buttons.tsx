import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import {
    sendMessageFromVisitorWithBotPayload,
    widgetActivityTracking,
} from '../../../store/actions';
import { trackingEvents } from '../../../store/activityTrackingHelpers';
import { DecisionButton, Message } from '../../../store/typings';
import ButtonAction from './ButtonAction';
import ButtonUrl from './ButtonUrl';

interface ButtonsProps {
    buttons: DecisionButton[];
    metadata?: { is_ai_assistant_task?: Message['aiAssistantTask'] };
}

const Buttons = ({ buttons, metadata }: ButtonsProps): ReactElement => {
    const dispatch = useDispatch();
    const onButtonClick = (payload: string, title: string): void => {
        dispatch(
            sendMessageFromVisitorWithBotPayload(title, payload, {
                is_ai_assistant_task: metadata?.is_ai_assistant_task,
            }),
        );
        dispatch(widgetActivityTracking(trackingEvents.buttonClicked));
    };

    return (
        <>
            {buttons.map((button) => (
                <React.Fragment key={`${button.title}${button.payload}`}>
                    {button.type === 'url' && (
                        <ButtonUrl
                            title={button.title}
                            payload={button.payload}
                            url={button.url}
                            cardClicked={button.cardClicked}
                            onClick={onButtonClick}
                        />
                    )}
                    {button.type === 'action' && (
                        <ButtonAction
                            title={button.title}
                            payload={button.payload}
                            cardClicked={button.cardClicked}
                            onClick={onButtonClick}
                        />
                    )}
                </React.Fragment>
            ))}
        </>
    );
};

export default Buttons;
