import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { css } from '@emotion/react';

import useNewSkin from '../../hooks/useNewSkin';

import { getCustomAvatar, getOperators } from '../../store/selectors';
import Operator from '../Operator';

import defaultAvatar from '../../styles/img/default.jpg';

const userDataModalOperators = css`
    text-align: left;
    white-space: nowrap;
    margin-bottom: 20px;
`;

const userDataModalOperator = css`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-size: cover;
    background-position: center;
    display: inline-block;
    background-image: url(${defaultAvatar});
    border: solid 1px #fff;
    &:not(:first-child) {
        margin-left: -12px;
    }
`;

const WidgetAvatarOrOnlineOperators = (): ReactElement => {
    const { isNewSkin } = useNewSkin();

    const customAvatar = useSelector(getCustomAvatar);
    const operators = useSelector(getOperators);

    if (customAvatar) {
        return (
            <div css={userDataModalOperators}>
                <Operator
                    key={1}
                    avatarSrc={customAvatar}
                    css={userDataModalOperator}
                    withBackgroundColor={isNewSkin}
                />
            </div>
        );
    }

    const operatorsToDisplay = operators.find((operator) => operator.isOnline)
        ? operators.filter((operator) => operator.isOnline)
        : operators;

    return (
        <div css={userDataModalOperators}>
            {operatorsToDisplay.slice(0, 4).map((operator) => (
                <Operator
                    key={operator.id}
                    avatarSrc={operator.avatarSrc}
                    css={userDataModalOperator}
                />
            ))}
        </div>
    );
};

export default WidgetAvatarOrOnlineOperators;
