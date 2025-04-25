import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "routes/index.ts";
import passport from "@/config/passport.ts";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(helmet());

app.use(cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use(passport.initialize());


app.use("/api/v1", routes);

export default app;