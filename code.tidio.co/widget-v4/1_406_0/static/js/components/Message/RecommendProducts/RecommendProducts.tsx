import React, { ReactElement } from 'react';

import { css, keyframes } from '@emotion/react';

import ProductCard from '../../ProductCard/ProductCard';
import Slideshow from '../../Slideshow/Slideshow';
import { RecommendProductsMessage } from '../types';

const slideInFromBottom = keyframes({
    '0%': { transform: 'translateY(50%)', opacity: 0 },
    '100%': { transform: 'translateX(0)', opacity: 1 },
});

const messageForFlyStyles = css({
    marginBottom: 16,
});

const messageStyles = css({
    willChange: 'transform, opacity',
    opacity: 0,
    animation: `${slideInFromBottom} .5s ease-out forwards`,
});

type RecommendProductsProps = RecommendProductsMessage['recommendedProducts'] & {
    // ToDo chatBotId should be changed to required after Message type is refactored to discriminated union
    chatBotId?: number;
    isFlyMessage?: boolean;
    messageId: string;
};

const RecommendProducts = ({
    title,
    products,
    buttonPayload,
    chatBotId,
    isFlyMessage,
    messageId,
}: RecommendProductsProps): ReactElement | null => {
    const allItemsLackImages = products.every((product) => !product.imageUrl);

    if (!chatBotId) {
        return null;
    }

    return (
        <>
            {isFlyMessage ? (
                <p css={messageForFlyStyles}>{title}</p>
            ) : (
                <div className="message message-operator" css={messageStyles}>
                    <p>{title}</p>
                </div>
            )}

            <Slideshow
                items={products}
                renderItem={(item, isFocused): ReactElement => (
                    <ProductCard
                        {...item}
                        buttonPayload={buttonPayload}
                        chatBotId={chatBotId}
                        isAddToCartEnabled={isFlyMessage ? isFocused : true}
                        key={item.id}
                        messageId={messageId}
                    />
                )}
                isFlyMessage={isFlyMessage}
                isWithoutImages={allItemsLackImages}
            />
        </>
    );
};

export default RecommendProducts;
