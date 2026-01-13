import { Geist, Geist_Mono } from "next/font/google";
import FireworksBackground from "@/components/FireworksBackground";
import { WelcomeText } from "@/components/WelcomeText";
import Duration from "@/components/Duration";
import InteractiveHeart from "@/components/InteractiveHeart";
import AnniversaryMenu from "@/components/AnniversaryMenu";
import MemoryGallery from "@/components/MemoryGallery";
import { useState, useCallback, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Bileşen render sırası ve gecikmeleri (ms)
const RENDER_DELAYS = {
  duration: 0,
  memoryGallery: 200,
  interactiveHeart: 400,
} as const;

export default function Home() {
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Sıralı render için state'ler
  const [showDuration, setShowDuration] = useState(false);
  const [showMemoryGallery, setShowMemoryGallery] = useState(false);
  const [showInteractiveHeart, setShowInteractiveHeart] = useState(false);

  const onBackdropAnimationEnd = useCallback(() => {
    setIsContentVisible(true);
  }, []);

  // Bileşenleri sıralı olarak render et
  useEffect(() => {
    if (!isContentVisible) return;

    const timers: NodeJS.Timeout[] = [];

    timers.push(
      setTimeout(() => setShowDuration(true), RENDER_DELAYS.duration),
    );
    timers.push(
      setTimeout(() => setShowMemoryGallery(true), RENDER_DELAYS.memoryGallery),
    );
    timers.push(
      setTimeout(
        () => setShowInteractiveHeart(true),
        RENDER_DELAYS.interactiveHeart,
      ),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isContentVisible]);

  return (
    <>
      <main
        className={`relative z-1 flex size-full flex-col items-center gap-6 overflow-auto sm:gap-12 ${geistSans.className} ${geistMono.className}`}
      >
        <WelcomeText onBackdropAnimationEnd={onBackdropAnimationEnd} />
        {isContentVisible && (
          <>
            {showDuration && <Duration />}
            {showInteractiveHeart && <InteractiveHeart />}
            {showMemoryGallery && <MemoryGallery />}
            {/* <AnniversaryMenu /> */}
          </>
        )}
      </main>
      <FireworksBackground />
    </>
  );
}
