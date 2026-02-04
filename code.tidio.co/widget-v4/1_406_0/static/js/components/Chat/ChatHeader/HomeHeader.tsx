import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import useNewSkin from '../../../hooks/useNewSkin';

import { getAllowClose, getIsChatOnSite } from '../../../store/selectors';
import { DefaultRootState } from '../../../store/typings';
import { useVideoCallOffer } from '../../VideoCall/VideoCallContext';
import { Wave } from '../../svgIcons/SvgIcons';
import ChatOptions from '../ChatOptions';
import styles from './Header.styles';
import HeaderCloseButton from './HeaderCloseButton';
import HomeHeaderCopy from './HomeHeaderCopy';
import HomeHeaderOperators from './HomeHeaderOperators';

const { options, optionsButtons, newOptionsButtons, getNewHomeHeader, getBannerStyles, wave } =
    styles;

const HomeHeader = ({ showCloseButton }: { showCloseButton: boolean }): ReactElement => {
    const isMobile = useSelector((store: DefaultRootState) => store.isMobile);
    const bannerImage = useSelector((store: DefaultRootState) => store.bannerImage);
    const { isNewSkin } = useNewSkin();

    if (isNewSkin) {
        return (
            <div className="chat-header" css={getNewHomeHeader(isMobile)}>
                {bannerImage !== '' && <div css={getBannerStyles(bannerImage)} />}
                <div css={options}>
                    <HomeHeaderOperators />
                    <div css={[optionsButtons, newOptionsButtons]}>
                        {showCloseButton && <HeaderCloseButton />}
                        <ChatOptions />
                    </div>
                </div>
                <div>
                    <HomeHeaderCopy />
                    <div style={{ height: isMobile ? 12 : 28 }} />
                </div>
            </div>
        );
    }

    return (
        <div className="chat-header">
            {bannerImage !== '' && <div css={getBannerStyles(bannerImage)} />}
            <div css={options}>
                <HomeHeaderOperators />
                <div css={optionsButtons}>
                    {showCloseButton && <HeaderCloseButton />}
                    <ChatOptions />
                </div>
            </div>
            <HomeHeaderCopy />
            <div style={{ height: isMobile ? 12 : 40 }} />
            <div css={wave}>
                <Wave />
            </div>
        </div>
    );
};

const HomeHeaderWrapper = (): ReactElement => {
    const isChatOnSite = useSelector(getIsChatOnSite);
    const isMobile = useSelector((store: DefaultRootState) => store.isMobile);
    const { isNewSkin } = useNewSkin();
    const { state: videoCallOffer } = useVideoCallOffer();
    const allowClose = useSelector(getAllowClose);

    const hasVideoCallOffer = videoCallOffer?.offer;

    const showCloseButton =
        allowClose && !((!isMobile && (isChatOnSite || isNewSkin)) || hasVideoCallOffer);

    return <HomeHeader showCloseButton={showCloseButton} />;
};

export default HomeHeaderWrapper;
