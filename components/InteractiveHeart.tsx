import React, { memo } from "react";
import Image from "next/image";
import {
  Spring,
  SpringElement,
  SpringProvider,
  useSpring,
} from "@/components/animate-ui/primitives/animate/spring";
import loversImg from "@/public/lovers.svg";
import heartImg from "@/public/heart.svg";
import FollowingEyes from "@/components/FollowingEyes";

// İç bileşen - SpringProvider içinde useSpring kullanabilmek için
const InteractiveHeartContent = memo(() => {
  const { springX, springY } = useSpring();

  return (
    <>
      <Image
        src={loversImg}
        alt="Lovers"
        fill
        className="absolute object-contain"
        draggable={false}
        priority
      />
      <FollowingEyes springX={springX} springY={springY} />
      <Spring className="text-gray-400" />
      <SpringElement className="z-1 cursor-grab active:cursor-grabbing">
        <Image
          src={heartImg}
          alt="Heart"
          width={48}
          height={40}
          draggable={false}
          priority
        />
      </SpringElement>
    </>
  );
});

InteractiveHeartContent.displayName = "InteractiveHeartContent";

const InteractiveHeart = memo(() => {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2">
      <div className="relative flex h-[180px] w-[180px] flex-col items-center justify-center sm:size-60">
        <SpringProvider>
          <InteractiveHeartContent />
        </SpringProvider>
      </div>
      <p className="text-xs text-white/40 sm:text-sm">Drag the heart! 💕</p>
    </div>
  );
});

InteractiveHeart.displayName = "InteractiveHeart";

export default InteractiveHeart;
