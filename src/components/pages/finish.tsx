import { usePage } from "~/lib/store";
import { Button } from "../ui/button";

export function Finish() {
  const changePage = usePage((s) => s.changePage);
  return (
    <div className="pt-10 flex justify-center h-full flex-1">
      <div className="max-w-3xl w-full p-2 rounded-lg flex items-center justify-center flex-col gap-10">
        <h1 className="text-primary text-2xl font-bold text-center mb-2">
          You have been finish the survey 🎉
        </h1>
        <Button
          onClick={() => {
            changePage("home");
          }}
          className="rounded-full text-xl  h-12"
        >
          Back to home
        </Button>
      </div>
    </div>
  );
}
