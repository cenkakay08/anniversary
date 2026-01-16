import { memo } from "react";
import TimeDisplay from "./TimeDisplay";
const Duration = memo(() => {
  return (
    <div className="flex shrink-0 flex-col items-center gap-4 px-4 md:gap-8">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl font-medium tracking-[0.2em] text-white/60 uppercase md:text-3xl">
          Together For...
        </h2>
        <div className="h-px w-24 bg-linear-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="group flex flex-wrap items-center justify-center gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-1 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-700 hover:border-white/20 hover:bg-white/10 sm:p-6 md:gap-8 md:p-10">
        <TimeDisplay />
      </div>
    </div>
  );
});

Duration.displayName = "Duration";

export default Duration;
