import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useNewSkin from '../../hooks/useNewSkin';

import { AI_ASSISTANT_COLORS } from '../../helpers';
import { isImageElement } from './helpers';

import { openImagePopup } from '../../store/actions';
import { getAiAssistantName, getIsLastMessage } from '../../store/selectors';
import { DefaultRootState } from '../../store/typings';
import Fade from '../Animations/Fade';
import MessageRating from './MessageRating';
import MessageTimestamp from './MessageTimestamp/MessageTimestamp';
import YouTubePreview from './YouTubePreview/YouTubePreview';
import { TextMessageBot } from './types';

type BotTextMessageProps = TextMessageBot & {
    youtubeUrl?: string | null;
};

const BotTextMessage = (props: BotTextMessageProps): ReactElement => {
    const dispatch = useDispatch();
    const isLastMessage = useSelector((state: DefaultRootState) =>
        getIsLastMessage(state, props.id),
    );
    const aiAssistantName = useSelector((state: DefaultRootState) => getAiAssistantName(state));
    const isLastMessageFromAiAssistant = Boolean(isLastMessage && props.isAIAssistant);
    const [timestampVisibility, setTimestampVisibility] = useState(isLastMessageFromAiAssistant);
    const { isNewSkin } = useNewSkin();

    useEffect(() => {
        setTimestampVisibility(isLastMessageFromAiAssistant);
    }, [isLastMessageFromAiAssistant]);

    const onMessageClick = (event: React.MouseEvent<HTMLSpanElement>): void => {
        const { target } = event;

        if (isImageElement(target) && !target.closest('a') && !target.classList.contains('emoji')) {
            dispatch(openImagePopup(target.src));
        } else {
            setTimestampVisibility((prevState) => !prevState);
        }
    };

    const ratingVisibility = Boolean(props.ratingId) && !timestampVisibility;

    const AIAssistantStyles = {
        border: '1px solid transparent',
        background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, ${AI_ASSISTANT_COLORS[0]}, ${AI_ASSISTANT_COLORS[1]}) border-box`,
    };

    return (
        <div
            className={`message message-operator ${
                timestampVisibility ? 'timestamp-visible' : ''
            } ${props.ratingId ? 'rating-visible' : ''}`}
            style={props.isAIAssistant && !isNewSkin ? AIAssistantStyles : undefined}
        >
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
            <span
                className="message-content message-content--markdown"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: props.content }}
                onClick={onMessageClick}
            />
            {props.youtubeUrl && <YouTubePreview url={props.youtubeUrl} />}
            <Fade in={timestampVisibility}>
                <MessageTimestamp
                    isAIAssistant={props.isAIAssistant}
                    aiAssistantName={aiAssistantName}
                    time={props.time_sent}
                />
            </Fade>
            <Fade in={ratingVisibility}>
                <MessageRating
                    messageId={props.id}
                    ratingId={props.ratingId}
                    rating={props.rating}
                />
            </Fade>
        </div>
    );
};

export default BotTextMessage;
