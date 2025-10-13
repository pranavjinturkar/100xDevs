import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ quiet: true });

export default function signJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}
