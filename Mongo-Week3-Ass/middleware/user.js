import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export default function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized Access, You Should Log In",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.username) {
      req.username = decoded.username;
      next();
    } else {
      res.status(401).json({
        message: "Unauthorized Access!",
        success: false,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Input Error, Internal Server Error in User's",
      success: false,
    });
  }
}
