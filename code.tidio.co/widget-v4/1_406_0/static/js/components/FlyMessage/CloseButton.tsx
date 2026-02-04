import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { trans } from '../../helpers/translations';

import { setChatOpenedState, toggleEmojiPanel, widgetActivityTracking } from '../../store/actions';
import { getIsChatOnSite } from '../../store/selectors';
import { DefaultRootState, TrackingEvent } from '../../store/typings';
import { Close } from '../svgIcons/SvgIcons';

const CloseButton = ({ trackingEvent }: { trackingEvent: TrackingEvent }): ReactElement | null => {
    const dispatch = useDispatch();
    const isMobile = useSelector((store: DefaultRootState) => store.isMobile);
    const isChatOnSite = useSelector(getIsChatOnSite);

    const onCloseClick = (): void => {
        dispatch(widgetActivityTracking(trackingEvent));
        dispatch(toggleEmojiPanel(false));
        dispatch(setChatOpenedState(false));
    };

    if (!isMobile && isChatOnSite) {
        return null;
    }

    return (
        <button
            type="button"
            className="exit-chat"
            onClick={onCloseClick}
            aria-label={trans('closeWidget', null, 'Close chat widget')}
        >
            <Close />
        </button>
    );
};

export default CloseButton;
