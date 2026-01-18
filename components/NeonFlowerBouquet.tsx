import React from "react";

const NeonFlowerBouquet: React.FC = () => {
  // Rose petal spiral path generator - creates realistic rose shape
  const createRose = (
    cx: number,
    cy: number,
    size: number,
    color: string,
    innerColor: string,
    delay: number,
    filter: string,
  ) => (
    <>
      {/* Outer petals - layer 1 */}
      <path
        d={`M${cx} ${cy + size * 0.6} 
           C${cx + size * 0.5} ${cy + size * 0.4} ${cx + size * 0.6} ${cy - size * 0.1} ${cx + size * 0.3} ${cy - size * 0.3}
           C${cx + size * 0.1} ${cy - size * 0.5} ${cx - size * 0.1} ${cy - size * 0.5} ${cx - size * 0.3} ${cy - size * 0.3}
           C${cx - size * 0.6} ${cy - size * 0.1} ${cx - size * 0.5} ${cy + size * 0.4} ${cx} ${cy + size * 0.6}`}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        filter={filter}
        style={{
          strokeDasharray: 200,
          strokeDashoffset: 200,
          animation: `neonDrawLine 1.5s ease-out ${delay}s forwards`,
        }}
      />
      {/* Outer petals - layer 2 (rotated) */}
      <path
        d={`M${cx + size * 0.5} ${cy + size * 0.3} 
           C${cx + size * 0.6} ${cy} ${cx + size * 0.4} ${cy - size * 0.4} ${cx} ${cy - size * 0.5}
           C${cx - size * 0.4} ${cy - size * 0.4} ${cx - size * 0.6} ${cy} ${cx - size * 0.5} ${cy + size * 0.3}`}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        filter={filter}
        style={{
          strokeDasharray: 180,
          strokeDashoffset: 180,
          animation: `neonDrawLine 1.3s ease-out ${delay + 0.15}s forwards`,
        }}
      />
      {/* Inner petals - spiral */}
      <path
        d={`M${cx} ${cy + size * 0.35} 
           C${cx + size * 0.3} ${cy + size * 0.2} ${cx + size * 0.35} ${cy - size * 0.1} ${cx + size * 0.15} ${cy - size * 0.25}
           C${cx} ${cy - size * 0.35} ${cx - size * 0.15} ${cy - size * 0.25} ${cx - size * 0.15} ${cy - size * 0.1}
           C${cx - size * 0.2} ${cy + size * 0.1} ${cx - size * 0.1} ${cy + size * 0.25} ${cx} ${cy + size * 0.35}`}
        stroke={innerColor}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        filter={filter}
        style={{
          strokeDasharray: 120,
          strokeDashoffset: 120,
          animation: `neonDrawLine 1.2s ease-out ${delay + 0.25}s forwards`,
        }}
      />
      {/* Inner spiral - center */}
      <path
        d={`M${cx} ${cy + size * 0.15} 
           C${cx + size * 0.12} ${cy + size * 0.08} ${cx + size * 0.15} ${cy - size * 0.05} ${cx + size * 0.05} ${cy - size * 0.12}
           C${cx - size * 0.05} ${cy - size * 0.15} ${cx - size * 0.12} ${cy - size * 0.08} ${cx - size * 0.08} ${cy}
           C${cx - size * 0.05} ${cy + size * 0.08} ${cx} ${cy + size * 0.1} ${cx + size * 0.05} ${cy + size * 0.05}`}
        stroke={innerColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        filter={filter}
        style={{
          strokeDasharray: 80,
          strokeDashoffset: 80,
          animation: `neonDrawLine 1s ease-out ${delay + 0.35}s forwards`,
        }}
      />
      {/* Center bud */}
      <circle
        cx={cx}
        cy={cy - size * 0.05}
        r={size * 0.08}
        stroke="#fbbf24"
        strokeWidth="2"
        fill="none"
        filter="url(#neonGlowPink)"
        style={{
          strokeDasharray: 30,
          strokeDashoffset: 30,
          animation: `neonDrawLine 0.8s ease-out ${delay + 0.45}s forwards`,
        }}
      />
    </>
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 bottom-0 z-0 flex items-end justify-center pb-4">
      <svg
        viewBox="0 0 400 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full max-h-full w-full max-w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Neon glow filters */}
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
          <filter
            id="neonGlowGreen"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2" result="blur1" />
            <feGaussianBlur stdDeviation="4" result="blur2" />
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
            id="neonGlowPurple"
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

        {/* ========== STEMS ========== */}
        {/* Main stems bundle */}
        <path
          d="M200 430 C200 400 195 350 200 300"
          stroke="#22c55e"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 150,
            strokeDashoffset: 150,
            animation: "neonDrawLine 2s ease-out forwards",
          }}
        />
        <path
          d="M195 430 C190 395 180 340 175 290"
          stroke="#16a34a"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 160,
            strokeDashoffset: 160,
            animation: "neonDrawLine 2s ease-out 0.1s forwards",
          }}
        />
        <path
          d="M205 430 C210 395 220 340 225 290"
          stroke="#16a34a"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 160,
            strokeDashoffset: 160,
            animation: "neonDrawLine 2s ease-out 0.15s forwards",
          }}
        />

        {/* Left branch stems */}
        <path
          d="M175 320 C150 290 110 260 70 210"
          stroke="#22c55e"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 180,
            strokeDashoffset: 180,
            animation: "neonDrawLine 2s ease-out 0.2s forwards",
          }}
        />
        <path
          d="M180 340 C155 320 130 300 100 260"
          stroke="#22c55e"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 150,
            strokeDashoffset: 150,
            animation: "neonDrawLine 2s ease-out 0.25s forwards",
          }}
        />
        <path
          d="M185 300 C165 280 140 250 120 190"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 140,
            strokeDashoffset: 140,
            animation: "neonDrawLine 2s ease-out 0.3s forwards",
          }}
        />

        {/* Right branch stems */}
        <path
          d="M225 320 C250 290 290 260 330 210"
          stroke="#22c55e"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 180,
            strokeDashoffset: 180,
            animation: "neonDrawLine 2s ease-out 0.2s forwards",
          }}
        />
        <path
          d="M220 340 C245 320 270 300 300 260"
          stroke="#22c55e"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 150,
            strokeDashoffset: 150,
            animation: "neonDrawLine 2s ease-out 0.25s forwards",
          }}
        />
        <path
          d="M215 300 C235 280 260 250 280 190"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 140,
            strokeDashoffset: 140,
            animation: "neonDrawLine 2s ease-out 0.3s forwards",
          }}
        />

        {/* Top center stems */}
        <path
          d="M200 300 C200 270 200 230 200 170"
          stroke="#22c55e"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 130,
            strokeDashoffset: 130,
            animation: "neonDrawLine 1.5s ease-out 0.35s forwards",
          }}
        />
        <path
          d="M200 280 C185 250 165 210 150 150"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 150,
            strokeDashoffset: 150,
            animation: "neonDrawLine 1.5s ease-out 0.4s forwards",
          }}
        />
        <path
          d="M200 280 C215 250 235 210 250 150"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 150,
            strokeDashoffset: 150,
            animation: "neonDrawLine 1.5s ease-out 0.4s forwards",
          }}
        />

        {/* ========== ROSES ========== */}
        {/* Main center rose - largest */}
        {createRose(
          200,
          250,
          55,
          "#ec4899",
          "#f472b6",
          0.7,
          "url(#neonGlowPink)",
        )}

        {/* Top rose */}
        {createRose(
          200,
          140,
          45,
          "#f43f5e",
          "#fb7185",
          0.8,
          "url(#neonGlowRed)",
        )}

        {/* Far left rose */}
        {createRose(
          70,
          175,
          40,
          "#ec4899",
          "#f472b6",
          0.9,
          "url(#neonGlowPink)",
        )}

        {/* Mid-left rose */}
        {createRose(
          100,
          230,
          42,
          "#f43f5e",
          "#fb7185",
          0.85,
          "url(#neonGlowRed)",
        )}

        {/* Upper-left rose */}
        {createRose(
          120,
          160,
          38,
          "#a855f7",
          "#c084fc",
          0.95,
          "url(#neonGlowPurple)",
        )}

        {/* Left-center rose */}
        {createRose(
          150,
          120,
          35,
          "#ec4899",
          "#f472b6",
          0.88,
          "url(#neonGlowPink)",
        )}

        {/* Far right rose */}
        {createRose(
          330,
          175,
          40,
          "#ec4899",
          "#f472b6",
          0.9,
          "url(#neonGlowPink)",
        )}

        {/* Mid-right rose */}
        {createRose(
          300,
          230,
          42,
          "#f43f5e",
          "#fb7185",
          0.85,
          "url(#neonGlowRed)",
        )}

        {/* Upper-right rose */}
        {createRose(
          280,
          160,
          38,
          "#a855f7",
          "#c084fc",
          0.95,
          "url(#neonGlowPurple)",
        )}

        {/* Right-center rose */}
        {createRose(
          250,
          120,
          35,
          "#ec4899",
          "#f472b6",
          0.88,
          "url(#neonGlowPink)",
        )}

        {/* ========== LEAVES ========== */}
        <path
          d="M140 320 C115 310 95 325 110 345 C130 355 150 340 140 320"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            animation: "neonDrawLine 1s ease-out 0.5s forwards",
          }}
        />
        <path
          d="M260 320 C285 310 305 325 290 345 C270 355 250 340 260 320"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            animation: "neonDrawLine 1s ease-out 0.55s forwards",
          }}
        />
        <path
          d="M85 220 C60 210 45 225 58 243 C78 253 98 237 85 220"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 90,
            strokeDashoffset: 90,
            animation: "neonDrawLine 1s ease-out 0.6s forwards",
          }}
        />
        <path
          d="M315 220 C340 210 355 225 342 243 C322 253 302 237 315 220"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 90,
            strokeDashoffset: 90,
            animation: "neonDrawLine 1s ease-out 0.65s forwards",
          }}
        />
        <path
          d="M165 275 C145 270 135 285 150 300 C165 305 180 290 165 275"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 80,
            strokeDashoffset: 80,
            animation: "neonDrawLine 1s ease-out 0.7s forwards",
          }}
        />
        <path
          d="M235 275 C255 270 265 285 250 300 C235 305 220 290 235 275"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowGreen)"
          style={{
            strokeDasharray: 80,
            strokeDashoffset: 80,
            animation: "neonDrawLine 1s ease-out 0.75s forwards",
          }}
        />

        {/* ========== RIBBON BOW ========== */}
        <path
          d="M160 390 C130 375 115 395 135 415 C150 405 165 400 180 410"
          stroke="#a855f7"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowPurple)"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            animation: "neonDrawLine 1s ease-out 1.8s forwards",
          }}
        />
        <path
          d="M240 390 C270 375 285 395 265 415 C250 405 235 400 220 410"
          stroke="#a855f7"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowPurple)"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            animation: "neonDrawLine 1s ease-out 1.85s forwards",
          }}
        />
        <path
          d="M180 410 C190 425 210 425 220 410"
          stroke="#a855f7"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowPurple)"
          style={{
            strokeDasharray: 50,
            strokeDashoffset: 50,
            animation: "neonDrawLine 0.8s ease-out 1.95s forwards",
          }}
        />
        <path
          d="M185 380 C195 395 205 395 215 380"
          stroke="#c084fc"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowPurple)"
          style={{
            strokeDasharray: 40,
            strokeDashoffset: 40,
            animation: "neonDrawLine 0.8s ease-out 2s forwards",
          }}
        />
        {/* Ribbon tails */}
        <path
          d="M125 415 C115 435 120 445 130 440"
          stroke="#a855f7"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowPurple)"
          style={{
            strokeDasharray: 50,
            strokeDashoffset: 50,
            animation: "neonDrawLine 0.8s ease-out 2.1s forwards",
          }}
        />
        <path
          d="M275 415 C285 435 280 445 270 440"
          stroke="#a855f7"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#neonGlowPurple)"
          style={{
            strokeDasharray: 50,
            strokeDashoffset: 50,
            animation: "neonDrawLine 0.8s ease-out 2.1s forwards",
          }}
        />

        {/* ========== DECORATIVE SPARKLES ========== */}
        <circle
          cx="90"
          cy="150"
          r="3"
          stroke="#fbbf24"
          strokeWidth="1.5"
          fill="none"
          filter="url(#neonGlowPink)"
          style={{
            strokeDasharray: 20,
            strokeDashoffset: 20,
            animation: "neonDrawLine 0.6s ease-out 1.5s forwards",
          }}
        />
        <circle
          cx="310"
          cy="150"
          r="3"
          stroke="#fbbf24"
          strokeWidth="1.5"
          fill="none"
          filter="url(#neonGlowPink)"
          style={{
            strokeDasharray: 20,
            strokeDashoffset: 20,
            animation: "neonDrawLine 0.6s ease-out 1.55s forwards",
          }}
        />
        <circle
          cx="135"
          cy="100"
          r="3"
          stroke="#fbbf24"
          strokeWidth="1.5"
          fill="none"
          filter="url(#neonGlowPink)"
          style={{
            strokeDasharray: 20,
            strokeDashoffset: 20,
            animation: "neonDrawLine 0.6s ease-out 1.6s forwards",
          }}
        />
        <circle
          cx="265"
          cy="100"
          r="3"
          stroke="#fbbf24"
          strokeWidth="1.5"
          fill="none"
          filter="url(#neonGlowPink)"
          style={{
            strokeDasharray: 20,
            strokeDashoffset: 20,
            animation: "neonDrawLine 0.6s ease-out 1.65s forwards",
          }}
        />
        <circle
          cx="200"
          cy="80"
          r="3"
          stroke="#fbbf24"
          strokeWidth="1.5"
          fill="none"
          filter="url(#neonGlowPink)"
          style={{
            strokeDasharray: 20,
            strokeDashoffset: 20,
            animation: "neonDrawLine 0.6s ease-out 1.7s forwards",
          }}
        />
        <circle
          cx="55"
          cy="195"
          r="2"
          stroke="#fbbf24"
          strokeWidth="1.5"
          fill="none"
          filter="url(#neonGlowPink)"
          style={{
            strokeDasharray: 15,
            strokeDashoffset: 15,
            animation: "neonDrawLine 0.6s ease-out 1.75s forwards",
          }}
        />
        <circle
          cx="345"
          cy="195"
          r="2"
          stroke="#fbbf24"
          strokeWidth="1.5"
          fill="none"
          filter="url(#neonGlowPink)"
          style={{
            strokeDasharray: 15,
            strokeDashoffset: 15,
            animation: "neonDrawLine 0.6s ease-out 1.75s forwards",
          }}
        />
      </svg>
    </div>
  );
};

export default React.memo(NeonFlowerBouquet);
