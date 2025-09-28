import express from "express";
import {
  createTodoSchema,
  updateTodoSchema,
  deleteTodoSchema,
} from "./types.js";
import { Todo } from "./db.js";

const app = express();
app.use(express.json());

app.post("/todos", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodoSchema.safeParse(createPayload);

  if (!parsedPayload.success)
    return res.status(411).json({
      message: "Required Fields Missing or Incorrect inputs",
      error: parsedPayload.error.message,
      success: false,
    });

  try {
    await Todo.insertOne({
      title: createPayload.title,
      description: createPayload.description,
      isCompleted: false,
    });

    res.status(201).json({
      message: "Todo Created Successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      debug: error.message,
    });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      message: "Todos Fetched Successfully",
      success: true,
      todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      debug: error.message,
    });
  }
});

app.put("/todos/:todoId", async (req, res) => {
  const updatePayload = req.body;
  const todoId = req.params.todoId;
  const parsedPayload = updateTodoSchema.safeParse(updatePayload);
  if (!parsedPayload.success)
    return res.status(411).json({
      message: "Required Fields Missing or Incorrect inputs",
      error: parsedPayload.error.message,
      success: false,
    });

  const updatedTodo = {};

  if (parsedPayload.data.description)
    updatedTodo.description = updatePayload.description;
  if (parsedPayload.data.title) updatedTodo.title = updatePayload.title;
  if (parsedPayload.data.isCompleted)
    updatedTodo.isCompleted = updatePayload.isCompleted;

  await Todo.updateOne({ _id: todoId }, { $set: { ...updatedTodo } });

  res.status(200).json({
    message: "Todo Updated Successfully",
    success: true,
  });
});

app.delete("/todos/:todoId", async (req, res) => {
  const todoId = req.params.todoId;

  const parsedPayload = deleteTodoSchema.safeParse(todoId);
  if (!parsedPayload.success)
    return res.status(400).json({
      message: parsedPayload.error.message,
      success: false,
    });

  try {
    const deleteRes = await Todo.deleteOne({ _id: todoId });
    if (!deleteRes)
      return res.status(400).json({
        message: "Todo not found with this id",
        success: false,
      });

    res.status(200).json({
      message: "Todo Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      debug: error.message,
    });
  }
});

app.listen(3000, () => console.log("Server Running on Port 3000!"));
