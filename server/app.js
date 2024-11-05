import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";

import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/auth-router.js";

const app = express();
const port = process.env.PORT;

// Connect to MongoDB
connectDB();

// CORS middleware
app.use(
  cors({
    origin: `http://localhost:${process.env.CLIENT_PORT || 5173}`,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auth routes
app.use("/auth", authRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
