import { Request, Response } from "express-serve-static-core";
import { AuthService } from "./auth.service.ts";
import { UserService } from "../user/user.service.ts";
import { ENV_VARS } from "@/config/env.ts";
import { JwtService } from "@/utils/jwt.ts";
import { IUser } from "../user/user.model.ts";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const result = await AuthService.register({ name, email, password });

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: ENV_VARS.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: result.user,
            accessToken: result.accessToken
        })

    } catch (err: any) {
        res.status(err.status || 500).json({
            success: false,
            message: (err as Error).message || "Internal Server Error"
        });
    }
}


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const result = await AuthService.loginUser(email, password)

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: ENV_VARS.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: result.user,
            accessToken: result.accessToken
        })

    } catch (err: any) {
        res.status(err.status || 500).json({
            success: false,
            message: (err as Error).message || 'Internal Server Error',
        });
    }
}


export const refreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            res.status(401).json({
                success: false,
                message: "Refresh token is missing or expired"
            })
            return;
        }

        const decoded = await JwtService.verifyRefreshToken(refreshToken);

        const user = await UserService.getUserById(decoded.userId);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        const newAccessToken = JwtService.signAccessToken(user.id);

        res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            accessToken: newAccessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user?.image
            }
        })

    } catch (err: any) {

        if (err.name === "TokenExpiredError" || err.message.includes("Invalid refresh token")) {
            res.status(400).json({
                success: false,
                message: "Invalid or expired refresh token",
            });
            return;
        }

        res.status(err.status || 500).json({
            success: false,
            message: (err as Error).message || 'Internal Server Error',
        })
    }
}


export const googleCallback = (req: Request, res: Response) => {
    try {
        const user = req.user as IUser;

        if (!user) {
            res.status(401).json({
                success: false,
                message: "Authentication failed"
            })
            return;
        }

        const accessToken = JwtService.signAccessToken((user._id as string).toString());
        const refreshToken = JwtService.signRefreshToken((user._id as string).toString());

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: ENV_VARS.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            image: user.image
        }

        res.redirect(`${ENV_VARS.FRONTEND_URL}/callback?accessToken=${accessToken}&user=${JSON.stringify(userData)}`);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: (err as Error).message || "Internal Server Error",
        })
    }
}


export const logoutUser = (req: Request, res: Response) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: ENV_VARS.NODE_ENV === "production",
        sameSite: "strict",
    });


    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    })
}