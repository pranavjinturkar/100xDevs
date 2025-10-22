export type Option = {
  text: string;
};

export type Question = {
  text: string;
  options: Option[];
};

export type Survey = {
  title: string;
  questions: Question[];
};

export type QuestionType = {
  text: string;
  surveyId: number;
};
export type OptionType = {
  text: string;
  questionId: number;
};
