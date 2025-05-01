import { Booking } from "./booking.model.ts";
import type { IBooking } from "./booking.types.ts";


export class BookingService {
    static async getAllBookings(userId: string) {
        return await Booking.find({ userId })
            .populate("placeId");
    }

    static async getBookingById(id: string) {
        return await Booking.findById(id)
            .populate("placeId")
            .populate("userId")
    }

    static async updateBooking(id: string, bookingData: Partial<Omit<IBooking, "placeId" | "userId">>) {
        return await Booking.findByIdAndUpdate(id, bookingData, { new: true });
    }

    static async createBooking(bookingData: IBooking) {
        return await Booking.create(bookingData);
    }

    static async deleteBooking(id: string) {
        return await Booking.findByIdAndDelete(id);
    }
}