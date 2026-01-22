import { z } from "zod";

export const LoginResponseSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    gender: z.string().optional(),
    image: z.string().optional(),
    accessToken: z.string(),
    refreshToken: z.string(),
});

export const AuthMeSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    gender: z.string().optional(),
    image: z.string().optional(),
});

export const RefreshResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type AuthMe = z.infer<typeof AuthMeSchema>;
export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;