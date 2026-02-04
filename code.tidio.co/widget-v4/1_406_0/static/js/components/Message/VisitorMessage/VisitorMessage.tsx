import React, { ReactElement, useCallback, useLayoutEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';

import useNewSkin from '../../../hooks/useNewSkin';

import { trans } from '../../../helpers/translations';
import { extractYouTubeUrl } from '../YouTubePreview/helpers';
import { adjustMessageWidth, parseContent } from '../helpers';

import Fade from '../../Animations/Fade';
import MessageTimestamp from '../MessageTimestamp/MessageTimestamp';
import YouTubePreview, { YOUTUBE_PREVIEW_MINIMUM_WIDTH } from '../YouTubePreview/YouTubePreview';
import { TextMessageVisitor } from '../types';

const messageNotDelivered = css({
    width: 'max-content',
});

type VisitorMessageProps = TextMessageVisitor;

const VisitorMessageComponent = ({
    isDelivered,
    time_sent,
    content,
}: VisitorMessageProps): ReactElement => {
    const [timestampVisible, setTimestampVisible] = useState(false);
    const messageRef = useRef(null);
    const wrapperRef = useRef(null);
    const parsedContent = parseContent(content);
    const { isNewSkin } = useNewSkin();
    const youtubeUrl = extractYouTubeUrl(content);

    useLayoutEffect(() => {
        adjustMessageWidth({
            spanRef: messageRef,
            wrapperRef,
            minWidth: youtubeUrl ? YOUTUBE_PREVIEW_MINIMUM_WIDTH : undefined,
        });
    }, [youtubeUrl]);

    const onMessageClick = useCallback(() => {
        setTimestampVisible((prevValue) => !prevValue);
    }, []);

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div
            className={`message message-visitor ${
                timestampVisible && isDelivered ? 'timestamp-visible' : ''
            } ${!isDelivered ? 'not-delivered' : ''}`}
            onClick={onMessageClick}
            style={
                isDelivered
                    ? {
                          background: 'var(--custom-background)',
                          color: 'var(--custom-text-color)',
                      }
                    : {}
            }
            ref={wrapperRef}
        >
            <span
                className="message-content"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: parsedContent }}
                ref={messageRef}
            />
            {youtubeUrl && <YouTubePreview url={youtubeUrl} />}
            <Fade in={timestampVisible && isDelivered}>
                <MessageTimestamp time={time_sent} />
            </Fade>
            {!isDelivered && (
                <span className="resend-message" css={isNewSkin ? messageNotDelivered : undefined}>
                    {trans('messageNotDelivered', null, 'Not delivered.')}
                </span>
            )}
        </div>
    );
};

export default VisitorMessageComponent;
