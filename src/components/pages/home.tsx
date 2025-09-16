import { motion } from "motion/react";
import { Button } from "../ui/button";
import { useSurvey } from "~/lib/store";

export function Home() {
  const changePage = useSurvey((s) => s.changePage);
  return (
    <motion.div
      key={"home"}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      className="pt-10 flex items-center justify-center h-full flex-1"
    >
      <div className="max-w-3xl w-full p-2 rounded-lg flex items-center justify-center flex-col gap-10">
        <h1 className="text-purple-700 text-5xl font-bold text-center mb-5">
          Start Your Survey!
        </h1>
        <Button
          onClick={() => {
            changePage("survey");
          }}
          className="rounded-full text-3xl w-1/2 h-16"
        >
          Start
        </Button>
      </div>
    </motion.div>
  );
}
