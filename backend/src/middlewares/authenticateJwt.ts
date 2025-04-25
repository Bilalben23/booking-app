import { NextFunction, Request, Response } from "express-serve-static-core";
import passport from "passport";
import { type JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
    userId: string;
}
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err: Error | null, user: CustomJwtPayload | false) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Internal server error during authentication"
            })
            return;
        }

        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized: No valid token provided.',
            })
            return;
        }

        req.user = user;
        next()
    })(req, res, next);

}