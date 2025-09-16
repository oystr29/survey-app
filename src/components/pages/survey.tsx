import { AnimatePresence, motion } from "motion/react";
import { Button } from "../ui/button";
import surveydata from "~/surveys.json";
import { cn } from "~/lib/utils";
import { usePage, useSurvey } from "~/lib/store";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useEffect } from "react";

const { data } = surveydata;

const Countdown = () => {
  const seconds = useSurvey((s) => s.seconds);
  const countDown = useSurvey((s) => s.downSecond);
  const changePage = usePage((s) => s.changePage);

  useEffect(() => {
    if (seconds === 0) return;
    const timer = setInterval(() => {
      countDown();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      changePage("finish");
    }
  }, [seconds]);

  return <div className="text-primary text-xl">{seconds}</div>;
};

const Bar = () => {
  const currentQuestion = useSurvey((s) => s.currentQuestion);
  return (
    <>
      <div className="flex gap-2">
        {data.map((_, i) => (
          <div
            className={cn(
              "h-1 flex-1 bg-purple-100",
              i === currentQuestion && "bg-purple-500",
              i < currentQuestion && "bg-primary",
            )}
          ></div>
        ))}
      </div>
    </>
  );
};

const SurveyCard = () => {
  const currentQuestion = useSurvey((s) => s.currentQuestion);
  const listAnswer = useSurvey((s) => s.answers);
  const changeAnswers = useSurvey((s) => s.changeAnswers);

  const { question, answers } = data[currentQuestion];
  return (
    <>
      <div className="max-w-3xl bg-white w-full p-4 pt-10 rounded-lg flex-1">
        <div className="flex items-center justify-between  mb-4">
          <h1 className="text-4xl font-medium text-gray-400">
            Q{currentQuestion + 1}
          </h1>
          <Countdown />
        </div>
        <AnimatePresence mode="popLayout">
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            key={currentQuestion}
            exit={{ x: -300, opacity: 0 }}
          >
            <p className="text-2xl text-primary font-medium mb-2">{question}</p>
            <RadioGroup
              defaultValue={listAnswer[currentQuestion]}
              onValueChange={(v) => {
                changeAnswers(v);
              }}
            >
              {answers.map((answer) => (
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    className="w-6 h-6"
                    value={answer}
                    id={answer}
                  />
                  <Label className="text-primary text-lg" htmlFor={answer}>
                    {answer}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

const NextButton = () => {
  const currentQuestion = useSurvey((s) => s.currentQuestion);
  const nextQuestions = useSurvey((s) => s.nextQuestions);
  const listAnswer = useSurvey((s) => s.answers);
  const changePage = usePage((s) => s.changePage);

  const isLast = currentQuestion === 9;

  return (
    <>
      <Button
        disabled={!listAnswer[currentQuestion]}
        className="rounded-full shadow-lg h-12 text-xl font-semibold"
        onClick={() => {
          if (isLast) {
            changePage("finish");
            return;
          }
          nextQuestions();
        }}
      >
        {isLast ? "Submit" : "Next "}
      </Button>
    </>
  );
};

export function Survey() {
  return (
    <div className="pt-5 pb-5 flex justify-center items-center h-full flex-1 mx-4 md:mx-0 flex-col gap-5">
      <div className="max-w-3xl flex flex-col flex-1 gap-4 w-full">
        <Bar />
        <SurveyCard />
        <NextButton />
      </div>
    </div>
  );
}
