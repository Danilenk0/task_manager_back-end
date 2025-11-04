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
