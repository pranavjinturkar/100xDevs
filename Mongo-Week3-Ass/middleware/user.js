import { User } from "../db/model.js";

export default async function userMiddleware(req, res, next) {
  const { username, password } = req.headers;

  if (!username || !password) {
    return res.status(400).json({
      message: "User's username/pass required",
      success: false,
    });
  }
  try {
    const isUser = await User.findOne({
      username,
      password,
    });

    if (!isUser) {
      return res.status(401).json({
        message: "Unauthorized User",
        success: false,
      });
    } else next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized User, Internal Server Error",
      success: false,
    });
  }
}
