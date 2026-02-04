import React, { ReactElement } from 'react';
import { useDropzone } from 'react-dropzone';

import { css } from '@emotion/react';
import { SerializedStyles } from '@emotion/react/dist/emotion-react.cjs';

import useNewSkin from '../../../../hooks/useNewSkin';

import { parseKnownCause } from '../../../../helpers/parseKnownCause';
import { trans } from '../../../../helpers/translations';

import { acceptedExtensions } from '../../../../connection/parsers';
import { UploadIcon } from '../../../svgIcons/SvgIcons';
import { FileUploadErrorKey } from '../../UploadingFileMessageUploadService';
import { errorMessageStyles } from '../FormInputWrapper';

const uploadWrapper = css({
    marginBottom: '12px',
});
const getFormUploadContainerStyles = (
    hasError: boolean,
    disabled: boolean,
    newSkin: boolean,
): SerializedStyles =>
    css({
        border: `2px dashed ${hasError ? '#E81332' : '#D3DBE5'}`,
        background: '#fff',
        padding: newSkin ? '12px' : '22px 24px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        position: 'relative',
        opacity: disabled ? 0.5 : 1,
        '&:focus': {
            outline: 'none',
        },
        '& svg': {
            flexShrink: 0,
            fill: '#8796AF',
        },
        '& .message-upload svg': {
            fill: '#0566FF',
            stroke: '#0566FF',
        },
        ...(newSkin && {
            borderRadius: 'var(--radius-component, 8px)',
            border: `1px dashed ${hasError ? '#E81332' : '#D3DBE5'}`,
        }),
    });

const uploadFieldTextWrapperStyles = css({
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
});

const getDragActiveContainerStyles = (dragActive: boolean): SerializedStyles =>
    css({
        borderRadius: '6px',
        padding: '22px 24px',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        right: '-2px',
        bottom: '-2px',
        border: '2px solid #0566FF',
        gap: '12px',
        background: '#DCE9FF',
        opacity: dragActive ? 1 : 0,
        transition: 'opacity .2s',
        '& svg': {
            flexShrink: 0,
            fill: '#0566FF',
        },
    });

const uploadFieldDescriptionStyles = css({
    color: '#647491',
});

const uploadFieldBrowseStyles = css({
    color: '#0566FF',
});

const getErrorMessage = (error: FileUploadErrorKey, cause?: unknown): string => {
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
                'fileFormatNotSupported',
                { '{formatted_extensions}': `${acceptedExtensions.join(', ')}.` },
                'This file format is not supported. You can upload: {formatted_extensions}',
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

interface FormMessageUploadProps {
    onFileAdd: (files: File[]) => void;
    fieldName: string;
    error: FileUploadErrorKey | null;
    cause: unknown | null;
    requiredError: boolean;
    maxFiles: number;
    disabled: boolean;
}

const FormMessageFileUpload = ({
    onFileAdd,
    fieldName,
    error,
    cause,
    requiredError,
    maxFiles,
    disabled,
}: FormMessageUploadProps): ReactElement => {
    const { isNewSkin } = useNewSkin();

    const handleFileDrop = (files: File[]): void => {
        onFileAdd(files);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: maxFiles !== 1,
        onDropAccepted: handleFileDrop,
        maxFiles,
        disabled,
    });
    return (
        <div css={uploadWrapper}>
            <div
                {...getRootProps()}
                css={getFormUploadContainerStyles(Boolean(error), disabled, isNewSkin)}
            >
                <input {...getInputProps()} data-testid="file-message-upload-input" />
                <div css={getDragActiveContainerStyles(isDragActive)}>
                    <UploadIcon />
                    <span>{trans('dragAndDropInfo', null, 'Drop here to attach')}</span>
                </div>
                <UploadIcon />
                <div css={uploadFieldTextWrapperStyles}>
                    <span>{fieldName}</span>
                    <span css={uploadFieldDescriptionStyles}>
                        {trans('dragAndDrop', null, 'Drag & drop here or ')}
                        <span css={uploadFieldBrowseStyles}>{trans('browse', null, 'browse')}</span>
                    </span>
                </div>
            </div>
            {requiredError ? (
                <span css={errorMessageStyles}>
                    {trans('fileIsRequired', null, 'File is required')}
                </span>
            ) : (
                error && <span css={errorMessageStyles}>{getErrorMessage(error, cause)}</span>
            )}
        </div>
    );
};

export default FormMessageFileUpload;
