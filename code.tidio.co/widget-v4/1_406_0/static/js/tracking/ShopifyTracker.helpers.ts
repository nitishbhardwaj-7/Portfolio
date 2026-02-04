import { getDocumentRef } from '../helpers/focusManager';
import { ravenCaptureInfo } from '../helpers/raven';
import { ShopifyCartItem } from '../helpers/shopifyApiData';

import { getKeyFromStorage, saveKeyToStorage } from '../store/savedState';
import { CartData, RecommendProductData } from './ShopifyTracker.types';

const wasMissingProductIdTrackedKey = 'wasMissingProductIdTracked';

// we use this kind of type guard because FormData created in parent window
// will not be an instanceof FormData available in widget
export const isFormData = (obj: unknown): obj is FormData => {
    try {
        return Object.prototype.toString.call(obj) === '[object FormData]';
    } catch {
        return false;
    }
};

export const getFieldFromSentData = ({
    data,
    fieldName,
}: {
    data: unknown;
    fieldName: string;
}): string | null => {
    if (typeof data === 'string') {
        try {
            return getFieldFromSentData({ data: JSON.parse(data), fieldName });
        } catch {
            return (
                data
                    .split('&')
                    .find((element) => element.includes(fieldName))
                    ?.split('=')[1] || null
            );
        }
    }
    if (isFormData(data)) {
        const idFromProductIdField = data.get(fieldName);
        if (typeof idFromProductIdField === 'string') {
            return idFromProductIdField;
        }
        return null;
    }

    if (
        typeof data === 'object' &&
        data !== null &&
        Object.prototype.hasOwnProperty.call(data, fieldName)
    ) {
        try {
            const potentialFieldValue = (data as Record<string, unknown>)[fieldName];
            if (
                typeof potentialFieldValue === 'string' ||
                typeof potentialFieldValue === 'number'
            ) {
                return String(potentialFieldValue);
            }
            return null;
        } catch {
            return null;
        }
    }
    return null;
};

export const getLocalizationAndCurrencyFromCookies = (): {
    localization?: string;
    cartCurrency?: string;
} => {
    try {
        const documentBody: Document | ShadowRoot = getDocumentRef();
        let cookiesArray: string[] = [];

        if ('host' in documentBody) {
            cookiesArray = documentBody.host.ownerDocument.cookie.split('; ');
        } else {
            cookiesArray = documentBody.cookie.split('; ');
        }

        if (cookiesArray.length === 0) {
            return {};
        }
        const cartCurrency = cookiesArray
            .find((cookie) => cookie.includes('cart_currency'))
            ?.split('=')[1];
        const localization = cookiesArray
            .find((cookie) => cookie.includes('localization'))
            ?.split('=')[1];

        return {
            localization,
            cartCurrency,
        };
    } catch {
        return {};
    }
};

export const isRecommendProductData = (object: unknown): object is RecommendProductData =>
    object !== null &&
    typeof object === 'object' &&
    'localization' in object &&
    ('productId' in object || 'variantId' in object);

export const isCartData = (object: unknown): object is CartData =>
    object !== null &&
    typeof object === 'object' &&
    'cartValue' in object &&
    typeof object.cartValue === 'number' &&
    'cartCurrency' in object &&
    typeof object.cartCurrency === 'number' &&
    'items' in object &&
    Array.isArray(object.items);

export const getProperProductIdFromVariants = ({
    productId,
    variantId,
    itemsInCart,
}: {
    productId: string | null;
    variantId: string | null;
    itemsInCart: ShopifyCartItem[];
}): string | null => {
    let formattedProductId = productId;
    if (!productId && variantId) {
        const productIdFromCart = itemsInCart.find(
            (product) => String(product.id) === variantId,
        )?.product_id;
        formattedProductId = productIdFromCart !== undefined ? String(productIdFromCart) : null;
    }
    return formattedProductId;
};

export const trackMissingProductOrVariantId = (baseFormData: unknown): void => {
    return undefined;
    const wasMissingProductIdTracked = getKeyFromStorage(wasMissingProductIdTrackedKey);
    if (!wasMissingProductIdTracked) {
        saveKeyToStorage(wasMissingProductIdTrackedKey, true);
        ravenCaptureInfo('Product submission form used different fields to add product', {
            formData: baseFormData,
        });
    }
};

export const getFirstItemVariantId = (data: unknown): string | null => {
    if (typeof data === 'string') {
        try {
            return getFirstItemVariantId(JSON.parse(data));
        } catch {
            return null;
        }
    }
    try {
        if (
            data !== null &&
            typeof data === 'object' &&
            'items' in data &&
            Array.isArray(data.items)
        ) {
            return typeof data.items[0]?.id === 'number' || typeof data.items[0]?.id === 'string'
                ? String(data.items[0]?.id)
                : null;
        }
    } catch {
        return null;
    }

    return null;
};

export const removeKeyFromShopifyCartToken = (tokenWithKey: string): string => {
    if (tokenWithKey.includes('?key=')) {
        return tokenWithKey.split('?key=')[0];
    }
    return tokenWithKey;
};
