import React, { memo, forwardRef, useCallback } from "react";
import { ItemDef } from "./DomeGallery";
import DomeSphereItem from "./DomeSphereItem";

interface DomeSphereProps {
  items: ItemDef[];
  draggingRef: React.MutableRefObject<boolean>;
  movedRef: React.MutableRefObject<boolean>;
  lastDragEndAtRef: React.MutableRefObject<number>;
  openingRef: React.MutableRefObject<boolean>;
  onOpenItem: (item: ItemDef) => void;
  imageBorderRadius: string;
  grayscale: boolean;
}

const DomeSphere = forwardRef<HTMLDivElement, DomeSphereProps>(
  (
    {
      items,
      draggingRef,
      movedRef,
      lastDragEndAtRef,
      openingRef,
      onOpenItem,
      imageBorderRadius,
      grayscale,
    },
    ref,
  ) => {
    const handleInteraction = useCallback(
      (
        e:
          | React.MouseEvent<HTMLDivElement>
          | React.PointerEvent<HTMLDivElement>,
        eventType: "click" | "pointerUp",
        item: ItemDef,
      ) => {
        if (eventType === "pointerUp") {
          if ((e.nativeEvent as PointerEvent).pointerType !== "touch") return;
        }

        if (draggingRef.current) return;
        if (movedRef.current) return;
        if (performance.now() - lastDragEndAtRef.current < 80) return;
        if (openingRef.current) return;
        onOpenItem(item);
      },
      [onOpenItem, draggingRef, movedRef, lastDragEndAtRef, openingRef],
    );

    return (
      <div ref={ref} className="sphere">
        {items.map((it, i) => (
          <DomeSphereItem
            key={`${it.x},${it.y},${i}`}
            it={it}
            imageBorderRadius={imageBorderRadius}
            grayscale={grayscale}
            onInteraction={handleInteraction}
          />
        ))}
      </div>
    );
  },
);

DomeSphere.displayName = "DomeSphere";

export default memo(DomeSphere);
