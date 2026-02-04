import React, { ReactElement } from 'react';

import useNewSkin from '../../../hooks/useNewSkin';

import styles from './Card.styles';
import stylesNewSkin from './CardNewSkin.styles';

interface CardImageProps {
    imageUrl: string;
    link?: string;
    openLink?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const CardImage = ({ imageUrl, link, openLink = (): void => {} }: CardImageProps): ReactElement => {
    const { isNewSkin } = useNewSkin();

    if (link) {
        return (
            <a href={link} onClick={openLink} data-testid="cardImageLink">
                <div
                    css={isNewSkin ? stylesNewSkin.image : styles.image}
                    style={{ backgroundImage: `url(${imageUrl})` }}
                />
            </a>
        );
    }

    return (
        <div
            css={isNewSkin ? stylesNewSkin.image : styles.image}
            style={{ backgroundImage: `url(${imageUrl})` }}
        />
    );
};

export default CardImage;
