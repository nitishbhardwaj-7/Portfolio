import { css } from '@emotion/react';

const widgetLabelStyles = css`
    position: absolute;
    height: 42px;
    bottom: 61px;
    z-index: 1;
    white-space: nowrap;
    font-size: 17px;
    line-height: 17px;
    //Don't use RTL here
    .widget-position-left & {
        /*! @noflip */
        left: 100px;
    }
    .widget-position-right & {
        /*! @noflip */
        right: 100px;
    }

    border-radius: var(--radius-component, 16px);
    padding-block: var(--label-padding-block, 10px);
    padding-inline: var(--label-padding-inline, 15px);
    box-shadow: var(--label-shadow);
    background: #fff;
`;

export default widgetLabelStyles;
