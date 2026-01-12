import React, { memo } from "react";
import {
  Spring,
  SpringElement,
  SpringProvider,
} from "@/components/animate-ui/primitives/animate/spring";

const InteractiveHeart = memo(() => {
  return (
    <div className="relative flex size-60 shrink-0 flex-col items-center justify-center">
      <SpringProvider>
        <img
          src="/lovers.svg"
          alt="Lovers"
          className="absolute size-full"
          draggable={false}
        />
        <Spring className="text-gray-400" />
        <SpringElement className="z-1 cursor-grab active:cursor-grabbing">
          <img
            src="/heart.svg"
            alt="Heart"
            className="size-12"
            draggable={false}
          />
        </SpringElement>
      </SpringProvider>
    </div>
  );
});

InteractiveHeart.displayName = "InteractiveHeart";

export default InteractiveHeart;
