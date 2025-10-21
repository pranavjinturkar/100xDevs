import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getAllUsers);
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
