import { memo, useState, useRef, useEffect } from "react";

interface NeonTextProps {
  text: string;
  className?: string;
  strokeColor?: string;
  fontSize?: number | string;
  animationDuration?: number;
  strokeWidth?: number;
}

const NeonText = memo(
  ({
    text,
    className = "",
    strokeColor = "#00ffff",
    fontSize = 24,
    animationDuration = 2.5,
    strokeWidth = 1.5,
  }: NeonTextProps) => {
    const textRef = useRef<SVGTextElement>(null);
    const [pathLength, setPathLength] = useState(0);
    const [dimensions, setDimensions] = useState({ width: 300, height: 50 });

    const updateDimensions = () => {
      if (textRef.current) {
        const length = textRef.current.getComputedTextLength();
        setPathLength(length * 2);

        const bbox = textRef.current.getBBox();
        setDimensions({
          width: bbox.width + 20,
          height: bbox.height + 20,
        });
      }
    };

    useEffect(() => {
      updateDimensions();

      // ResizeObserver for responsive font size changes
      const resizeObserver = new ResizeObserver(() => {
        updateDimensions();
      });

      if (textRef.current) {
        resizeObserver.observe(textRef.current);
      }

      // Also listen to window resize as fallback
      window.addEventListener("resize", updateDimensions);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("resize", updateDimensions);
      };
    }, [text, fontSize]);

    const filterId = `neon-glow-${text.replace(/\s/g, "-")}`;

    return (
      <svg
        className={className}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Neon Glow Filter */}
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            {/* Outer glow */}
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="8"
              result="blur1"
            />
            <feColorMatrix
              in="blur1"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0"
              result="glow1"
            />
            {/* Middle glow */}
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="4"
              result="blur2"
            />
            <feColorMatrix
              in="blur2"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0"
              result="glow2"
            />
            {/* Inner glow */}
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="2"
              result="blur3"
            />
            {/* Merge all layers */}
            <feMerge>
              <feMergeNode in="glow1" />
              <feMergeNode in="glow2" />
              <feMergeNode in="blur3" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <text
          ref={textRef}
          x="10"
          y={dimensions.height - 10}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fontSize={fontSize}
          fontFamily="inherit"
          fontWeight="500"
          letterSpacing="0.2em"
          filter={`url(#${filterId})`}
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            animation: `neonDrawLine ${animationDuration}s ease-in-out forwards infinite`,
            // @ts-expect-error CSS custom property
            "--path-length": pathLength,
          }}
        >
          {text}
        </text>
      </svg>
    );
  },
);

NeonText.displayName = "NeonText";

export default NeonText;
