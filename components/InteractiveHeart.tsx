import React, { memo } from "react";
import CustomImage from "./CustomImage";
import loversImg from "@/public/svgs/lovers.svg";
import HeartInteraction from "./HeartInteraction";
import { cn } from "@/lib/utils";
import { useContent } from "@/context/ContentContext";

// İç bileşen artık useSpring hook'unu doğrudan kullanmıyor
// Böylece context updates (isDragging vb.) bu bileşeni re-render etmiyor
const InteractiveHeartContent = memo(() => {
  const { content } = useContent();
  // Use string path from content if available, otherwise fallback to imported static image
  const imageSrc = content?.interactiveHeartImage || loversImg;

  return (
    <>
      <CustomImage
        src={imageSrc}
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

interface InteractiveHeartProps {
  className?: string;
}

const InteractiveHeart = memo(({ className }: InteractiveHeartProps) => {
  const { content } = useContent();
  const dragText = content?.interactiveHeartText || "Drag the heart! 💕";

  return (
    <div
      className={cn(
        "flex w-full shrink-0 flex-col items-center gap-2 overflow-x-clip",
        className,
      )}
    >
      <div className="relative flex aspect-15/8 w-[180px] flex-col items-center justify-center sm:w-60">
        <InteractiveHeartContent />
      </div>
      <p className="text-xs text-white/40 sm:text-sm">{dragText}</p>
    </div>
  );
});

InteractiveHeart.displayName = "InteractiveHeart";

export default InteractiveHeart;
