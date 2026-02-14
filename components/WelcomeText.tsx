import SplitText from "@/components/SplitText";
import NeonFlowerBouquet from "@/components/NeonFlowerBouquet";
import React from "react";
import { Play } from "lucide-react";

interface WelcomeTextProps {
  onBackdropAnimationEnd?: () => void;
  text?: string;
  centerComponent?: React.ReactNode;
}

const isProd = process.env.NODE_ENV === "production";

export const WelcomeText = React.memo(
  ({
    onBackdropAnimationEnd,
    text = "Happy Anniversary, My Love ❤️",
    centerComponent,
  }: WelcomeTextProps) => {
    const audioRef = React.useRef<HTMLAudioElement>(null);

    const [showButton, setShowButton] = React.useState(false);
    const [isLiftStarted, setIsLiftStarted] = React.useState(false);
    const [isLiftAnimationCompleted, setIsLiftAnimationCompleted] =
      React.useState(false);

    const onLetterAnimationComplete = React.useCallback(() => {
      setShowButton(true);
    }, []);

    const handleStartClick = () => {
      audioRef.current?.play();
      setShowButton(false);
      setIsLiftStarted(true);
    };

    return (
      <>
        <audio loop ref={audioRef}>
          <source
            src={
              isProd
                ? "/anniversary/sounds/teoman_kupa_kızı_ve_sinek_valesi.mp3"
                : "/sounds/teoman_kupa_kızı_ve_sinek_valesi.mp3"
            }
            type="audio/mpeg"
          />
        </audio>
        <SplitText
          text={text}
          className={`shrink-0 px-4 pt-8 text-center text-4xl font-semibold sm:text-5xl ${isLiftAnimationCompleted ? "" : "opacity-0"}`}
          delay={100}
          duration={0.2}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          textAlign="center"
        />
        <div
          className={`absolute top-0 left-0 z-2 size-full place-items-center ${isLiftAnimationCompleted ? "animate-backdrop-out" : "backdrop-blur-sm"}`}
          onAnimationEnd={(e) => {
            if (
              e.target === e.currentTarget &&
              e.animationName === "backdrop-fade-out"
            ) {
              onBackdropAnimationEnd?.();
            }
          }}
        >
          <div
            className={`absolute ${isLiftStarted ? "animate-lift" : ""} top-1/2 flex -translate-y-1/2 flex-col items-center gap-8`}
            onAnimationEnd={(e) => {
              if (e.target === e.currentTarget && e.animationName === "lift") {
                setIsLiftAnimationCompleted(true);
              }
            }}
          >
            <SplitText
              text={text}
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
            {centerComponent || <NeonFlowerBouquet />}
            <button
              onClick={handleStartClick}
              className={`flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md transition-all duration-700 hover:scale-105 hover:bg-white/20 active:scale-95 ${
                showButton
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-4 opacity-0"
              }`}
              aria-label="Start Experience"
            >
              <Play className="size-8 fill-current" />
            </button>
          </div>
        </div>
      </>
    );
  },
);

WelcomeText.displayName = "WelcomeText";
