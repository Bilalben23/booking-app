import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/airbnb",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "access-secret",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refresh-secret"
}