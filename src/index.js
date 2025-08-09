import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json()); //to parse JSON data from the request body
app.use(cookieParser()); //to parse cookies from the request
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes); //search bar mein (/api/auth/signup) kiya toh signup page dikhayega
app.use("/api/messages", messageRoutes); //message routes for handling messages

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
