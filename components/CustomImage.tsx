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
      className={cn(
        props.className,
        !isLoaded &&
          props.blurDataURL &&
          cn(
            "h-auto w-full",
            props.height &&
              props.width &&
              props.height >= props.width &&
              "md:h-full md:w-auto",
          ),
      )}
      onLoad={onLoadEnchaned}
    />
  );
});

CustomImage.displayName = "CustomImage";

export default CustomImage;
