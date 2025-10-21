import { PrismaClient } from "@prisma/client";
import { createUserSchema, updateUserSchema, type User } from "../types.js";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Error",
      errors: parsed.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
      success: false,
    });
  }

  const { username, password, firstName, lastName } = parsed.data;

  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (checkUser)
      return res.status(400).json({
        message: "User with this email already exists",
        success: false,
      });

    const user = await prisma.user.create({
      data: {
        username,
        password,
        firstName: firstName || null,
        lastName: lastName || null,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: user.id,
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

export const getAllUsers = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    if (id) {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!user) {
        return res.status(404).json({
          message: `No user found for this ${id} userId`,
          success: false,
        });
      } else
        return res.status(200).json({
          user,
          success: true,
        });
    }

    const users = await prisma.user.findMany();
    res.status(200).json({
      message: "All users fetched successfully",
      users,
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

export const updateUser = async (req: Request, res: Response) => {
  const { success, error, data } = updateUserSchema.safeParse(req.body);
  const id = req.params.id;
  if (!id)
    return res.status(400).json({
      message: "User id is required",
      success: false,
    });
  if (!success)
    return res.status(411).json({
      message: "Incorrect Inputs",
      errors: error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
      success: false,
    });

  const updateData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined)
  );

  try {
    const updatedResponse = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: updateData,
    });

    return res.status(200).json({
      message: "User updated successfully",
      data: updatedResponse,
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

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id ?? "");

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid id provided",
      success: false,
    });
  }

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "User Deleted Sucessfully",
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
