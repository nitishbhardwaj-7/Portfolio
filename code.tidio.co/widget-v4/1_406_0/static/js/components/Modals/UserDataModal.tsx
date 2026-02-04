import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { animated, useTransition } from '@react-spring/web';

import useNewSkin from '../../hooks/useNewSkin';

import { focusNewMessageTextarea } from '../../helpers/focusManager';
import { trans } from '../../helpers/translations';

import {
    showUserDataModal as showUserDataModalAction,
    widgetActivityTracking,
} from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import { DefaultRootState } from '../../store/typings';
import { ChevronDown, ChevronDownLight } from '../svgIcons/SvgIcons';
import AlwaysOnlineModal from './AlwaysOnlineModal';
import CreateTicketModal from './CreateTicketModal';
import PrechatModal from './PrechatModal';
import {
    userDataModalBackgroundStyles,
    userDataModalClose,
    userDataModalStyle,
} from './UserDataModal.styles';

const UserDataModal = (): ReactElement => {
    const dispatch = useDispatch();
    const showUserDataModal = useSelector((store: DefaultRootState) => store.showUserDataModal);
    const { isNewSkin } = useNewSkin();
    const outsideTransition = useTransition(showUserDataModal !== false, {
        config: {
            tension: 150,
            friction: 20,
        },
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
    });

    const containerRef = React.useRef<HTMLDivElement | null>(null);

    function closeModal(): void {
        dispatch(widgetActivityTracking(trackingEvents.closeModalClicked));
        dispatch(showUserDataModalAction(false));
    }

    React.useEffect(
        () =>
            // focus newMessageTextarea after closing modal
            (): void => {
                focusNewMessageTextarea();
            },
        [],
    );

    const innerTransition = useTransition(showUserDataModal, {
        from: {
            transform: 'translateY(100px)',
            opacity: 0,
        },
        enter: {
            transform: 'translateY(0px)',
            opacity: 1,
        },
        leave: {
            transform: 'translateY(100px)',
            opacity: 0,
        },
    });

    return outsideTransition(
        (outsideStyle, outsideItem) =>
            outsideItem && (
                <animated.div css={userDataModalBackgroundStyles} style={outsideStyle}>
                    {innerTransition((style, item) => {
                        if (!item) {
                            return null;
                        }
                        let content;
                        if (item === 'prechat') {
                            content = <PrechatModal />;
                        } else if (item === 'alwaysOnline') {
                            content = <AlwaysOnlineModal />;
                        } else if (item === 'createTicket') {
                            content = <CreateTicketModal />;
                        }

                        return (
                            <animated.div
                                className="user-data-modal"
                                style={style}
                                ref={containerRef}
                                data-testid="userDataModal"
                                css={userDataModalStyle}
                            >
                                <button
                                    css={userDataModalClose}
                                    onClick={closeModal}
                                    type="button"
                                    aria-label={trans('closeUserDataModal', null, 'Close modal')}
                                >
                                    {isNewSkin ? <ChevronDownLight /> : <ChevronDown />}
                                </button>
                                {content}
                            </animated.div>
                        );
                    })}
                </animated.div>
            ),
    );
};

export default UserDataModal;
