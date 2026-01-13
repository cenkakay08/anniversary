import SplitText from "@/components/SplitText";
import React from "react";

interface WelcomeTextProps {
  onBackdropAnimationEnd?: () => void;
}

export const WelcomeText = React.memo(
  ({ onBackdropAnimationEnd }: WelcomeTextProps) => {
    const [isLiftAnimationCompleted, setIsLiftAnimationCompleted] =
      React.useState(false);
    const [isLetterAnimationCompleted, setIsLetterAnimationCompleted] =
      React.useState(false);

    const onLetterAnimationComplete = React.useCallback(() => {
      setIsLetterAnimationCompleted(true);
    }, []);

    return (
      <>
        <SplitText
          text="Happy Anniversary, My Love ❤️"
          className={`shrink-0 px-4 pt-8 text-center text-4xl font-semibold sm:text-5xl ${isLiftAnimationCompleted ? "" : "opacity-0"}`}
          delay={100}
          duration={0.2}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          textAlign="center"
          onLetterAnimationComplete={onLetterAnimationComplete}
        />
        <div
          className={`absolute top-0 left-0 z-1 size-full place-items-center ${isLiftAnimationCompleted ? "animate-backdrop-out hidden" : "backdrop-blur-sm"}`}
          onAnimationEnd={onBackdropAnimationEnd}
        >
          <div
            className={`absolute ${isLetterAnimationCompleted ? "animate-lift" : "top-1/2 -translate-y-1/2"}`}
            onAnimationEnd={() => setIsLiftAnimationCompleted(true)}
          >
            <SplitText
              text="Happy Anniversary, My Love ❤️"
              className={`px-4 pt-8 text-center text-4xl font-semibold sm:text-5xl`}
              delay={100}
              duration={0.2}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="center"
              onLetterAnimationComplete={onLetterAnimationComplete}
            />
          </div>
        </div>
      </>
    );
  },
);

WelcomeText.displayName = "WelcomeText";
