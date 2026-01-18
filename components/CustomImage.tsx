import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import React from "react";

const CustomImage = React.memo(
  (
    props: ImageProps & {
      isLoaded?: boolean;
      setIsLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
    },
  ) => {
    const { isLoaded, setIsLoaded, ...restProps } = props;

    const onLoadEnchaned = React.useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setIsLoaded?.(true);
        restProps.onLoad?.(e);
      },
      [restProps.onLoad],
    );

    return (
      <Image
        {...restProps}
        className={cn(
          restProps.className,
          !isLoaded &&
            restProps.blurDataURL &&
            cn(
              "h-auto w-full",
              restProps.height &&
                restProps.width &&
                restProps.height >= restProps.width &&
                "md:h-full md:w-auto",
            ),
        )}
        onLoad={onLoadEnchaned}
      />
    );
  },
);

CustomImage.displayName = "CustomImage";

export default CustomImage;
