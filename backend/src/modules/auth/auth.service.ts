import { JwtService } from "@/utils/jwt.ts";
import { UserService } from "../user/user.service.ts";
import bcrypt from "bcrypt";

export class AuthService {

    static async register(userData: {
        name: string;
        email: string;
        password: string
    }) {

        const existingUser = await UserService.findUserByEmail(userData.email);

        if (existingUser) {
            throw {
                status: 400,
                message: "Email already token"
            }
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = await UserService.createUser({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            provider: "local"
        });
        const accessToken = JwtService.signAccessToken((user._id as string).toString());
        const refreshToken = JwtService.signRefreshToken((user._id as string).toString());

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            },
            accessToken,
            refreshToken
        }
    }


    static async loginUser(email: string, password: string) {
        const user = await UserService.findUserByEmail(email);
        if (!user || !user.password) {
            throw {
                status: 401,
                message: "Invalid email or password"
            }
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw {
                status: 401,
                message: "Invalid email or password"
            }
        }

        const accessToken = JwtService.signAccessToken((user._id as string).toString());
        const refreshToken = JwtService.signRefreshToken((user._id as string).toString());

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            },
            accessToken,
            refreshToken
        }
    }
}