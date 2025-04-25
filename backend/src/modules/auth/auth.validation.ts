import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const registerSchema = z.object({
    name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" })
        .min(3, { message: "Name should be at least 3 characters" })
        .max(50, { message: "Name cannot exceed 100 characters" })
    ,
    email: z.string({ required_error: "Email is required", invalid_type_error: "Email must be a string" })
        .email("Invalid email address"),
    password: z.string()
        .min(6, "Password should be at least 6 characters long")
        .refine((password) => passwordRegex.test(password), {
            message: "Password must contain at least 1 uppercase, 1 lowercase, and 1 number.",
        })
})


export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email("Invalid email address"),
    password: z.string({
        required_error: "Password is required"
    }).min(6, "Password should be at least 6 characters long")
})