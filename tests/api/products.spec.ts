import { test, expect } from "@playwright/test";
import { ProductApi } from "../../src/api/productApi";
import { ProductSchema } from "../../src/schemas/product.schema";


test('Get /products/1 returns product (happy path)', async ({ request }) => {
    const api = new ProductApi(request);

    const product = await api.getProductJson(1);
    expect(product.id).toBe(1);
    console.log(product);
});


test("GET /products/0 returns 404 (negative case)", async ({ request }) => {
    const api = new ProductApi(request);

    const res = await api.getProduct(0);
    expect(res.ok()).toBeFalsy();
    expect(res.status()).toBe(404);

    const body = await res.json();
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message");
    console.log(body);
});


test("POST /products/add creates a product (happy path)", async ({ request }) => {
    const api = new ProductApi(request);

    const payload = { title: "QA Test Product", price: 123 };
    const res = await api.createProduct(payload);

    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(201);

    const created = ProductSchema.parse(await res.json());
    expect(created.id).toEqual(expect.any(Number));
    expect(created.title).toBe(payload.title);
    expect(created.price).toBe(payload.price);

});

test("PUT /products/1 updates product", async ({ request }) => {
    const api = new ProductApi(request);

    const payload = { title: "PUT overwrite attempt", price: 111 };

    const res = await api.updateProductPut(1, payload);

    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);

    const updated = ProductSchema.parse(await res.json());
    expect(updated.id).toBe(1);
    expect(updated.title).toBe(payload.title);
    expect(updated.price).toBe(payload.price);
});


test("PATCH /products/1 updates only provided fields", async ({ request }) => {
    const api = new ProductApi(request);

    const payload = { price: 222 };

    const res = await api.updateProductPatch(1, payload);

    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);

    const updated = ProductSchema.parse(await res.json());
    expect(updated.id).toBe(1);
    expect(updated.price).toBe(payload.price);
});


test("GET /products/search?q=phone returns products (happy path)", async ({ request }) => {
    const api = new ProductApi(request);

    const res = await api.searchProductsJson("iphone");
    expect(res.products.length).toBeGreaterThan(0);
    expect(res.products[0].price).toBeGreaterThan(0);
    expect(res.total).toBeGreaterThan(0);
    expect(res.limit).toBeGreaterThan(0);
    console.log(res);

});


test("GET /products/search with nonsense returns empty list", async ({ request }) => {
    const api = new ProductApi(request);

    const res = await api.searchProductsJson("Zzzzz");
    expect(res.products.length === 0);
    expect(res.total).toBe(0);
    expect(res.skip).toBeGreaterThanOrEqual(0);
    console.log(res);

});





