import { z } from "zod";

export const ErrorSchema = z.object({
    message: z.string(),
});

export type ApiErrorBody = z.infer<typeof ErrorSchema>;

