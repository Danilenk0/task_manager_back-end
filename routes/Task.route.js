import express from "express";
import TaskController from "../controllers/Task.Controller.js";
import { CheckAuth } from "../middleware/CheckAuth.js";

const router = express.Router();

router.get("/", CheckAuth, TaskController.getAll);
router.get("/:id", CheckAuth, TaskController.getOne);
router.post("/", CheckAuth, TaskController.create);
router.delete("/:id", CheckAuth, TaskController.delete);

export default router;
