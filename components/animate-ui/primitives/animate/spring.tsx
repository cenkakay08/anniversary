"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring as useMotionSpring,
  type SpringOptions,
  type HTMLMotionProps,
  type MotionValue,
} from "motion/react";

import { useMotionValueState } from "@/hooks/use-motion-value-state";
import { getStrictContext } from "@/lib/get-strict-context";
import {
  Slot,
  type WithAsChild,
} from "@/components/animate-ui/primitives/animate/slot";
import { createPortal } from "react-dom";

type SpringPathConfig = {
  coilCount?: number;
  amplitudeMin?: number;
  amplitudeMax?: number;
  curveRatioMin?: number;
  curveRatioMax?: number;
  bezierOffset?: number;
};

function generateSpringPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  pathConfig: SpringPathConfig = {},
) {
  const {
    coilCount = 8,
    amplitudeMin = 8,
    amplitudeMax = 20,
    curveRatioMin = 0.5,
    curveRatioMax = 1,
    bezierOffset = 8,
  } = pathConfig;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 2) return `M${x1},${y1}`;
  const d = dist / coilCount;
  const h = Math.max(0.8, 1 - (dist - 40) / 200);
  const amplitude = Math.max(
    amplitudeMin,
    Math.min(amplitudeMax, amplitudeMax * h),
  );
  const curveRatio =
    dist <= 40
      ? curveRatioMax
      : dist <= 120
        ? curveRatioMax - ((dist - 40) / 80) * (curveRatioMax - curveRatioMin)
        : curveRatioMin;
  const ux = dx / dist,
    uy = dy / dist;
  const perpX = -uy,
    perpY = ux;

  const path: string[] = [];
  for (let i = 0; i < coilCount; i++) {
    const sx = x1 + ux * (i * d);
    const sy = y1 + uy * (i * d);
    const ex = x1 + ux * ((i + 1) * d);
    const ey = y1 + uy * ((i + 1) * d);

    const mx = x1 + ux * ((i + 0.5) * d) + perpX * amplitude;
    const my = y1 + uy * ((i + 0.5) * d) + perpY * amplitude;

    const c1x = sx + d * curveRatio * ux;
    const c1y = sy + d * curveRatio * uy;
    const c2x = mx + ux * bezierOffset;
    const c2y = my + uy * bezierOffset;
    const c3x = mx - ux * bezierOffset;
    const c3y = my - uy * bezierOffset;
    const c4x = ex - d * curveRatio * ux;
    const c4y = ey - d * curveRatio * uy;

    if (i === 0) path.push(`M${sx},${sy}`);
    else path.push(`L${sx},${sy}`);
    path.push(`C${c1x},${c1y} ${c2x},${c2y} ${mx},${my}`);
    path.push(`C${c3x},${c3y} ${c4x},${c4y} ${ex},${ey}`);
  }
  return path.join(" ");
}

type SpringContextType = {
  dragElastic?: number;
  childRef: React.RefObject<HTMLDivElement | null>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  centerX: MotionValue<number>;
  centerY: MotionValue<number>;
  pathConfig: SpringPathConfig;
  refreshCenter: () => void;
};

const [LocalSpringProvider, useSpring] =
  getStrictContext<SpringContextType>("SpringContext");

type SpringProviderProps = {
  children: React.ReactNode;
  dragElastic?: number;
  pathConfig?: SpringPathConfig;
  transition?: SpringOptions;
};

function SpringProvider({
  dragElastic = 0.2,
  transition = { stiffness: 200, damping: 16 },
  pathConfig = {},
  ...props
}: SpringProviderProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useMotionSpring(x, transition);
  const springY = useMotionSpring(y, transition);

  // React state based recalculation removed for performance
  // const sx = useMotionValueState(springX);
  // const sy = useMotionValueState(springY);

  const childRef = React.useRef<HTMLDivElement>(null);

  const centerX = useMotionValue(0);
  const centerY = useMotionValue(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const updateCenter = React.useCallback(() => {
    if (childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      const currentX = springX.get();
      const currentY = springY.get();

      centerX.set(rect.left - currentX + rect.width / 2);
      centerY.set(rect.top - currentY + rect.height / 2);
    }
  }, [springX, springY, centerX, centerY]);

  React.useLayoutEffect(() => {
    let animationFrameId: number;

    const update = () => {
      updateCenter();
      animationFrameId = requestAnimationFrame(update);
    };

    // İlk birkaç karede ve etkileşimlerde güncelleme yap
    update();

    window.addEventListener("resize", updateCenter);
    window.addEventListener("scroll", updateCenter, true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateCenter);
      window.removeEventListener("scroll", updateCenter, true);
    };
  }, [updateCenter]);

  React.useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = "grabbing";
    } else {
      document.body.style.cursor = "default";
    }
  }, [isDragging]);

  // Removed path calculation from here to prevent re-renders

  return (
    <LocalSpringProvider
      value={{
        springX,
        springY,
        x,
        y,
        isDragging,
        setIsDragging,
        dragElastic,
        childRef,
        pathConfig,
        centerX,
        centerY,
        refreshCenter: updateCenter,
      }}
      {...props}
    />
  );
}

type SpringProps = React.SVGProps<SVGSVGElement>;

function Spring({ style, ...props }: SpringProps) {
  const { springX, springY, centerX, centerY, pathConfig } = useSpring();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Create a transformed motion value that calculates the path string on every frame update
  // without triggering a React render
  const d = useTransform(
    [springX, springY, centerX, centerY],
    ([currX, currY, cX, cY]) => {
      return generateSpringPath(
        cX as number,
        cY as number,
        (cX as number) + (currX as number),
        (cY as number) + (currY as number),
        pathConfig,
      );
    },
  );

  const svgContent = (
    <svg
      width="100vw"
      height="100vh"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 40,
        ...style,
      }}
      {...props}
    >
      <motion.path
        d={d}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
      />
    </svg>
  );

  if (!mounted) return null;

  return createPortal(svgContent, document.body);
}

type SpringElementProps = WithAsChild<
  Omit<HTMLMotionProps<"div">, "children"> & {
    children: React.ReactElement;
  }
>;

function SpringElement({
  ref,
  asChild = false,
  style,
  ...props
}: SpringElementProps) {
  const {
    childRef,
    dragElastic,
    isDragging,
    setIsDragging,
    springX,
    springY,
    x,
    y,
    refreshCenter,
  } = useSpring();

  React.useImperativeHandle(ref, () => childRef.current as HTMLDivElement);

  const Component = asChild ? Slot : motion.div;

  return (
    <Component
      ref={childRef}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        x: springX,
        y: springY,
        ...style,
      }}
      drag
      dragElastic={dragElastic}
      dragMomentum={false}
      onDragStart={() => {
        refreshCenter();
        setIsDragging(true);
      }}
      onDrag={(_, info) => {
        x.set(info.offset.x);
        y.set(info.offset.y);
      }}
      onDragEnd={() => {
        x.set(0);
        y.set(0);
        setIsDragging(false);
      }}
      {...props}
    />
  );
}

export {
  SpringProvider,
  Spring,
  SpringElement,
  useSpring,
  type SpringProviderProps,
  type SpringProps,
  type SpringElementProps,
  type SpringPathConfig,
  type SpringContextType,
};
