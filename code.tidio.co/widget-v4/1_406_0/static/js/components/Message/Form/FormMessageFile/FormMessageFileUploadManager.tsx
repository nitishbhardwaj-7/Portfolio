import React, { ReactElement, useEffect, useState } from 'react';

import { css } from '@emotion/react';

import { UploadFileResponse } from '../../../../helpers/postUploadFile';

import { FileFormFieldValue, MessageSender } from '../../../../store/typings';
import UploadingFileMessageUploadService, {
    FileUploadErrorKey,
} from '../../UploadingFileMessageUploadService';

const uploadingFileStyles = css({
    background: '#fff',
    borderRadius: '6px',
    position: 'relative',
    height: '44px',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '12px',
    alignItems: 'center',
    '&&& svg': {
        position: 'static',
        height: 'auto',
        '& .path': {
            stroke: '#0566FF',
        },
    },
});

interface FormMessageFileUploadManagerProps {
    filesToUpload: { id: string; fileToUpload: File }[];
    handleUploadedFile: (uploadedFilesData: FileFormFieldValue) => void;
    onUploadError: (uploadError: FileUploadErrorKey, cause?: unknown) => void;
    handleUploadFinished: () => void;
}
const FormMessageFileUploadManager = ({
    filesToUpload,
    handleUploadedFile,
    handleUploadFinished,
    onUploadError,
}: FormMessageFileUploadManagerProps): (ReactElement | null)[] => {
    const [uploadedFilesData, setUploadedFilesData] = useState<string[]>([]);

    const handleSuccessUpload = (
        id: string,
        uploadedFile: Pick<UploadFileResponse, 'url' | 'meta'>,
    ): void => {
        handleUploadedFile({
            name: uploadedFile.meta.name,
            extension: uploadedFile.meta.extension,
            url: uploadedFile.url,
        });
        setUploadedFilesData((prev) => [...prev, id]);
    };

    const handleUploadError = (
        id: string,
        uploadError: FileUploadErrorKey,
        cause?: unknown,
    ): void => {
        setUploadedFilesData((prev) => [...prev, id]);
        onUploadError(uploadError, cause);
    };

    useEffect(() => {
        if (uploadedFilesData.length === filesToUpload.length) {
            handleUploadFinished();
        }
    }, [filesToUpload.length, handleUploadFinished, uploadedFilesData.length]);
    return filesToUpload.map(({ fileToUpload, id }) => {
        if (uploadedFilesData.some((uploadedId) => uploadedId === id)) {
            return null;
        }
        return (
            <div css={uploadingFileStyles} key={id}>
                <UploadingFileMessageUploadService
                    file={fileToUpload}
                    sender={MessageSender.VISITOR}
                    handleSuccess={(fileData): void => handleSuccessUpload(id, fileData)}
                    handleError={(error, cause): void => handleUploadError(id, error, cause)}
                    customClassName="form-file-uploading"
                    hideProgressInfo
                />
            </div>
        );
    });
};

export default FormMessageFileUploadManager;
