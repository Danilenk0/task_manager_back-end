import jwt from "jsonwebtoken";

export const CheckAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.PRIVATEKEY);

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(`Error middleware -> checkAuth: ${error.message}`);
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
