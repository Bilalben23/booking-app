import { Schema, model, Document } from "mongoose";
import type { IBooking } from "./booking.types.ts";

export interface BookingDocument extends IBooking, Document { };

const bookingSchema = new Schema<BookingDocument>(
    {
        placeId: {
            type: Schema.Types.ObjectId,
            ref: "Place",
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        checkIn: {
            type: Date,
            required: true
        },
        checkOut: {
            type: Date,
            required: true
        },
        guests: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
    },
    { timestamps: true }
);

export const Booking = model<BookingDocument>("Booking", bookingSchema);
