import { Fireworks } from "@fireworks-js/react";
import type { FireworksHandlers } from "@fireworks-js/react";
import { memo, useRef } from "react";

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
          files: [
            "/sounds/website_public_sounds_explosion0.mp3",
            "/sounds/website_public_sounds_explosion1.mp3",
            "/sounds/website_public_sounds_explosion2.mp3",
          ],
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
