import { useEffect, useMemo, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useGesture } from "@use-gesture/react";
import DomeSphere from "./DomeSphere";
import DomeViewer from "./DomeViewer";

type ImageItem = string | { src: string; alt?: string };

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
  src: string;
  alt: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

const DEFAULT_IMAGES: ImageItem[] = [
  { src: "/IMG20250629125814.jpg", alt: "Gallery Image" },
  { src: "/IMG20250629174030.jpg", alt: "Gallery Image" },
  { src: "/IMG20250629200018.jpg", alt: "Gallery Image" },
  { src: "/IMG20250630095616.jpg", alt: "Gallery Image" },
  { src: "/IMG20250630220227.jpg", alt: "Gallery Image" },
  { src: "/IMG20250701153607.jpg", alt: "Gallery Image" },
  { src: "/IMG20250701160323.jpg", alt: "Gallery Image" },
  { src: "/IMG20250701160438.jpg", alt: "Gallery Image" },
  { src: "/IMG20250701160439.jpg", alt: "Gallery Image" },
  { src: "/IMG20250701161222.jpg", alt: "Gallery Image" },
  { src: "/IMG20250701162053.jpg", alt: "Gallery Image" },
  { src: "/IMG20250701163200.jpg", alt: "Gallery Image" },
  { src: "/IMG20250701163329.jpg", alt: "Gallery Image" },
  { src: "/IMG20250701185240.jpg", alt: "Gallery Image" },
  { src: "/IMG20250701230951.jpg", alt: "Gallery Image" },
  { src: "/IMG20250702142144.jpg", alt: "Gallery Image" },
  { src: "/IMG20250702193547.jpg", alt: "Gallery Image" },
  { src: "/IMG20250705160457.jpg", alt: "Gallery Image" },
  { src: "/IMG_20250729_000943_294.jpg", alt: "Gallery Image" },
  { src: "/IMG_20251117_170146_225.webp", alt: "Gallery Image" },
  { src: "/IMG_20251117_182931_748.webp", alt: "Gallery Image" },
  { src: "/IMG_20251207_224239_725.webp", alt: "Gallery Image" },
  {
    src: "/Screenshot_2025-05-31-12-08-06-10_1c337646f29875672b5a61192b9010f9.jpg",
    alt: "Gallery Image",
  },
  {
    src: "/Screenshot_2025-07-08-19-42-25-60_1c337646f29875672b5a61192b9010f9.jpg",
    alt: "Gallery Image",
  },
  { src: "/mmexport1748954376801.jpg", alt: "Gallery Image" },
  { src: "/mmexport1751352933226.jpg", alt: "Gallery Image" },
  { src: "/mmexport1751438745340.jpg", alt: "Gallery Image" },
  { src: "/mmexport1751543079225.jpg", alt: "Gallery Image" },
  { src: "/mmexport1753803034214.jpg", alt: "Gallery Image" },
  { src: "/mmexport1753803037487.jpg", alt: "Gallery Image" },
  { src: "/mmexport1753803076148.jpg", alt: "Gallery Image" },
  { src: "/mmexport1753803316696.jpg", alt: "Gallery Image" },
  { src: "/mmexport1755010072499.jpg", alt: "Gallery Image" },
  { src: "/mmexport1756028448627.jpg", alt: "Gallery Image" },
  { src: "/mmexport1756242249169.jpg", alt: "Gallery Image" },
  { src: "/mmexport1756242306212.jpg", alt: "Gallery Image" },
  { src: "/mmexport1756242339968.jpg", alt: "Gallery Image" },
  { src: "/mmexport1756242354484.jpg", alt: "Gallery Image" },
  { src: "/mmexport1759479639813.jpg", alt: "Gallery Image" },
  { src: "/mmexport1759479646225.jpg", alt: "Gallery Image" },
  { src: "/mmexport1759571279688.jpg", alt: "Gallery Image" },
  { src: "/mmexport1760105897670.jpg", alt: "Gallery Image" },
  { src: "/mmexport1760768744942.jpg", alt: "Gallery Image" },
  { src: "/mmexport1763047108172.jpg", alt: "Gallery Image" },
  { src: "/mmexport1763828028347.jpg", alt: "Gallery Image" },
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
  if (pool.length === 0) {
    return coords.map((c) => ({ ...c, src: "", alt: "" }));
  }
  if (pool.length > totalSlots) {
    console.warn(
      `[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.`,
    );
  }

  const normalizedImages = pool.map((image) => {
    if (typeof image === "string") {
      return { src: image, alt: "" };
    }
    return { src: image.src || "", alt: image.alt || "" };
  });

  const usedImages = Array.from(
    { length: totalSlots },
    (_, i) => normalizedImages[i % normalizedImages.length],
  );

  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
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
    src: usedImages[i].src,
    alt: usedImages[i].alt,
  }));
}

function computeItemBaseRotation(
  offsetX: number,
  offsetY: number,
  sizeX: number,
  sizeY: number,
  segments: number,
) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
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
  const [mounted, setMounted] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);
  const originalTilePositionRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

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
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);

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

        const enlargedOverlay = viewerRef.current?.querySelector(
          ".enlarge",
        ) as HTMLElement;
        if (enlargedOverlay && frameRef.current && mainRef.current) {
          const frameR = frameRef.current.getBoundingClientRect();
          const mainR = mainRef.current.getBoundingClientRect();

          const hasCustomSize = openedImageWidth && openedImageHeight;
          if (hasCustomSize) {
            // Style'ı prop değerlerine güncelle
            enlargedOverlay.style.width = openedImageWidth;
            enlargedOverlay.style.height = openedImageHeight;

            // Layout reflow
            void enlargedOverlay.offsetWidth;

            const overlayRect = enlargedOverlay.getBoundingClientRect();

            // parentRect hesabı (offsetParent kimse ona göre)
            const offsetParent =
              (enlargedOverlay.offsetParent as HTMLElement) || document.body;
            const parentRect = offsetParent.getBoundingClientRect();

            // Overlay'in offsetParent içindeki konumu:
            // Frame'in solundan parent'ın solunu çıkar (parent içindeki frame offseti)
            // + Frame içinde ortala
            const centeredLeft =
              frameR.left -
              parentRect.left +
              (frameR.width - overlayRect.width) / 2;
            const centeredTop =
              frameR.top -
              parentRect.top +
              (frameR.height - overlayRect.height) / 2;

            enlargedOverlay.style.left = `${centeredLeft}px`;
            enlargedOverlay.style.top = `${centeredTop}px`;
          } else {
            enlargedOverlay.style.left = `${frameR.left - mainR.left}px`;
            enlargedOverlay.style.top = `${frameR.top - mainR.top}px`;
            enlargedOverlay.style.width = `${frameR.width}px`;
            enlargedOverlay.style.height = `${frameR.height}px`;
          }
        }
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
            openItemFromElement(tapTargetRef.current);
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
    if (performance.now() - openStartedAtRef.current < 250) return;
    const el = focusedElRef.current;
    if (!el) return;
    const parent = el.parentElement as HTMLElement;
    const overlay = viewerRef.current?.querySelector(
      ".enlarge",
    ) as HTMLElement | null;
    if (!overlay) return;

    const refDiv = parent.querySelector(
      ".item__image--reference",
    ) as HTMLElement | null;

    const originalPos = originalTilePositionRef.current;
    if (!originalPos) {
      overlay.remove();
      if (refDiv) refDiv.remove();
      parent.style.setProperty("--rot-y-delta", `0deg`);
      parent.style.setProperty("--rot-x-delta", `0deg`);
      el.style.visibility = "";
      (el.style as any).zIndex = 0;
      focusedElRef.current = null;
      rootRef.current?.removeAttribute("data-enlarging");
      if (scrimRef.current) {
        scrimRef.current.style.pointerEvents = "none";
        scrimRef.current.style.opacity = "0";
      }
      openingRef.current = false;
      return;
    }

    const currentRect = overlay.getBoundingClientRect();

    const animatingOverlay = document.createElement("div");
    animatingOverlay.className = "enlarge-closing";
    animatingOverlay.style.cssText = `
        position: fixed;
        left: ${currentRect.left}px;
        top: ${currentRect.top}px;
        width: ${currentRect.width}px;
        height: ${currentRect.height}px;
        z-index: 9999;
        border-radius: ${openedImageBorderRadius};
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
        transition: all ${enlargeTransitionMs}ms ease-out;
        pointer-events: none;
        margin: 0;
        transform: none;
        filter: ${grayscale ? "grayscale(1)" : "none"};
      `;

    const originalImg = overlay.querySelector("img");
    if (originalImg) {
      const img = originalImg.cloneNode() as HTMLImageElement;
      img.style.cssText = "width: 100%; height: 100%; object-fit: cover;";
      animatingOverlay.appendChild(img);
    }

    overlay.remove();
    document.body.appendChild(animatingOverlay);

    void animatingOverlay.getBoundingClientRect();

    requestAnimationFrame(() => {
      animatingOverlay.style.left = originalPos.left + "px";
      animatingOverlay.style.top = originalPos.top + "px";
      animatingOverlay.style.width = originalPos.width + "px";
      animatingOverlay.style.height = originalPos.height + "px";
      animatingOverlay.style.opacity = "0";
    });

    if (scrimRef.current) {
      scrimRef.current.style.pointerEvents = "none";
      scrimRef.current.style.opacity = "0";
    }

    const cleanup = () => {
      animatingOverlay.remove();
      originalTilePositionRef.current = null;

      if (refDiv) refDiv.remove();
      parent.style.transition = "none";
      el.style.transition = "none";

      parent.style.setProperty("--rot-y-delta", `0deg`);
      parent.style.setProperty("--rot-x-delta", `0deg`);

      requestAnimationFrame(() => {
        el.style.visibility = "";
        el.style.opacity = "0";
        (el.style as any).zIndex = 0;
        focusedElRef.current = null;
        rootRef.current?.removeAttribute("data-enlarging");

        requestAnimationFrame(() => {
          parent.style.transition = "";
          el.style.transition = "opacity 300ms ease-out";

          requestAnimationFrame(() => {
            el.style.opacity = "1";
            setTimeout(() => {
              el.style.transition = "";
              el.style.opacity = "";
              openingRef.current = false;
            }, 300);
          });
        });
      });
    };

    animatingOverlay.addEventListener("transitionend", cleanup, {
      once: true,
    });

    setMounted(false);
  }, [enlargeTransitionMs, openedImageBorderRadius, grayscale]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const openItemFromElement = useCallback((el: HTMLElement) => {
    setMounted(true);
    if (openingRef.current) return;
    openingRef.current = true;
    openStartedAtRef.current = performance.now();
    const parent = el.parentElement as HTMLElement;
    focusedElRef.current = el;
    el.setAttribute("data-focused", "true");
    const offsetX = getDataNumber(parent, "offsetX", 0);
    const offsetY = getDataNumber(parent, "offsetY", 0);
    if (scrimRef.current) scrimRef.current.style.pointerEvents = "auto";
    const sizeX = getDataNumber(parent, "sizeX", 2);
    const sizeY = getDataNumber(parent, "sizeY", 2);
    const parentRot = computeItemBaseRotation(
      offsetX,
      offsetY,
      sizeX,
      sizeY,
      segments,
    );
    const parentY = normalizeAngle(parentRot.rotateY);
    const globalY = normalizeAngle(rotationRef.current.y);
    let rotY = -(parentY + globalY) % 360;
    if (rotY < -180) rotY += 360;
    const rotX = -parentRot.rotateX - rotationRef.current.x;
    parent.style.setProperty("--rot-y-delta", `${rotY}deg`);
    parent.style.setProperty("--rot-x-delta", `${rotX}deg`);
    const refDiv = document.createElement("div");
    refDiv.className = "item__image item__image--reference opacity-0";
    refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
    parent.appendChild(refDiv);

    void refDiv.offsetHeight;

    const tileR = refDiv.getBoundingClientRect();
    const mainR = mainRef.current?.getBoundingClientRect();
    const frameR = frameRef.current?.getBoundingClientRect();

    if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
      openingRef.current = false;
      focusedElRef.current = null;
      parent.removeChild(refDiv);
      return;
    }

    originalTilePositionRef.current = {
      left: tileR.left,
      top: tileR.top,
      width: tileR.width,
      height: tileR.height,
    };
    el.style.visibility = "hidden";
    (el.style as any).zIndex = 0;
    const overlay = document.createElement("div");
    overlay.className = "enlarge";
    overlay.style.cssText = `position:absolute; left:0; top:0; width:${frameR.width}px; height:${frameR.height}px; opacity:0; z-index:30; will-change:transform,opacity; transform-origin:top left; transition:transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease; border-radius:${openedImageBorderRadius}; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.35);`;
    const rawSrc =
      parent.dataset.src ||
      (el.querySelector("img") as HTMLImageElement)?.src ||
      "";
    const rawAlt =
      parent.dataset.alt ||
      (el.querySelector("img") as HTMLImageElement)?.alt ||
      "";
    const img = document.createElement("img");
    img.src = rawSrc;
    img.alt = rawAlt;
    img.style.cssText = `width:100%; height:100%; object-fit:cover; filter:${grayscale ? "grayscale(1)" : "none"};`;
    overlay.appendChild(img);
    frameRef.current!.appendChild(overlay);
    const tx0 = tileR.left - frameR.left;
    const ty0 = tileR.top - frameR.top;
    const sx0 = tileR.width / frameR.width;
    const sy0 = tileR.height / frameR.height;

    const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
    const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;

    overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;
    setTimeout(() => {
      if (!overlay.parentElement) return;
      overlay.style.opacity = "1";
      overlay.style.transform = "translate(0px, 0px) scale(1, 1)";
      rootRef.current?.setAttribute("data-enlarging", "true");
      if (scrimRef.current) {
        scrimRef.current.style.pointerEvents = "auto";
        scrimRef.current.style.opacity = "1";
      }
    }, 16);
    const wantsResize = openedImageWidth || openedImageHeight;
    if (wantsResize) {
      const onFirstEnd = (ev: TransitionEvent) => {
        if (ev.propertyName !== "transform") return;
        overlay.removeEventListener("transitionend", onFirstEnd);
        const prevTransition = overlay.style.transition;
        overlay.style.transition = "none";
        const tempWidth = openedImageWidth || `${frameR.width}px`;
        const tempHeight = openedImageHeight || `${frameR.height}px`;
        overlay.style.width = tempWidth;
        overlay.style.height = tempHeight;
        const newRect = overlay.getBoundingClientRect();
        overlay.style.width = frameR.width + "px";
        overlay.style.height = frameR.height + "px";
        void overlay.offsetWidth;
        overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
        const centeredLeft = (frameR.width - newRect.width) / 2;
        const centeredTop = (frameR.height - newRect.height) / 2;
        requestAnimationFrame(() => {
          overlay.style.left = `${centeredLeft}px`;
          overlay.style.top = `${centeredTop}px`;
          overlay.style.width = tempWidth;
          overlay.style.height = tempHeight;
          if (openedImageMaxHeight) {
            overlay.style.maxHeight = openedImageMaxHeight;
          }
        });
        const cleanupSecond = () => {
          overlay.removeEventListener("transitionend", cleanupSecond);
          overlay.style.transition = prevTransition;
        };
        overlay.addEventListener("transitionend", cleanupSecond, {
          once: true,
        });
      };
      overlay.addEventListener("transitionend", onFirstEnd);
    }
  }, []);

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

  const viewerContainerStyle = useMemo<React.CSSProperties>(
    () =>
      ({
        padding: "var(--viewer-pad)",
        "--enlarge-radius": openedImageBorderRadius,
        "--viewer-pad":
          rootRef.current?.style.getPropertyValue("--viewer-pad") || "72px",
      }) as React.CSSProperties,
    [openedImageBorderRadius],
  );

  const scrimStyle = useMemo<React.CSSProperties>(
    () => ({
      background: "rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(3px)",
      pointerEvents: "none",
    }),
    [],
  );

  const viewerFrameStyle = useMemo<React.CSSProperties>(
    () => ({
      borderRadius: `var(--enlarge-radius, ${openedImageBorderRadius})`,
    }),
    [openedImageBorderRadius],
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

        {mounted && (
          <DomeViewer
            viewerRef={viewerRef}
            scrimRef={scrimRef}
            frameRef={frameRef}
            onClose={close}
            viewerContainerStyle={viewerContainerStyle}
            scrimStyle={scrimStyle}
            viewerFrameStyle={viewerFrameStyle}
          />
        )}
      </div>
    </>
  );
}
