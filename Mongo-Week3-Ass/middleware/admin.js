import { Admin } from "../db/model.js";

export default async function adminMiddleWare(req, res, next) {
  const { username, password } = req.headers;

  if (!username || !password) {
    return res.status(401).json({
      message: "Admin username/pass required",
      success: false,
    });
  }

  try {
    const checkAdmin = await Admin.findOne({
      username,
      password,
    });
    if (!checkAdmin) {
      return res.status(401).json({
        message: "Unauthorized Access",
        success: false,
      });
    } else next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized Access",
      success: false,
    });
  }
}
