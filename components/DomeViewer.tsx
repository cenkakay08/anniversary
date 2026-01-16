import React, { memo } from "react";
import { createPortal } from "react-dom";

interface DomeViewerProps {
  viewerRef: React.RefObject<HTMLDivElement | null>;
  scrimRef: React.RefObject<HTMLDivElement | null>;
  frameRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  viewerContainerStyle: React.CSSProperties;
  scrimStyle: React.CSSProperties;
  viewerFrameStyle: React.CSSProperties;
}

const DomeViewer = ({
  viewerRef,
  scrimRef,
  frameRef,
  onClose,
  viewerContainerStyle,
  scrimStyle,
  viewerFrameStyle,
}: DomeViewerProps) => {
  return createPortal(
    <div
      ref={viewerRef}
      className="pointer-events-none fixed inset-0 z-9999 flex transform-gpu items-center justify-center"
      style={viewerContainerStyle}
    >
      <div
        ref={scrimRef}
        onClick={onClose}
        className="scrim absolute inset-0 z-10 opacity-0 transition-opacity duration-500"
        style={scrimStyle}
      />
      <div
        ref={frameRef}
        className="viewer-frame pointer-events-none relative flex aspect-square h-full max-w-full"
        style={viewerFrameStyle}
      />
    </div>,
    document.body,
  );
};

export default memo(DomeViewer);
