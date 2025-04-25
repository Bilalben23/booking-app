import { Router } from "express";
import {
    loginUser,
    registerUser,
    refreshToken
} from "./auth.controller.ts";
import { validateSchema } from "@/middlewares/validateSchema.ts";
import { loginSchema, registerSchema } from "./auth.validation.ts";


const router = Router();

router.post("/register", validateSchema(registerSchema), registerUser);

router.post("/login", validateSchema(loginSchema), loginUser);

router.get("/refresh-token", refreshToken);


export default router;