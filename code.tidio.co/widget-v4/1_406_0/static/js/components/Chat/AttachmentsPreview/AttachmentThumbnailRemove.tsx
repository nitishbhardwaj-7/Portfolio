import React, { ReactElement } from 'react';

import { trans } from '../../../helpers/translations';

import { Close } from '../../svgIcons/SvgIcons';
import { removeButtonStyles } from './AttachmentsPreview.styles';

interface AttachmentThumbnailRemoveProps {
    onClick: () => void;
}

const AttachmentThumbnailRemove = ({ onClick }: AttachmentThumbnailRemoveProps): ReactElement => (
    <button
        type="button"
        css={removeButtonStyles}
        onClick={onClick}
        aria-label={trans('removeAttachment', null, 'Remove attachment')}
    >
        <Close />
    </button>
);

export default AttachmentThumbnailRemove;
