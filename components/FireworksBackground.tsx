import { Fireworks } from "@fireworks-js/react";
import type { FireworksHandlers } from "@fireworks-js/react";
import React, { memo, useRef } from "react";

const FireworksBackground = memo(() => {
    const ref = useRef<FireworksHandlers>(null);

    return (
        <Fireworks
            ref={ref}
            className="absolute top-0 left-0 size-full"

        />
    );
});

FireworksBackground.displayName = 'FireworksBackground';

export default FireworksBackground;
