import { Request, Response } from "express-serve-static-core";
import { BookingService } from "./booking.service.ts";
import { IUser } from "../user/user.model.ts";
import { IBooking } from "./booking.types.ts";
import { Types } from "mongoose";
import { PlaceService } from "../places/place.service.ts";


export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await BookingService.getAllBookings();

        res.status(200).json({
            success: true,
            message: "All bookings fetched successfully.",
            data: bookings
        })

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({
            success: false,
            message: errorMessage
        })
    }
}

export const getBookingById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const booking = await BookingService.getBookingById(req.params.id)

        if (!booking) {
            res.status(404).json({
                success: false,
                message: "Booking not found"
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "Booking fetched successfully",
            data: booking
        })

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({
            success: false,
            message: errorMessage
        })
    }
}

export const createBooking = async (req: Request<{}, {}, Omit<IBooking, "userId" | "totalPrice">>, res: Response) => {
    try {
        const userId = (req.user as IUser)._id as Types.ObjectId;
        const { checkIn, checkOut, placeId, guests } = req.body;

        // calculate the number of nights
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.ceil((end.getTime() - start.getTime())) / (1000 * 60 * 60 * 24);

        if (nights <= 0) {
            res.status(400).json({
                success: false,
                message: "Check-out must be after check-in."
            })
            return;
        }

        // get place price
        const place = await PlaceService.getPlaceById(placeId.toString());
        if (!place) {
            res.status(404).json({
                success: false,
                message: "Place not found."
            })
            return;
        }

        const totalPrice = nights * place.pricePerNight;
        const newBooking: IBooking = {
            userId,
            totalPrice,
            placeId,
            checkIn,
            checkOut,
            guests
        }

        const createdBooking = await BookingService.createBooking(newBooking);

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: createdBooking
        })

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({
            success: false,
            message: errorMessage
        })
    }
}

export const updateBooking = async (req: Request<{ id: string }, {}, Partial<Omit<IBooking, "userId" | "totalPrice" | "placeId">>>, res: Response) => {
    try {

        const bookingId = req.params.id;

        // fetch existing booking
        const existingBooking = await BookingService.getBookingById(bookingId);
        if (!existingBooking) {
            res.status(404).json({
                success: false,
                message: "Booking not found"
            })
            return;
        }
        console.log(existingBooking);

        const { checkIn, checkOut } = req.body;

        // determine if the total price needs to be calculated
        let totalPrice = existingBooking.totalPrice;
        if (checkIn || checkOut) {
            const newCheckIn = checkIn ? new Date(checkIn) : existingBooking.checkIn;
            const newCheckOut = checkOut ? new Date(checkOut) : existingBooking.checkOut;

            const numberOfNights = Math.ceil(
                (newCheckOut.getTime() - newCheckIn.getTime()) / (1000 * 60 * 60 * 24)
            );

            const place = await PlaceService.getPlaceById(existingBooking.placeId._id.toString());

            if (!place) {
                res.status(400).json({
                    success: false,
                    message: "Associated place not found"
                });
                return;
            }
            totalPrice = numberOfNights * place.pricePerNight;
        }

        const updateBooking = await BookingService.updateBooking(bookingId, { ...req.body, totalPrice });

        if (!updateBooking) {
            res.status(404).json({
                success: false,
                message: "Booking not found",
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: updateBooking
        })

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({
            success: false,
            message: errorMessage
        })
    }
}

export const deleteBooking = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const deletedBooking = await BookingService.deleteBooking(req.params.id);

        if (!deletedBooking) {
            res.status(404).json({
                success: false,
                message: "Booking not found"
            })
            return;
        }
        res.status(200).json({
            success: true,
            message: "Booking deleted successfully",
            data: deletedBooking
        })

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({
            success: false,
            message: errorMessage
        })
    }
}


