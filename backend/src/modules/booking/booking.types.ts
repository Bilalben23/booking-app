import { Types } from "mongoose";

export interface IBooking {
    placeId: Types.ObjectId;
    userId: Types.ObjectId;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
}
