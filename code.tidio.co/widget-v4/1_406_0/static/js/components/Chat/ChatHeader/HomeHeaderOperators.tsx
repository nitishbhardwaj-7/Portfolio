import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import useNewSkin from '../../../hooks/useNewSkin';

import { getCustomAvatar, getOpenTab, getOperators } from '../../../store/selectors';
import Avatars from './Avatars';

const HomeHeaderOperators = (): ReactElement => {
    const allOperators = useSelector(getOperators);
    const customAvatar = useSelector(getCustomAvatar);
    const openTab = useSelector(getOpenTab);
    const { isNewSkin } = useNewSkin();

    if (customAvatar) {
        return (
            <Avatars
                operators={[{ id: 1, avatarSrc: customAvatar, isOnline: false }]}
                openTab={openTab}
                withBackgroundColor={isNewSkin}
            />
        );
    }

    return <Avatars operators={allOperators} openTab={openTab} />;
};

export default HomeHeaderOperators;
