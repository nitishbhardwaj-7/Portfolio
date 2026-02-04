import React, { ReactElement } from 'react';

import { css } from '@emotion/react';

import useNewSkin from '../../../hooks/useNewSkin';

import type { DefaultRootState } from '../../../store/typings';
import Operator from '../../Operator';

const avatars = css({
    display: 'inline-flex',
    alignItems: 'center',
    float: 'left',
    '& > *:not(:first-of-type)': {
        marginInlineStart: '-4px',
    },
});

const spacer = css({
    height: 8,
});

type AvatarsProps = {
    operators: DefaultRootState['operators'];
    openTab: DefaultRootState['openTab'];
    withBackgroundColor?: boolean;
};

const Avatars = ({ operators, openTab, withBackgroundColor }: AvatarsProps): ReactElement => {
    const { isNewSkin } = useNewSkin();
    const maxAvatarsToShow = operators.slice(0, 3);
    return (
        <div>
            {openTab === 'home' && !isNewSkin && <div css={spacer} />}
            <div css={avatars}>
                {maxAvatarsToShow.map((operator) => (
                    <Operator
                        key={operator.id}
                        avatarSrc={operator.avatarSrc}
                        className="header-ava"
                        size={openTab === 'home' && !isNewSkin ? 36 : 32}
                        withBackgroundColor={withBackgroundColor}
                    />
                ))}
            </div>
        </div>
    );
};

export default Avatars;
