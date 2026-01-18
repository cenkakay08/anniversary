import React, { memo } from "react";
import CustomImage from "./CustomImage";
import {
  Spring,
  SpringElement,
  SpringProvider,
  useSpring,
} from "@/components/animate-ui/primitives/animate/spring";
import FollowingEyes from "@/components/FollowingEyes";
import heartImg from "@/public/svgs/heart-pixel.svg";

// useSpring'i kullanan wrapper component - sadece bu re-render olur
const ConnectedFollowingEyes = memo(() => {
  const { springX, springY } = useSpring();
  // springX ve springY MotionValue olduğu için referansları değişmez,
  // ancak context value değiştiğinde bu component re-render olabilir.
  // FollowingEyes zaten memo'lu olduğu için prop değişmediği sürece re-render olmaz.
  return <FollowingEyes springX={springX} springY={springY} />;
});

ConnectedFollowingEyes.displayName = "ConnectedFollowingEyes";

const HeartInteraction = memo(() => {
  return (
    <SpringProvider>
      <ConnectedFollowingEyes />
      <Spring className="text-gray-400" />
      <SpringElement className="z-50 cursor-grab active:cursor-grabbing">
        <CustomImage src={heartImg} alt="Heart" width={48} draggable={false} />
      </SpringElement>
    </SpringProvider>
  );
});

HeartInteraction.displayName = "HeartInteraction";

export default HeartInteraction;
