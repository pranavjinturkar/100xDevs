import z from "zod";

export const createUserSchema = z.object({
  username: z.email({ error: "Must be email format" }),
  password: z.string().min(6, { error: "Must be min. 6 chars" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type User = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  password: z.string().min(6, { error: "Must be min. 6 chars" }).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const todoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export const updateTodoSchema = todoSchema.partial();

export const createTodoSchema = todoSchema.extend({
  userId: z.number(),
});

export type Todo = z.infer<typeof createTodoSchema>;
