import type { Request, Response } from "express";
import {
  deleteSurvey,
  getAllSurvey,
  getDetailedSurvey,
} from "../models/surveyModel";
import type {
  Option,
  OptionType,
  Question,
  QuestionType,
  Survey,
} from "../types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSurveyFn = async (req: Request, res: Response) => {
  const data: Survey = req.body.data;
  if (!data)
    return res.status(400).json({
      message: "Required Fields are missing",
      success: false,
    });

  const { title, questions } = data;

  try {
    const surveyRes = await prisma.survey.create({
      data: {
        title,
      },
    });

    if (!surveyRes)
      return res.status(400).json({
        message: "Error creating survey",
        success: false,
      });

    const surveyId = surveyRes.id;
    const qns: QuestionType[] = questions.map((item) => ({
      text: item.text,
      surveyId,
    }));

    const questionsRes = await prisma.questions.createManyAndReturn({
      data: qns,
    });

    let optns: OptionType[] = [];

    for (let i = 0; i < questions.length; i++) {
      const optarr =
        questions[i]?.options.map((item) => ({
          questionId: questionsRes[i]?.id!,
          text: item.text,
        })) ?? [];

      optns.push(...optarr);

      //   await prisma.options.createMany({
      //     data:
      //   })
    }

    const count = await prisma.options.createManyAndReturn({
      data: optns,
    });

    if (count.length == 0)
      return res.status(400).json({
        message: "error creating options",
        success: false,
      });

    // console.log(questionsRes);

    res.status(200).json({
      message: "Survey Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getAllSurveys = async (req: Request, res: Response) => {
  try {
    const surveyRes = await getAllSurvey();

    res.status(200).json({
      surveys: surveyRes,
      count: surveyRes.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getDetailedSurveyFn = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({
      message: "No Survey Found",
      success: false,
    });

  try {
    const surveyRes = await getDetailedSurvey(parseInt(id));
    if (!surveyRes)
      return res.status(400).json({
        message: "No survey found for this id",
        success: false,
      });

    res.status(200).json({
      data: surveyRes,
      message: "Survey fetched successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const deleteSurveyFn = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id)
    return res.status(400).json({
      message: "No surveyId provided",
      success: false,
    });

  try {
    const deleteRes = await deleteSurvey(parseInt(id));
    if (!deleteRes)
      return res.status(400).json({
        message: "No survey found for this id",
        success: false,
      });

    res.status(200).json({
      message: "Survey deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

type UpdateSurvey = {
  questionId: string | number;
  id: string | number;
};

function stringToNumConvertFn(str: string | number): number {
  const num = typeof str === "string" ? parseInt(str) : str;
  if (isNaN(Number(num))) throw new Error(`Invalid number: ${str}`);
  return Number(num);
}

export const updateSurveyFn = async (req: Request, res: Response) => {
  const data: UpdateSurvey[] = req.body.data;

  if (!data || data.length == 0)
    return res.status(400).json({
      message: "Required data is missing",
      success: false,
    });

  try {
    const updatedData = data
      .map((item) => {
        const questionId = stringToNumConvertFn(item.questionId);
        const id = stringToNumConvertFn(item.id);
        if (!questionId || !id) return null;
        return { questionId, id };
      })
      .filter((x): x is { questionId: number; id: number } => x !== null);

    await Promise.all(
      updatedData.map(({ questionId, id }) =>
        prisma.options.update({
          data: { votes: { increment: 1 } },
          where: { questionId, id },
        })
      )
    );

    res.status(200).json({
      message: "Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Update fn...

// [
//   { "questionId": 1, "optionId": 12 },
//   { "questionId": 2, "optionId": 4 },
// ];

// {
//    "title": "Your survey Title",
//    "questions": [
//       {
//          "text": "Question 1",
//          "options": [
//             { "text": "Option 1" },
//             { "text": "Option 2" },
//             { "text": "Option 3" },
//          ]
//       },
//       {
//          "text": "Question 2",
//          "options": [
//             { "text": "Option A" },
//             { "text": "Option B" },
//             { "text": "Option C" },
//          ]
//       },
//    ]
// }
