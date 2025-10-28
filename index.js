import express from "express";
import env from "dotenv";
import connectDB from "./config/db.js";

env.config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`);
  connectDB();
});
