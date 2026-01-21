import { z } from "zod"

export const CartItemSchema = z.object({
    id: z.number(),
    quantity: z.number(),
});

export const CartSchema = z.object({
    id: z.number(),
    userId: z.number(),
    products: z.array(CartItemSchema),
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;