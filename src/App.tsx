import { Home } from "./components/pages/home";
import { useSurvey } from "./lib/store";
import { Survey } from "./components/pages/survey";

export default function App() {
  const page = useSurvey((s) => s.page);

  return (
    <>
      <div className="bg-gradient-to-b from-[#dcd2f0] to-[#f0aaa6] min-h-lvh flex flex-col">
        {page === "home" && <Home />}
        {page === "survey" && <Survey />}
      </div>
    </>
  );
}
