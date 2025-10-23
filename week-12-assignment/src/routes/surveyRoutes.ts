import express from "express";
import {
  createSurveyFn,
  deleteSurveyFn,
  getAllSurveys,
  getDetailedSurveyFn,
  updateSurveyFn,
} from "../controllers/surveyController";

const router = express.Router();

router.post("/", createSurveyFn);
router.get("/", getAllSurveys);
router.get("/:id", getDetailedSurveyFn);
router.delete("/:id", deleteSurveyFn);
router.put("/", updateSurveyFn);

export default router;
