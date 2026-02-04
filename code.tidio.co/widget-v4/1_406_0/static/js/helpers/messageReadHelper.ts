import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MessageTypes } from '../components/Message/types';
import { markMessagesAsRead } from '../store/actions';
import { DefaultRootState, Message, MessageSender } from '../store/typings';

export const READ_MESSAGE_ALLOWED_SENDERS: MessageSender[] = [
    MessageSender.BOT,
    MessageSender.OPERATOR,
];

type ReadableMessage = Pick<Message, 'idFromServer' | 'sender'>;

export function getLastReadableMessageId(messages: ReadableMessage[]): number | null {
    if (messages.length === 0) {
        return null;
    }

    const readableMessages = messages.filter(
        (message) => message.idFromServer && READ_MESSAGE_ALLOWED_SENDERS.includes(message.sender),
    );

    if (readableMessages.length === 0) {
        return null;
    }

    const lastReadableMessage = readableMessages[readableMessages.length - 1];
    return lastReadableMessage.idFromServer ?? null;
}

export function useMarkMessagesAsRead(messages: MessageTypes[]): void {
    const lastReadableMessageId = getLastReadableMessageId(messages);
    const prevLastReadableMessageId = useRef<number | null>(null);
    const isPageVisible = useSelector((state: DefaultRootState) => state.isPageVisible);
    const dispatch = useDispatch();

    useEffect(() => {
        if (
            isPageVisible &&
            lastReadableMessageId !== null &&
            lastReadableMessageId !== prevLastReadableMessageId.current
        ) {
            dispatch(markMessagesAsRead());
            prevLastReadableMessageId.current = lastReadableMessageId;
        }
    }, [dispatch, isPageVisible, lastReadableMessageId]);

    return undefined;
}
