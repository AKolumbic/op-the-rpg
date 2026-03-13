"use client";

import { useEffect, useRef } from "react";

export default function ZoomLinesBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;

    function onScroll() {
      if (!ref.current) return;
      const deg = window.scrollY * 0.04;
      ref.current.style.transform = `rotate(${deg}deg)`;
    }

    function loop() {
      onScroll();
      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div
        ref={ref}
        className="absolute inset-[-100%] w-[300%] h-[300%] zoom-lines-raw will-change-transform"
      />
    </div>
  );
}
