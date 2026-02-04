import React, { ReactElement } from 'react';

import { SerializedStyles, css } from '@emotion/react';

import useNewSkin from '../../../../hooks/useNewSkin';

import { trans } from '../../../../helpers/translations';

import { DeleteIcon, SuccessCheck } from '../../../svgIcons/SvgIcons';
import FileIcon from '../../FileIcon';
import { getSentMarkerContainer } from '../FormInputWrapper';

const deleteButtonTooltipStyles = css({
    position: 'absolute',
    display: 'block',
    opacity: 0,
    background: '#fff',
    transition: 'all .2s',
    padding: '6px 8px',
    boxShadow: '0px 3px 8px rgba(0, 18, 46, 0.12)',
    borderRadius: '4px',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-2px)',
    pointerEvents: 'none',
    zIndex: 1,
});

const deleteButtonStyles = css({
    '&&&': {
        opacity: 0,
        transition: 'opacity .2s',
        display: 'flex',
        alignItems: 'center',
        margin: '0 0 0 auto',
        position: 'relative',
        flexShrink: 0,
        '&:hover span': {
            opacity: 1,
            transform: 'translateX(-50%) translateY(2px)',
        },
    },
});

const getUploadedFormFileStyles = (isNewSkin: boolean, sent?: boolean): SerializedStyles =>
    css({
        marginBottom: '12px',
        gap: '12px',
        background: '#fff',
        padding: sent ? '8px 40px 8px 12px' : '8px 12px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        '&&&:hover button': {
            opacity: 1,
        },
        '& svg': {
            flexShrink: 0,
        },
        ...(isNewSkin && {
            padding: '12px 16px',
            borderRadius: 'var(--radius-component, 8px)',
            border: '1px solid  var(--border-color, #D3DBE5)',
            ':focus': {
                border: '1px solid  var(--border-color, #D3DBE5)',
            },
        }),
    });

const uploadedFileNameStyles = css({
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
});

interface FormMessageFileUploadedProps {
    name: string;
    url: string;
    extension: string;
    onFileRemove: (url: string) => void;
    disabled?: boolean;
    sent?: boolean;
}

const FormMessageFileUploaded = ({
    name,
    extension,
    onFileRemove,
    url,
    disabled,
    sent,
}: FormMessageFileUploadedProps): ReactElement => {
    const { isNewSkin } = useNewSkin();

    return (
        <div css={getUploadedFormFileStyles(isNewSkin, sent)} className="input-group">
            <FileIcon extension={extension} />
            <span css={uploadedFileNameStyles}>{name}</span>
            {!disabled && (
                <button
                    css={deleteButtonStyles}
                    type="button"
                    onClick={(): void => onFileRemove(url)}
                    className="material-icons ripple "
                >
                    <DeleteIcon />
                    <span css={deleteButtonTooltipStyles}>{trans('delete', null, 'Delete')}</span>
                </button>
            )}
            {sent && (
                <div css={getSentMarkerContainer(isNewSkin)}>
                    <SuccessCheck />
                </div>
            )}
        </div>
    );
};

export default FormMessageFileUploaded;
