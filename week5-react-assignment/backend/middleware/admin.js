import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export default function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({
      message: "Unauthorized Access",
      success: false,
    });

  const token = authHeader.split(" ")[1];
  try {
    const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
    req.less = {
      username: decodedValue.username,
      type: "admin",
    };
    next();
  } catch (error) {
    console.log(error, error.message);
    res.status(403).json({
      message: "Unauthorized",
      success: false,
    });
  }
}
