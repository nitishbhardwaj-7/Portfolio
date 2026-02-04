// based on https://shopify.dev/docs/api/ajax/reference/cart#get-locale-cart-js
// this is not a complete definition, please feel free to update it with more data
export type ShopifyCartItem = {
    id: number;
    variant_id: number;
    product_id: number;
};

interface ShopifyCart extends Record<string, unknown> {
    token: string;
    note: string;
    attributes: { [key: string]: string };
    original_total_price: number;
    item_count: number;
    items: ShopifyCartItem[];
    currency: string;
}

export const shopifyCartRequest = async (): Promise<ShopifyCart> => {
    try {
        const cartRequest = await window.parent.fetch('/cart.js', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const cartResponse = await Promise.all([cartRequest.json(), cartRequest]);
        const [cartData, httpResponse] = cartResponse;
        if (httpResponse.status === 401) {
            throw new Error(String(httpResponse.status));
        }
        if (!httpResponse.ok || !cartData) {
            throw new Error(`Error code - ${httpResponse.status}`);
        }
        return cartData;
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        } else {
            throw new Error("Couldn't fetch cart from parent window");
        }
    }
};

export const shopifyCartUpdateRequest = async (): Promise<unknown> => {
    const formData = {
        attributes: {
            'Tidio Visitor Id': null,
        },
    };
    try {
        return await window.parent.fetch('/cart/update.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        } else {
            throw new Error("Couldn't update cart from parent window");
        }
    }
};

export const shopifyAddToCartRequest = async (variantId: number): Promise<Response> => {
    const formData = {
        items: [
            {
                id: variantId,
                quantity: 1,
            },
        ],
    };
    try {
        return await window.parent.fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        } else {
            throw new Error("Couldn't add to cart from parent window");
        }
    }
};
