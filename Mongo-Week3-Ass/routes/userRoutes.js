import express from "express";
import { User, Course } from "../db/model.js";
import authenticateUser from "../middleware/user.js";

const router = express.Router();

// Create User
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
      success: false,
    });
  }

  try {
    const isExistingUser = await User.findOne({ username });

    if (isExistingUser)
      return res.status(400).json({
        message: "Already an user!",
        success: false,
      });

    await User.insertOne({
      username,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message, error);
    res.status(500).json({
      message: "Internal Server Error, Error Creating User",
      success: false,
      debug: error.message,
    });
  }
});

// Get All Courses for User
router.get("/courses", authenticateUser, async (req, res) => {
  const courses = await Course.find();

  res.status(201).json({
    message: "Courses fetched Successfully",
    success: true,
    courses,
  });
  try {
  } catch (error) {
    console.error(error.message, error);
    res.status(500).json({
      message: "Internal Server Error... Error Creating a Course",
      success: false,
      debug: error.message,
    });
  }
});

router.post("/courses/:courseId", authenticateUser, async (req, res) => {
  const { courseId } = req.params;
  const { username } = req.headers;
  if (!courseId)
    return res.status(400).json({
      message: "No CourseId Provided",
      success: false,
    });

  try {
    const isExistingCourse = await Course.findById(courseId);
    if (!isExistingCourse)
      return res.status(404).json({
        message: "Course Not Found",
        success: false,
      });

    const userDetails = await User.findOne({ username });

    if (userDetails.purchasedCourses.includes(isExistingCourse.id)) {
      return res.status(400).json({
        message: "You've already purchased this course once",
        success: false,
      });
    }

    const addCourseToUser = await User.updateOne(
      { username },
      { $push: { purchasedCourses: isExistingCourse.id } }
    );

    res.status(200).json({
      message: "Course Purchased Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message, error);
    res.status(500).json({
      message: "Error Purchasing Course",
      debug: error.message,
      success: false,
    });
  }
});

router.get("/purchasedCourses", authenticateUser, async (req, res) => {
  const username = req.headers.username;

  try {
    const allPurchasedCourses = await User.findOne({ username });

    const courses = allPurchasedCourses.purchasedCourses;

    if (courses.length == 0)
      return res.status(400).json({
        message: "You've Purchased No Courses... Purchase One then come",
        success: false,
      });

    const courseDetails = await Course.find({ _id: { $in: courses } });

    console.log(courses);
    res.status(200).json({
      success: true,
      courseDetails
    });
  } catch (error) {
    console.log(error.message, error);
    res.status(500).json({
      message: "Error Fetching Courses",
      debug: error.message,
      success: false,
    });
  }
});

export default router;
