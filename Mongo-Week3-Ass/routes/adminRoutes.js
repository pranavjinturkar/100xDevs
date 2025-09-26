import express from "express";
import { Admin, Course } from "../db/model.js";
import { adminMiddleWare } from "../middleware/admin.js";

const router = express.Router();

// Create an Admin
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and Password are Required",
      success: false,
    });
  }

  try {
    const isExistingAdmin = await Admin.findOne({ username });

    if (isExistingAdmin)
      return res.status(400).json({
        message: "Already an admin with this username exists",
        success: false,
      });

    await Admin.insertOne({
      username,
      password,
    });

    res.status(200).json({
      message: "Admin created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message, error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      debug: error.message,
    });
  }
});

// Create a Course
router.post("/courses", adminMiddleWare, async (req, res) => {
  const {
    title,
    description,
    price,
    imageLink = "https://linktoimage.com",
  } = req.body;

  if (!title || !description || !price)
    return res.status(400).json({
      message: "Course title, description and price are Required",
      success: false,
    });

  try {
    const course = await Course.insertOne({
      title,
      price,
      description,
      imageLink,
    });
    res.status(200).json({
      message: "Course Created Successfully",
      courseId: course._id,
    });
  } catch (error) {
    console.error(error.message, error);
    res.status(500).json({
      message: "Internal Server Error... Error Creating a Course",
      success: false,
      debug: error.message,
    });
  }
});

// Fetch All Courses
router.get("/courses", adminMiddleWare, async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      message: "Courses Fetched Successful",
      success: true,
      courses,
    });
  } catch (error) {
    console.error(error.message, error);
    res.status(500).json({
      message: "Internal Server Error... Error Creating a Course",
      success: false,
      debug: error.message,
    });
  }
});

export default router;
