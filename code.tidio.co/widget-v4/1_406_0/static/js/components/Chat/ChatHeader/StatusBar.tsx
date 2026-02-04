import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { css } from '@emotion/react';

import { trans } from '../../../helpers/translations';

import { DefaultRootState } from '../../../store/typings';
import Translation from '../../Translation';

const statusBarStyles = css({
    display: 'flex',
    width: '100%',
    fontSize: 15,
    marginTop: 12,
});

const StatusBar = (): ReactElement | null => {
    const isProjectOnline = useSelector((store: DefaultRootState) => store.isProjectOnline);

    if (
        (isProjectOnline && !trans('weAreOnline')) ||
        (!isProjectOnline && !trans('alwaysOnlineTopBar'))
    ) {
        return null;
    }

    return (
        <div css={statusBarStyles}>
            {!isProjectOnline ? (
                <span>
                    <Translation value="alwaysOnlineTopBar" emojify />
                </span>
            ) : (
                <span>
                    <Translation value="weAreOnline" emojify />
                </span>
            )}
        </div>
    );
};

export default StatusBar;
