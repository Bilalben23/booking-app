import { Router } from "express";
import { validateSchema } from "@/middlewares/validateSchema.ts";
import { loginSchema, registerSchema } from "./auth.validation.ts";
import passport from "passport";
import {
    loginUser,
    registerUser,
    refreshToken,
    getCurrentUser,
    googleCallback
} from "./auth.controller.ts";
import { authenticateJWT } from "@/middlewares/authenticateJwt.ts";


const router = Router();

router.post("/register", validateSchema(registerSchema), registerUser);

router.post("/login", validateSchema(loginSchema), loginUser);

router.get("/refresh-token", refreshToken);

router.get("/me", authenticateJWT, getCurrentUser);

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
}));

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/" }),
    googleCallback
)


export default router;