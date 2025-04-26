import { Router } from "express";
import { validateSchema } from "@/middlewares/validateSchema.ts";
import { loginSchema, registerSchema } from "./auth.validation.ts";
import passport from "passport";
import {
    loginUser,
    registerUser,
    refreshToken,
    googleCallback
} from "./auth.controller.ts";


const router = Router();

router.post("/register", validateSchema(registerSchema), registerUser);

router.post("/login", validateSchema(loginSchema), loginUser);

router.get("/refresh-token", refreshToken);

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/" }),
    googleCallback
)


export default router;