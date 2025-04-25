import { NextFunction, Request, Response } from "express-serve-static-core";
import { ZodSchema } from "zod";

export const validateSchema = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error.errors.map(err => ({
                field: err.path[0],
                error: err.message
            }))

            res.status(400).json({
                success: false,
                message: "Validation error",
                errors
            })
            return;
        }

        next();
    }
}