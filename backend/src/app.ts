import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "routes/index.ts";
import passport from "@/config/passport.ts";
import cookieParser from "cookie-parser";
import { ENV_VARS } from "./config/env.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(helmet());

app.use(cors({
    origin: [ENV_VARS.FRONTEND_URL],
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use(passport.initialize());


app.use("/api/v1", routes);

export default app;