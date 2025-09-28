import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

mongoose.connect(process.env.MONGODB_URL, {
  dbName: "BusinessCards",
});

const adminSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  publishedCards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessCard",
    },
  ],
});

const businessCardSchema = new mongoose.Schema({
  name: String,
  description: String,
  interests: [String],
  twitterId: String,
  linkedInId: String,
});

export const Admin = mongoose.model("Admin", adminSchema);
export const User = mongoose.model("User", userSchema);
export const BusinessCard = mongoose.model("BusinessCard", businessCardSchema);
