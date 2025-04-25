import { User } from "./user.model.ts";
import { type IUser } from "./user.model.ts";


export class UserService {
    static async createUser(userData: Partial<IUser>): Promise<IUser> {
        return await User.create(userData);
    }

    static async findUserByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    static async getUserById(userId: string): Promise<IUser | null> {
        return await User.findById(userId);
    }
}

