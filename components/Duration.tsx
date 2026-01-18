import { memo } from "react";
import TimeDisplay from "./TimeDisplay";
import NeonText from "./NeonText";
import { cn } from "@/lib/utils";

interface DurationProps {
  className?: string;
}

const Duration = memo(({ className }: DurationProps) => {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col items-center gap-4 px-4 md:gap-8",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <NeonText
          text="Together For..."
          strokeColor="color-mix(in oklab, var(--color-white) 60%, transparent)"
          fontSize="clamp(24px, 4vw, 36px)"
          animationDuration={3}
          strokeWidth={1.5}
        />
        <div className="h-px w-24 bg-linear-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="neon-border-wrapper relative rounded-[2rem] p-[2px]">
        <div className="group flex flex-wrap items-center justify-center gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-1 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-700 hover:border-white/20 hover:bg-white/10 sm:p-6 md:gap-8 md:p-10">
          <TimeDisplay />
        </div>
      </div>
    </div>
  );
});

Duration.displayName = "Duration";

export default Duration;
