import { test, expect } from "@playwright/test";
import { CartApi } from "../../src/api/cartApi";
import { Product } from "../../src/schemas/product.schema";
import { CartSchema } from "../../src/schemas/cart.schema";


test('GET /carts/1 returns a cart (happy path)', async ({ request }) => {
    const api = new CartApi(request);

    const cart = await api.getCartJson(1);
    expect(cart.id).toBe(1);
    console.log(cart);
});


test('PATCH /carts/1 updates cart (happy path)', async ({ request }) => {
    const api = new CartApi(request);

    const payload = {
        products: [{ id: 1, quantity: 5 }],
    };

    const res = await api.updateCartPatch(1, payload);

    expect(res.ok()).toBeTruthy();
    expect([200, 201]).toContain(res.status());

    const updated = CartSchema.parse(await res.json());
    console.log(updated);
    expect(updated.id).toBe(1);
    const item = updated.products.find(p => p.id === 1);
    if (item) {
        expect(item.quantity).toBe(5);
    }

});

