import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { messageTypes } from '../../connection/parsers';
import {
    sendMessageFromVisitorWithBotPayload,
    setOpenTab,
    setView,
    widgetActivityTracking,
} from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import { getIsMobile } from '../../store/selectors';
import { Message, View } from '../../store/typings';
import QuickRepliesFlyMessagePresentational from '../Message/QuickReplies/QuickRepliesFlyMessagePresentational';

type FlyButtonsProps = {
    message: Message;
};

const FlyButtons = (props: FlyButtonsProps): ReactElement => {
    const dispatch = useDispatch();
    const isMobile = useSelector(getIsMobile);
    let buttons = [];
    if (props.message.type === messageTypes.cards) {
        buttons = props.message.cards?.[0]?.buttons || [];
    } else if (props.message.quickReplies) {
        buttons = props.message.quickReplies;
    } else if (props.message.buttons) {
        ({ buttons } = props.message);
    } else if (props.message.type === messageTypes.iframe && props.message?.iframe) {
        buttons = props.message.iframe.buttons;
    }

    const onButtonClick = (payload: string, title: string): void => {
        dispatch(widgetActivityTracking(trackingEvents.flyMessageButtonsClicked));
        dispatch(sendMessageFromVisitorWithBotPayload(title, payload));
    };

    const onMoreButtonClick = (): void => {
        dispatch(setView(View.CHAT));
        dispatch(setOpenTab('conversations'));
    };

    return (
        <QuickRepliesFlyMessagePresentational
            quickReplies={buttons}
            messageType={props.message.type}
            onButtonClick={onButtonClick}
            onMoreButtonClick={onMoreButtonClick}
            maxButtons={isMobile ? 3 : 4}
            showMoreRepliesButton={
                props.message.type === messageTypes.cards && (props.message.cards?.length || 0) > 1
            }
        />
    );
};

export default FlyButtons;
