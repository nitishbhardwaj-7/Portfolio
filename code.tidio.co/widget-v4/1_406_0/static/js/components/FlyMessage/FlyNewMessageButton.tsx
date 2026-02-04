import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isInPreviewMode } from '../../helpers';

import { messageTypes } from '../../connection/parsers';
import { setOpenTab, setView, widgetActivityTracking } from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import { getIsMobile } from '../../store/selectors';
import { Message, MessageType, View } from '../../store/typings';
import Translation from '../Translation';

type FlyNewMessageButtonProp = {
    message: Message;
};

const WIDTH_FOR_MEDIA_CONTENT = '220px';
const SMALL_MOBILE_SCREEN_WIDTH = 340;
const MEDIUM_MOBILE_SCREEN_WIDTH = 410;

const getMinWidth = (isMediaContent: boolean, isMobile: boolean): string => {
    if (isMediaContent) {
        return WIDTH_FOR_MEDIA_CONTENT;
    }
    if (isInPreviewMode()) {
        return '230px';
    }
    const isSmallMobile = isMobile && window.screen.width < SMALL_MOBILE_SCREEN_WIDTH;
    const isMediumMobile = isMobile && window.screen.width < MEDIUM_MOBILE_SCREEN_WIDTH;
    if (isSmallMobile) {
        return '160px';
    }
    if (isMediumMobile) {
        return '210px';
    }
    return '130px';
};

const FlyNewMessageButton = (props: FlyNewMessageButtonProp): ReactElement => {
    const dispatch = useDispatch();
    const isMobile = useSelector(getIsMobile);

    const isMediaContent = props.message.type === messageTypes.uploadedFile;

    const handleClick = (): void => {
        dispatch(widgetActivityTracking(trackingEvents.flyMessageClicked));
        dispatch(setView(View.CHAT));
        dispatch(setOpenTab('conversations'));
    };

    return (
        <Translation value={['onlineMessagePlaceholder', 'fillOutTheForm']}>
            {({ onlineMessagePlaceholder, fillOutTheForm }): ReactElement => (
                <button
                    type="button"
                    style={{
                        width: isMediaContent ? WIDTH_FOR_MEDIA_CONTENT : 'auto',
                        minWidth: getMinWidth(isMediaContent, isMobile),
                    }}
                    id="new-message-button-fly"
                    className="fly-new-message-button"
                    onClick={handleClick}
                    data-testid="flyNewMessageButton"
                >
                    {props.message.type === MessageType.FORM
                        ? fillOutTheForm
                        : onlineMessagePlaceholder}
                </button>
            )}
        </Translation>
    );
};

export default FlyNewMessageButton;
