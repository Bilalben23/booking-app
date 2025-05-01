import { Router } from "express";
import { authenticateJWT } from "@/middlewares/authenticateJwt.ts";
import authRoutes from "@/modules/auth/auth.routes.ts";
import placesRoutes from "@/modules/places/place.routes.ts";
import bookingRoutes from "@/modules/booking/booking.routes.ts";


const router = Router();

router.use("/auth", authRoutes);

router.use("/places", authenticateJWT, placesRoutes);

router.use("/bookings", authenticateJWT, bookingRoutes)

export default router;