import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import hlsRouter from "./routes/hls-router.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();

import authRouter from "./routes/auth-router.js";
import http from 'http';

const app = express();
const port = process.env.PORT;

// Connect to MongoDB
// connectDB();

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

app.use("/hls", hlsRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Add CORS headers for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Serve static files
app.use("/videos", express.static(path.join(__dirname, 'videos')));

// Auth routes
app.use("/auth", authRouter);

// Create HTTP server
const server = http.createServer(app);

// Start the server using the http server instance
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});