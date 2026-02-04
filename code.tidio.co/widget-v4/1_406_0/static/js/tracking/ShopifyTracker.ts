import { Dispatch } from 'redux';

import { ravenCaptureException } from '../helpers/raven';
import { shopifyCartRequest } from '../helpers/shopifyApiData';
import {
    getFieldFromSentData,
    getFirstItemVariantId,
    getLocalizationAndCurrencyFromCookies,
    getProperProductIdFromVariants,
    isCartData,
    isFormData,
    isRecommendProductData,
    removeKeyFromShopifyCartToken,
    trackMissingProductOrVariantId,
} from './ShopifyTracker.helpers';

import {
    cartValueChangedSend,
    clearShopifyCartAttributes,
    shopifyCartTokenUpdated,
    shopifyCheckoutCreated,
    shopifyOrderCreated,
} from '../store/actions';
import { getKeyFromStorage, removeKeyFromStorage, saveKeyToStorage } from '../store/savedState';
import {
    CartData,
    CartValueData,
    CustomShopifyWindow,
    RecommendProductData,
    ShopifyTrackingEvent,
    jQueryHandlerCallback,
} from './ShopifyTracker.types';

declare const window: CustomShopifyWindow;
class ShopifyTracker {
    private readonly dispatch;

    private readonly mode;

    private addToCardFinished = false;

    private rebindShopifyEvents: ReturnType<typeof setTimeout> | undefined;

    private readonly routes = {
        cart: window.parent.location.pathname.indexOf('/cart') > -1,
        thankYou:
            window.parent.location.pathname.indexOf('/thank_you') > -1 &&
            window.parent.location.pathname.split('/').length === 5,
    };

    private readonly endpoints = {
        cartChange: '/cart/change',
        addToCart: '/cart/add',
        clear: '/cart/clear',
        update: '/cart/update',
        checkout: '/wallets/checkouts',
    };

    constructor({ dispatch, mode }: { dispatch: Dispatch; mode: 'simple' | 'advanced' }) {
        this.dispatch = dispatch;
        this.mode = mode;
        if (typeof window.parent.Shopify !== 'undefined') {
            this.initTracking();
        }
    }

    ajaxCompleteCallback: jQueryHandlerCallback = async (event, jqxhr, settings) => {
        if (settings?.url) {
            const { url } = settings;

            if (url.includes(this.endpoints.addToCart)) {
                const productId = getFieldFromSentData({
                    data: settings.data,
                    fieldName: 'product-id',
                });
                const variantId = getFieldFromSentData({
                    data: settings.data,
                    fieldName: 'id',
                });
                // TEMPORARY SOLUTION:
                // we want to know how users are adding products to cart to adjust the mechanism to cover most of them
                if (!(typeof productId === 'string' || typeof variantId === 'string')) {
                    trackMissingProductOrVariantId(settings.data);
                }
                this.trackAddToCartEvent({ productId, variantId });

                this.addToCardFinished = true;
            }

            if (
                url.includes(this.endpoints.cartChange) ||
                url.includes(this.endpoints.update) ||
                url.includes(this.endpoints.clear)
            ) {
                try {
                    const cartData = await this.getCartDataAndStoreCartToken();
                    this.saveCartValue(cartData);
                } catch {
                    //
                }
            }

            const checkoutToken = jqxhr?.responseJSON?.checkout?.token;

            if (url.includes(this.endpoints.checkout) && checkoutToken) {
                this.trackCheckout(checkoutToken);
            }

            if (this.addToCardFinished && url.indexOf('/cart') > -1) {
                this.addToCardFinished = false;
                // we must use setTimeout here because on ajax complete there is no data in DOM
                setTimeout(this.rebindEvents, 777);
            }
            if (url.indexOf('/cart.js') > -1) {
                if (jqxhr?.responseJSON) {
                    saveKeyToStorage('cartItemCount', jqxhr.responseJSON.item_count);
                }
            }
        }

        return true;
    };

    initTracking = (): void => {
        if (this.routes.cart && !getKeyFromStorage('removeFromCart')) {
            this.goToCart();
        }

        if (getKeyFromStorage('removeFromCart')) {
            this.removeFromCart();
        }

        this.cartAjaxInit();
        this.rebindEvents();
        this.trackPaymentCharged();

        try {
            if (
                window.parent.jQuery &&
                typeof window.parent.jQuery(window.parent.document).ajaxComplete === 'function'
            ) {
                window.parent
                    .jQuery(window.parent.document)
                    .ajaxComplete(this.ajaxCompleteCallback);
            } else if (window.parent.jQuery) {
                window.parent
                    .jQuery(window.parent.document)
                    .on('ajaxComplete', this.ajaxCompleteCallback);
            }
        } catch {
            // we don't need to react, since there is just no jQuery on parent window
        }

        this.overrideFetch();
    };

    // eslint-disable-next-line class-methods-use-this
    getCurrencyRate = (): string => {
        const currencyRate = window.parent.Shopify.currency?.rate;

        // TODO [AUT-1365]: Investigate why some shops don't have a currency rate available,
        // as this may cause issues with correct price conversion for Shopify products suggested by LYRO.
        // Reporting removed to reduce the number of events sent to Sentry.
        // if (!currencyRate) {
        //     ravenCaptureException('Shopify currency rate is not available', {
        //         ...(window.parent.Shopify.currency || {}),
        //     });
        // }

        return currencyRate;
    };

    trackEvent = (
        event: ShopifyTrackingEvent,
        data?: Partial<CartData & RecommendProductData>,
        successCallback = (): void => {},
    ): void => {
        if (this.mode === 'advanced') {
            const cartData = getKeyFromStorage('cartData');
            const shopifyParams = { ...cartData, ...data };
            if (data?.cartCurrency && data?.cartValue) {
                saveKeyToStorage('cartData', {
                    cartCurrency: data.cartCurrency,
                    cartValue: data.cartValue,
                });

                shopifyParams.currencyRate = this.getCurrencyRate();
            }

            // eslint-disable-next-line no-console
            console.debug('ShopifyTracker - executing event', `shopify.${event}`);
            window.tidioChatApi?.track(`shopify.${event}`, shopifyParams, successCallback);
        }
    };

    cartAjaxInit = async (): Promise<void> => {
        const cartItemCount = getKeyFromStorage('cartItemCount') || 0;
        if (!cartItemCount) {
            saveKeyToStorage('cartItemCount', 0);
        }
        try {
            const shopifyCartData = await shopifyCartRequest();
            if (getKeyFromStorage('addToCart') && isCartData(shopifyCartData)) {
                const addedProductProperties = getKeyFromStorage('addedProductProperties');
                if (isRecommendProductData(addedProductProperties)) {
                    const { productId, variantId } = addedProductProperties;
                    this.trackAddToCartEvent({
                        productId,
                        variantId,
                        cartData: shopifyCartData,
                    });
                } else {
                    this.trackAddToCartEvent({
                        productId: null,
                        variantId: null,
                        cartData: shopifyCartData,
                    });
                }
                removeKeyFromStorage('addToCart');
                removeKeyFromStorage('addedProductProperties');
            }
            const urlsWhichShouldNotTriggerAbandonedCart = [
                /\/account\/login(.*?)/i,
                /\/account\/register(.*?)/i,
                /\/challenge(.*?)/i,
                /\/checkouts(.*?)/i,
            ];
            const shouldAbandonedCartBeTriggered =
                urlsWhichShouldNotTriggerAbandonedCart
                    .map((pattern) => pattern.test(window.parent.location.href))
                    .filter((regexpResult) => regexpResult).length === 0;
            const token = shopifyCartData?.token;
            const shouldTrackCartToken = token && shopifyCartData?.item_count > 0;
            if (getKeyFromStorage('goToCheckout') && shouldAbandonedCartBeTriggered) {
                removeKeyFromStorage('goToCheckout');
                if (shopifyCartData.item_count) {
                    this.abandonedCart();
                }
                saveKeyToStorage('cartItemCount', 0);
            }

            if (token) {
                this.saveCartToken(token);
            }

            if (shouldTrackCartToken) {
                this.trackCartToken();
            }

            if (+cartItemCount !== +shopifyCartData.item_count) {
                saveKeyToStorage('cartItemCount', shopifyCartData.item_count);
            }

            if (shopifyCartData?.attributes?.['Tidio Visitor Id']) {
                this.dispatch(clearShopifyCartAttributes());
            }

            if (shopifyCartData?.currency) {
                this.sendCartValue({
                    cartCurrency: shopifyCartData.currency,
                    cartValue: shopifyCartData.original_total_price || 0,
                });
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.debug('ShopifyTracker', error);
        }
    };

    trackAddToCartEvent = async ({
        productId,
        variantId,
        cartData,
    }: {
        productId: string | null;
        variantId: string | null;
        cartData?: CartData;
    }): Promise<void> => {
        try {
            const { cartCurrency, cartValue, items } =
                cartData || (await this.getCartDataAndStoreCartToken());
            removeKeyFromStorage('addToCart');
            const { localization } = getLocalizationAndCurrencyFromCookies();
            const formattedProductId = getProperProductIdFromVariants({
                productId,
                variantId,
                itemsInCart: items,
            });
            this.trackEvent(ShopifyTrackingEvent.ADD_TO_CART, {
                cartValue,
                cartCurrency,
                ...(typeof formattedProductId === 'string' && {
                    productId: formattedProductId,
                    localization,
                }),
            });
        } catch (error) {
            if (error instanceof Error) {
                //
            }
        }
    };

    addToCart = (event: Event): void => {
        const submittedForm = event.target;
        try {
            const submittedValues = new FormData(submittedForm as HTMLFormElement);
            const productId = submittedValues.get('product-id');
            const variantId = submittedValues.get('id');
            const { localization } = getLocalizationAndCurrencyFromCookies();
            const addedProductProperties = {
                ...(typeof productId === 'string' && { productId }),
                ...(typeof variantId === 'string' && { variantId }),
                localization,
            };
            if (isRecommendProductData(addedProductProperties)) {
                saveKeyToStorage('addedProductProperties', addedProductProperties);
            }

            // TEMPORARY SOLUTION:
            // we want to know how users are adding products to cart to adjust the mechanism to cover most of them
            if (!(typeof productId === 'string' || typeof variantId === 'string')) {
                const formDataObject: Record<string, unknown> = {};
                submittedValues.forEach((value, key) => {
                    formDataObject[key] = value;
                });
                trackMissingProductOrVariantId(formDataObject);
            }
        } catch (e) {
            ravenCaptureException('Could not retrieve product data from submitted form', {
                error: e,
            });
        }
        saveKeyToStorage('addToCart', true);
        clearTimeout(this.rebindShopifyEvents);
        this.rebindShopifyEvents = setTimeout(this.rebindEvents, 1500);
    };

    cartUpdated = (): void => {
        this.trackEvent(ShopifyTrackingEvent.CART_UPDATED);
    };

    abandonedCart = (): void => {
        this.trackEvent(ShopifyTrackingEvent.ABANDONED_CART);
    };

    goToCart = (): void => {
        this.trackEvent(ShopifyTrackingEvent.GO_TO_CART);
    };

    login = (): void => {
        this.trackEvent(ShopifyTrackingEvent.LOGIN);
    };

    private readonly removeFromCartStorageKey = 'removeFromCart';

    removeFromCartClick = (): void => {
        saveKeyToStorage(this.removeFromCartStorageKey, true);
    };

    removeFromCart = async (cartData?: CartValueData): Promise<void> => {
        removeKeyFromStorage('removeFromCart');

        if (!cartData) {
            try {
                const { cartValue, cartCurrency } = await this.getCartDataAndStoreCartToken();
                this.trackEvent(ShopifyTrackingEvent.REMOVE_FROM_CART, {
                    cartValue,
                    cartCurrency,
                });
            } catch {
                //
            }
        } else {
            this.trackEvent(ShopifyTrackingEvent.REMOVE_FROM_CART, cartData);
        }
    };

    createAccount = (): void => {
        this.trackEvent(ShopifyTrackingEvent.CREATE_ACCOUNT);
    };

    trackPaymentCharged = (): boolean => {
        if (!this.routes.thankYou) {
            return false;
        }

        this.trackEvent(ShopifyTrackingEvent.PAYMENT_CHARGED);

        try {
            const { customer_id: customerId, order_id: orderId } = window.parent.Shopify.checkout;
            if (customerId && orderId) {
                this.dispatch(
                    shopifyOrderCreated({
                        customerId,
                        orderId,
                    }),
                );
            }
        } catch (error) {
            if (error instanceof Error) {
                ravenCaptureException('Payment tracking error', { message: error?.message });
            }
        }

        return true;
    };

    trackCheckout = (checkoutToken: string): void => {
        this.dispatch(
            shopifyCheckoutCreated({
                checkoutToken,
            }),
        );
    };

    private readonly cartTokenStorageKey = 'cartToken';

    getCartToken = (): string | undefined | null => getKeyFromStorage(this.cartTokenStorageKey);

    saveCartToken = (cartToken: string): void => {
        const savedCartToken = getKeyFromStorage(this.cartTokenStorageKey);
        if (cartToken && cartToken !== savedCartToken) {
            // Shopify introduced new cart token format https://shopify.dev/changelog/cart-token-in-ajax-api-response-now-includes-key-param
            // we want to remove the key from token we sent to our API, because webhooks are coming with tokens without a key
            saveKeyToStorage(this.cartTokenStorageKey, removeKeyFromShopifyCartToken(cartToken));
        }
    };

    trackCartToken = (): void => {
        const cartToken = this.getCartToken();
        const sentCartToken = getKeyFromStorage('sentCartToken');

        if (cartToken && cartToken !== sentCartToken) {
            this.dispatch(
                shopifyCartTokenUpdated({
                    cartToken,
                }),
            );

            saveKeyToStorage('sentCartToken', cartToken);
        }
    };

    getCartDataAndStoreCartToken = async (): Promise<CartData> => {
        try {
            const response = await shopifyCartRequest();
            if (response.token && response.item_count > 0) {
                this.saveCartToken(response.token);
                this.trackCartToken();
            }
            return {
                cartCurrency: response.currency,
                cartValue: response.original_total_price,
                currencyRate: this.getCurrencyRate(),
                items: response.items,
            };
        } catch {
            throw new Error('unable to fetch shopify cart');
        }
    };

    overrideFetch = (): void => {
        try {
            const { fetch: originalFetch } = window.parent;

            window.parent.fetch = async (...args): Promise<Response> => {
                const [resource, config] = args;

                if (typeof resource !== 'string') {
                    return originalFetch(...args);
                }

                if (resource.includes(this.endpoints.addToCart)) {
                    const response = await originalFetch(resource, config);
                    const productId = getFieldFromSentData({
                        data: config?.body,
                        fieldName: 'product-id',
                    });
                    const variantId = getFieldFromSentData({
                        data: config?.body,
                        fieldName: 'id',
                    });
                    const firstItemAddedToCartId = getFirstItemVariantId(config?.body);
                    // TEMPORARY SOLUTION:
                    // we want to know how users are adding products to cart to adjust the mechanism to cover most of them
                    if (
                        !(
                            typeof productId === 'string' ||
                            typeof variantId === 'string' ||
                            typeof firstItemAddedToCartId === 'string'
                        )
                    ) {
                        trackMissingProductOrVariantId(config?.body);
                    }
                    this.trackAddToCartEvent({
                        productId,
                        variantId: variantId ?? firstItemAddedToCartId,
                    });

                    return response;
                }

                if (resource.includes(this.endpoints.checkout)) {
                    const response = await originalFetch(resource, config);
                    const contentType = response?.headers?.get('content-type');

                    if (response?.ok && contentType?.includes('application/json')) {
                        try {
                            const result = await response.clone().json();
                            const checkoutToken = result?.checkout?.token;

                            if (checkoutToken) {
                                this.trackCheckout(checkoutToken);
                            }
                        } catch (error) {
                            if (error instanceof Error) {
                                ravenCaptureException('Checkout tracking error', {
                                    message: error?.message,
                                });
                            }
                        }
                    }
                    return response;
                }

                if (resource.includes(this.endpoints.cartChange)) {
                    const response = await originalFetch(resource, config);
                    const contentType = response?.headers?.get('content-type');

                    if (
                        response?.ok &&
                        (contentType?.includes('application/json') ||
                            contentType?.includes('text/javascript'))
                    ) {
                        let itemQuantity;

                        if (isFormData(config?.body)) {
                            itemQuantity = config?.body.get('quantity');
                        } else {
                            try {
                                if (typeof config?.body === 'string') {
                                    const requestBody = JSON.parse(config.body);
                                    itemQuantity = requestBody?.quantity;
                                }
                            } catch {
                                itemQuantity = undefined;
                            }
                        }

                        try {
                            const result = await response.clone().json();
                            const cartData = {
                                cartValue: result?.original_total_price,
                                cartCurrency: result?.currency,
                            };

                            if (
                                (typeof itemQuantity === 'number' || itemQuantity) &&
                                Number(itemQuantity) === 0
                            ) {
                                this.removeFromCart(cartData);
                            } else {
                                this.saveCartValue(cartData);
                            }
                        } catch (error) {
                            if (error instanceof Error) {
                                ravenCaptureException('Cart change tracking error', {
                                    message: error?.message,
                                });
                            }
                        }
                    }

                    return response;
                }

                if (resource.includes(this.endpoints.update)) {
                    const response = await originalFetch(resource, config);
                    const contentType = response?.headers?.get('content-type');

                    if (
                        response?.ok &&
                        (contentType?.includes('application/json') ||
                            contentType?.includes('text/javascript'))
                    ) {
                        this.cartUpdated();
                        try {
                            const result = await response.clone().json();
                            const cartData = {
                                cartValue: result?.original_total_price,
                                cartCurrency: result?.currency,
                            };

                            try {
                                let updateBody;
                                switch (typeof config?.body) {
                                    case 'object':
                                        updateBody = config.body;
                                        break;
                                    case 'string':
                                        updateBody = JSON.parse(config.body);
                                        break;
                                    default:
                                        return response;
                                }

                                // for update endpoint the request contains a list of updates https://shopify.dev/docs/api/ajax/reference/cart#post-locale-cart-update-js
                                const updatedProductQuantities = Object.values(updateBody.updates);
                                if (updatedProductQuantities?.some((quantity) => quantity === 0)) {
                                    this.removeFromCart(cartData);
                                } else {
                                    this.saveCartValue(cartData);
                                }
                                return response;
                            } catch {
                                this.saveCartValue(cartData);
                                return response;
                            }
                        } catch (error) {
                            if (error instanceof Error) {
                                ravenCaptureException('Cart update error', {
                                    message: error?.message,
                                });
                            }
                        }
                    }
                }

                if (resource.includes(this.endpoints.clear)) {
                    const response = await originalFetch(resource, config);
                    const contentType = response?.headers?.get('content-type');

                    if (
                        response?.ok &&
                        (contentType?.includes('application/json') ||
                            contentType?.includes('text/javascript'))
                    ) {
                        try {
                            const result = await response.clone().json();
                            const cartData = {
                                cartValue: result?.original_total_price,
                                cartCurrency: result?.currency,
                            };

                            this.removeFromCart(cartData);
                        } catch (error) {
                            if (error instanceof Error) {
                                ravenCaptureException('Cart clear error', {
                                    message: error?.message,
                                });
                            }
                        }
                    }

                    return response;
                }

                return originalFetch(...args);
            };
        } catch (error) {
            if (error instanceof Error) {
                ravenCaptureException('Override fetch error', { message: error?.message });
            }
        }
    };

    goToPayment = (): void => {
        this.trackEvent(ShopifyTrackingEvent.GO_TO_PAYMENT);
    };

    goToCheckout = (): void => {
        saveKeyToStorage('goToCheckout', true);
        this.trackEvent(ShopifyTrackingEvent.GO_TO_CHECKOUT);
    };

    sendCartValue = ({ cartValue, cartCurrency }: CartValueData): void => {
        this.dispatch(
            cartValueChangedSend({
                cartValue,
                cartCurrency,
                currencyRate: this.getCurrencyRate(),
            }),
        );
    };

    saveCartValue = ({ cartValue, cartCurrency }: CartValueData): void => {
        const savedCart = getKeyFromStorage('cartData');

        if (savedCart?.cartValue !== cartValue) {
            saveKeyToStorage('cartData', { cartValue, cartCurrency });

            this.sendCartValue({ cartValue, cartCurrency });
        }
    };

    private readonly selectors = [
        {
            selector: "form[action='/cart/add']",
            func: this.addToCart,
            event: 'submit',
        },
        {
            selector: "form[action*='account/login']",
            func: this.login,
            event: 'submit',
        },
        {
            selector: "a[href*='/cart/change'], td a[onclick^='remove_item']",
            func: this.removeFromCartClick,
            event: 'click',
        },
        {
            selector: "input[name^='checkout'], button[name^='checkout'], a.checkout-button",
            func: this.goToCheckout,
            event: 'click',
        },
        {
            selector: "form[action='/checkout']",
            func: this.goToCheckout,
            event: 'submit',
        },
        {
            selector: '#commit-button',
            func: this.goToPayment,
            event: 'click',
        },
    ];

    rebindEvents = (): void => {
        clearTimeout(this.rebindShopifyEvents);
        this.initWithoutjQuery();
    };

    initWithoutjQuery = (): void => {
        /* some global selectors */
        for (let i = 0; i < this.selectors.length; i += 1) {
            const selectedElements = window.parent.document.querySelectorAll(
                this.selectors[i].selector,
            );
            if (selectedElements && selectedElements.length > 0) {
                for (let j = 0; j < selectedElements.length; j += 1) {
                    selectedElements[j].removeEventListener(
                        this.selectors[i].event,
                        this.selectors[i].func,
                        true,
                    );
                    selectedElements[j].addEventListener(
                        this.selectors[i].event,
                        this.selectors[i].func,
                        true,
                    );
                }
            }
        }
        // create acc
        const allForms = window.parent.document.querySelectorAll('form');
        for (let i = 0; i < allForms.length; i += 1) {
            const createCustomer = allForms[i].querySelectorAll(
                'input[name=form_type][value=create_customer]',
            );
            if (createCustomer && createCustomer.length > 0) {
                allForms[i].removeEventListener('submit', this.createAccount, true);
                allForms[i].addEventListener('submit', this.createAccount, true);
            }
        }
    };
}

export default ShopifyTracker;
