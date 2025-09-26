import { Admin } from "../db/model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export default async function adminMiddleWare(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized Access, Please Sign In",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.username) {
      next();
    } else {
      res.status(400).json({
        message: "Unauthorized Access",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Inputs",
      success: false,
      debug: error.message,
    });
  }
}
