import express from "express";
import { BusinessCard, Admin } from "../db/index.js";
import jwt from "jsonwebtoken";
import authenticateAdmin from "../middleware/admin.js";

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
      token,
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
      cards,
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

router.get("/cards/:cardId", async (req, res) => {
  const { cardId } = req.params;
  if (!cardId)
    return res.status(400).json({
      message: "No CardId Found",
      success: false,
    });

  try {
    const cardRes = await BusinessCard.findOne({ _id: cardId });
    if (!cardRes)
      return res.status(404).json({
        message: "No Card found for this Id",
        success: false,
      });

    res.status(200).json({
      message: "Card Fetched Successfully",
      success: true,
      cardRes,
    });
  } catch (error) {
    console.log(error, error.message);
    res.status(500).json({
      message: "Internal Server Details",
      success: false,
      debug: error.message,
    });
  }
});

// Create Card
router.post("/cards", authenticateAdmin, async (req, res) => {
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

router.put("/cards/:cardId", authenticateAdmin, async (req, res) => {
  const { cardId } = req.params;
  const { name, ...updates } = req.body;
  if (!cardId)
    return res.status(400).json({
      message: "No CardId Found",
      success: false,
    });

  const { description, interests, twitterId, linkedInId } = updates;
  const toUpdate = {};

  if (typeof name === "string" && name.length > 0) toUpdate.name = name;

  if (typeof description === "string" && description.length > 0)
    toUpdate.description = description;

  if (Array.isArray(interests) && interests.length > 0)
    toUpdate.interests = interests;

  if (typeof twitterId === "string" && twitterId.length > 0)
    toUpdate.twitterId = twitterId;

  if (typeof linkedInId === "string" && linkedInId.length > 0)
    toUpdate.linkedInId = linkedInId;

  if (Object.keys(toUpdate).length === 0)
    return res.status(400).json({
      message: "Nothing Found To update",
      success: false,
    });

  try {
    // await BusinessCard.updateOne({ _id }, { $set: { email: 'newemail@example.com' } });
    await BusinessCard.updateOne(
      { _id: cardId },
      {
        $set: {
          ...toUpdate,
        },
      }
    );

    res.status(200).json({
      message: "Card Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error, error.message);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      message: error.message,
    });
  }
});

router.delete("/cards/:cardId", authenticateAdmin, async (req, res) => {
  const { cardId } = req.params;
  if (!cardId)
    return res.status(400).json({
      message: "Card Id is required to delete it",
      success: false,
    });

  try {
    const deleteRes = await BusinessCard.deleteOne({ _id: cardId });
    if (!deleteRes)
      return res.status(404).json({
        message: "No Cards were deleted for this cardId",
        success: false,
      });

    res.status(200).json({
      message: "Card Deleted Successfully",
      success: true,
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
