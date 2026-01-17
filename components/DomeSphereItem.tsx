import React, { memo, useMemo, useCallback } from "react";
import CustomImage from "./CustomImage";
import { ItemDef } from "./DomeGallery";

interface DomeSphereItemProps {
  it: ItemDef;
  imageBorderRadius: string;
  grayscale: boolean;
  onInteraction: (
    e: React.MouseEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>,
    eventType: "click" | "pointerUp",
    item: ItemDef,
  ) => void;
}

const DomeSphereItem = ({
  it,
  imageBorderRadius,
  grayscale,
  onInteraction,
}: DomeSphereItemProps) => {
  const sphereItemStyle = useMemo(
    () =>
      ({
        ["--offset-x" as any]: it.x,
        ["--offset-y" as any]: it.y,
        ["--item-size-x" as any]: it.sizeX,
        ["--item-size-y" as any]: it.sizeY,
        top: "-999px",
        bottom: "-999px",
        left: "-999px",
        right: "-999px",
      }) as React.CSSProperties,
    [it.x, it.y, it.sizeX, it.sizeY],
  );

  const imageContainerStyle = useMemo(
    () => ({
      inset: "10px",
      borderRadius: `var(--tile-radius, ${imageBorderRadius})`,
      backfaceVisibility: "hidden" as const,
    }),
    [imageBorderRadius],
  );

  const imageStyle = useMemo(
    () => ({
      filter: `var(--image-filter, ${grayscale ? "grayscale(1)" : "none"})`,
    }),
    [grayscale],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onInteraction(e, "click", it);
    },
    [onInteraction],
  );

  return (
    <div
      className="sphere-item absolute m-auto"
      data-alt={it.alt}
      data-offset-x={it.x}
      data-offset-y={it.y}
      data-size-x={it.sizeX}
      data-size-y={it.sizeY}
      style={sphereItemStyle}
    >
      <div
        className="item__image absolute block cursor-pointer overflow-hidden transition-transform duration-300"
        data-src={it.staticImageData.src}
        role="button"
        tabIndex={0}
        aria-label={it.alt || "Open image"}
        onClick={handleClick}
        style={imageContainerStyle}
      >
        <CustomImage
          src={it.thumbStaticImageData}
          alt={it.alt || ""}
          fill
          className="pointer-events-none object-cover"
          draggable={false}
          style={imageStyle}
          blurDataURL={it.thumbStaticImageData.blurDataURL}
          placeholder="blur"
        />
      </div>
    </div>
  );
};

export default memo(DomeSphereItem);
