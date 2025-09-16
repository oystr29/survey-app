import { motion } from "motion/react";
import { Button } from "../ui/button";
import surveydata from "~/surveys.json";
import { cn } from "~/lib/utils";
import { useSurvey } from "~/lib/store";

const { data } = surveydata;

export function Survey() {
  const currentQuestion = useSurvey((s) => s.currentQuestion);

  return (
    <motion.div
      key={"survey"}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      className="pt-5 pb-5 flex justify-center items-center h-full flex-1 mx-4 md:mx-0 flex-col gap-5"
    >
      <div className="max-w-3xl flex flex-col flex-1 gap-4 w-full">
        <div className="flex gap-2">
          {data.map(() => (
            <div className={cn("h-1 flex-1 bg-purple-100")}></div>
          ))}
        </div>
        <div className="max-w-3xl bg-white w-full p-4 pt-10 rounded-lg flex-1">
          <h1 className="text-4xl font-medium text-gray-400">
            Q{currentQuestion + 1}
          </h1>
        </div>
        <Button className="rounded-full shadow-lg h-12 text-xl font-semibold">
          Next
        </Button>
      </div>
    </motion.div>
  );
}
