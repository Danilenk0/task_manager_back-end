import express from "express";
import UserController from "../controllers/User.controller.js";
import { CheckAuth } from "../middleware/CheckAuth.js";

const router = express.Router();
router.post("/registration", UserController.registration);
router.post("/authorization", UserController.authorization);
router.get("/", CheckAuth, UserController.getAll);
router.get("/me", CheckAuth, UserController.getMe);
router.get("/:id", CheckAuth, UserController.getOne);

export default router;
