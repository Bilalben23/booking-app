import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
    NODE_ENV: process.env.NODE_ENV as ("development" | "production"),
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/airbnb",

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "access-secret",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refresh-secret",

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "google-client-id",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "google-client-secret",
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/api/v1/auth/google/callback",

    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
}