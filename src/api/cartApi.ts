import type { APIRequestContext, APIResponse } from "@playwright/test";
import { ProductSchema, ProductsResponseSchema } from "../schemas/product.schema";
import { CartItem, Cart, CartItemSchema, CartSchema } from "../schemas/cart.schema";


export class CartApi {
    constructor(private readonly request: APIRequestContext) { }

    async getCart(id: number) {
        return await this.request.get(`/carts/${id}`);
    }

    async getCartByUserId(userId: number) {
        return await this.request.get(`/carts/user/${userId}`);
    }

    async createCart(payload: Record<string, unknown>) {
        return await this.request.post(`/carts/add`, { data: payload });
    }

    async getCartJson(id: number): Promise<Cart> {
        const res = await this.getCart(id);
        if (!res.ok()) {
            throw new Error(`GET /carts/${id} failed: ${res.status()}`);
        }
        const raw = await res.json();
        return CartSchema.parse(raw);
    }


}