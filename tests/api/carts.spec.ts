import { test, expect } from "@playwright/test";
import { CartApi } from "../../src/api/cartApi";
import { Product } from "../../src/schemas/product.schema";


test('GET /carts/1 returns a cart (happy path)', async ({ request }) => {
    const api = new CartApi(request);

    const cart = await api.getCartJson(1);
    expect(cart.id).toBe(1);
    console.log(cart);
});







