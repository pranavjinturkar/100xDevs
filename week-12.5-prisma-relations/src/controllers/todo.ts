import { PrismaClient } from "@prisma/client";
import { createTodoSchema, todoSchema, updateTodoSchema } from "../types.js";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const createTodo = async (req: Request, res: Response) => {
  const { success, error, data } = createTodoSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Validation Error",
      errors: error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
      success: false,
    });
  }

  const { title, userId, completed, description } = data;

  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!checkUser)
      return res.status(404).json({
        message: "No user found for this userId",
        success: false,
      });

    const todo = await prisma.todo.create({
      data: {
        title,
        userId,
        completed: completed || false,
        description: description || "",
      },
    });
    return res.status(201).json({
      message: "Todo created successfully",
      todoId: todo.id,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export const getAllTodo = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id ?? "");

  try {
    if (id) {
      if (isNaN(id))
        return res.status(411).json({
          message: "Invalid Id",
          success: false,
        });

      const todo = await prisma.todo.findUnique({
        where: {
          id,
        },
      });

      if (!todo)
        return res.status(400).json({
          message: "No Todo for this id...",
          success: false,
        });

      return res.status(200).json({
        todo,
        success: true,
      });
    }

    const todo = await prisma.todo.findMany();

    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { success, error, data } = updateTodoSchema.safeParse(req.body);
  const id = parseInt(req.params.id ?? "");
  if (!success)
    return res.status(411).json({
      message: "Invalid Inputs",
      errors: error.issues.map((e) => ({
        fields: e.path.join("."),
        message: e.message,
      })),
      success: false,
    });

  const { title, completed, description } = data;
  const updatedData: Record<string, string | boolean> = {};
  if (title && title.trim().length > 0) updatedData.title = title;
  if (completed !== undefined) updatedData.completed = completed;
  if (description && description.length > 0)
    updatedData.description = description;

  try {
    if (isNaN(id))
      return res.status(411).json({
        message: "Invalid Id",
        success: false,
      });

    const updated = await prisma.todo.update({
      where: {
        id,
      },
      data: updatedData,
    });

    res.status(200).json({
      message: "Todo Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export const deleteTodo = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id ?? "");

  try {
    if (isNaN(id))
      return res.status(411).json({
        message: "Invalid Id",
        success: false,
      });
    const deleted = await prisma.todo.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Todo Deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
