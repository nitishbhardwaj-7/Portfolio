import React, { ReactElement } from 'react';

import Slideshow from '../../Slideshow/Slideshow';
import { CardGalleryMessage } from '../types';
import Card from './Card';

type CardGalleryProps = CardGalleryMessage;

const CardGallery = ({ cards, operator_id, aiAssistantTask }: CardGalleryProps): ReactElement => {
    /* About 'hasImages':
     * The panel doesn't allow some cards to have images while others don't.
     * Either all cards must have images, or none can (this is validated).
     * Therefore, it's sufficient to check only the first card to see if it has a image.
     */
    const hasImages = typeof cards[0].imageUrl === 'string';
    const isProductGallery = typeof operator_id === 'number';

    return (
        <Slideshow
            items={cards}
            renderItem={(card): ReactElement => (
                <Card
                    {...card}
                    isShopifyCard={isProductGallery}
                    key={card.id}
                    metadata={{ is_ai_assistant_task: aiAssistantTask }}
                />
            )}
            isWithoutImages={!hasImages}
        />
    );
};

export default CardGallery;
