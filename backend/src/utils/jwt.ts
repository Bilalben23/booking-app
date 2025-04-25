import { ENV_VARS } from "@/config/env.ts";
import jwt, { JwtPayload } from "jsonwebtoken";


export class JwtService {
    public static signAccessToken(userId: string): string {
        return jwt.sign(
            { userId },
            ENV_VARS.JWT_ACCESS_SECRET,
            { expiresIn: "15m" }
        );
    }

    public static signRefreshToken(userId: string): string {
        return jwt.sign(
            { userId },
            ENV_VARS.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        )
    }

    public static verifyRefreshToken(token: string): Promise<JwtPayload> {
        return new Promise<JwtPayload>((resolve, reject) => {
            jwt.verify(token, ENV_VARS.JWT_REFRESH_SECRET, (err, decoded) => {
                if (err) {
                    reject(new Error("Invalid refresh token"));
                    return;
                }
                if (!decoded || typeof decoded === "string") {
                    reject(new Error("Invalid refresh token"));
                    return;
                }
                resolve(decoded as JwtPayload);
            })
        })
    }
}
