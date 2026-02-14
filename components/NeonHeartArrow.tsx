import React from "react";

const NeonHeartArrow: React.FC = () => {
  return (
    <div className="pointer-events-none z-10 flex items-center justify-center">
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full max-h-full w-full max-w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter
            id="neonGlowPink"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="neonGlowRed" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="neonGlowBlue"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left Heart - Overlapping */}
        <path
          d="M140 115 
             C140 80 115 45 80 45
             C45 45 20 80 20 115
             C20 170 80 215 140 255
             C200 215 260 170 260 115
             C260 80 235 45 200 45
             C165 45 140 80 140 115 Z"
          stroke="#ec4899"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="1"
          fill="#ec4899"
          fillOpacity="0.3"
          filter="url(#neonGlowPink)"
          transform="translate(20, 0) rotate(-10 140 125)"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            animation: "neonDrawLine 2s ease-out forwards",
          }}
        />

        {/* Right Heart - Overlapping */}
        <path
          d="M260 115 
             C260 80 235 45 200 45
             C165 45 140 80 140 115
             C140 170 200 215 260 255
             C320 215 380 170 380 115
             C380 80 355 45 320 45
             C285 45 260 80 260 115 Z"
          stroke="#f43f5e"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="1"
          fill="#f43f5e"
          fillOpacity="0.3"
          filter="url(#neonGlowRed)"
          transform="translate(-20, 0) rotate(-10 260 125)"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            animation: "neonDrawLine 2s ease-out 0.5s forwards",
          }}
        />

        {/* Arrow Group - All elements share the same rotation */}
        <g transform="rotate(-20 200 150)">
          {/* Arrow Shaft */}
          <rect
            x="10"
            y="147"
            width="380"
            height="6"
            rx="3"
            fill="#cbd5e1"
            filter="url(#neonGlowBlue)"
            style={{
              opacity: 0,
              animation: "shaftAppear 0.5s ease-out 1.5s forwards",
            }}
          />

          {/* Arrow Tip - Filled Triangle */}
          <path
            d="M370 150 L395 150 L370 135 M370 150 L395 150 L370 165"
            stroke="#cbd5e1"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#neonGlowBlue)"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 100,
              animation: "neonDrawLine 0.3s ease-out 1.5s forwards",
            }}
          />

          {/* Arrow Feather 1 */}
          <path
            d="M15 135 L35 150 L15 165"
            stroke="#cbd5e1"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#neonGlowBlue)"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 100,
              animation: "neonDrawLine 0.3s ease-out 1.5s forwards",
            }}
          />

          {/* Arrow Feather 2 */}
          <path
            d="M35 135 L55 150 L35 165"
            stroke="#cbd5e1"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#neonGlowBlue)"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 100,
              animation: "neonDrawLine 0.3s ease-out 1.5s forwards",
            }}
          />

          {/* Arrow Feather 3 */}
          <path
            d="M55 135 L75 150 L55 165"
            stroke="#cbd5e1"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#neonGlowBlue)"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 100,
              animation: "neonDrawLine 0.3s ease-out 1.5s forwards",
            }}
          />
        </g>
      </svg>
    </div>
  );
};

export default React.memo(NeonHeartArrow);
