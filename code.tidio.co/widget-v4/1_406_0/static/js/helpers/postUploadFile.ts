import { parseKnownCause } from './parseKnownCause';
import { ravenCaptureException } from './raven';
import { trans } from './translations';

export type UploadFileResponse = {
    meta: {
        name: string;
        extension: string;
    };
    thumb?: {
        medium?: string;
    };
    type: string;
    url: string;
};

const isUploadFileResponse = (value: unknown): value is UploadFileResponse => {
    if (!value || typeof value !== 'object') {
        throw new Error('isUploadFileResponse: value is not an object');
    }

    const { meta, type, url } = value as {
        meta: unknown;
        thumb: unknown;
        type: unknown;
        url: unknown;
    };

    if (!meta || typeof meta !== 'object') {
        throw new Error('isUploadFileResponse: meta is not an object');
    }
    const { name, extension } = meta as { name: unknown; extension: unknown };
    if (typeof name !== 'string') {
        throw new Error('isUploadFileResponse: meta.name is not a string');
    }
    if (typeof extension !== 'string') {
        throw new Error('isUploadFileResponse: meta.extension is not a string');
    }

    if (typeof type !== 'string') {
        throw new Error('isUploadFileResponse: type is not a string');
    }

    if (typeof url !== 'string') {
        throw new Error('isUploadFileResponse: url is not a string');
    }

    return true;
};

export const postUploadFile = ({
    file,
    publicKey,
    visitorId,
    onProgressUpdate,
}: {
    file: File;
    publicKey: string;
    visitorId: string;
    onProgressUpdate?: (percentage: number) => void;
}): Promise<
    { status: number } & (
        | { isError: false; data: UploadFileResponse }
        | { isError: true; data?: unknown }
    )
> =>
    new Promise((resolve, reject) => {
        const url = new URL('/upload-file', process.env.UPLOAD_SERVICE_URL);
        url.searchParams.set('project_public_key', publicKey);
        url.searchParams.set('visitor_id', visitorId);

        const formData = new FormData();
        formData.append('upload', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', url.toString(), true);
        xhr.addEventListener('load', () => {
            try {
                const { status } = xhr;
                const data = JSON.parse(xhr.responseText);

                if (status === 201 && isUploadFileResponse(data)) {
                    resolve({ status, isError: false, data });
                } else {
                    resolve({ status, isError: true, data: xhr.responseText });
                }
            } catch (error) {
                reject(error);
            }
        });
        xhr.addEventListener('error', () => {
            resolve({ status: xhr.status, isError: true, data: xhr.responseText });
        });
        xhr.addEventListener('progress', (event) => {
            if (event.lengthComputable && onProgressUpdate) {
                const percentage = Math.round((event.loaded * 100) / event.total);
                onProgressUpdate(percentage);
            }
        });
        xhr.send(formData);
    });

export const postValidateFile = async ({
    fileSize,
    publicKey,
    visitorId,
}: {
    fileSize: number;
    publicKey: string;
    visitorId: string;
}): Promise<{ status: number } & { isError: boolean; data?: unknown }> => {
    try {
        const url = new URL('/upload-file/validate', process.env.UPLOAD_SERVICE_URL);

        const requestBody = {
            file_size: fileSize,
            project_public_key: publicKey,
            visitor_id: visitorId,
        };

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const { status } = response;

        try {
            const data = await response.text();

            if (status === 200) {
                return { status, isError: false, data };
            }
            return { status, isError: true, data };
        } catch {
            return { status, isError: true, data: null };
        }
    } catch (error) {
        return { status: 500, isError: true, data: error };
    }
};

export enum FileUploadErrorKey {
    FILE_TOO_BIG = 'fileTooBig',
    EXTENSION_NOT_SUPPORTED = 'extensionNotSupported',
    GENERIC_UPLOAD_ERROR = 'genericUploadError',
}

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

export const getFileUploadErrorMessage = (error: FileUploadErrorKey, cause?: unknown): string => {
    switch (error) {
        case FileUploadErrorKey.FILE_TOO_BIG: {
            const knownCause = parseKnownCause(cause);
            const message = trans('fileToBigAlert', null, 'File exceed 10MB limit.');
            if (knownCause?.limitInMB) {
                return message.replace('10MB', `${knownCause.limitInMB}MB`);
            }
            return message;
        }
        case FileUploadErrorKey.EXTENSION_NOT_SUPPORTED:
            return trans(
                'extensionNotSupportedAlert',
                null,
                'This file type is not supported, sorry!',
            );
        case FileUploadErrorKey.GENERIC_UPLOAD_ERROR:
        default:
            return trans(
                'genericFileUploadAlert',
                null,
                'Something went wrong when trying to upload your file.',
            );
    }
};

export const validateFileSize = async ({
    fileSize,
    publicKey,
    visitorId,
}: {
    fileSize: number;
    publicKey: string;
    visitorId: string;
}): Promise<void> => {
    if (!publicKey) {
        throw new Error('validateFileSize: missing publicKey');
    }
    if (!visitorId) {
        throw new Error('validateFileSize: missing visitorId');
    }

    const response = await postValidateFile({
        fileSize,
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
                    `validateFileSize: postValidateFile failed with status ${response.status}`,
                    {
                        response: response.data,
                    },
                );
                throw new Error(FileUploadErrorKey.GENERIC_UPLOAD_ERROR);
            }
        }
    }
};
