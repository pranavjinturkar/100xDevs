import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  updateTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.post("/", createTodo);
router.get("/", getAllTodo);
router.get("/:id", getAllTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
