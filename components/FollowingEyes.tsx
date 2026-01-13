import React, { memo, useMemo } from "react";
import { motion, MotionValue, useTransform } from "motion/react";

interface FollowingEyesProps {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}

// Clamp fonksiyonu - değeri min-max aralığında tutar
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// Sabitler - component dışında tanımlanarak her renderda yeniden oluşturulması önlenir
const MAX_PUPIL_OFFSET = 0.35;
const INITIAL_Y_OFFSET = 0.25;
const LEFT_PERSON_X_OFFSET = 0.2;
const RIGHT_PERSON_X_OFFSET = -0.2;
const NORMALIZE_RANGE = 100;
const PUPIL_SIZE = 0.6;

// Göz merkez pozisyonları
const EYE_CENTERS = {
  leftPersonLeft: { x: 1.1, y: 1.6 },
  leftPersonRight: { x: 2.9, y: 1.6 },
  rightPersonLeft: { x: 12.1, y: 1.6 },
  rightPersonRight: { x: 13.9, y: 1.6 },
} as const;

const FollowingEyes = memo(({ springX, springY }: FollowingEyesProps) => {
  // Memoized clamp fonksiyonları
  const clampLeftX = useMemo(
    () => (v: number) =>
      clamp(v + LEFT_PERSON_X_OFFSET, -MAX_PUPIL_OFFSET, MAX_PUPIL_OFFSET),
    [],
  );

  const clampRightX = useMemo(
    () => (v: number) =>
      clamp(v + RIGHT_PERSON_X_OFFSET, -MAX_PUPIL_OFFSET, MAX_PUPIL_OFFSET),
    [],
  );

  const clampY = useMemo(
    () => (v: number) =>
      clamp(v + INITIAL_Y_OFFSET, -MAX_PUPIL_OFFSET, MAX_PUPIL_OFFSET),
    [],
  );

  // Temel transform'lar - tam aralık hareket
  const baseX = useTransform(
    springX,
    [-NORMALIZE_RANGE, 0, NORMALIZE_RANGE],
    [-MAX_PUPIL_OFFSET, 0, MAX_PUPIL_OFFSET],
  );

  const baseY = useTransform(
    springY,
    [-NORMALIZE_RANGE, 0, NORMALIZE_RANGE],
    [-MAX_PUPIL_OFFSET, 0, MAX_PUPIL_OFFSET],
  );

  // Sol kişinin göz bebekleri pozisyonları
  const leftPersonPupilX = useTransform(baseX, clampLeftX);
  const leftPersonPupilY = useTransform(baseY, clampY);

  // Sağ kişinin göz bebekleri pozisyonları
  const rightPersonPupilX = useTransform(baseX, clampRightX);
  const rightPersonPupilY = useTransform(baseY, clampY);

  // Memoized pozisyon hesaplama fonksiyonları
  const leftLeftEyeXCalc = useMemo(
    () => (v: number) => EYE_CENTERS.leftPersonLeft.x - PUPIL_SIZE / 2 + v,
    [],
  );
  const leftLeftEyeYCalc = useMemo(
    () => (v: number) => EYE_CENTERS.leftPersonLeft.y - PUPIL_SIZE / 2 + v,
    [],
  );
  const leftRightEyeXCalc = useMemo(
    () => (v: number) => EYE_CENTERS.leftPersonRight.x - PUPIL_SIZE / 2 + v,
    [],
  );
  const leftRightEyeYCalc = useMemo(
    () => (v: number) => EYE_CENTERS.leftPersonRight.y - PUPIL_SIZE / 2 + v,
    [],
  );
  const rightLeftEyeXCalc = useMemo(
    () => (v: number) => EYE_CENTERS.rightPersonLeft.x - PUPIL_SIZE / 2 + v,
    [],
  );
  const rightLeftEyeYCalc = useMemo(
    () => (v: number) => EYE_CENTERS.rightPersonLeft.y - PUPIL_SIZE / 2 + v,
    [],
  );
  const rightRightEyeXCalc = useMemo(
    () => (v: number) => EYE_CENTERS.rightPersonRight.x - PUPIL_SIZE / 2 + v,
    [],
  );
  const rightRightEyeYCalc = useMemo(
    () => (v: number) => EYE_CENTERS.rightPersonRight.y - PUPIL_SIZE / 2 + v,
    [],
  );

  // Final pozisyon transform'ları
  const leftLeftX = useTransform(leftPersonPupilX, leftLeftEyeXCalc);
  const leftLeftY = useTransform(leftPersonPupilY, leftLeftEyeYCalc);
  const leftRightX = useTransform(leftPersonPupilX, leftRightEyeXCalc);
  const leftRightY = useTransform(leftPersonPupilY, leftRightEyeYCalc);
  const rightLeftX = useTransform(rightPersonPupilX, rightLeftEyeXCalc);
  const rightLeftY = useTransform(rightPersonPupilY, rightLeftEyeYCalc);
  const rightRightX = useTransform(rightPersonPupilX, rightRightEyeXCalc);
  const rightRightY = useTransform(rightPersonPupilY, rightRightEyeYCalc);

  return (
    <svg
      width="150"
      height="80"
      viewBox="0 0 15 8"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ shapeRendering: "crispEdges" }}
    >
      {/* Sol kişinin göz bebekleri */}
      <motion.rect
        x={leftLeftX}
        y={leftLeftY}
        width={PUPIL_SIZE}
        height={PUPIL_SIZE}
        fill="#2D1B12"
        rx="0.15"
      />
      <motion.rect
        x={leftRightX}
        y={leftRightY}
        width={PUPIL_SIZE}
        height={PUPIL_SIZE}
        fill="#2D1B12"
        rx="0.15"
      />

      {/* Sağ kişinin göz bebekleri */}
      <motion.rect
        x={rightLeftX}
        y={rightLeftY}
        width={PUPIL_SIZE}
        height={PUPIL_SIZE}
        fill="#2D1B12"
        rx="0.15"
      />
      <motion.rect
        x={rightRightX}
        y={rightRightY}
        width={PUPIL_SIZE}
        height={PUPIL_SIZE}
        fill="#2D1B12"
        rx="0.15"
      />
    </svg>
  );
});

FollowingEyes.displayName = "FollowingEyes";

export default FollowingEyes;
