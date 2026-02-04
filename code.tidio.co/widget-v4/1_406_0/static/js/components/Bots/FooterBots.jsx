import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useNewSkin from '../../hooks/useNewSkin';

import { trans } from '../../helpers/translations';

import {
    botsGetStarted,
    cancelBots,
    toggleEmojiPanel,
    widgetActivityTracking,
} from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import CSSAnimation from '../Animations/CSSAnimation';
import BotsButton from './BotsButton';
import BotsButtonDropdown from './BotsButtonDropdown';

const FooterBots = () => {
    const [botsDropdownVisible, setBotsDropdownVisible] = useState(false);

    const bots = useSelector((store) => store.bots);
    const isBotActive = useSelector((store) => store.isBotActive);
    const disableBotsButtonAnimation = useSelector((store) => store.disableBotsButtonAnimation);

    const dispatch = useDispatch();
    const { isNewSkin } = useNewSkin();

    const toggleBotsDropdownVisibility = () => {
        dispatch(toggleEmojiPanel(false));
        setBotsDropdownVisible((prevValue) => !prevValue);
        dispatch(widgetActivityTracking(trackingEvents.botsButtonClicked));
    };

    const onBotClick = () => {
        if (isBotActive) {
            return false;
        }
        dispatch(botsGetStarted());
        setBotsDropdownVisible(false);
        return true;
    };

    const onCancelBotClick = () => {
        dispatch(widgetActivityTracking(trackingEvents.botCanceled));
        dispatch(cancelBots());
        setBotsDropdownVisible(false);
    };
    if (!bots || bots.length === 0) {
        return null;
    }

    const ariaLabel = botsDropdownVisible
        ? trans('closeBotsLauncher', null, 'Close Bots Launcher')
        : trans('openBotsLauncher', null, 'Open Bots Launcher');

    if (isNewSkin) {
        return (
            <BotsButton
                onClick={onBotClick}
                disableButtonAnimation={disableBotsButtonAnimation}
                ariaLabel={ariaLabel}
                shouldDisplayTooltip
            />
        );
    }
    return (
        <>
            <BotsButton
                onBlur={() => {
                    setBotsDropdownVisible(false);
                }}
                onClick={toggleBotsDropdownVisibility}
                disableButtonAnimation={disableBotsButtonAnimation}
                ariaLabel={ariaLabel}
            />
            <CSSAnimation in={botsDropdownVisible} classNames="botsListFade">
                <BotsButtonDropdown
                    onBotClick={onBotClick}
                    onBotFocus={() => {
                        setBotsDropdownVisible(true);
                    }}
                    onBotBlur={() => {
                        setBotsDropdownVisible(false);
                    }}
                    onCancelBotClick={onCancelBotClick}
                    isBotActive={isBotActive}
                />
            </CSSAnimation>
        </>
    );
};

export default FooterBots;
