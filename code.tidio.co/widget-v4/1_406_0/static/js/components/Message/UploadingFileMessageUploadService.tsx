import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { css } from '@emotion/react';

import useNewSkin from '../../hooks/useNewSkin';

import { isInPreviewMode } from '../../helpers';
import { parseKnownCause } from '../../helpers/parseKnownCause';
import { postUploadFile, postValidateFile } from '../../helpers/postUploadFile';
import { ravenCaptureException } from '../../helpers/raven';
import { trans } from '../../helpers/translations';

import { acceptedExtensions, getAttachmentType, getFileExtension } from '../../connection/parsers';
import { hideMessage, showAlert, updateAttachment } from '../../store/actions';
import { getProjectPublicKey, getVisitorId } from '../../store/selectors';
import { Loader, NewSkinLoader } from '../svgIcons/SvgIcons';
import { UploadingFileMessage } from './types';

const newSkinUploadStyles = css({
    borderRadius: 'var(--radius-component, 12px)',
    border: '1px solid var(--border-color, #D3DBE5)',
    float: 'right',
});

export enum FileUploadErrorKey {
    FILE_TOO_BIG = 'fileTooBig',
    EXTENSION_NOT_SUPPORTED = 'extensionNotSupported',
    GENERIC_UPLOAD_ERROR = 'genericUploadError',
}

const isAlertMessageKey = (value: unknown): value is FileUploadErrorKey =>
    Object.values(FileUploadErrorKey).includes(value as FileUploadErrorKey);

interface UploadingFileMessageUploadServiceProps extends Omit<
    UploadingFileMessage,
    'type' | 'id' | 'content' | 'time_sent' | 'chatBotId'
> {
    id?: string;
}

type Status = 'init' | 'loading' | 'done';

export const parseLimitResponse = (stringResponse: unknown): number | null => {
    try {
        if (typeof stringResponse !== 'string') {
            return null;
        }
        const response = JSON.parse(stringResponse);
        const { message } = response;
        if (typeof message !== 'string' && !message.includes('bytes')) {
            return null;
        }
        const splitMessage = message.split(' ');
        const limitInBytes = splitMessage[splitMessage.length - 2];
        if (typeof limitInBytes !== 'string') {
            return null;
        }
        const limitInBytesNumber = parseInt(limitInBytes, 10);
        const limitInMB = Math.max(Math.floor(limitInBytesNumber / 1024 / 1024), 0);
        return limitInMB;
    } catch {
        return null;
    }
};

/**
 * @description upload-service is used to upload files: https://gitlab.com/tidio/js/upload-service
 */
const UploadingFileMessageUploadService = ({
    id: messageId,
    sender,
    file,
    handleSuccess,
    handleError,
    customClassName,
    hideProgressInfo,
}: UploadingFileMessageUploadServiceProps): ReactElement | null => {
    const dispatch = useDispatch();

    const publicKey = useSelector(getProjectPublicKey);
    const visitorId = useSelector(getVisitorId);

    const [percentLoaded, setPercentLoaded] = useState(0);
    const [status, setStatus] = useState<Status>('init');

    const { isNewSkin } = useNewSkin();

    const getAlertMessage = (alertMessageKey: FileUploadErrorKey): string => {
        switch (alertMessageKey) {
            case FileUploadErrorKey.FILE_TOO_BIG:
                return trans('fileToBigAlert', null, 'File exceed 10MB limit.');
            case FileUploadErrorKey.EXTENSION_NOT_SUPPORTED:
                return trans('extensionNotSupportedAlert', null, 'File extension not supported.');
            case FileUploadErrorKey.GENERIC_UPLOAD_ERROR:
            default:
                return trans(
                    'genericFileUploadAlert',
                    null,
                    'Something went wrong when trying to upload your file.',
                );
        }
    };

    const hideMessageAndShowAlert = useCallback(
        (alertMessageKey: FileUploadErrorKey, cause?: unknown): void => {
            if (messageId) {
                dispatch(hideMessage(messageId));
                let alertMessage = getAlertMessage(alertMessageKey);
                const knownCause = parseKnownCause(cause);
                if (knownCause?.limitInMB) {
                    alertMessage = alertMessage.replace('10MB', `${knownCause.limitInMB}MB`);
                }
                dispatch(showAlert(alertMessage));
            }
        },
        [dispatch, messageId],
    );

    const handlePreviewFile = useCallback(
        ({ fileExtension }: { fileExtension: string }): Promise<void> =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (): void => {
                    if (typeof reader.result !== 'string') {
                        reject(
                            new Error('UploadingFileMessage - preview: error while reading file'),
                        );
                    } else {
                        if (messageId) {
                            dispatch(
                                updateAttachment(
                                    messageId,
                                    getAttachmentType(fileExtension || 'file'),
                                    reader.result,
                                    file.name,
                                    fileExtension,
                                    reader.result,
                                ),
                            );
                        }
                        handleSuccess?.({
                            url: reader.result,
                            meta: {
                                name: file.name,
                                extension: fileExtension,
                            },
                        });
                        resolve();
                    }
                };
                reader.onerror = (error): void => reject(error);
                reader.readAsDataURL(file);
            }),
        [file, messageId, handleSuccess, dispatch],
    );

    const handleUploadFile = useCallback(async (): Promise<void> => {
        if (!publicKey) {
            throw new Error('UploadingFileMessage: missing publicKey');
        }
        if (!visitorId) {
            throw new Error('UploadingFileMessage: missing visitorId');
        }

        const response = await postUploadFile({
            file,
            publicKey,
            visitorId,
            onProgressUpdate: (percentage) => setPercentLoaded(percentage),
        });

        setPercentLoaded(100);
        if (response.isError) {
            switch (response.status) {
                case 0: {
                    throw new Error(FileUploadErrorKey.GENERIC_UPLOAD_ERROR);
                }
                case 413: {
                    throw new Error(FileUploadErrorKey.FILE_TOO_BIG, {
                        cause: { limitInMB: parseLimitResponse(response.data) },
                    });
                }
                case 422: {
                    throw new Error(FileUploadErrorKey.EXTENSION_NOT_SUPPORTED);
                }
                default: {
                    ravenCaptureException(
                        `UploadingFileMessage: request failed with status ${response.status}`,
                        {
                            response: response.data,
                        },
                    );
                    throw new Error(FileUploadErrorKey.GENERIC_UPLOAD_ERROR);
                }
            }
        }
        if (messageId) {
            dispatch(
                updateAttachment(
                    messageId,
                    getAttachmentType(response.data.meta.extension),
                    response.data.url,
                    file.name,
                    response.data.meta.extension,
                    response.data.thumb?.medium || '',
                ),
            );
        }
        handleSuccess?.({ ...response.data, meta: { ...response.data.meta, name: file.name } });
    }, [publicKey, visitorId, file, messageId, handleSuccess, dispatch]);

    const validateFileSize = useCallback(async (): Promise<void> => {
        if (!publicKey) {
            throw new Error('UploadingFileMessage: missing publicKey');
        }
        if (!visitorId) {
            throw new Error('UploadingFileMessage: missing visitorId');
        }

        const response = await postValidateFile({
            fileSize: file.size,
            publicKey,
            visitorId,
        });

        if (response.isError) {
            switch (response.status) {
                case 0: {
                    throw new Error(FileUploadErrorKey.GENERIC_UPLOAD_ERROR);
                }
                case 413: {
                    throw new Error(FileUploadErrorKey.FILE_TOO_BIG, {
                        cause: { limitInMB: parseLimitResponse(response.data) },
                    });
                }
                case 422: {
                    throw new Error(FileUploadErrorKey.EXTENSION_NOT_SUPPORTED);
                }
                default: {
                    ravenCaptureException(
                        `UploadingFileMessage: postValidateFile failed with status ${response.status}`,
                        {
                            response: response.data,
                        },
                    );
                    throw new Error(FileUploadErrorKey.GENERIC_UPLOAD_ERROR);
                }
            }
        }
    }, [publicKey, visitorId, file.size]);

    const validateAndUpload = useCallback(async (): Promise<void> => {
        try {
            const fileExtension = getFileExtension(file.name);
            if (!fileExtension || acceptedExtensions.indexOf(fileExtension) === -1) {
                throw new Error(FileUploadErrorKey.EXTENSION_NOT_SUPPORTED);
            }

            if (isInPreviewMode()) {
                await handlePreviewFile({ fileExtension });
            } else {
                await validateFileSize();
                await handleUploadFile();
            }
        } catch (error) {
            if (error instanceof Error && isAlertMessageKey(error.message)) {
                hideMessageAndShowAlert(error.message, error.cause);
                handleError?.(error.message, error.cause);
            } else {
                ravenCaptureException(error);
                hideMessageAndShowAlert(FileUploadErrorKey.GENERIC_UPLOAD_ERROR);
                handleError?.(FileUploadErrorKey.GENERIC_UPLOAD_ERROR);
            }
        } finally {
            setStatus('done');
        }
    }, [
        file,
        handleError,
        handlePreviewFile,
        handleUploadFile,
        hideMessageAndShowAlert,
        validateFileSize,
    ]);

    useEffect(() => {
        if (status === 'init') {
            setStatus('loading');
            validateAndUpload();
        }
    }, [status, validateAndUpload]);

    if (status !== 'loading') {
        return null;
    }

    if (isNewSkin) {
        return (
            <div
                className={customClassName || 'message message-upload'}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percentLoaded}
                css={newSkinUploadStyles}
            >
                <span>
                    <NewSkinLoader />
                    {!hideProgressInfo &&
                        `${trans('uploaded', null, 'Uploaded')} ${percentLoaded + 10}%`}
                </span>
            </div>
        );
    }

    return (
        <div
            className={customClassName || `message message-upload message-${sender}`}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percentLoaded}
            style={
                !customClassName
                    ? {
                          background: 'var(--custom-background)',
                          color: 'var(--custom-text-color)',
                      }
                    : {}
            }
        >
            <span>
                <Loader />
                {!hideProgressInfo && `${trans('uploaded', null, 'Uploaded')} ${percentLoaded}%`}
            </span>
        </div>
    );
};

export default UploadingFileMessageUploadService;
