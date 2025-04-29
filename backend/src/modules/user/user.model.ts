import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string; // only for JWT(local) strategy
    image?: string;
    provider: "local" | "google" | "facebook" | "apple";
    providerId?: string;
    emailVerified?: boolean
}


const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String
    },
    image: {
        type: String
    },
    provider: {
        type: String,
        enum: ["local", "google", "facebook", "apple"],
        default: "local"
    },
    providerId: {
        type: String
    },
    emailVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


export const User = model<IUser>("User", UserSchema);