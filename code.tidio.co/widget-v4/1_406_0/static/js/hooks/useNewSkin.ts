import { useSelector } from 'react-redux';

import { isNewSkin } from '../helpers/skin';

import { getDesignVersion } from '../store/selectors';

const useNewSkin = (): { isNewSkin: boolean } => {
    const designVersion = useSelector(getDesignVersion);

    return { isNewSkin: designVersion === 5 || isNewSkin() };
};

export default useNewSkin;
