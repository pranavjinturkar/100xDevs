import z from "zod";

export const createTodoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const updateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  isCompleted: z.boolean().optional(),
});

export const deleteTodoSchema = z.string();
