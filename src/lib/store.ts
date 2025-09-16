import { create } from "zustand";
import { persist } from "zustand/middleware";

type SurveyState = {
  seconds: number;
  answers: string[];
  currentQuestion: number;
  nextQuestions: () => void;
  changeAnswers: (answer: string) => void;
  downSecond: () => void;
  reset: () => void;
};

const useSurvey = create<SurveyState>()(
  persist(
    (set) => ({
      seconds: 30,
      currentQuestion: 0,
      answers: [],
      downSecond: () =>
        set((state) => {
          return { seconds: state.seconds <= 0 ? 0 : state.seconds - 1 };
        }),
      nextQuestions: () =>
        set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
      changeAnswers: (answer) =>
        set((state) => {
          state.answers[state.currentQuestion] = answer;

          return { answers: [...state.answers] };
        }),
      reset: () =>
        set(() => ({ seconds: 30, currentQuestion: 0, answers: [] })),
    }),
    { name: "survey-storage" },
  ),
);

type Page = "home" | "survey" | "finish";

type PageState = {
  page: Page;
  changePage: (page: Page) => void;
};

const usePage = create<PageState>()((set) => ({
  page: "home",
  changePage: (page) => set(() => ({ page })),
}));

export { useSurvey, usePage };
