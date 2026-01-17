import { useEffect, useMemo, useRef, useCallback, useState } from "react";
import { useGesture } from "@use-gesture/react";
import DomeSphere from "./DomeSphere";
import DomeViewer from "./DomeViewer";
import type { StaticImageData } from "next/image";

// Full-size image imports
import img1 from "@/public/images/IMG20250629125814.jpg";
import img2 from "@/public/images/IMG20250629174030.jpg";
import img3 from "@/public/images/IMG20250629200018.jpg";
import img4 from "@/public/images/IMG20250630095616.jpg";
import img5 from "@/public/images/IMG20250630220227.jpg";
import img6 from "@/public/images/IMG20250701153607.jpg";
import img7 from "@/public/images/IMG20250701160323.jpg";
import img8 from "@/public/images/IMG20250701160438.jpg";
import img9 from "@/public/images/IMG20250701160439.jpg";
import img10 from "@/public/images/IMG20250701161222.jpg";
import img11 from "@/public/images/IMG20250701162053.jpg";
import img12 from "@/public/images/IMG20250701163200.jpg";
import img13 from "@/public/images/IMG20250701163329.jpg";
import img14 from "@/public/images/IMG20250701185240.jpg";
import img15 from "@/public/images/IMG20250701230951.jpg";
import img16 from "@/public/images/IMG20250702142144.jpg";
import img17 from "@/public/images/IMG20250702193547.jpg";
import img18 from "@/public/images/IMG20250705160457.jpg";
import img19 from "@/public/images/IMG20251001190130.jpg";
import img20 from "@/public/images/IMG20251002164003.jpg";
import img21 from "@/public/images/IMG20251002164232.jpg";
import img22 from "@/public/images/IMG20251003165742.jpg";
import img23 from "@/public/images/IMG20251004095215.jpg";
import img24 from "@/public/images/IMG20251004134144.jpg";
import img25 from "@/public/images/IMG20251005131034.jpg";
import img26 from "@/public/images/IMG20251005203940.jpg";
import img27 from "@/public/images/IMG20251007130658.jpg";
import img28 from "@/public/images/IMG20251008203307.jpg";
import img29 from "@/public/images/IMG20251009153030.jpg";
import img30 from "@/public/images/IMG20251009182534.jpg";
import img31 from "@/public/images/IMG20251010034532.jpg";
import img32 from "@/public/images/IMG_20250729_000943_294.jpg";
import img33 from "@/public/images/IMG_20251117_170146_225.webp";
import img34 from "@/public/images/IMG_20251117_182931_748.webp";
import img35 from "@/public/images/IMG_20251207_224239_725.webp";
import img36 from "@/public/images/Screenshot_2025-05-31-12-08-06-10_1c337646f29875672b5a61192b9010f9.jpg";
import img37 from "@/public/images/Screenshot_2025-07-08-19-42-25-60_1c337646f29875672b5a61192b9010f9.jpg";
import img38 from "@/public/images/mmexport1748954376801.jpg";
import img39 from "@/public/images/mmexport1751352933226.jpg";
import img40 from "@/public/images/mmexport1751438745340.jpg";
import img41 from "@/public/images/mmexport1751543079225.jpg";
import img42 from "@/public/images/mmexport1753803034214.jpg";
import img43 from "@/public/images/mmexport1753803037487.jpg";
import img44 from "@/public/images/mmexport1753803076148.jpg";
import img45 from "@/public/images/mmexport1753803316696.jpg";
import img46 from "@/public/images/mmexport1755010072499.jpg";
import img47 from "@/public/images/mmexport1756028448627.jpg";
import img48 from "@/public/images/mmexport1756242249169.jpg";
import img49 from "@/public/images/mmexport1756242306212.jpg";
import img50 from "@/public/images/mmexport1756242339968.jpg";
import img51 from "@/public/images/mmexport1756242354484.jpg";
import img52 from "@/public/images/mmexport1759479639813.jpg";
import img53 from "@/public/images/mmexport1759479646225.jpg";
import img54 from "@/public/images/mmexport1759571279688.jpg";
import img55 from "@/public/images/mmexport1760105897670.jpg";
import img56 from "@/public/images/mmexport1760768744942.jpg";
import img57 from "@/public/images/mmexport1763047108172.jpg";
import img58 from "@/public/images/mmexport1763828028347.jpg";

// Thumbnail image imports
import thumb1 from "@/public/thumbnails/IMG20250629125814.jpg";
import thumb2 from "@/public/thumbnails/IMG20250629174030.jpg";
import thumb3 from "@/public/thumbnails/IMG20250629200018.jpg";
import thumb4 from "@/public/thumbnails/IMG20250630095616.jpg";
import thumb5 from "@/public/thumbnails/IMG20250630220227.jpg";
import thumb6 from "@/public/thumbnails/IMG20250701153607.jpg";
import thumb7 from "@/public/thumbnails/IMG20250701160323.jpg";
import thumb8 from "@/public/thumbnails/IMG20250701160438.jpg";
import thumb9 from "@/public/thumbnails/IMG20250701160439.jpg";
import thumb10 from "@/public/thumbnails/IMG20250701161222.jpg";
import thumb11 from "@/public/thumbnails/IMG20250701162053.jpg";
import thumb12 from "@/public/thumbnails/IMG20250701163200.jpg";
import thumb13 from "@/public/thumbnails/IMG20250701163329.jpg";
import thumb14 from "@/public/thumbnails/IMG20250701185240.jpg";
import thumb15 from "@/public/thumbnails/IMG20250701230951.jpg";
import thumb16 from "@/public/thumbnails/IMG20250702142144.jpg";
import thumb17 from "@/public/thumbnails/IMG20250702193547.jpg";
import thumb18 from "@/public/thumbnails/IMG20250705160457.jpg";
import thumb19 from "@/public/thumbnails/IMG20251001190130.jpg";
import thumb20 from "@/public/thumbnails/IMG20251002164003.jpg";
import thumb21 from "@/public/thumbnails/IMG20251002164232.jpg";
import thumb22 from "@/public/thumbnails/IMG20251003165742.jpg";
import thumb23 from "@/public/thumbnails/IMG20251004095215.jpg";
import thumb24 from "@/public/thumbnails/IMG20251004134144.jpg";
import thumb25 from "@/public/thumbnails/IMG20251005131034.jpg";
import thumb26 from "@/public/thumbnails/IMG20251005203940.jpg";
import thumb27 from "@/public/thumbnails/IMG20251007130658.jpg";
import thumb28 from "@/public/thumbnails/IMG20251008203307.jpg";
import thumb29 from "@/public/thumbnails/IMG20251009153030.jpg";
import thumb30 from "@/public/thumbnails/IMG20251009182534.jpg";
import thumb31 from "@/public/thumbnails/IMG20251010034532.jpg";
import thumb32 from "@/public/thumbnails/IMG_20250729_000943_294.jpg";
import thumb33 from "@/public/thumbnails/IMG_20251117_170146_225.webp";
import thumb34 from "@/public/thumbnails/IMG_20251117_182931_748.webp";
import thumb35 from "@/public/thumbnails/IMG_20251207_224239_725.webp";
import thumb36 from "@/public/thumbnails/Screenshot_2025-05-31-12-08-06-10_1c337646f29875672b5a61192b9010f9.jpg";
import thumb37 from "@/public/thumbnails/Screenshot_2025-07-08-19-42-25-60_1c337646f29875672b5a61192b9010f9.jpg";
import thumb38 from "@/public/thumbnails/mmexport1748954376801.jpg";
import thumb39 from "@/public/thumbnails/mmexport1751352933226.jpg";
import thumb40 from "@/public/thumbnails/mmexport1751438745340.jpg";
import thumb41 from "@/public/thumbnails/mmexport1751543079225.jpg";
import thumb42 from "@/public/thumbnails/mmexport1753803034214.jpg";
import thumb43 from "@/public/thumbnails/mmexport1753803037487.jpg";
import thumb44 from "@/public/thumbnails/mmexport1753803076148.jpg";
import thumb45 from "@/public/thumbnails/mmexport1753803316696.jpg";
import thumb46 from "@/public/thumbnails/mmexport1755010072499.jpg";
import thumb47 from "@/public/thumbnails/mmexport1756028448627.jpg";
import thumb48 from "@/public/thumbnails/mmexport1756242249169.jpg";
import thumb49 from "@/public/thumbnails/mmexport1756242306212.jpg";
import thumb50 from "@/public/thumbnails/mmexport1756242339968.jpg";
import thumb51 from "@/public/thumbnails/mmexport1756242354484.jpg";
import thumb52 from "@/public/thumbnails/mmexport1759479639813.jpg";
import thumb53 from "@/public/thumbnails/mmexport1759479646225.jpg";
import thumb54 from "@/public/thumbnails/mmexport1759571279688.jpg";
import thumb55 from "@/public/thumbnails/mmexport1760105897670.jpg";
import thumb56 from "@/public/thumbnails/mmexport1760768744942.jpg";
import thumb57 from "@/public/thumbnails/mmexport1763047108172.jpg";
import thumb58 from "@/public/thumbnails/mmexport1763828028347.jpg";

type ImageItem = {
  staticImageData: StaticImageData;
  thumbStaticImageData: StaticImageData;
  alt: string;
};

type DomeGalleryProps = {
  images?: ImageItem[];
  fit?: number;
  fitBasis?: "auto" | "min" | "max" | "width" | "height";
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  openedImageMaxHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
};

export type ItemDef = {
  staticImageData: StaticImageData;
  alt: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
  thumbStaticImageData: StaticImageData;
};

const DEFAULT_IMAGES: ImageItem[] = [
  { staticImageData: img1, thumbStaticImageData: thumb1, alt: "Gallery Image" },
  { staticImageData: img2, thumbStaticImageData: thumb2, alt: "Gallery Image" },
  { staticImageData: img3, thumbStaticImageData: thumb3, alt: "Gallery Image" },
  { staticImageData: img4, thumbStaticImageData: thumb4, alt: "Gallery Image" },
  { staticImageData: img5, thumbStaticImageData: thumb5, alt: "Gallery Image" },
  { staticImageData: img6, thumbStaticImageData: thumb6, alt: "Gallery Image" },
  { staticImageData: img7, thumbStaticImageData: thumb7, alt: "Gallery Image" },
  { staticImageData: img8, thumbStaticImageData: thumb8, alt: "Gallery Image" },
  { staticImageData: img9, thumbStaticImageData: thumb9, alt: "Gallery Image" },
  {
    staticImageData: img10,
    thumbStaticImageData: thumb10,
    alt: "Gallery Image",
  },
  {
    staticImageData: img11,
    thumbStaticImageData: thumb11,
    alt: "Gallery Image",
  },
  {
    staticImageData: img12,
    thumbStaticImageData: thumb12,
    alt: "Gallery Image",
  },
  {
    staticImageData: img13,
    thumbStaticImageData: thumb13,
    alt: "Gallery Image",
  },
  {
    staticImageData: img14,
    thumbStaticImageData: thumb14,
    alt: "Gallery Image",
  },
  {
    staticImageData: img15,
    thumbStaticImageData: thumb15,
    alt: "Gallery Image",
  },
  {
    staticImageData: img16,
    thumbStaticImageData: thumb16,
    alt: "Gallery Image",
  },
  {
    staticImageData: img17,
    thumbStaticImageData: thumb17,
    alt: "Gallery Image",
  },
  {
    staticImageData: img18,
    thumbStaticImageData: thumb18,
    alt: "Gallery Image",
  },
  {
    staticImageData: img19,
    thumbStaticImageData: thumb19,
    alt: "Gallery Image",
  },
  {
    staticImageData: img20,
    thumbStaticImageData: thumb20,
    alt: "Gallery Image",
  },
  {
    staticImageData: img21,
    thumbStaticImageData: thumb21,
    alt: "Gallery Image",
  },
  {
    staticImageData: img22,
    thumbStaticImageData: thumb22,
    alt: "Gallery Image",
  },
  {
    staticImageData: img23,
    thumbStaticImageData: thumb23,
    alt: "Gallery Image",
  },
  {
    staticImageData: img24,
    thumbStaticImageData: thumb24,
    alt: "Gallery Image",
  },
  {
    staticImageData: img25,
    thumbStaticImageData: thumb25,
    alt: "Gallery Image",
  },
  {
    staticImageData: img26,
    thumbStaticImageData: thumb26,
    alt: "Gallery Image",
  },
  {
    staticImageData: img27,
    thumbStaticImageData: thumb27,
    alt: "Gallery Image",
  },
  {
    staticImageData: img28,
    thumbStaticImageData: thumb28,
    alt: "Gallery Image",
  },
  {
    staticImageData: img29,
    thumbStaticImageData: thumb29,
    alt: "Gallery Image",
  },
  {
    staticImageData: img30,
    thumbStaticImageData: thumb30,
    alt: "Gallery Image",
  },
  {
    staticImageData: img31,
    thumbStaticImageData: thumb31,
    alt: "Gallery Image",
  },
  {
    staticImageData: img32,
    thumbStaticImageData: thumb32,
    alt: "Gallery Image",
  },
  {
    staticImageData: img33,
    thumbStaticImageData: thumb33,
    alt: "Gallery Image",
  },
  {
    staticImageData: img34,
    thumbStaticImageData: thumb34,
    alt: "Gallery Image",
  },
  {
    staticImageData: img35,
    thumbStaticImageData: thumb35,
    alt: "Gallery Image",
  },
  {
    staticImageData: img36,
    thumbStaticImageData: thumb36,
    alt: "Gallery Image",
  },
  {
    staticImageData: img37,
    thumbStaticImageData: thumb37,
    alt: "Gallery Image",
  },
  {
    staticImageData: img38,
    thumbStaticImageData: thumb38,
    alt: "Gallery Image",
  },
  {
    staticImageData: img39,
    thumbStaticImageData: thumb39,
    alt: "Gallery Image",
  },
  {
    staticImageData: img40,
    thumbStaticImageData: thumb40,
    alt: "Gallery Image",
  },
  {
    staticImageData: img41,
    thumbStaticImageData: thumb41,
    alt: "Gallery Image",
  },
  {
    staticImageData: img42,
    thumbStaticImageData: thumb42,
    alt: "Gallery Image",
  },
  {
    staticImageData: img43,
    thumbStaticImageData: thumb43,
    alt: "Gallery Image",
  },
  {
    staticImageData: img44,
    thumbStaticImageData: thumb44,
    alt: "Gallery Image",
  },
  {
    staticImageData: img45,
    thumbStaticImageData: thumb45,
    alt: "Gallery Image",
  },
  {
    staticImageData: img46,
    thumbStaticImageData: thumb46,
    alt: "Gallery Image",
  },
  {
    staticImageData: img47,
    thumbStaticImageData: thumb47,
    alt: "Gallery Image",
  },
  {
    staticImageData: img48,
    thumbStaticImageData: thumb48,
    alt: "Gallery Image",
  },
  {
    staticImageData: img49,
    thumbStaticImageData: thumb49,
    alt: "Gallery Image",
  },
  {
    staticImageData: img50,
    thumbStaticImageData: thumb50,
    alt: "Gallery Image",
  },
  {
    staticImageData: img51,
    thumbStaticImageData: thumb51,
    alt: "Gallery Image",
  },
  {
    staticImageData: img52,
    thumbStaticImageData: thumb52,
    alt: "Gallery Image",
  },
  {
    staticImageData: img53,
    thumbStaticImageData: thumb53,
    alt: "Gallery Image",
  },
  {
    staticImageData: img54,
    thumbStaticImageData: thumb54,
    alt: "Gallery Image",
  },
  {
    staticImageData: img55,
    thumbStaticImageData: thumb55,
    alt: "Gallery Image",
  },
  {
    staticImageData: img56,
    thumbStaticImageData: thumb56,
    alt: "Gallery Image",
  },
  {
    staticImageData: img57,
    thumbStaticImageData: thumb57,
    alt: "Gallery Image",
  },
  {
    staticImageData: img58,
    thumbStaticImageData: thumb58,
    alt: "Gallery Image",
  },
];

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35,
};

const cssStyles = `
    .sphere-root {
      --radius: 520px;
      --viewer-pad: 72px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
    }
    
    .sphere-root * { 
      box-sizing: border-box;
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
    }
    
    .sphere-root img {
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
      pointer-events: none;
    }
    
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
    
    .stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      margin: auto;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
    }
    
    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }
    
    .sphere-item {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      top: -999px;
      bottom: -999px;
      left: -999px;
      right: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      transition: transform 300ms;
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) 
                 rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) 
                 translateZ(var(--radius));
    }
    
    .sphere-root[data-enlarging="true"] .scrim {
      opacity: 1 !important;
      pointer-events: all !important;
    }
    
    @media (max-aspect-ratio: 1/1) {
      .viewer-frame {
        height: auto !important;
        width: 100% !important;
      }
    }
    
    .item__image {
      position: absolute;
      inset: 10px;
      border-radius: var(--tile-radius, 12px);
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transition: transform 300ms;
      pointer-events: auto;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    .item__image--reference {
      position: absolute;
      inset: 10px;
      pointer-events: none;
    }
  `;

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-3, -1, 1, 3];
  const oddYs = [-2, 0, 2, 4];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;

  if (pool.length > totalSlots) {
    console.warn(
      `[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.`,
    );
  }

  const usedImages = Array.from(
    { length: totalSlots },
    (_, i) => pool[i % pool.length],
  );

  for (let i = 1; i < usedImages.length; i++) {
    if (
      usedImages[i].staticImageData.src ===
      usedImages[i - 1].staticImageData.src
    ) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].staticImageData !== usedImages[i].staticImageData) {
          const tmp = usedImages[i];
          usedImages[i] = usedImages[j];
          usedImages[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    staticImageData: usedImages[i].staticImageData,
    thumbStaticImageData: usedImages[i].thumbStaticImageData,
    alt: usedImages[i].alt,
  }));
}

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = "auto",
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = "#060010",
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = "400px",
  openedImageHeight = "400px",
  openedImageMaxHeight,
  imageBorderRadius = "30px",
  openedImageBorderRadius = "30px",
  grayscale = true,
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const cancelTapRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const pointerTypeRef = useRef<"mouse" | "pen" | "touch">("mouse");
  const tapTargetRef = useRef<HTMLElement | null>(null);
  const openingRef = useRef(false);
  const lastDragEndAt = useRef(0);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedImage = useMemo(() => {
    if (selectedIndex === null) return null;
    const item = images[selectedIndex];
    if (!item) return null;
    return item;
  }, [images, selectedIndex]);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      // Optimizasyon: lockedRadiusRef varsa doğrudan pixel değeri kullan, yoksa CSS var'a fallback yap (ilk render shift riskini azaltır ama radius genelde resize'da set edilir)
      const r = lockedRadiusRef.current;
      const dist = r !== null ? `-${r}px` : `calc(var(--radius) * -1)`;
      el.style.transform = `translateZ(${dist}) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  }, []);

  const lockedRadiusRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let rafId: number | null = null;

    const ro = new ResizeObserver((entries) => {
      // Throttle resize updates with requestAnimationFrame
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const entry = entries[0];
        if (!entry) return;

        const cr = entry.contentRect;
        const w = Math.max(1, cr.width),
          h = Math.max(1, cr.height);
        const minDim = Math.min(w, h),
          maxDim = Math.max(w, h),
          aspect = w / h;
        let basis: number;
        switch (fitBasis) {
          case "min":
            basis = minDim;
            break;
          case "max":
            basis = maxDim;
            break;
          case "width":
            basis = w;
            break;
          case "height":
            basis = h;
            break;
          default:
            basis = aspect >= 1.3 ? w : minDim;
        }
        let radius = basis * fit;
        const heightGuard = h * 1.35;
        radius = Math.min(radius, heightGuard);
        radius = clamp(radius, minRadius, maxRadius);
        lockedRadiusRef.current = Math.round(radius);

        const viewerPad = Math.max(8, Math.round(minDim * padFactor));
        root.style.setProperty("--radius", `${lockedRadiusRef.current}px`);
        root.style.setProperty("--viewer-pad", `${viewerPad}px`);
        root.style.setProperty("--overlay-blur-color", overlayBlurColor);
        root.style.setProperty("--tile-radius", imageBorderRadius);
        root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
        root.style.setProperty(
          "--image-filter",
          grayscale ? "grayscale(1)" : "none",
        );
        applyTransform(rotationRef.current.x, rotationRef.current.y);
      });
    });

    ro.observe(root);
    return () => {
      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius,
    openedImageWidth,
    openedImageHeight,
    applyTransform,
  ]);

  useEffect(() => {
    // Initial size calculation might be needed if ResizeObserver doesn't fire immediately or radius is needed before first resize
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, [applyTransform]);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(
          rotationRef.current.x - vY / 200,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg,
        );
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia],
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();

        const evt = event as PointerEvent;
        pointerTypeRef.current = (evt.pointerType as any) || "mouse";

        draggingRef.current = true;
        cancelTapRef.current = false;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
        const potential = (evt.target as Element).closest?.(
          ".item__image",
        ) as HTMLElement | null;
        tapTargetRef.current = potential || null;
      },
      onDrag: ({
        event,
        last,
        canceled,
        velocity: velArr = [0, 0],
        direction: dirArr = [0, 0],
        movement: [mx, my],
      }) => {
        if (canceled) {
          draggingRef.current = false;
          return;
        }
        if (
          focusedElRef.current ||
          !draggingRef.current ||
          !startPosRef.current
        )
          return;

        const evt = event as PointerEvent;

        // Manuel hesap yerine movement kullanıyoruz
        const dxTotal = mx;
        const dyTotal = my;

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg,
        );
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;

        const cur = rotationRef.current;
        if (cur.x !== nextX || cur.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }

        if (last) {
          draggingRef.current = false;
          let isTap = false;

          if (startPosRef.current) {
            const dx = evt.clientX - startPosRef.current.x;
            const dy = evt.clientY - startPosRef.current.y;
            const dist2 = dx * dx + dy * dy;
            const TAP_THRESH_PX = pointerTypeRef.current === "touch" ? 10 : 6;
            if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) {
              isTap = true;
            }
          }

          let [vMagX, vMagY] = velArr;
          const [dirX, dirY] = dirArr;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;

          if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001) {
            vx = (mx / dragSensitivity) * 0.02;
            vy = (my / dragSensitivity) * 0.02;
          }

          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy);
          }
          startPosRef.current = null;
          cancelTapRef.current = !isTap;

          if (isTap && tapTargetRef.current && !focusedElRef.current) {
            const src = tapTargetRef.current.getAttribute("data-src");
            if (src) {
              setSelectedIndex(
                images.findIndex((img) => img.staticImageData.src === src),
              );
            }
          }
          tapTargetRef.current = null;

          if (cancelTapRef.current)
            setTimeout(() => (cancelTapRef.current = false), 120);
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      },
    },
    { target: mainRef, eventOptions: { passive: false } },
  );

  const close = useCallback(() => {
    setSelectedIndex(null);
    if (focusedElRef.current) {
      focusedElRef.current.style.visibility = "";
      focusedElRef.current = null;
    }
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % images.length;
    });
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const openItemFromElement = useCallback(
    (item: ItemDef) => {
      setSelectedIndex(
        images.findIndex(
          (img) => img.staticImageData.src === item.staticImageData.src,
        ),
      );
    },
    [images],
  );

  const sphereRootStyle = useMemo<React.CSSProperties>(
    () => ({
      ["--segments-x" as any]: segments,
      ["--segments-y" as any]: segments,
      ["--overlay-blur-color" as any]: overlayBlurColor,
      ["--tile-radius" as any]: imageBorderRadius,
      ["--enlarge-radius" as any]: openedImageBorderRadius,
      ["--image-filter" as any]: grayscale ? "grayscale(1)" : "none",
    }),
    [
      segments,
      overlayBlurColor,
      imageBorderRadius,
      openedImageBorderRadius,
      grayscale,
    ],
  );

  const mainStyle = useMemo<React.CSSProperties>(
    () => ({
      touchAction: "pan-y",
      WebkitUserSelect: "none",
    }),
    [],
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <div
        ref={rootRef}
        className="sphere-root relative h-full w-full"
        style={sphereRootStyle}
      >
        <main
          ref={mainRef}
          className="absolute inset-0 grid place-items-center overflow-hidden bg-transparent select-none"
          style={mainStyle}
        >
          <div className="stage">
            <DomeSphere
              ref={sphereRef}
              items={items}
              draggingRef={draggingRef}
              movedRef={movedRef}
              lastDragEndAtRef={lastDragEndAt}
              openingRef={openingRef}
              onOpenItem={openItemFromElement}
              imageBorderRadius={imageBorderRadius}
              grayscale={grayscale}
            />
          </div>
        </main>
        {selectedImage ? (
          <DomeViewer
            staticImageData={selectedImage.staticImageData}
            alt={selectedImage.alt}
            onClose={close}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        ) : null}
      </div>
    </>
  );
}
