import { Router } from "express";
import * as placeController from "./place.controller.ts";
import { validateSchema } from "@/middlewares/validateSchema.ts";
import { createPlaceSchema, updatePlaceSchema } from "./place.validations.ts";

const router = Router();


router.post("/", validateSchema(createPlaceSchema), placeController.createPlace);

router.get("/", placeController.getAllPlaces);

router.get("/host", placeController.getPlaceByHost);

router.patch("/:placeId", validateSchema(updatePlaceSchema), placeController.updatePlace);

router.delete("/:placeId", placeController.deletePlace);


export default router;