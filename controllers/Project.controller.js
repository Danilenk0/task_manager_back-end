import ProjectModel from "../models/Project.model.js";

class ProjectController {
  static async getAll(req, res) {
    try {
      const projects = await ProjectModel.find()
        .populate("createdBy", "name email role")
        .populate("developers", "name email role");

      return res.status(200).json(projects);
    } catch (error) {
      showServerError("ProjectController.getAll");
    }
  }
  static async getOne(req, res) {
    try {
      const id = req.params.id;

      const project = await ProjectModel.findById(id)
        .populate("createdBy", "name email role")
        .populate("developers", "name email role");

      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }
      res.status(200).json(project);
    } catch (error) {
      showServerError("ProjectController.getOne");
    }
  }
  static async create(req, res) {
    try {
      const project = new ProjectModel(req.body);
      await project.save();
      await project.populate("createdBy", "name email role");
      if (!project) {
        return res.status(400).json({
          message: "Failed to create project",
        });
      }
      res.status(201).json(project);
    } catch (error) {
      showServerError("ProjectController.create");
    }
  }
  static async update(req, res) {
    try {
      const projectId = req.params.id;
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        projectId,
        req.body,
        { new: true }
      )
        .populate("createdBy", "name email role")
        .populate("developers", "name email role");
      if (!updatedProject) {
        return res.status(404).json({
          message: "Project not found",
        });
      }
      res.status(200).json(updatedProject);
    } catch (error) {
      showServerError("PProjectController.update");
    }
  }
  static async delete(req, res) {
    try {
      const projectId = req.params.id;
      const deletedProject = await ProjectModel.findByIdAndDelete(projectId);
      if (!deletedProject) {
        return res.status(404).json({
          message: "Project not found",
        });
      }
      res.status(204).json({
        message: "The project was successfully deleted",
      });
    } catch (error) {
      showServerError("ProjectController.delete");
    }
  }
}

export default ProjectController;
