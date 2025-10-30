import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRouter from "./routes/User.route.js";
import ProjectRouter from "./routes/Project.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/user", UserRouter);
app.use("/project", ProjectRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
  });
