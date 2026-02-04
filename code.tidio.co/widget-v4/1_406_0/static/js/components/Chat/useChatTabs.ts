import { useDispatch, useSelector } from 'react-redux';

import { isInSandboxMode } from '../../helpers';

import { botsGetStarted, setOpenTab } from '../../store/actions';
import { getCanSendWelcomeMessage } from '../../store/selectors';
import { DefaultRootState } from '../../store/typings';

type UseChatTabs = {
    isFlowsLauncherActive: boolean;
    handleTabChange: (openTab: DefaultRootState['openTab']) => void;
};

const useChatTabs = (): UseChatTabs => {
    const dispatch = useDispatch();
    const canSendWelcomeMessage = useSelector(getCanSendWelcomeMessage);
    const getStartedActive = useSelector((store: DefaultRootState) => store.getStartedActive);
    const isSandbox = isInSandboxMode();

    const isFlowsLauncherActive = !isSandbox && getStartedActive && canSendWelcomeMessage;

    const handleTabChange = (openTab: DefaultRootState['openTab']): void => {
        if (isFlowsLauncherActive) {
            dispatch(botsGetStarted());
        }
        dispatch(setOpenTab(openTab));
    };

    return { isFlowsLauncherActive, handleTabChange };
};

export default useChatTabs;
