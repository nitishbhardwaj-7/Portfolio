import React, { ReactElement, useMemo } from 'react';

import useNewSkin from '../../../hooks/useNewSkin';

import { getCurrentUrl, getFullParsedUrl, isSameHost, parseUrl } from '../../../helpers/index';
import { sanitizeLinkifyAndEmojifyString } from '../../../helpers/ui';
import { getUrlWithoutProtocol } from '../helpers';

import { getTextStyles } from '../../../styles/text.styles';
import Buttons from '../Buttons/Buttons';
import ButtonsShopifyCard from '../Buttons/ButtonsShopifyCard';
import { CardType } from '../types';
import styles from './Card.styles';
import CardImage from './CardImage';
import stylesNewSkin from './CardNewSkin.styles';

export interface CardProps extends CardType {
    isShopifyCard: boolean;
}

const Card = ({
    title,
    isShopifyCard,
    imageUrl,
    buttons,
    proxyUrl,
    subtitle = '',
    url = '',
    metadata,
}: CardProps): ReactElement => {
    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);

    const { host } = parseUrl(url) || {};
    const parsedUrl = getFullParsedUrl(url);
    const parsedTitle = sanitizeLinkifyAndEmojifyString(title);
    const parsedSubtitle = sanitizeLinkifyAndEmojifyString(subtitle);
    const sameHost = isSameHost(getCurrentUrl(), url);
    const hasImage = Boolean(imageUrl);

    const extendedButtons = useMemo(
        () =>
            buttons.map((button) => ({
                ...button,
                cardClicked: title,
            })),
        [buttons, title],
    );

    const openLink = (event: React.MouseEvent): void => {
        event.preventDefault();
        const locationURL = proxyUrl || parsedUrl;

        try {
            if (sameHost && window.top) {
                window.top.location = locationURL;
            } else {
                window.open(locationURL);
            }
        } catch {
            window.open(locationURL);
        }
    };

    if (isNewSkin) {
        return (
            <div css={stylesNewSkin.container}>
                {imageUrl && <CardImage imageUrl={imageUrl} link={parsedUrl} openLink={openLink} />}
                <div css={stylesNewSkin.content}>
                    <div css={stylesNewSkin.text}>
                        <div
                            css={textStyles.text14Medium}
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: parsedTitle }}
                        />
                        {subtitle && (
                            <div
                                css={[textStyles.text14, stylesNewSkin.subtitle]}
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{ __html: parsedSubtitle }}
                            />
                        )}
                        {url && (
                            <div css={[textStyles.text14, stylesNewSkin.url]}>
                                <a
                                    href={parsedUrl}
                                    type="button"
                                    onClick={openLink}
                                    data-testid="cardLink"
                                >
                                    {sameHost ? getUrlWithoutProtocol(url) : host}
                                </a>
                            </div>
                        )}
                    </div>
                    <div css={stylesNewSkin.buttons}>
                        {isShopifyCard ? (
                            <ButtonsShopifyCard buttons={extendedButtons} />
                        ) : (
                            <Buttons buttons={extendedButtons} metadata={metadata} />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="message-with-buttons">
            {imageUrl && <CardImage imageUrl={imageUrl} link={parsedUrl} openLink={openLink} />}
            <div css={styles.getContentContainer(hasImage)}>
                <div
                    css={styles.title}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: parsedTitle }}
                />
                {subtitle && (
                    <div
                        css={styles.subtitle}
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: parsedSubtitle }}
                    />
                )}
                {url && (
                    <div css={styles.url}>
                        <a href={parsedUrl} type="button" onClick={openLink} data-testid="cardLink">
                            {sameHost ? getUrlWithoutProtocol(url) : host}
                        </a>
                    </div>
                )}
            </div>
            <div css={styles.buttons}>
                <div className="button-wrapper">
                    {isShopifyCard ? (
                        <ButtonsShopifyCard buttons={extendedButtons} />
                    ) : (
                        <Buttons buttons={extendedButtons} metadata={metadata} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
