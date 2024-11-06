import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import hlsRouter from "./routes/hls-router.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import HLSServer from 'hls-server';
import fs from 'fs';
dotenv.config();

import authRouter from "./routes/auth-router.js";
import http from 'http';

const app = express();
const port = process.env.PORT;

// Connect to MongoDB
// connectDB();

// CORS middleware - update with more specific configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// Add this before your routes to handle OPTIONS requests
app.options('*', cors()); // Enable pre-flight for all routes

// Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/hls", hlsRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files
app.use("/videos", express.static(path.join(__dirname, 'videos','streams')));

// Auth routes
app.use("/auth", authRouter);

// Create HTTP server
const server = http.createServer(app);

// Create HLS Server
const hls = new HLSServer(server, {
  provider: {
    exists: (req, cb) => {
      const ext = req.url.split('.').pop();
      
      // Allow non-streaming files to pass through
      if (ext !== 'm3u8' && ext !== 'ts') {
        return cb(null, false);
      }
      
      return cb(null, true);
    },
    getManifestStream: (req, cb) => {
      // Implement manifest stream handling
      const stream = fs.createReadStream(path.join(__dirname, 'streams', req.url));
      cb(null, stream);
    },
    getSegmentStream: (req, cb) => {
      // Implement segment stream handling
      const stream = fs.createReadStream(path.join(__dirname, 'streams', req.url));
      cb(null, stream);
    }
  }
});

// Start the server using the http server instance
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});