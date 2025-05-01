import { z } from "zod";

export const bookingSchema = z.object({
    checkIn: z.coerce.date({
        required_error: "Check-in date is required",
        invalid_type_error: "Invalid date format"
    }),
    checkOut: z.coerce.date({
        required_error: "Check-out date is required",
        invalid_type_error: "Invalid date format"
    }),
    guests: z.number({
        required_error: "Guests field is required",
        invalid_type_error: "Guests field must be a number"
    })
        .min(1, "At least 1 guest")
        .max(10, "Too many guests"),
});
