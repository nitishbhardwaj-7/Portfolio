import React, { ReactElement, useState } from 'react';

import useNewSkin from '../../hooks/useNewSkin';

import Fade from '../Animations/Fade';
import FileIcon from './FileIcon';
import ImageMessage from './ImageMessage';
import MessageRating from './MessageRating';
import MessageTimestamp from './MessageTimestamp/MessageTimestamp';
import { UploadedFileMessage as UploadedFileMessageType } from './types';

type UploadedFileMessageProps = UploadedFileMessageType;

function removePrefixFromFileName(fileName: string | undefined): string {
    if (!fileName) {
        return '';
    }
    const prefixRegex = /^[a-zA-Z0-9]{10,11}-/;
    const match = fileName.match(prefixRegex);
    if (!match) {
        return fileName;
    }
    const result = fileName.replace(match[0], '');
    return result || fileName;
}

const decodeFileName = (url: string): string => {
    try {
        return decodeURIComponent(url);
    } catch {
        return url;
    }
};

const UploadedFileMessage = (props: UploadedFileMessageProps): ReactElement => {
    const [timestampVisibility, setTimestampVisibility] = useState(false);

    const ratingVisibility = Boolean(props.ratingId) && !timestampVisibility;
    const nameWithoutPrefix = removePrefixFromFileName(props.name);
    const displayedName = decodeFileName(nameWithoutPrefix);

    const { isNewSkin } = useNewSkin();

    const handleClick = (): void => {
        setTimestampVisibility((prevState) => !prevState);
    };

    return (
        <div
            className={`message message-upload ${
                props.attachmentType === 'image' ? 'message-image' : 'message-file'
            } message-${props.sender === 'bot' ? 'operator' : props.sender} ${
                timestampVisibility ? 'timestamp-visible' : ''
            } ${props.ratingId ? 'rating-visible' : ''}`}
            style={
                props.sender === 'visitor' && !isNewSkin
                    ? {
                          background: 'var(--custom-background)',
                          color: 'var(--custom-text-color)',
                      }
                    : {}
            }
        >
            {props.attachmentType === 'image' ? (
                <>
                    <ImageMessage
                        content={props.content}
                        extension={props.extension}
                        thumb={props.thumb}
                        name={props.name}
                        id={props.id}
                        onClick={handleClick}
                    />

                    <Fade in={timestampVisibility}>
                        <MessageTimestamp time={props.time_sent} />
                    </Fade>
                    <Fade in={ratingVisibility}>
                        <MessageRating
                            messageId={props.id}
                            ratingId={props.ratingId}
                            rating={props.rating}
                        />
                    </Fade>
                </>
            ) : (
                <>
                    <a
                        href={props.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleClick}
                    >
                        <span>
                            <FileIcon extension={props.extension} />
                            {displayedName}
                        </span>
                    </a>
                    <Fade in={timestampVisibility}>
                        <MessageTimestamp time={props.time_sent} />
                    </Fade>
                </>
            )}
        </div>
    );
};

export default UploadedFileMessage;
