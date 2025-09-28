import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User, BusinessCard } from "../db/index.js";
import authenticateUser from "../middleware/user.js";

dotenv.config({ quiet: true });

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, username, password } = req.body;

  if (!username || !name || !password)
    return res.status(400).json({
      message: "All Fields are required",
      success: false,
    });

  try {
    const isExistingUser = await User.findOne({ username });
    if (isExistingUser)
      return res.status(400).json({
        message: "Existing User with this username",
        success: false,
      });

    await User.insertOne({
      username,
      password,
      name,
    });
    res.status(201).json({
      message: "User Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error, error.message);
    res.status(500).json({
      message: "Internal Server Error, Error Creating User",
      success: false,
      debug: error.message,
    });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({
      message: "All Fields are required",
      success: false,
    });

  try {
    const checkUser = await User.findOne({ username, password });

    if (!checkUser)
      return res.status(404).json({
        message: "No User found with this username",
        success: false,
      });

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User Logged In successfully",
      success: true,
      token,
    });
  } catch (error) {
    console.log(error, error.message);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.debug,
    });
  }
});

router.get("/cards", authenticateUser, async (req, res) => {
  try {
    const cards = await BusinessCard.find();

    res.status(200).json({
      message: "Cards Fetched Successfully",
      success: true,
      cards,
    });
  } catch (error) {
    console.log(error, error.message);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      debug: error.message,
    });
  }
});

export default router;
