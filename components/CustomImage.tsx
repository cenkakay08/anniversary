import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import React, { memo } from "react";

const CustomImage = React.memo((props: ImageProps) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const onLoadEnchaned = React.useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoaded(true);
      props.onLoad?.(e);
    },
    [props.onLoad],
  );

  return (
    <Image
      {...props}
      style={props.style} // Pass props.style directly
      className={cn(
        props.className,
        !isLoaded &&
          props.blurDataURL &&
          (props.height && props.width && props.height > props.width
            ? "h-full min-h-[50px] w-auto"
            : "h-auto w-full min-w-[50px]"),
      )}
      onLoad={onLoadEnchaned}
    />
  );
});

CustomImage.displayName = "CustomImage";

export default CustomImage;
