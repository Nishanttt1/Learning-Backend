import express from "express";
import cors from "cors";


const app = express();

//basic configuration
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

//cors configuration
app.use(
    cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:8000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH","DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


//import the routes
import healthcheckRoutes from "./routes/healthcheck.routes.js";

import authRoutes from "./routes/auth.routes.js";

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/auth", authRouter);


app.get("/", (req, res) => {
    res.send("Hello World!");
});


export default app;