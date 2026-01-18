import { Geist, Geist_Mono } from "next/font/google";
import FireworksBackground from "@/components/FireworksBackground";
import { WelcomeText } from "@/components/WelcomeText";
import Duration from "@/components/Duration";
import InteractiveHeart from "@/components/InteractiveHeart";
import AnniversaryMenu from "@/components/AnniversaryMenu";
import MemoryGallery from "@/components/MemoryGallery";
import CouplePortrait from "@/components/CouplePortrait";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  const onBackdropAnimationEnd = useCallback(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <main
        className={`relative z-1 flex size-full flex-col items-center gap-6 sm:gap-12 ${geistSans.className} ${geistMono.className} ${isVisible ? "overflow-auto" : "overflow-hidden"}`}
      >
        <WelcomeText onBackdropAnimationEnd={onBackdropAnimationEnd} />
        <Duration
          className={cn(
            "transition-all delay-0 duration-1000 ease-out",
            isVisible
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-8 opacity-0",
          )}
        />
        <InteractiveHeart
          className={cn(
            "transition-all delay-200 duration-1000 ease-out",
            isVisible
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-8 opacity-0",
          )}
        />
        <MemoryGallery
          className={cn(
            "transition-all delay-400 duration-1000 ease-out",
            isVisible
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-8 opacity-0",
          )}
        />
        <CouplePortrait
          className={cn(
            "transition-all delay-600 duration-1000 ease-out",
            isVisible
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-8 opacity-0",
          )}
        />
      </main>
      <FireworksBackground />
    </>
  );
}
