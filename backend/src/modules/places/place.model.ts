import { Schema, Document, Types, model } from "mongoose";

export interface IPlace extends Document {
    name: string;
    description: string;
    location: string;
    pricePerNight: number;
    images: string[];
    hostId: Types.ObjectId;
    checkIn: string;
    checkOut: string;
    maxGuests: number;
    perks: {
        name: string;
        available: boolean
    }[];
}

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


const placeSchema = new Schema({
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


export const Place = model<IPlace>("Place", placeSchema);
