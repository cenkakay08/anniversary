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
  // Yardımcı hesaplama fonksiyonu
  const calculatePupilPos = (
    val: number,
    personOffset: number,
    eyeCenter: number,
  ) => {
    // 1. Normalize ve Scale (baseX/Y)
    // Input [-100, 0, 100] -> Output [-0.35, 0, 0.35]
    // Lineer interpolasyon: (val - -100) * (0.35 - -0.35) / (100 - -100) + -0.35
    // Basitleştirilmiş: val * (0.35 / 100)
    const base = val * (MAX_PUPIL_OFFSET / NORMALIZE_RANGE);

    // 2. Person Offset ve Clamp
    const clamped = clamp(
      base + personOffset,
      -MAX_PUPIL_OFFSET,
      MAX_PUPIL_OFFSET,
    );

    // 3. Final Pozisyon
    return eyeCenter - PUPIL_SIZE / 2 + clamped;
  };

  // Sol Kişi (offset: 0.2)
  const leftLeftX = useTransform(springX, (v) =>
    calculatePupilPos(v, LEFT_PERSON_X_OFFSET, EYE_CENTERS.leftPersonLeft.x),
  );
  const leftRightX = useTransform(springX, (v) =>
    calculatePupilPos(v, LEFT_PERSON_X_OFFSET, EYE_CENTERS.leftPersonRight.x),
  );

  // Sağ Kişi (offset: -0.2)
  const rightLeftX = useTransform(springX, (v) =>
    calculatePupilPos(v, RIGHT_PERSON_X_OFFSET, EYE_CENTERS.rightPersonLeft.x),
  );
  const rightRightX = useTransform(springX, (v) =>
    calculatePupilPos(v, RIGHT_PERSON_X_OFFSET, EYE_CENTERS.rightPersonRight.x),
  );

  // Y Eksenleri (ortak offset: 0.25)
  const leftLeftY = useTransform(springY, (v) =>
    calculatePupilPos(v, INITIAL_Y_OFFSET, EYE_CENTERS.leftPersonLeft.y),
  );
  const leftRightY = useTransform(springY, (v) =>
    calculatePupilPos(v, INITIAL_Y_OFFSET, EYE_CENTERS.leftPersonRight.y),
  );
  const rightLeftY = useTransform(springY, (v) =>
    calculatePupilPos(v, INITIAL_Y_OFFSET, EYE_CENTERS.rightPersonLeft.y),
  );
  const rightRightY = useTransform(springY, (v) =>
    calculatePupilPos(v, INITIAL_Y_OFFSET, EYE_CENTERS.rightPersonRight.y),
  );

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
