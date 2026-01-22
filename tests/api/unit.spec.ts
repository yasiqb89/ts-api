import { test, expect } from "@playwright/test";
import { ProductSchema } from "../../src/schemas/product.schema";

test("ProductSchema rejects invalid data", () => {
    const invalidData = {
        id: "1",
        title: "Product",
        price: 10,
    };

    expect(() => ProductSchema.parse(invalidData)).toThrow();
});

test("ProductSchema accepts valid data", () => {
    const validData = {
        id: 1,
        title: "Product",
        price: 10,
    };

    expect(() => ProductSchema.parse(validData)).not.toThrow();
});