import React, { memo } from "react";
import Image from "next/image";
import {
  Spring,
  SpringElement,
  SpringProvider,
} from "@/components/animate-ui/primitives/animate/spring";

const InteractiveHeart = memo(() => {
  return (
    <div className="relative flex size-60 shrink-0 flex-col items-center justify-center">
      <SpringProvider>
        <Image
          src="/lovers.svg"
          alt="Lovers"
          fill
          className="absolute object-contain"
          draggable={false}
          priority
        />
        <Spring className="text-gray-400" />
        <SpringElement className="z-1 cursor-grab active:cursor-grabbing">
          <Image
            src="/heart.svg"
            alt="Heart"
            width={48}
            height={40}
            draggable={false}
            priority
          />
        </SpringElement>
      </SpringProvider>
    </div>
  );
});

InteractiveHeart.displayName = "InteractiveHeart";

export default InteractiveHeart;
