import TaskModel from "../models/Task.model.js";
import { showServerError } from "../utils/utils.js";

class TaskController {
  static async getAll(req, res) {
    try {
      const tasks = await TaskModel.find().populate("project_id");
      res.status(200).json(tasks);
    } catch (error) {
      showServerError("TaslController.getAll");
    }
  }
  static async getOne(req, res) {
    try {
      const id = req.params.id;
      const task = await TaskModel.findById(id).populate(
        "project_id",
        "name description"
      );
      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }
      res.status(200).json(task);
    } catch (error) {
      showServerError("TaskController.getOne");
    }
  }
  static async create(req, res) {
    try {
      const newTask = new TaskModel(req.body);

      await newTask.save();
      await newTask.populate("project_id", "name description");
      return res.status(201).json(newTask);
    } catch (error) {
      showServerError("TaskController.create");
    }
  }
  static async delete(req, res) {
    try {
      const id = req.params.id;
      const deletedTask = await TaskModel.findByIdAndDelete(id);
      if (!deletedTask) {
        return res.status(404).json({
          message: "Task not found",
        });
      }
      res.status(204).json({
        message: "The task was successfully deleted",
      });
    } catch (error) {
      showServerError("TaskController.delete");
    }
  }
}

export default TaskController;
