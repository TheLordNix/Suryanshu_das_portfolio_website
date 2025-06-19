import React, { useRef } from "react";

/**
 * SlideInBox - a mobile modal with a top bar and close button (right side)
 * Props:
 * - open: boolean
 * - onClose: function
 * - title: string
 * - children: ReactNode
 * - maxHeight: string (optional, e.g. "80vh" or "40vh")
 */
export default function SlideInBox({
  open,
  onClose,
  title,
  children,
  maxHeight = "80vh",
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) {
  const sheetRef = useRef(null);
  const startY = useRef(null);
  const currentY = useRef(null);

  // Touch handlers for swipe down to close
  const handleTouchStart = (e) => {
    if (onTouchStart) onTouchStart(e);
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (onTouchMove) onTouchMove(e);
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;
    if (diff > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${diff}px)`;
    }
  };

  const handleTouchEnd = (e) => {
    if (onTouchEnd) onTouchEnd(e);
    const diff = currentY.current - startY.current;
    if (diff > 80) {
      onClose();
    } else if (sheetRef.current) {
      sheetRef.current.style.transition = "transform 0.2s";
      sheetRef.current.style.transform = "translateY(0)";
      setTimeout(() => {
        if (sheetRef.current) {
          sheetRef.current.style.transition = "";
        }
      }, 200);
    }
    startY.current = null;
    currentY.current = null;
  };

  if (!open) return null;

  // Use blue top bar for About, else default dark
  const isAbout = title && title.toLowerCase() === "about";
  const topBarClass = isAbout
    ? "bg-blue-700"
    : "bg-[#232323]";

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-[rgba(30,30,30,0.3)] backdrop-blur-[4px] transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="slide-in-sheet fixed left-0 right-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-xl flex flex-col w-full max-w-full animate-slideSheet"
        style={{
          height: maxHeight,
          maxHeight: maxHeight,
          boxShadow: "0 -4px 32px rgba(0,0,0,0.18)",
          overflow: "hidden",
          transition: "bottom 0.35s cubic-bezier(0.4, 0.2, 0.6, 1)",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Bar */}
        <div className={`flex items-center justify-between ${topBarClass} text-white px-5 py-4 rounded-t-2xl font-semibold text-lg`}>
          <span className="capitalize">{title}</span>
          <button
            className="ml-auto text-2xl p-1 rounded-full hover:bg-gray-700 transition"
            onClick={onClose}
            aria-label="Close panel"
            tabIndex={0}
          >
            <span className="align-middle">▼</span>
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </div>
      </div>
      {/* Slide in animation */}
      <style>{`
        @keyframes slideSheet {
          from { bottom: -80vh; }
          to { bottom: 0; }
        }
        .animate-slideSheet {
          animation: slideSheet 0.35s cubic-bezier(0.4, 0.2, 0.6, 1) both;
        }
      `}</style>
    </>
  );
}