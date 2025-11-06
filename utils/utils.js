import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.PRIVATEKEY, { expiresIn: "7d" });
};

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
  return hashedPassword;
};

export const showServerError = (res, textErrorPoint, error) => {
  console.error(`${textErrorPoint}, error: ${error.message}`);
  res.status(500).json({
    message: "Internal server error",
  });
};

export const sendToken = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
