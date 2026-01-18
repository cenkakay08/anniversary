import { cn } from "@/lib/utils";
import React from "react";
import type { ImageProps } from "next/image";
import NeonHeartLoader from "./NeonHeartLoader";
import CustomImage from "./CustomImage";

interface CustomImageWrapperProps {
  style?: React.CSSProperties;
  className?: string;
  customImageProps: ImageProps; // Optional customImage prop type as requested
}

const CustomImageWrapper = ({
  style,
  className,
  customImageProps,
}: CustomImageWrapperProps) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div
      className={cn(
        "relative flex size-full items-center justify-center",
        className,
      )}
      style={style}
    >
      <CustomImage
        {...customImageProps}
        key={customImageProps.key}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
      />
      {!isLoaded && (
        <NeonHeartLoader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
    </div>
  );
};

export default CustomImageWrapper;
