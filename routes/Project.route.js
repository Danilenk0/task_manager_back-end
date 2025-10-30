import express from "express";
import ProjectController from "../controllers/Project.controller.js";
import { CheckAuth } from "../middleware/CheckAuth.js";

const router = express.Router();

router.get("/", CheckAuth, ProjectController.getAll);
router.get("/:id", CheckAuth, ProjectController.getOne);
router.post("/", CheckAuth, ProjectController.create);
router.put("/:id", CheckAuth, ProjectController.update);
router.delete("/:id", CheckAuth, ProjectController.delete);

export default router;
