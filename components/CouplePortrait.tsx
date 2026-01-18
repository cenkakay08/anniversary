import React, { memo } from "react";
import CustomImageWrapper from "./CustomImageWrapper";
import womanHeadImg from "@/public/thumbnails/woman_head.png";
import manHeadImg from "@/public/thumbnails/man_head.png";

// Süper efektli animasyonlu kalp bileşeni - Tailwind ile
const EffectfulHeart = memo(() => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Ana kalp konteyneri */}
      <div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24 md:h-28 md:w-28">
        {/* Pulse halkaları */}
        <div
          className="absolute inset-0 animate-ping rounded-full border-2 border-pink-500/50"
          style={{ animationDuration: "2s" }}
        />
        <div
          className="absolute inset-0 animate-ping rounded-full border-2 border-pink-500/30"
          style={{ animationDuration: "2s", animationDelay: "0.5s" }}
        />

        {/* Işıltı parçacıkları */}
        <span
          className="absolute -top-2 left-1/2 animate-pulse text-yellow-400"
          style={{ textShadow: "0 0 8px #fbbf24" }}
        >
          ✦
        </span>
        <span
          className="absolute top-1/2 -right-2 animate-pulse text-yellow-300"
          style={{ textShadow: "0 0 8px #fbbf24", animationDelay: "0.3s" }}
        >
          ✧
        </span>
        <span
          className="absolute -bottom-2 left-1/2 animate-pulse text-yellow-400"
          style={{ textShadow: "0 0 8px #fbbf24", animationDelay: "0.6s" }}
        >
          ✦
        </span>
        <span
          className="absolute top-1/2 -left-2 animate-pulse text-yellow-300"
          style={{ textShadow: "0 0 8px #fbbf24", animationDelay: "0.9s" }}
        >
          ✧
        </span>

        {/* Ana kalp SVG */}
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full drop-shadow-[0_0_15px_rgba(255,45,85,0.8)]"
          style={{
            animation: "coupleHeartBeat 1.2s ease-in-out infinite",
          }}
        >
          <defs>
            <linearGradient
              id="heartGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ff2d55" />
              <stop offset="50%" stopColor="#ff6b6b" />
              <stop offset="100%" stopColor="#ff2d55" />
            </linearGradient>
            <filter id="heartGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ana kalp */}
          <path
            d="M50 88 C20 60 5 45 5 30 C5 15 18 5 30 5 C40 5 48 12 50 20 C52 12 60 5 70 5 C82 5 95 15 95 30 C95 45 80 60 50 88"
            fill="url(#heartGradient)"
            filter="url(#heartGlow)"
          />

          {/* Parlak highlight */}
          <ellipse cx="30" cy="25" rx="8" ry="5" fill="rgba(255,255,255,0.4)" />
        </svg>

        {/* Dönen yıldızlar */}
        <div
          className="absolute"
          style={{
            animation: "orbitSpin 4s linear infinite",
          }}
        >
          <span className="text-base">💫</span>
        </div>
        <div
          className="absolute"
          style={{
            animation: "orbitSpin 4s linear infinite 1.33s",
          }}
        >
          <span className="text-base">⭐</span>
        </div>
        <div
          className="absolute"
          style={{
            animation: "orbitSpin 4s linear infinite 2.66s",
          }}
        >
          <span className="text-base">✨</span>
        </div>
      </div>
    </div>
  );
});

EffectfulHeart.displayName = "EffectfulHeart";

// Ana bileşen
const CouplePortrait = memo(() => {
  return (
    <div className="flex w-full shrink-0 flex-col items-center gap-4 px-4 pb-8">
      <div className="flex items-center justify-center gap-4 sm:gap-8">
        {/* Kadın kafası - Sol */}
        <div className="relative">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-pink-300 via-pink-400 to-pink-300 p-1 shadow-lg shadow-pink-500/30 sm:h-32 sm:w-32 md:h-40 md:w-40">
            <CustomImageWrapper
              className="h-full w-full rounded-full"
              customImageProps={{
                src: womanHeadImg,
                alt: "Woman Portrait",
                width: 160,
                height: 160,
                className: "rounded-full object-cover",
                priority: true,
              }}
            />
          </div>
          {/* Mini kalpler */}
          <span className="absolute top-1/2 -right-1 animate-bounce text-sm">
            �
          </span>
        </div>

        {/* Efektli kalp - Orta */}
        <EffectfulHeart />

        {/* Erkek kafası - Sağ */}
        <div className="relative">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-indigo-400 via-purple-500 to-indigo-400 p-1 shadow-lg shadow-purple-500/30 sm:h-32 sm:w-32 md:h-40 md:w-40">
            <CustomImageWrapper
              className="h-full w-full rounded-full"
              customImageProps={{
                src: manHeadImg,
                alt: "Man Portrait",
                width: 160,
                height: 160,
                className: "rounded-full object-cover",
                priority: true,
              }}
            />
          </div>
          {/* Mini kalpler */}
          <span className="absolute top-1/2 -left-1 animate-bounce text-sm delay-150">
            �
          </span>
        </div>
      </div>
    </div>
  );
});

CouplePortrait.displayName = "CouplePortrait";

export default CouplePortrait;
