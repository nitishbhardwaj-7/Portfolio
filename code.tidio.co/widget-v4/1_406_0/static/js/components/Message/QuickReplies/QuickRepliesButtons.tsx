import React, { ReactNode, memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    sendMessageFromVisitorWithBotPayload,
    setMessageDisabledState,
    widgetActivityTracking,
} from '../../../store/actions';
import { trackingEvents } from '../../../store/activityTrackingHelpers';
import { getIsLastMessage } from '../../../store/selectors';
import { DefaultRootState, Message, QuickReply } from '../../../store/typings';
import QuickReplyButton from './QuickReplyButton';

interface QuickRepliesButtonsProps {
    quickReplies: QuickReply[];
    messageId: string;
    disabled?: boolean;
    metadata?: { is_ai_assistant_task?: Message['aiAssistantTask'] };
}

const QuickRepliesButtons = ({
    quickReplies,
    messageId,
    disabled = false,
    metadata,
}: QuickRepliesButtonsProps): ReactNode => {
    const dispatch = useDispatch();
    const isLastMessage = useSelector((state: DefaultRootState) =>
        getIsLastMessage(state, messageId),
    );

    useEffect(() => {
        if (!isLastMessage && !disabled) {
            dispatch(setMessageDisabledState(messageId));
        }
    }, [disabled, dispatch, isLastMessage, messageId]);

    const onButtonClick = useCallback(
        (
            { payload, title, type }: { payload: string; title: string; type: string },
            { is_ai_assistant_task }: { is_ai_assistant_task?: boolean } = {},
        ): boolean => {
            dispatch(
                sendMessageFromVisitorWithBotPayload(title, payload, { is_ai_assistant_task }),
            );
            dispatch(
                widgetActivityTracking(
                    type !== 'bot'
                        ? trackingEvents.quickReplyClicked
                        : trackingEvents.botStartedFromBotsMenu,
                ),
            );
            return true;
        },
        [dispatch],
    );

    if (disabled || !isLastMessage) {
        return null;
    }
    return (
        <div className="button-wrapper">
            {quickReplies.map((quickReply) => (
                <QuickReplyButton
                    quickReply={quickReply}
                    onButtonClick={onButtonClick}
                    metadata={metadata}
                    key={`${quickReply.title}${quickReply.payload}`}
                />
            ))}
        </div>
    );
};

export default memo(QuickRepliesButtons);
