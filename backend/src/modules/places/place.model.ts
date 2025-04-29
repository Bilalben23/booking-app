import { Schema, Document, Types, model } from "mongoose";

export interface IPlace extends Document {
    name: string;
    description: string;
    location: string;
    pricePerNight: number;
    images: string[];
    hostId: Types.ObjectId;
    checkIn: number;
    checkOut: number;
    maxGuests: number;
}


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
        type: Number,
        required: true,
        min: 0,
        max: 23
    },
    checkOut: {
        type: Number,
        required: true,
        min: 0,
        max: 23
    },
    maxGuests: {
        type: Number,
        required: true,
        min: 1,
    }
}, { timestamps: true });


export const Place = model<IPlace>("Place", placeSchema);
