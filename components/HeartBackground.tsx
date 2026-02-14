import React, { useEffect, useState } from "react";

// Define the type for a heart object
interface Heart {
  id: number;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
  scale: number;
  color: string;
  sway: number;
}

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate random values only on the client side to avoid hydration mismatch
    const newHearts = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%", // Random vertical position
      animationDelay: -Math.random() * 20 + "s", // Start at random positions
      animationDuration: Math.random() * 10 + 10 + "s", // 10-20s duration
      scale: Math.random() * 0.5 + 0.5, // 0.5 - 1.0 scale
      color: ["#ef4444", "#ec4899", "#d946ef", "#a855f7", "#3b82f6"][
        Math.floor(Math.random() * 5)
      ],
      sway: Math.random() * 100 - 50, // Static sway distance per heart
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden bg-black"
      style={{ zIndex: -10 }}
    >
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          viewBox="0 0 24 24"
          fill="none"
          stroke={heart.color}
          strokeWidth="2"
          className="absolute opacity-0"
          style={
            {
              left: heart.left,
              top: heart.top,
              width: "24px",
              height: "24px",
              "--scale": heart.scale,
              "--sway": heart.sway,
              animation: `floatUp ${heart.animationDuration} linear infinite`,
              animationDelay: heart.animationDelay,
              filter: `drop-shadow(0 0 5px ${heart.color}) drop-shadow(0 0 10px ${heart.color})`,
            } as React.CSSProperties
          }
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      ))}
      <style>
        {`
          @keyframes floatUp {
            0% {
              transform: translateY(110vh) scale(var(--scale)) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 0.8;
            }
            90% {
              opacity: 0.8;
            }
            100% {
              transform: translateY(-10vh) scale(var(--scale)) translateX(calc(var(--sway) * 1px));
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default React.memo(HeartBackground);
