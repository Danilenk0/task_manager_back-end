import express from "express";
import UserController from "../controllers/User.controller.js";
import { CheckAuth } from "../middleware/CheckAuth.js";

const router = express.Router();
router.post("/registration", UserController.registration);
router.post("/authorization", UserController.authorization);
router.post("/logout", UserController.logout);
router.get("/", CheckAuth, UserController.getAll);
router.get("/me", CheckAuth, UserController.getMe);
router.get("/:id", CheckAuth, UserController.getOne);
router.delete("/me", CheckAuth, UserController.deleteMe);
router.delete("/:id", CheckAuth, UserController.deleteOne);

export default router;
