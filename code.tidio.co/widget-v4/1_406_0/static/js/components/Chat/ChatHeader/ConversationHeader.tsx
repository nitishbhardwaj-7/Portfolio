import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useNewSkin from '../../../hooks/useNewSkin';

import { trans } from '../../../helpers/translations';

import { setOpenTab, widgetActivityTracking } from '../../../store/actions';
import { trackingEvents } from '../../../store/activityTrackingHelpers';
import { getAllowClose, getIsChatOnSite } from '../../../store/selectors';
import { DefaultRootState } from '../../../store/typings';
import { useVideoCallOffer } from '../../VideoCall/VideoCallContext';
import { ChevronLeft, ChevronLeftLight, Wave } from '../../svgIcons/SvgIcons';
import ChatOptions from '../ChatOptions';
import button from './Button';
import buttonLabel from './ButtonLabel';
import ConversationHeaderOperators from './ConversationHeaderOperators';
import ExpandChatButton from './ExpandChatButton';
import styles from './Header.styles';
import HeaderCloseButton from './HeaderCloseButton';
import StartersStatusBar from './StatusBar';

const ConversationHeader = ({
    showCloseButton,
    chatViewRef,
}: {
    showCloseButton: boolean;
    chatViewRef?: React.RefObject<HTMLDivElement>;
}): ReactElement => {
    const dispatch = useDispatch();
    const { isNewSkin } = useNewSkin();

    const handleGoBack = (): void => {
        dispatch(setOpenTab('home'));
        dispatch(widgetActivityTracking(trackingEvents.goBackToConversationStartersClicked));
    };

    if (isNewSkin) {
        return (
            <div css={styles.header}>
                <div css={[styles.options, styles.newOptions]}>
                    <button
                        type="button"
                        onClick={handleGoBack}
                        css={[button, buttonLabel, styles.backButton, styles.newBackButton]}
                    >
                        <ChevronLeftLight />
                        <span>{trans('goBack', null, 'Go back')}</span>
                    </button>
                    <ConversationHeaderOperators />
                    <div css={[styles.optionsButtons, styles.newOptionsButtons]}>
                        {showCloseButton && <HeaderCloseButton />}
                        <ChatOptions />
                        {chatViewRef && <ExpandChatButton chatViewRef={chatViewRef} />}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-header">
            <div css={[styles.options, styles.optionsChatOld]}>
                <button
                    type="button"
                    className="ripple"
                    onClick={handleGoBack}
                    css={[button, buttonLabel, styles.backButton]}
                >
                    <ChevronLeft />
                    <span>{trans('goBack', null, 'Go back')}</span>
                </button>
                <ConversationHeaderOperators />
                <div css={styles.optionsButtons}>
                    {showCloseButton && <HeaderCloseButton />}
                    <ChatOptions />
                </div>
            </div>
            <StartersStatusBar />
            <div css={styles.wave}>
                <Wave />
            </div>
        </div>
    );
};

const ConversationHeaderWrapper = ({
    chatViewRef,
}: {
    chatViewRef?: React.RefObject<HTMLDivElement>;
}): ReactElement => {
    const isChatOnSite = useSelector(getIsChatOnSite);
    const isMobile = useSelector((store: DefaultRootState) => store.isMobile);
    const { isNewSkin } = useNewSkin();
    const allowClose = useSelector(getAllowClose);

    const { state: videoCallOffer } = useVideoCallOffer();
    const hasVideoCallOffer = videoCallOffer?.offer;

    const showCloseButton =
        allowClose && !((!isMobile && (isChatOnSite || isNewSkin)) || hasVideoCallOffer);

    return <ConversationHeader showCloseButton={showCloseButton} chatViewRef={chatViewRef} />;
};

export default ConversationHeaderWrapper;
