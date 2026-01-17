import React, { memo } from "react";
import CustomImage from "./CustomImage";
import loversImg from "@/public/svgs/lovers.svg";
import HeartInteraction from "./HeartInteraction";

// İç bileşen artık useSpring hook'unu doğrudan kullanmıyor
// Böylece context updates (isDragging vb.) bu bileşeni re-render etmiyor
const InteractiveHeartContent = memo(() => {
  return (
    <>
      <CustomImage
        src={loversImg}
        alt="Lovers"
        fill
        className="absolute object-contain"
        draggable={false}
      />
      <HeartInteraction />
    </>
  );
});

InteractiveHeartContent.displayName = "InteractiveHeartContent";

const InteractiveHeart = memo(() => {
  return (
    <div className="flex w-full shrink-0 flex-col items-center gap-2 overflow-x-clip">
      <div className="relative flex aspect-15/8 w-[180px] flex-col items-center justify-center sm:w-60">
        <InteractiveHeartContent />
      </div>
      <p className="text-xs text-white/40 sm:text-sm">Drag the heart! 💕</p>
    </div>
  );
});

InteractiveHeart.displayName = "InteractiveHeart";

export default InteractiveHeart;
