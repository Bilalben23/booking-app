import { Place } from "./place.model.ts";
import { Types } from "mongoose";
import type { IPlace } from "./place.types.ts";

export class PlaceService {
    static async createPlace(data: IPlace) {
        try {
            const place = new Place(data);
            return await place.save();

        } catch (error) {
            throw new Error("Error creating place: " + (error as Error).message);
        }
    }

    static async getAllPlaces() {
        try {
            return await Place.find().populate("hostId", "name");
        } catch (error) {
            throw new Error("Error fetching places: " + (error as Error).message);
        }
    }

    static async getPlaceByHost(hostId: Types.ObjectId) {
        try {
            return await Place.find({ hostId }).
                populate("hostId", "name");
        } catch (error) {
            throw new Error("Error fetching places by host: " + (error as Error).message);
        }
    }

    static async getPlaceById(placeId: string) {
        try {
            return await Place.findById(placeId)
                .populate("hostId", "name");
        } catch (error) {
            throw new Error("Error fetching place by id: " + (error as Error).message);
        }
    }

    static async updatePlace(id: string, data: Partial<Omit<IPlace, "hostId">>) {
        try {
            return await Place.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw new Error("Error updating place: " + (error as Error).message);
        }
    }

    static async deletePlace(id: string) {
        try {
            return await Place.findByIdAndDelete(id);
        } catch (error) {
            throw new Error("Error deleting place: " + (error as Error).message);
        }
    }
}

