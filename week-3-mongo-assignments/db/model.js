import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "Week3-LMS",
  })
  .then(() => console.log("MongoDB connected!"));

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number,
  published: { type: Boolean, default: true },
});

export const Admin = mongoose.model("Admin", AdminSchema);
export const User = mongoose.model("User", UserSchema);
export const Course = mongoose.model("Course", CourseSchema);
