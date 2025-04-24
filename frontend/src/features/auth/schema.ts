import { z } from "zod"

export const loginSchema = z.object({
    email: z.string()
        .email({
            message: "Invalid email address"
        }),
    password: z.string()
        .min(1, {
            message: "Password is required"
        })
});


export const registerSchema = z.object({
    name: z.string()
        .min(2, {
            message: "Name must be at least 2 characters"
        }).
        max(30, {
            message: "Name must be at most 30 characters",
        }),
    email: z.string()
        .email({
            message: "Invalid email address"
        }),
    password: z.string()
        .min(8, {
            message: "Password must be at least 8 characters"
        })
        .regex(/(?=.*[A-Z])/, {
            message: "Password must contain at least one uppercase letter",
        })
        .regex(/(?=.*\d)/, {
            message: "Password must contain at least one number",
        })
})