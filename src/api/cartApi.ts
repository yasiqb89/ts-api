import type { APIRequestContext, APIResponse } from "@playwright/test";
import { ProductSchema, ProductsResponseSchema } from "../schemas/product.schema";
import { CartItem, CartItemSchema } from "../schemas/cart.schema";


class CarApi {
    constructor(private readonly request: APIRequestContext) { }

    async getCart(id: number) {
        return await this.request.get(`/carts/${id}`);
    }

    async getCartByUserId(userId: number) {
        return await this.request.get(`/carts/user/${userId}`);
    }

    async createCart(payload: Record<string, unknown>) {
        return await this.request.get(`/carts/user/`, payload);
    }
}