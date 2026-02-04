import React, { ReactElement } from 'react';

import { PendingAttachment } from '../../../store/typings';
import AttachmentThumbnail from './AttachmentThumbnail';
import { containerStyles } from './AttachmentsPreview.styles';

type AttachmentsPreviewProps = {
    attachments: PendingAttachment[];
    onRemove: (id: string) => void;
};

const AttachmentsPreview = ({
    attachments,
    onRemove,
}: AttachmentsPreviewProps): ReactElement | null => {
    if (attachments.length === 0) {
        return null;
    }

    return (
        <div css={containerStyles}>
            {attachments.map((attachment) => (
                <AttachmentThumbnail
                    key={attachment.id}
                    attachment={attachment}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
};

export default AttachmentsPreview;
