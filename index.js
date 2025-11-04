import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRouter from "./routes/User.route.js";
import ProjectRouter from "./routes/Project.route.js";
import TaskRouter from "./routes/Task.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/user", UserRouter);
app.use("/project", ProjectRouter);
app.use("/task", TaskRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
  });
