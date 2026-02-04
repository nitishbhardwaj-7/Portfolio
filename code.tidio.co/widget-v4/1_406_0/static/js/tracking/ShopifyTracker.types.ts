import { ShopifyCartItem } from '../helpers/shopifyApiData';

import { CustomWindow, ParentWindow } from '../store/typings';

export enum ShopifyTrackingEvent {
    ADD_TO_CART = 'add_to_cart',
    CART_UPDATED = 'cart_updated',
    ABANDONED_CART = 'abandoned_cart',
    GO_TO_CART = 'go_to_cart',
    LOGIN = 'login',
    REMOVE_FROM_CART = 'remove_from_cart',
    CREATE_ACCOUNT = 'create_account',
    PAYMENT_CHARGED = 'payment_charged',
    GO_TO_PAYMENT = 'go_to_payment',
    GO_TO_CHECKOUT = 'go_to_checkout',
}

export type jQueryHandlerCallback = (
    event: unknown,
    jqxhr: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        responseJSON?: any;
        getResponseHeader: (headerName: string) => string | null;
    },
    settings: {
        data: unknown;
        url?: string;
    },
) => unknown;

export type jQueryAjaxHandler = (handler: jQueryHandlerCallback) => jQueryReturn;

export interface jQueryReturn {
    ajaxSend: jQueryAjaxHandler;
    ajaxComplete: jQueryAjaxHandler;
    on: (eventName: string, handler: jQueryHandlerCallback) => void;
}

export type CartData = {
    cartCurrency: string;
    cartValue: number;
    currencyRate: string;
    items: ShopifyCartItem[];
};

export type CartValueData = Pick<CartData, 'cartValue' | 'cartCurrency'>;

export type RecommendProductData = {
    localization: string;
    productId: string | null;
    variantId: string | null;
};

export type ShopifyObject = {
    checkout: {
        customer_id: number;
        order_id: number;
    };
};

export interface CustomShopifyWindow extends CustomWindow {
    parent: ParentWindow & {
        Shopify: ShopifyObject;
        jQuery: (data: unknown) => jQueryReturn;
    };
}
