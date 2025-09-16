import { create } from "zustand";

type Page = "home" | "survey" | "finish";
type SurveyState = {
  page: Page;
  currentQuestion: number;
  changePage: (page: Page) => void;
};

const useSurvey = create<SurveyState>()((set) => ({
  page: "home",
  changePage: (page) => set(() => ({ page })),
  currentQuestion: 0,
}));

export { useSurvey };
