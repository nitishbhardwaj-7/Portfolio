import React, { ReactElement, useCallback, useMemo, useState } from 'react';

import uuid from 'uuid/v4';

import { FileUploadErrorKey } from '../../../../helpers/postUploadFile';

import { FileFormFieldValue } from '../../../../store/typings';
import FormMessageFileUpload from './FormMessageFileUpload';
import FormMessageFileUploadManager from './FormMessageFileUploadManager';
import FormMessageFileUploaded from './FormMessageFileUploaded';

const MAX_FILES_IN_FORM = 10;

interface FormMessageFileProps {
    fileFieldValue: FileFormFieldValue[];
    disabled: boolean;
    addFormFileMessageValue: (file: FileFormFieldValue) => void;
    removeFormFileMessageValue: (fileUrl: string) => void;
    fieldName: string;
    requiredError: boolean;
    disableFormSubmission: () => void;
    enableFormSubmission: () => void;
    sent: boolean;
    contactProperty: string | null;
}

const FormMessageFile = ({
    fileFieldValue,
    disabled,
    addFormFileMessageValue,
    removeFormFileMessageValue,
    fieldName,
    requiredError,
    disableFormSubmission,
    enableFormSubmission,
    sent,
    contactProperty,
}: FormMessageFileProps): ReactElement => {
    const [filesToUpload, setFilesToUpload] = useState<{ id: string; fileToUpload: File }[]>([]);

    const [error, setError] = useState<FileUploadErrorKey | null>(null);
    const [cause, setCause] = useState<unknown | null>(null);

    const handleUploadError = useCallback(
        (uploadError: FileUploadErrorKey, errorCause?: unknown): void => {
            setError(uploadError);
            setCause(errorCause);
        },
        [],
    );

    const maxFilesToUpload = contactProperty === null ? MAX_FILES_IN_FORM : 1;

    const handleUploadFinished = useCallback(() => {
        enableFormSubmission();
        setFilesToUpload([]);
    }, [enableFormSubmission]);

    const handleFilesAdd = (files: File[]): void => {
        setError(null);
        setFilesToUpload(
            files.map((file) => ({
                id: uuid(),
                fileToUpload: file,
            })),
        );
        disableFormSubmission();
    };

    const uploadedFiles = useMemo(
        () =>
            fileFieldValue.map((fileFormField) => (
                <FormMessageFileUploaded
                    key={fileFormField.url}
                    name={fileFormField.name}
                    url={fileFormField.url}
                    extension={fileFormField.extension}
                    onFileRemove={removeFormFileMessageValue}
                    disabled={disabled}
                    sent={sent}
                />
            )),
        [disabled, fileFieldValue, removeFormFileMessageValue, sent],
    );

    return (
        <>
            {uploadedFiles}
            {filesToUpload.length > 0 && (
                <FormMessageFileUploadManager
                    filesToUpload={filesToUpload}
                    handleUploadedFile={addFormFileMessageValue}
                    onUploadError={handleUploadError}
                    handleUploadFinished={handleUploadFinished}
                />
            )}
            {!disabled && fileFieldValue.length < maxFilesToUpload && (
                <FormMessageFileUpload
                    onFileAdd={handleFilesAdd}
                    fieldName={fieldName}
                    error={error}
                    cause={cause}
                    requiredError={requiredError}
                    maxFiles={maxFilesToUpload - fileFieldValue.length}
                    disabled={Boolean(filesToUpload.length)}
                />
            )}
        </>
    );
};

export default FormMessageFile;
