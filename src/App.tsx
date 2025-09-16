import { Home } from "./components/pages/home";
import { usePage } from "./lib/store";
import { Survey } from "./components/pages/survey";
import { Finish } from "./components/pages/finish";

export default function App() {
  const page = usePage((s) => s.page);

  return (
    <>
      <div className="bg-gradient-to-b from-[#dcd2f0] to-[#f0aaa6] min-h-lvh flex flex-col">
        {page === "home" && <Home />}
        {page === "survey" && <Survey />}
        {page === "finish" && <Finish />}
      </div>
    </>
  );
}
