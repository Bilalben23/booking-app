import { z } from "zod";

const timeRegex = /^([0-1]\d|2[0-3]):[0-5]\d$/;

export const createPlaceSchema = z.object({
    name: z.string({ required_error: "Place Name is required" })
        .trim()
        .min(3, "Place Name must be at least 3 characters long"),

    description: z.string({ required_error: "Place description is required" })
        .trim()
        .min(10, "Place description must be at least 10 characters"),

    location: z.string({ required_error: "Place location is required" })
        .trim()
        .min(3, "Place location must be at least 3 characters long"),

    pricePerNight: z.coerce.number({
        required_error: "Price per night is required",
        invalid_type_error: "Price per night must be a number"
    }).positive("Price must be a positive number"),

    images: z.array(
        z.string().url("Each image must be a valid URL"),
        { required_error: "At least one image is required" }
    ).min(1, "At least one image is required"),


    checkIn: z.string({ required_error: "Check-in time is required" })
        .regex(timeRegex, "Check-in time must be in HH:mm format (e.g., 14:00)"),

    checkOut: z.string({ required_error: "Check-out time is required" })
        .regex(timeRegex, "Check-out time must be in HH:mm format (e.g., 11:00)"),

    maxGuests: z.coerce.number({
        required_error: "Max guests is required",
        invalid_type_error: "Max guests must be a number"
    }).int("Max guests must be an integer")
        .min(1, "At least one guest must be allowed"),

    perks: z.array(
        z.string().min(3, "Each perk name must be at least 3 characters long")
    ).optional()
});


export const updatePlaceSchema = z.object({
    name: z.string()
        .trim()
        .min(3, "Place name must be at least 3 characters long")
        .optional(),

    description: z.string()
        .trim()
        .min(10, "Place description must be at least 10 characters long")
        .optional(),

    location: z.string()
        .trim()
        .min(3, "Location must be at least 3 characters long")
        .optional(),

    pricePerNight: z.coerce.number()
        .positive("Price per night must be a positive number")
        .optional(),

    images: z.array(
        z.string().url("Each image must be a valid URL")
    ).min(1, "At least one image is required")
        .optional(),

    checkIn: z.string()
        .regex(timeRegex, "Check-in time must be in HH:mm format (e.g., 14:00)")
        .optional(),

    checkOut: z.string()
        .regex(timeRegex, "Check-out time must be in HH:mm format (e.g., 11:00)")
        .optional(),

    maxGuests: z.coerce.number()
        .int("Max guests must be an integer")
        .min(1, "At least one guest must be allowed")
        .optional(),

    perks: z.array(
        z.string().min(3, "Each perk name must be at least 3 characters long")
    ).optional()
})
