import { Dispatch } from 'redux';

import {
    FileUploadErrorKey,
    parseLimitResponse,
} from '../components/Message/UploadingFileMessageUploadService';
import { acceptedExtensions, getFileExtension } from '../connection/parsers';
import { updatePendingAttachmentStatus } from '../store/actions';
import { getFileUploadErrorMessage, postUploadFile, validateFileSize } from './postUploadFile';
import { ravenCaptureException } from './raven';

export const uploadPendingAttachment = async (
    id: string,
    file: File,
    publicKey: string,
    visitorId: string,
    dispatch: Dispatch,
): Promise<void> => {
    if (!publicKey || !visitorId) {
        return undefined;
    }

    try {
        const fileExtension = getFileExtension(file.name);
        if (!fileExtension || acceptedExtensions.indexOf(fileExtension) === -1) {
            const errorKey = FileUploadErrorKey.EXTENSION_NOT_SUPPORTED;
            const errorMessage = getFileUploadErrorMessage(errorKey);
            dispatch(updatePendingAttachmentStatus(id, 'error', { errorMessage }));
            return undefined;
        }

        try {
            await validateFileSize({
                fileSize: file.size,
                publicKey,
                visitorId,
            });
        } catch (error) {
            let errorKey: FileUploadErrorKey;
            if (error instanceof Error) {
                errorKey = error.message as FileUploadErrorKey;
            } else {
                errorKey = FileUploadErrorKey.GENERIC_UPLOAD_ERROR;
            }

            const errorMessage = getFileUploadErrorMessage(
                errorKey,
                error instanceof Error ? error.cause : undefined,
            );
            dispatch(updatePendingAttachmentStatus(id, 'error', { errorMessage }));
            return undefined;
        }

        const response = await postUploadFile({
            file,
            publicKey,
            visitorId,
        });

        if (response.isError) {
            let errorKey: FileUploadErrorKey;
            let cause: unknown;
            switch (response.status) {
                case 0: {
                    errorKey = FileUploadErrorKey.GENERIC_UPLOAD_ERROR;
                    break;
                }
                case 413: {
                    errorKey = FileUploadErrorKey.FILE_TOO_BIG;
                    const limitInMB = parseLimitResponse(response.data);
                    if (limitInMB !== null) {
                        cause = { limitInMB };
                    }
                    break;
                }
                case 422:
                    errorKey = FileUploadErrorKey.EXTENSION_NOT_SUPPORTED;
                    break;
                default:
                    ravenCaptureException(
                        `PendingAttachment: upload failed with status ${response.status}`,
                        {
                            response: response.data,
                        },
                    );
                    errorKey = FileUploadErrorKey.GENERIC_UPLOAD_ERROR;
            }

            const errorMessage = getFileUploadErrorMessage(errorKey, cause);
            dispatch(updatePendingAttachmentStatus(id, 'error', { errorMessage }));
        } else {
            dispatch(
                updatePendingAttachmentStatus(id, 'uploaded', {
                    uploadedUrl: response.data.url,
                    uploadedThumb: response.data.thumb?.medium || '',
                }),
            );
        }
    } catch {
        const errorMessage = getFileUploadErrorMessage(FileUploadErrorKey.GENERIC_UPLOAD_ERROR);
        dispatch(updatePendingAttachmentStatus(id, 'error', { errorMessage }));
    }
    return undefined;
};
