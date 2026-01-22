import { Fireworks } from "@fireworks-js/react";
import type { FireworksHandlers } from "@fireworks-js/react";
import { memo, useRef } from "react";
import explosion0 from "@/public/sounds/website_public_sounds_explosion0.mp3";
import explosion1 from "@/public/sounds/website_public_sounds_explosion1.mp3";
import explosion2 from "@/public/sounds/website_public_sounds_explosion2.mp3";

const FireworksBackground = memo(() => {
  const ref = useRef<FireworksHandlers>(null);

  return (
    <Fireworks
      ref={ref}
      className="absolute top-0 left-0 size-full"
      options={{
        intensity: 15,
        sound: {
          enabled: true,
          files: [explosion0, explosion1, explosion2],
          volume: {
            min: 2,
            max: 4,
          },
        },
      }}
    />
  );
});

FireworksBackground.displayName = "FireworksBackground";

export default FireworksBackground;
