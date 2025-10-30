import UserModel from "../models/User.model.js";
import { createToken, hashPassword } from "../utils/utils.js";
import bcrypt from "bcrypt";

class UserController {
  static async registration(req, res) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
      const hashedPassword = await hashPassword(password);

      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = createToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json({
        message: "Registration successful",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error(`UserController.registration error: ${error.message}`);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  static async authorization(req, res) {
    try {
      const { email, password } = req.body;

      const existingUser = await UserModel.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({
          message: "User not existing",
        });
      }
      const isValidPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isValidPassword) {
        return res.status(400).json({
          message: "Incorrect login or password",
        });
      }
      const token = createToken(existingUser._id);

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        message: "Welcome",
      });
    } catch (error) {
      console.error(`UserController.authorization, error: ${error.message}`);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  static async getAll(req, res) {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(`UserController.getAll error: ${error.message}`);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  static async getOne(req, res) {
    try {
      const userId = req.params.id;

      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(`UserController.getOne error: ${error.message}`);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  static async getMe(req, res) {
    try {
      const user = await UserModel.findById(req.userId).select("-password");
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(`UserController.getMe, error: ${error.message}`);
      res.status(500).json({
        message: "Internal server erorr",
      });
    }
  }
  static async deleteMe(req, res) {
    try {
      const id = req.userId;
      const deletedUser = await UserModel.findById({ _id: id });
      await deletedUser.deleteOne();
      res.status(204).json({
        message: "The user was successfully deleted",
      });
      res.cookie("token", "");
    } catch (error) {
      console.error(`UserController.deleteMe, error: ${error.message}`);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  static async deleteOne(req, res) {
    try {
      const userId = req.params.id;
      const deletedUser = await UserModel.findById({ _id: userId });
      if (!deletedUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      await deletedUser.deleteOne();
      res.status(204).json({
        message: "The user was successfully deleted",
      });
    } catch (error) {
      console.error(`UserController.deleteOne, error: ${error.message}`);
    }
  }
}

export default UserController;
