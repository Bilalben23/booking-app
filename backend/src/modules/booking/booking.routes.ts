import { Router } from "express";
import * as bookingController from "./booking.controller.ts";
import { validateSchema } from "@/middlewares/validateSchema.ts";
import { createBookingSchema, updateBookingSchema } from "./booking.validation.ts";


const router = Router();

router.get("/", bookingController.getAllBookings);

router.get("/:id", bookingController.getBookingById);

router.post("/", validateSchema(createBookingSchema), bookingController.createBooking);

router.patch("/:id", validateSchema(updateBookingSchema), bookingController.updateBooking);

router.delete("/:id", bookingController.deleteBooking)


export default router;