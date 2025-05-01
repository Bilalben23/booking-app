import { z } from "zod";

const baseBookingSchema = z.object({
    placeId: z
        .string({ required_error: "Place ID is required" })
        .min(1, "Place ID must not be empty"),
    checkIn: z.coerce
        .date({ required_error: "Check-in date is required" })
        .refine((date) => !isNaN(date.getTime()), "Check-in must be a valid date"),
    checkOut: z.coerce
        .date({ required_error: "Check-out date is required" })
        .refine((date) => !isNaN(date.getTime()), "Check-out must be a valid date"),
    guests: z
        .number({ required_error: "Number of guests is required" })
        .min(1, "Guests must be at least 1"),
});

export const createBookingSchema = baseBookingSchema.refine(
    (data) => data.checkOut > data.checkIn,
    {
        path: ["checkOut"],
        message: "Check-out date must be after check-in date",
    }
);

export const updateBookingSchema = baseBookingSchema.partial().refine(
    (data) => {
        if (data.checkIn && data.checkOut) {
            return data.checkOut > data.checkIn;
        }
        return true; // skip check if one is missing
    },
    {
        path: ["checkOut"],
        message: "Check-out date must be after check-in date",
    }
);
