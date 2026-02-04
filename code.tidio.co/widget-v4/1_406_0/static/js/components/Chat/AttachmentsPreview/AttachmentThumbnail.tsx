import React, { ReactElement, useCallback, useMemo } from 'react';

import { getAttachmentType, getFileExtension } from '../../../connection/parsers';
import { PendingAttachment } from '../../../store/typings';
import FileIcon from '../../Message/FileIcon';
import { Alert, NewSkinLoader } from '../../svgIcons/SvgIcons';
import AttachmentThumbnailRemove from './AttachmentThumbnailRemove';
import {
    errorMessageContainerStyles,
    errorMessageTextStyles,
    errorThumbnailStyles,
    fileNameStyles,
    fileThumbnailStyles,
    imageStyles,
    imageWrapperStyles,
    loadingFileNameStyles,
    loadingOverlayStyles,
    thumbnailStyles,
} from './AttachmentsPreview.styles';

interface AttachmentThumbnailProps {
    attachment: PendingAttachment;
    onRemove: (id: string) => void;
}

const AttachmentThumbnail = ({
    attachment,
    onRemove,
}: AttachmentThumbnailProps): ReactElement | null => {
    const { id, uploadedThumb, fileName, uploadStatus, errorMessage } = attachment;

    const handleRemove = useCallback((): void => {
        onRemove(id);
    }, [id, onRemove]);

    const isUploading = uploadStatus === 'uploading';
    const isError = uploadStatus === 'error';

    const extension = useMemo(() => getFileExtension(fileName || '') || '', [fileName]);
    const attachmentType = useMemo(() => getAttachmentType(extension), [extension]);

    if (isError) {
        return (
            <div css={errorThumbnailStyles}>
                <Alert />
                <div css={errorMessageContainerStyles}>
                    {errorMessage && <span css={errorMessageTextStyles}>{errorMessage}</span>}
                </div>
                <AttachmentThumbnailRemove onClick={handleRemove} />
            </div>
        );
    }

    if (attachmentType === 'image') {
        return (
            <div css={thumbnailStyles}>
                <div css={imageWrapperStyles}>
                    {isUploading ? (
                        <div css={loadingOverlayStyles}>
                            <NewSkinLoader />
                        </div>
                    ) : (
                        <img src={uploadedThumb} alt={fileName} css={imageStyles} />
                    )}
                </div>
                <AttachmentThumbnailRemove onClick={handleRemove} />
            </div>
        );
    }

    if (isUploading) {
        return (
            <div css={fileThumbnailStyles}>
                <NewSkinLoader />
                <span css={[fileNameStyles, loadingFileNameStyles]}>{fileName}</span>
            </div>
        );
    }

    return (
        <div css={fileThumbnailStyles}>
            <FileIcon extension={extension} />
            <span css={fileNameStyles}>{fileName}</span>
            <AttachmentThumbnailRemove onClick={handleRemove} />
        </div>
    );
};

export default AttachmentThumbnail;
