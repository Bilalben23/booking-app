import { Router } from "express";
import authRoutes from "@/modules/auth/auth.routes.ts";
import placesRoutes from "@/modules/places/place.routes.ts";
import { authenticateJWT } from "@/middlewares/authenticateJwt.ts";

const router = Router();

router.use("/auth", authRoutes);

router.use("/places", authenticateJWT, placesRoutes);


export default router;