import { Router } from "express";
import { validateSchema } from "@/middlewares/validateSchema.ts";
import { loginSchema, registerSchema } from "./auth.validations.ts";
import passport from "passport";
import * as authController from "./auth.controller.ts";
import { authenticateJWT } from "@/middlewares/authenticateJwt.ts";


const router = Router();

router.post("/register", validateSchema(registerSchema), authController.registerUser);

router.post("/login", validateSchema(loginSchema), authController.loginUser);

router.get("/refresh-token", authController.refreshToken);

router.get("/logout", authenticateJWT, authController.logoutUser);

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
}));

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/" }),
    authController.googleCallback
)


router.get("/something", authenticateJWT, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello, world!"
    })
})


export default router;