import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { css } from '@emotion/react';

import useNewSkin from '../../hooks/useNewSkin';

import { trans } from '../../helpers/translations';

import { getIsDragAndDropActive } from '../../store/selectors';
import { NewSkinUploadIcon, UploadIcon } from '../svgIcons/SvgIcons';

const uploadIconWrapperStyles = css({
    position: 'absolute',
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 3,
});

const uploadIconStyles = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    svg: {
        width: '64px',
        height: '64px',
    },
});

const DragAndDrop = (): ReactElement | null => {
    const isDragAndDropActive = useSelector(getIsDragAndDropActive);

    const { isNewSkin } = useNewSkin();

    if (!isDragAndDropActive) {
        return null;
    }

    if (isNewSkin) {
        return (
            <div css={uploadIconWrapperStyles}>
                <div css={uploadIconStyles}>
                    <NewSkinUploadIcon />
                    <span>{trans('dragAndDropInfo', null, 'Drop here to attach')}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="uploadIconWrapper">
            <div className="upload-circle">
                <UploadIcon />
                <span>{trans('dragAndDropInfo', null, 'Drop here to attach')}</span>
            </div>
        </div>
    );
};

export default DragAndDrop;
