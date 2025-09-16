import { Button } from "../ui/button";
import { usePage, useSurvey } from "~/lib/store";

export function Home() {
  const changePage = usePage((s) => s.changePage);
  const answers = useSurvey((s) => s.answers);
  const seconds = useSurvey((s) => s.seconds);
  const resetSurvey = useSurvey((s) => s.reset);

  const isDone = answers.length === 10 || seconds === 0;

  return (
    <div className="pt-10 flex items-center justify-center h-full flex-1">
      <div className="max-w-3xl w-full p-2 rounded-lg flex items-center justify-center flex-col gap-10">
        <h1 className="text-primary text-5xl font-bold text-center mb-5">
          Start Your Survey!
        </h1>
        <div className="flex flex-col items-center gap-2 w-full">
          <Button
            onClick={() => {
              if (isDone) {
                resetSurvey();
              }
              changePage("survey");
            }}
            className="rounded-full text-3xl w-1/2 h-16"
          >
            Start
          </Button>
          {isDone && (
            <p className="text-xs text-muted-foreground text-center">
              You already answer the survey. Press{" "}
              <span className="text-primary">Start Button</span> means reset all
              the answers before
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
