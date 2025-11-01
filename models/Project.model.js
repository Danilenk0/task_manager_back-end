import mongoose from "mongoose";
import TaskModel from "./Task.model.js";

const ProjectShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  developers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  deadline: {
    type: Date,
  },
});

async function cascadeDelete(next) {
  try {
    await TaskModel.deleteMany({ project_id: this._id });
    next();
  } catch (error) {
    next(error);
  }
}

ProjectShema.pre("deleteMany", { document: true, query: true }, cascadeDelete);
ProjectShema.pre("deleteOne", { document: true, query: true }, cascadeDelete);

export default mongoose.model("Project", ProjectShema);
