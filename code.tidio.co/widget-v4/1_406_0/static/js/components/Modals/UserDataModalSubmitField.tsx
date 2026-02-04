import React, { ReactElement } from 'react';

import { css } from '@emotion/react';

import Translation from '../Translation';

const userDataModalSubmit = css`
    flex-shrink: 0;
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-weight: 600;
    border-radius: var(--radius-component, 6px);
    background: var(--custom-action-color);
    color: var(--custom-action-color-contrast);
    position: relative;

    &::after {
        transition: background 0.2s;
        content: '';
        border-radius: 6px;
        background: rgba(0, 0, 0, 0);
        left: 0;
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;
    }
    &:hover {
        &::after {
            background: rgba(0, 0, 0, 0.08);
        }
    }
`;

const UserDataModalSubmitField = (): ReactElement => (
    <button css={userDataModalSubmit} type="submit">
        <Translation value="offlineSendButton" />
    </button>
);

export default UserDataModalSubmitField;
