import { connect } from "mongoose";
import { ENV_VARS } from "./env.ts";

const connectDB = async () => {
    try {
        await connect(ENV_VARS.MONGO_URI);
        console.log("MongoDB connected")
    } catch (err) {
        console.error("Error connecting to MongoDB");
        process.exit(1);
    }
}

export default connectDB;