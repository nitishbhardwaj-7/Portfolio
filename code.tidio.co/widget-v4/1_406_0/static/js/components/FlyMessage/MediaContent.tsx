import React, { ReactElement } from 'react';

import { AttachmentType } from '../../store/typings';
import Translation from '../Translation';

type MediaContentProps = {
    onClick: () => void;
    attachmentType?: AttachmentType;
    content: string;
};

const MediaContent = (props: MediaContentProps): ReactElement =>
    props.attachmentType === 'image' ? (
        <button type="button" onClick={props.onClick}>
            <div
                className="image-preview"
                style={{ backgroundImage: `url(${props.content})` }}
                data-testid="imagePreview"
            />
        </button>
    ) : (
        <button
            className="link"
            type="button"
            onClick={props.onClick}
            style={{ borderBottom: '1px solid #3f88f3', color: '#3f88f3' }}
        >
            <Translation value="mediaFile" fallback="Media file" />
        </button>
    );

export default MediaContent;
