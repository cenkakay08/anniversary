import { Geist, Geist_Mono } from "next/font/google";
import FireworksBackground from "@/components/FireworksBackground";
import { WelcomeText } from "@/components/WelcomeText";
import Duration from "@/components/Duration";
import InteractiveHeart from "@/components/InteractiveHeart";
import AnniversaryMenu from "@/components/AnniversaryMenu";
import MemoryGallery from "@/components/MemoryGallery";
import { useState, useCallback } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const onBackdropAnimationEnd = useCallback(() => {
    setIsContentVisible(true);
  }, []);

  return (
    <>
      <main
        className={`relative z-1 flex size-full flex-col items-center gap-12 overflow-auto ${geistSans.className} ${geistMono.className}`}
      >
        <WelcomeText onBackdropAnimationEnd={onBackdropAnimationEnd} />
        {isContentVisible && (
          <>
            <Duration />
            <MemoryGallery />
            <InteractiveHeart />
            {/* <AnniversaryMenu /> */}
          </>
        )}
      </main>
      <FireworksBackground />
    </>
  );
}
