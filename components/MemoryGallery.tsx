import React, { memo } from "react";
import DomeGallery from "./DomeGallery";

const MemoryGallery = () => {
  return (
    <div className="h-[450px] w-full shrink-0 sm:h-[600px]">
      <DomeGallery grayscale={false} />
    </div>
  );
};

export default memo(MemoryGallery);
