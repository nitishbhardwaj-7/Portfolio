import React, { MouseEvent, ReactElement, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { animated, useTransition } from '@react-spring/web';

import useNewSkin from '../../hooks/useNewSkin';

import { trans } from '../../helpers/translations';

import {
    setNotificationStatus,
    setOptionDropdownVisibility,
    widgetActivityTracking,
} from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import { getOpenTab } from '../../store/selectors';
import { DefaultRootState } from '../../store/typings';
import { getTextStyles } from '../../styles/text.styles';
import Translation from '../Translation';
import {
    NotificationsOff,
    NotificationsOffLight,
    NotificationsOn,
    NotificationsOnLight,
    Options,
    OptionsLight,
} from '../svgIcons/SvgIcons';
import button from './ChatHeader/Button';
import buttonLabel from './ChatHeader/ButtonLabel';
import getOptionsDropdownStyles from './Dropdown.styles';

const DROP_DOWN_MOVEMENT = 10;

const ChatOptions = (): ReactElement => {
    const dispatch = useDispatch();
    const isDropdownVisible = useSelector((store: DefaultRootState) => store.showOptionsDropdown);
    const areNotificationSnoozed = useSelector(
        (store: DefaultRootState) => store.notificationSnoozed,
    );
    const isSoundEnabled = useSelector((store: DefaultRootState) => store.isSoundEnabled);
    const isMobile = useSelector((store: DefaultRootState) => store.isMobile);
    const tab = useSelector(getOpenTab);
    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);

    const handleNotifications = useCallback(() => {
        dispatch(setOptionDropdownVisibility(false));
        dispatch(setNotificationStatus(!areNotificationSnoozed));
    }, [areNotificationSnoozed, dispatch]);

    const handleFocus = useCallback(
        (status: boolean) => {
            dispatch(setOptionDropdownVisibility(status));
        },
        [dispatch],
    );

    const onOptionsClick = (event: MouseEvent<HTMLElement>): void => {
        const isTriggeredFromKeybord =
            event.nativeEvent.pageX === 0 && event.nativeEvent.pageY === 0;
        if (!isTriggeredFromKeybord && isDropdownVisible) {
            event.currentTarget.blur();
        }
        dispatch(widgetActivityTracking(trackingEvents.optionsButtonClicked));
        dispatch(setOptionDropdownVisibility(!isDropdownVisible));
    };

    const hideOptions = (): void => {
        dispatch(setOptionDropdownVisibility(false));
    };

    const renderNotificationButton = (): ReactElement =>
        areNotificationSnoozed ? (
            <li>
                <button
                    type="button"
                    className="material-icons"
                    onClick={handleNotifications}
                    onFocus={(): void => {
                        handleFocus(true);
                    }}
                    onBlur={(): void => {
                        handleFocus(false);
                    }}
                >
                    {isNewSkin ? <NotificationsOnLight /> : <NotificationsOn />}
                    <span css={textStyles.text14}>
                        <Translation value="turnOnNotifications" />
                    </span>
                </button>
            </li>
        ) : (
            <li>
                <button
                    type="button"
                    className="material-icons"
                    onClick={handleNotifications}
                    onFocus={(): void => {
                        handleFocus(true);
                    }}
                    onBlur={(): void => {
                        handleFocus(false);
                    }}
                >
                    {isNewSkin ? <NotificationsOffLight /> : <NotificationsOff />}
                    <span css={textStyles.text14}>
                        <Translation value="turnOffNotifications" />
                    </span>
                </button>
            </li>
        );

    const baseDropdownPosition = useMemo(() => {
        let basePosition = 72;

        if (isNewSkin) {
            basePosition = tab === 'conversations' ? 52 : 64;
        }

        if (isMobile) {
            basePosition = 60;
        }

        return basePosition;
    }, [isNewSkin, isMobile, tab]);

    const transitions = useTransition(isDropdownVisible && isSoundEnabled, {
        from: { opacity: 0.01, top: baseDropdownPosition - DROP_DOWN_MOVEMENT },
        enter: { opacity: 1, top: baseDropdownPosition, config: { tension: 120, friction: 14 } },
        leave: { opacity: 0.01, config: { duration: 10 } },
    });

    return (
        <>
            {isSoundEnabled && (
                <button
                    className="options ripple"
                    onClick={onOptionsClick}
                    onBlur={hideOptions}
                    type="button"
                    aria-label={
                        isDropdownVisible
                            ? trans('closeOptions', null, 'Close options')
                            : trans('openOptions', null, 'Open options')
                    }
                    css={[button, buttonLabel]}
                >
                    {isNewSkin ? <OptionsLight /> : <Options />}
                    <span>
                        {isDropdownVisible
                            ? trans('closeOptions', null, 'Close options')
                            : trans('openOptions', null, 'Open options')}
                    </span>
                </button>
            )}
            {transitions((style, item) =>
                item ? (
                    <animated.div style={style} css={getOptionsDropdownStyles(isNewSkin)}>
                        <ul>{renderNotificationButton()}</ul>
                    </animated.div>
                ) : null,
            )}
        </>
    );
};

export default ChatOptions;
