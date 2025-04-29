import { Request, Response } from "express-serve-static-core";
import { PlaceService } from "./place.service.ts";
import { IUser } from "../user/user.model.ts";
import { createPlaceSchema } from "./place.validations.ts";
import { z } from "zod";
import { Types } from "mongoose";


type PlaceRequestBody = z.infer<typeof createPlaceSchema>;

export const createPlace = async (req: Request<{}, {}, PlaceRequestBody>, res: Response) => {
    try {
        const hostId = (req.user as IUser)._id as Types.ObjectId;
        const newPlace = { ...req.body, hostId };
        const place = await PlaceService.createPlace(newPlace);

        res.status(201).json({
            success: true,
            message: "Place created successfully",
            data: place
        })

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({
            success: false,
            message: errorMessage
        })
    }
}


export const getAllPlaces = async (req: Request, res: Response) => {
    try {
        const places = await PlaceService.getAllPlaces();

        res.status(200).json({
            success: true,
            message: "Places fetched successfully",
            data: places
        })

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({
            success: false,
            message: errorMessage
        })
    }
}

export const getPlaceByHost = async (req: Request, res: Response) => {
    try {
        const hostId = (req.user as IUser)._id as Types.ObjectId;

        const places = await PlaceService.getPlaceByHost(hostId);

        res.status(200).json({
            success: true,
            message: "Places fetched successfully",
            data: places
        })

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({
            success: false,
            message: errorMessage
        })
    }
}


export const updatePlace = async (req: Request<{ placeId: string }, {}, Partial<PlaceRequestBody>>, res: Response) => {
    try {
        const updatedPlace = await PlaceService.updatePlace(req.params.placeId, req.body);

        if (!updatedPlace) {
            res.status(404).json({
                success: false,
                message: "Place not found"
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "Place updated successfully",
            data: updatedPlace
        })

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({
            success: false,
            message: errorMessage
        })
    }
}


export const deletePlace = async (req: Request<{ placeId: string }>, res: Response) => {
    try {
        const deletedPlace = await PlaceService.deletePlace(req.params.placeId);

        if (!deletedPlace) {
            res.status(404).json({
                success: false,
                message: "Place not found"
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "Place delete successfully",
            data: deletedPlace
        })
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
        res.status(500).json({
            success: false,
            message: errorMessage
        })
    }
}