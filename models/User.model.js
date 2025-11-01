import mongoose from "mongoose";
import ProjectModel from "./Project.model.js";

const UserShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Developer"],
    default: "Developer",
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

async function cascadeDelete(next) {
  try {
    const projects = await ProjectModel.find({ createdBy: this._id });
    for (let project of projects) {
      await project.deleteOne();
    }
    next();
  } catch (error) {
    next(error);
  }
}
UserShema.pre("deleteMany", { document: true, query: true }, cascadeDelete);
UserShema.pre("deleteOne", { document: true, query: true }, cascadeDelete);
export default mongoose.model("User", UserShema);
