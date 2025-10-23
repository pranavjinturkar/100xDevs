import { PrismaClient } from "@prisma/client";
import type { Survey } from "../types";

const prisma = new PrismaClient();

export const getAllSurvey = async () => {
  const surveyData = await prisma.survey.findMany();

  return surveyData;
};

export const getDetailedSurvey = async (id: number) => {
  const survey = await prisma.survey.findUnique({
    where: {
      id,
    },
    include: {
      questions: {
        include: {
          options: {},
        },
      },
    },
  });

  return survey;
};

export const createSurvey = async (data: Survey) => {
  const createSurveyRes = await prisma.survey.create({
    data: {
      title: data.title,
      questions: {
        createMany: {
          data: data.questions,
        },
      },
    },
  });

  return createSurveyRes;
};

export const deleteSurvey = async (id: number) => {
  const deleteSurveyRes = await prisma.survey.delete({
    where: {
      id,
    },
  });

  return deleteSurveyRes;
};
