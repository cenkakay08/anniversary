import React, { memo } from "react";
import DomeGallery from "./DomeGallery";

const MemoryGallery = () => {
  return (
    <div className="h-[450px] w-full shrink-0 sm:h-[600px]">
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
