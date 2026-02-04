import React from 'react';

import PropTypes from 'prop-types';

import { Doc, Flv, Img, Mpg, Pdf, Txt, Wma, Xls } from '../svgIcons/SvgIcons';

/* eslint-disable react/prefer-stateless-function */
class FileIcon extends React.Component {
    render() {
        switch (this.props.extension) {
            case 'doc':
            case 'docx':
                return <Doc />;
            case 'flv':
                return <Flv />;
            case 'mpg':
            case 'mp4':
            case 'avi':
                return <Mpg />;
            case 'pdf':
                return <Pdf />;
            case 'txt':
            case 'rtf':
                return <Txt />;
            case 'wma':
            case 'mp3':
                return <Wma />;
            case 'xls':
            case 'xlsx':
            case 'csv':
                return <Xls />;
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'gif':
                return <Img />;
            default:
                return null;
        }
    }
}
/* eslint-enable react/prefer-stateless-function */

FileIcon.propTypes = {
    extension: PropTypes.string.isRequired,
};

export default FileIcon;
