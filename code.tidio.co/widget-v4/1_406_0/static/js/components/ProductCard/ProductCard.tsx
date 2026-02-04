import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import useNewSkin from '../../hooks/useNewSkin';

import { getFullParsedUrl, getUserLanguage, isInSandboxMode } from '../../helpers';
import { ravenCaptureException } from '../../helpers/raven';
import { shopifyAddToCartRequest } from '../../helpers/shopifyApiData';
import { trans } from '../../helpers/translations';

import {
    productRecommendationClicked,
    sendMessageFromVisitorWithBotPayload,
    widgetActivityTracking,
} from '../../store/actions';
import { trackingEvents } from '../../store/activityTrackingHelpers';
import { getKeyFromStorage, removeKeyFromStorage, saveKeyToStorage } from '../../store/savedState';
import { RecommendedProduct } from '../../store/typings';
import { getTextStyles } from '../../styles/text.styles';
import Translation from '../Translation';
import { SuccessCheck } from '../svgIcons/SvgIcons';
import styles from './ProductCard.styles';
import { ADD_TO_CART_CLICKED_KEY, LEARN_MORE_CLICKED_KEY } from './contants';

interface ProductCardProps extends RecommendedProduct {
    buttonPayload: string;
    chatBotId: number;
    isAddToCartEnabled: boolean;
    messageId: string;
}

const ProductCard = ({
    id,
    title,
    imageUrl,
    price,
    currency,
    variants,
    url,
    buttonPayload,
    chatBotId,
    isAddToCartEnabled,
    messageId,
}: ProductCardProps): ReactElement => {
    const dispatch = useDispatch();
    const cardKey = `${messageId}_${id}`;
    const initiallyAddedToCartCardId = getKeyFromStorage(ADD_TO_CART_CLICKED_KEY); // could be added from FlyMessage (that's why we need to save this information in storage)
    const isInitiallyAddedToCart = initiallyAddedToCartCardId === cardKey;
    const [isAddToCartLoading, setAddToCartLoading] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(isInitiallyAddedToCart);
    const parsedUrl = getFullParsedUrl(url);
    const withAddToCartButton = variants.length <= 1;
    const hasImage = Boolean(imageUrl);
    const productAddedToCartTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const shouldSendDataAboutLearnMoreClickedRef = useRef<string | undefined | null>(
        getKeyFromStorage(LEARN_MORE_CLICKED_KEY),
    );
    const { isNewSkin } = useNewSkin();
    const textStyles = getTextStyles(isNewSkin);

    const addedToCartComplete = (): void => {
        dispatch(
            productRecommendationClicked({
                productId: id,
                chatBotId,
            }),
        );
        setAddToCartLoading(false);
        setIsAddedToCart(true);
        saveKeyToStorage(ADD_TO_CART_CLICKED_KEY, cardKey);
    };
    let formatter;
    try {
        formatter = new Intl.NumberFormat(getUserLanguage() || 'en-US', {
            style: 'currency',
            currency,
            currencyDisplay: 'narrowSymbol',
        });
    } catch (e) {
        if (e instanceof Error) {
            ravenCaptureException('Wrong currency provided to recommended product', {
                message: e.message,
            });
        }
    }

    const handleAddToCart = async (): Promise<void> => {
        setAddToCartLoading(true);
        dispatch(
            sendMessageFromVisitorWithBotPayload(
                `${title} &rarr; ${trans('recommendProductAddToCart', null, 'Add to cart')}`,
                buttonPayload,
            ),
        );
        dispatch(widgetActivityTracking(trackingEvents.productRecommendationAddToCartClicked));
        if (isInSandboxMode()) {
            addedToCartComplete();
        } else if (variants.length === 1) {
            try {
                const response = await shopifyAddToCartRequest(variants[0].id);
                if (!response.ok) {
                    ravenCaptureException('Shopify add to cart request failed', {
                        message: response.statusText,
                    });
                }
                addedToCartComplete();
            } catch (error) {
                if (error instanceof Error) {
                    ravenCaptureException('Shopify add to cart request failed', {
                        message: error.message,
                    });
                }
                setAddToCartLoading(false);
            }
        }
    };

    const handleLearnMoreDataSend = useCallback((): void => {
        dispatch(
            sendMessageFromVisitorWithBotPayload(
                `${title} &rarr; ${trans('recommendProductLearnMore', null, 'Learn more')}`,
                buttonPayload,
            ),
        );
        dispatch(
            productRecommendationClicked({
                productId: id,
                chatBotId,
            }),
        );
        dispatch(widgetActivityTracking(trackingEvents.productRecommendationLearnMoreClicked));
    }, [buttonPayload, chatBotId, dispatch, id, title]);

    const handleLearnMore = (): void => {
        try {
            if (url.indexOf('://') === -1 && window.top) {
                // we want to store the id of the product which was clicked, so we populate proper data on widget load
                // because all rendered cards will check the value
                const flagStored = saveKeyToStorage(LEARN_MORE_CLICKED_KEY, cardKey);
                // if we fail to store the flag, we want to try to send frames data, maybe it will work
                if (!flagStored) {
                    handleLearnMoreDataSend();
                }
                window.top.location.assign(url);
            } else {
                handleLearnMoreDataSend();
                window.open(parsedUrl);
            }
        } catch {
            handleLearnMoreDataSend();
            window.open(parsedUrl);
        }
    };

    // when we change current location, it's 50/50 if the frames reach sockets or not. We want to send them in new location
    useEffect(() => {
        if (shouldSendDataAboutLearnMoreClickedRef.current === cardKey) {
            shouldSendDataAboutLearnMoreClickedRef.current = undefined;
            removeKeyFromStorage(LEARN_MORE_CLICKED_KEY);
            handleLearnMoreDataSend();
        }
    }, [handleLearnMoreDataSend, cardKey]);

    useEffect(() => {
        if (isInitiallyAddedToCart) {
            setIsAddedToCart(true);
        }
    }, [isInitiallyAddedToCart]);

    useEffect(() => {
        if (isAddedToCart) {
            productAddedToCartTimerRef.current = setTimeout(() => {
                removeKeyFromStorage(ADD_TO_CART_CLICKED_KEY);
                setIsAddedToCart(false);
            }, 10000);
        }
    }, [isAddedToCart]);

    useEffect(
        () => (): void => {
            clearTimeout(productAddedToCartTimerRef.current);
        },
        [],
    );

    const learnMoreButton = (
        <button type="button" css={styles.secondaryButton(isNewSkin)} onClick={handleLearnMore}>
            <Translation value="recommendProductLearnMore" fallback="Learn more" />
        </button>
    );

    return (
        <div css={styles.container}>
            {imageUrl && <img src={imageUrl} alt={title} css={styles.image} />}

            <div css={styles.getContentContainer(isNewSkin, hasImage)}>
                <div css={styles.textsContainer}>
                    <p css={[styles.titleText, textStyles.text14Medium]}>{title}</p>
                    {formatter && <p css={styles.currencyText}>{formatter.format(price / 100)}</p>}
                </div>

                <div css={styles.buttonsContainer}>
                    {withAddToCartButton ? (
                        <>
                            {isAddedToCart && (
                                <button
                                    type="button"
                                    disabled
                                    css={styles.addedToCartButton(isNewSkin)}
                                >
                                    <SuccessCheck />
                                    <Translation value="recommendProductAdded" fallback="Added" />
                                </button>
                            )}

                            {!isAddedToCart && (
                                <button
                                    type="button"
                                    style={
                                        isAddToCartEnabled
                                            ? {
                                                  background: 'var(--custom-background)',
                                                  color: 'var(--custom-text-color)',
                                              }
                                            : {}
                                    }
                                    onClick={handleAddToCart}
                                    disabled={!isAddToCartEnabled || isAddToCartLoading}
                                    css={styles.primaryButton(isAddToCartLoading, isNewSkin)}
                                >
                                    <Translation
                                        value="recommendProductAddToCart"
                                        fallback="Add to cart"
                                    />
                                </button>
                            )}

                            {learnMoreButton}
                        </>
                    ) : (
                        learnMoreButton
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
