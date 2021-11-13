import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import rateLimit from "express-rate-limit";
import authenticationRoutes from "./routes/authentication.js";
import postsRoutes from "./routes/posts.js";
const server = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

server.use(cors());
server.use(cookieParser());
server.use(limiter);
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/user", authenticationRoutes);
server.use("/posts", postsRoutes);

const PORT = process.env.PORT || 9000;

connectDB();

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
