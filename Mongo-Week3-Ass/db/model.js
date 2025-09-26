import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "Week3-LMS",
  })
  .then(() => console.log("MongoDB connected"));

const AdminSchema = new mongoose.Schema({});

const UserSchema = new mongoose.Schema({});

const CourseSchema = new mongoose.Schema({});

export const Admin = mongoose.model("Admin", AdminSchema);
export const User = mongoose.model("User", UserSchema);
export const Course = mongoose.model("Course", CourseSchema);
