import React, { memo } from "react";
import DomeGallery from "./DomeGallery";
import { cn } from "@/lib/utils";

interface MemoryGalleryProps {
  className?: string;
}

const MemoryGallery = ({ className }: MemoryGalleryProps) => {
  return (
    <div className={cn("h-[450px] w-full shrink-0 sm:h-[600px]", className)}>
      <DomeGallery
        grayscale={false}
        maxVerticalRotationDeg={0}
        openedImageWidth="min(calc(100vw - 32px), 600px)"
        openedImageHeight="auto"
        openedImageMaxHeight="calc(100vh - 64px)"
      />
    </div>
  );
};

export default memo(MemoryGallery);
