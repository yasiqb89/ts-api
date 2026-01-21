import { z } from "zod";

export const ProductSchema = z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
})

export const ProductsResponseSchema = z.object({
    products: z.array(ProductSchema),
    total: z.number(),
    skip: z.number(),
    limit: z.number(),
})