import React, { memo } from "react";
import { createPortal } from "react-dom";
import CustomImage from "./CustomImage";
import { StaticImageData } from "next/image";
import CustomImageWrapper from "./CustomImageWrapper";

interface DomeViewerProps {
  staticImageData: StaticImageData;
  alt: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const DomeViewer = ({
  staticImageData,
  alt,
  onClose,
  onNext,
  onPrev,
}: DomeViewerProps) => {
  const handleRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        node.focus();

        const onKey = (e: KeyboardEvent) => {
          if (e.key === "Escape") onClose();
          if (e.key === "ArrowRight" || e.key === "ArrowDown") onNext();
          if (e.key === "ArrowLeft" || e.key === "ArrowUp") onPrev();

          if (e.key === "Tab") {
            const focusableElements = node.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[
              focusableElements.length - 1
            ] as HTMLElement;

            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
              }
            } else {
              if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
              }
            }
          }
        };

        window.addEventListener("keydown", onKey);

        return () => window.removeEventListener("keydown", onKey);
      }
    },
    [onClose, onNext, onPrev],
  );

  return createPortal(
    <div
      className="fixed inset-0 z-1 content-center bg-black/80 p-4 backdrop-blur-md"
      tabIndex={-1}
      ref={handleRef}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute top-1/2 left-2 z-1 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white mix-blend-difference transition-colors hover:bg-white/20 sm:left-4"
        aria-label="Previous Image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <CustomImageWrapper
        key={staticImageData.src}
        customImageProps={{
          src: staticImageData,
          alt: alt,
          style: {
            aspectRatio: staticImageData.width / staticImageData.height,
          },
          width: staticImageData.width,
          height: staticImageData.height,
          className: `mx-auto max-h-full max-w-full rounded-2xl object-contain ${staticImageData.height > staticImageData.width ? "w-fit" : "h-fit w-fit"}`,
          placeholder: "blur",
          blurDataURL: staticImageData.blurDataURL,
          onClick: (e) => e.stopPropagation(),
        }}
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white mix-blend-difference transition-colors hover:bg-white/20 sm:right-4"
        aria-label="Next Image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white mix-blend-difference transition-colors hover:bg-white/20 sm:top-8 sm:right-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>,
    document.body,
  );
};

export default memo(DomeViewer);
