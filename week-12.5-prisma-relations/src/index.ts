import { PrismaClient } from "@prisma/client";
import express from "express";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

app.listen(3000, () => console.log("Server Running on Port 3000!"));

process.on("SIGINT", () => {
  prisma.$disconnect();
  process.exit(0);
});
