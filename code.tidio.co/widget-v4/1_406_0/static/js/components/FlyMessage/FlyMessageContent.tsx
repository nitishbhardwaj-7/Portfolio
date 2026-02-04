import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import { parseMarkdown, sanitizeLinkifyAndEmojifyString } from '../../helpers/ui';

import { messageTypes } from '../../connection/parsers';
import { setOpenTab, setView, widgetActivityTracking } from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import { Message, View } from '../../store/typings';
import RecommendProducts from '../Message/RecommendProducts/RecommendProducts';
import MediaContent from './MediaContent';

type FlyMessageContentProps = {
    message: Message;
};

const CouponCode = css({
    display: 'inline-block',
    marginTop: 20,
});

const FlyMessageContent = (props: FlyMessageContentProps): ReactElement => {
    const dispatch = useDispatch();
    const {
        content,
        type,
        attachmentType,
        chatBotId,
        iframe,
        cards = [],
        id,
        recommendedProducts,
    } = props.message;

    const isMediaContent = type === messageTypes.uploadedFile;
    if (isMediaContent) {
        return (
            <div className={`message-container ${attachmentType}-content`}>
                <MediaContent
                    content={content}
                    onClick={(): void => {
                        dispatch(widgetActivityTracking(trackingEvents.flyMessageClicked));
                        dispatch(setView(View.CHAT));
                        dispatch(setOpenTab('conversations'));
                    }}
                    attachmentType={attachmentType}
                />
            </div>
        );
    }

    let textContent = null;

    if (type === messageTypes.cards) {
        const firstCardTitle = cards[0]?.title || '';
        textContent = sanitizeLinkifyAndEmojifyString(firstCardTitle);
        const imageUrl = cards[0]?.imageUrl || '';
        if (imageUrl) {
            return (
                <div className="message-container image-content">
                    <MediaContent
                        content={imageUrl}
                        onClick={(): void => {
                            dispatch(setView(View.CHAT));
                            dispatch(setOpenTab('conversations'));
                        }}
                        attachmentType="image"
                    />

                    <span
                        className="fly-message--card-title"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: textContent }}
                    />
                </div>
            );
        }
    } else if (type === messageTypes.couponCode) {
        const { couponCode = '' } = props.message;
        textContent = sanitizeLinkifyAndEmojifyString(content);
        return (
            <div className="message-container">
                <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: textContent }}
                />
                <span css={CouponCode}>{couponCode}</span>
            </div>
        );
    } else if (type === messageTypes.iframe) {
        return (
            <div className="message-container">
                <p>{iframe?.title}</p>
                <br />
                <p>{iframe?.subtitle}</p>
            </div>
        );
    } else if (type === messageTypes.recommendedProducts) {
        return (
            <div className="message-container recommend-products-message">
                <RecommendProducts
                    title={recommendedProducts?.title || ''}
                    buttonPayload={recommendedProducts?.buttonPayload || ''}
                    products={recommendedProducts?.products || []}
                    chatBotId={chatBotId}
                    isFlyMessage
                    messageId={id}
                />
            </div>
        );
    } else {
        textContent = parseMarkdown(content);
    }

    return (
        <div
            className="message-container"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: textContent }}
        />
    );
};

export default FlyMessageContent;
