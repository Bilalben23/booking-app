import { Types } from "mongoose";

export interface IPlace {
    name: string;
    description: string;
    location: string;
    pricePerNight: number;
    images: string[];
    hostId: Types.ObjectId;
    checkIn: string;
    checkOut: string;
    maxGuests: number;
    perks: string[];
}
