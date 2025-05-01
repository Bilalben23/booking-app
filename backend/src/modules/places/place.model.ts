import { Schema, Document, model } from "mongoose";
import type { IPlace } from "./place.types.ts";

export interface PlaceDocument extends IPlace, Document { }

const predefinedPerks = [
    "Free WiFi",
    "Swimming Pool",
    "Parking",
    "Air Conditioning",
    "Pet Friendly",
    "Gym Access",
    "Free Breakfast",
    "Hot Tub",
    "Kitchen",
    "Washer/Dryer",
    "Smart TV",
    "Free Parking",
    "Fireplace"
];

const placeSchema = new Schema<PlaceDocument>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    hostId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
        type: String,
        required: true,
    },
    maxGuests: {
        type: Number,
        required: true,
        min: 1,
    },
    perks: {
        type: [String],
        default: predefinedPerks
    },
}, { timestamps: true });


export const Place = model<PlaceDocument>("Place", placeSchema);
