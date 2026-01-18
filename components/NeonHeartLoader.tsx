import { cn } from "@/lib/utils";
import React, { useId } from "react";

const NeonHeartLoader = ({ className }: { className?: string }) => {
  const id = useId();
  const filterId = `neon-heart-filter-${id}`;

  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className={cn("overflow-visible", className)}
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur3" />
          <feMerge>
            <feMergeNode in="blur3" />
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        className="heart-path"
        d="M50 88 C20 60, 10 40, 25 25 C35 15, 50 20, 50 35 C50 20, 65 15, 75 25 C90 40, 80 60, 50 88 Z"
        fill="none"
        stroke="#ff0066"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={
          {
            strokeDasharray: 320,
            strokeDashoffset: 320,
            animation:
              "neonDrawLine 1s ease-in-out forwards infinite, neonHeartBeat 0.6s ease-in-out infinite",
            "--path-length": 320,
            filter: `url(#${filterId})`,
            transformOrigin: "center",
          } as React.CSSProperties
        }
      />
    </svg>
  );
};

export default NeonHeartLoader;
