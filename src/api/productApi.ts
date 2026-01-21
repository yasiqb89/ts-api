import type { APIRequestContext, APIResponse } from "@playwright/test";
import { ProductSchema, ProductsResponseSchema } from "../schemas/product.schema";
import { Product, ProductsResponse } from "../schemas/product.schema";

// Api Client
export class ProductApi {
    constructor(private readonly request: APIRequestContext) { }

    async getProduct(id: number) {
        return await this.request.get(`/products/${id}`);
    }

    async searchProducts(query: string) {
        const q = encodeURIComponent(query); // URL building 
        return await this.request.get(`/products/search?q=${q}`);
    }

    async createProduct(payload: Partial<Product> & { title: string }): Promise<APIResponse> {
        return await this.request.post(`/products/add`, { data: payload });
    }

    // Keys as strings, Values with don't know types ! 
    async updateProductPut(id: number, payload: Record<string, unknown>): Promise<APIResponse> {
        return await this.request.put(`/products/${id}`, { data: payload });
    }

    async updateProductPatch(id: number, payload: Record<string, unknown>): Promise<APIResponse> {
        return await this.request.patch(`/products/${id}`, { data: payload });
    }

    // Convenience helpers
    async getProductJson(id: number): Promise<Product> {
        const res = await this.getProduct(id);

        if (!res.ok()) {
            throw new Error(`GET /products/${id} failed: ${res.status()}`);
        }

        const raw = await res.json();
        return ProductSchema.parse(raw);
    }

    async searchProductsJson(query: string): Promise<ProductsResponse> {
        const res = await this.searchProducts(query);
        if (!res.ok()) {
            throw new Error(`GET /products/search failed: ${res.status()}`);
        }

        const raw = await res.json();
        return ProductsResponseSchema.parse(raw);
    }
}