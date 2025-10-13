import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "users",
  })
  .then(() => console.log("Connected To MongoDB!"));

const User = mongoose.model("Users", {
  name: String,
  password: String,
  email: String,
});

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || !name || !password)
    return res.status(400).json({
      message: "Required Fields Missing!",
      success: false,
    });

  const existingUser = await User.findOne({
    email: username,
  });

  if (existingUser) return res.status(400).send("Username already Exists");

  const user = new User({
    name: name,
    password: password,
    email: username,
  });

  user.save();
  res.status(201).json({
    msg: "User Created Successfully!",
  });
});

app.listen(3000, () => console.log("Server Listening on Port 3000!"));
