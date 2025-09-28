import express, { json } from "express";
import { BusinessCard, Admin } from "../db/index.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config({ quiet: true });

const router = express.Router();

// Admin Sign Up
router.post("/signup", async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password)
    return res.status(400).json({
      message: "All the fields are required",
      success: false,
    });

  try {
    const isExistingUser = await Admin.findOne({ username });
    if (isExistingUser)
      return res.status(400).json({
        message: "Already an existing username... please try another",
        success: false,
      });

    await Admin.insertOne({ name, username, password });

    res.status(201).json({
      message: "Admin Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error, error.message);
    res.status(500).json({
      message: "Internal Server Error, Error Signing admin",
      success: false,
      debug: error.message,
    });
  }
});

// Admin Log In
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({
      message: "All the fields are required",
      success: false,
    });

  try {
    const checkAdmin = await Admin.findOne({ username, password });
    if (!checkAdmin)
      return res.status(404).json({
        message: "No user found with this credential",
        success: false,
      });

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Admin Logged In Successfully",
      admin: true,
      success: true,
    });
  } catch (error) {
    console.log(error, error.message);
    res.status(500).json({
      message: "Internal Server Error, Error Logging Admin",
      success: false,
      debug: error.message,
    });
  }
});

// Get All Cards
router.get("/cards", async (req, res) => {
  try {
    const cards = await BusinessCard.find();

    if (cards.length === 0) {
      return res.status(200).json({
        message: "There are no business cards",
        hasCards: false,
        success: true,
      });
    }

    res.status(200).json({
      message: "Cards Fetched Successfully",
      success: true,
      hasCards: true,
    });
  } catch (error) {
    console.log(error, error.message);
    res.status(500).json({
      message: "Internal Server Error, Error Fetching Cards",
      success: false,
      debug: error.message,
    });
  }
});

// Create Card
router.post("/cards", async (req, res) => {
  const { name, description, interests, twitterId, linkedInId } = req.body;
  if (!name || !description || !twitterId || !linkedInId) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }
  if (!Array.isArray(interests) && interests.length === 0) {
    return res.status(400).json({
      message: "Interests is an string Array, send it appropriately",
      success: false,
    });
  }

  await BusinessCard.insertOne({
    name,
    description,
    interests,
    twitterId,
    linkedInId,
  })
    .then(() =>
      res.status(201).json({
        message: "Card Created Successfully",
        success: true,
      })
    )
    .catch(
      (err) => (
        console.log(err, err.message),
        res.status(500).json({
          message: "Internal Server Error, Error Creating Card",
          success: false,
          err: err.message,
        })
      )
    );
});

export default router;
