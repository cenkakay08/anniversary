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

    // SVG dosyalarını otomatik olarak unoptimized olarak işaretle
    // Çünkü SVG'ler vektördür ve loader ile işlenmelerine gerek yoktur
    const isSvg = React.useMemo(() => {
      const srcString =
        typeof restProps.src === "string"
          ? restProps.src
          : (restProps.src as any).src || "";
      return srcString.toLowerCase().split("?")[0].endsWith(".svg");
    }, [restProps.src]);

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
        unoptimized={isSvg || restProps.unoptimized}
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
