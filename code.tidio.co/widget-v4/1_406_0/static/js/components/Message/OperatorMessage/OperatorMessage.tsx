import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { parseMarkdown } from '../../../helpers/ui';
import { extractYouTubeUrl } from '../YouTubePreview/helpers';
import { adjustMessageWidth, isImageElement } from '../helpers';

import { openImagePopup } from '../../../store/actions';
import Fade from '../../Animations/Fade';
import MessageTimestamp from '../MessageTimestamp/MessageTimestamp';
import YouTubePreview, { YOUTUBE_PREVIEW_MINIMUM_WIDTH } from '../YouTubePreview/YouTubePreview';
import { TextMessageOperator } from '../types';

const OperatorMessage = ({
    content,
    operator_id,
    time_sent,
}: TextMessageOperator): ReactElement => {
    const dispatch = useDispatch();
    const [isTimestampVisible, setIsTimestampVisible] = useState(false);
    const messageRef = useRef<HTMLSpanElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const youtubeUrl = extractYouTubeUrl(content);

    useEffect(() => {
        adjustMessageWidth({
            spanRef: messageRef,
            wrapperRef,
            minWidth: youtubeUrl ? YOUTUBE_PREVIEW_MINIMUM_WIDTH : undefined,
        });
    }, [youtubeUrl]);

    const onMessageClick = (event: React.MouseEvent<HTMLSpanElement>): void => {
        const { target } = event;

        if (isImageElement(target) && !target.closest('a') && !target.classList.contains('emoji')) {
            dispatch(openImagePopup(target.src));
        } else {
            setIsTimestampVisible((prevState) => !prevState);
        }
    };

    const currentContent = parseMarkdown(content);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            className={`message message-operator ${isTimestampVisible ? 'timestamp-visible' : ''}`}
            onClick={onMessageClick}
            ref={wrapperRef}
        >
            <span
                className="message-content message-content--markdown"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: currentContent }}
                ref={messageRef}
            />
            {youtubeUrl && <YouTubePreview url={youtubeUrl} />}
            <Fade in={isTimestampVisible}>
                <MessageTimestamp time={time_sent} operatorId={operator_id} />
            </Fade>
        </div>
    );
};

export default OperatorMessage;
