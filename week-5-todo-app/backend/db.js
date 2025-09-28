import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "TodoApp",
  })
  .then(() => console.log("MongoDB connected!"));

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  isCompleted: { type: Boolean, default: false },
});

export const Todo = mongoose.model("Todos", todoSchema);
