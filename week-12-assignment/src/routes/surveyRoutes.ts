import express from "express";
import {
  createSurveyFn,
  getAllSurveys,
  getDetailedSurveyFn,
} from "../controllers/surveyController";

const router = express.Router();

router.post("/", createSurveyFn);
router.get("/", getAllSurveys);
router.get("/:id", getDetailedSurveyFn);

export default router;
