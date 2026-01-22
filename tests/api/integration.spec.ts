import { test, expect } from "@playwright/test";
import { ProductApi } from "../../src/api/productApi";
import { CartApi } from "../../src/api/cartApi";
import { CartSchema } from "../../src/schemas/cart.schema";

test("Integration: get a product then create a cart containing it", async ({ request }) => {
    const cartApi = new CartApi(request);
    const productApi = new ProductApi(request);

    const product = await productApi.getProductJson(1);
    const payload = {
        userId: 1,
        products: [{ id: product.id, quantity: 2 }],
    }
    const res = await cartApi.createCart(payload);
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(201);

    const createdCart = CartSchema.parse(await res.json());
    expect(createdCart.userId).toBe(1);

    const item = createdCart.products.find(p => p.id === product.id);
    expect(item).toBeTruthy();
    expect(item?.quantity).toBe(2);

});