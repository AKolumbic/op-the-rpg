"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

const COLOR_MAP: Record<string, string> = {
  "comic-yellow": "var(--card-border)",
  "comic-red": "var(--card-border)",
  "comic-green": "var(--card-border)",
  "comic-blue": "var(--card-border)",
  "comic-orange": "var(--card-border)",
  "comic-purple": "var(--card-border)",
  "comic-cyan": "var(--card-border)",
  "comic-magenta": "var(--card-border)",
};

export default function WipeTransition() {
  const router = useRouter();
  const [wipe, setWipe] = useState<{ active: boolean; color: string }>({
    active: false,
    color: "var(--accent)",
  });

  const handleWipe = useCallback(
    (href: string, colorKey: string) => {
      const color = COLOR_MAP[colorKey] || "var(--accent)";
      setWipe({ active: true, color });

      setTimeout(() => {
        router.push(href);
      }, 500);
    },
    [router]
  );

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("[data-wipe-link]");
      if (!target) return;

      e.preventDefault();
      e.stopPropagation();
      const href = target.getAttribute("data-wipe-link")!;
      const colorKey = target.getAttribute("data-wipe-color") || "accent";
      handleWipe(href, colorKey);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [handleWipe]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: wipe.color,
        transform: wipe.active ? "translateX(0)" : "translateX(105%)",
        transition: "transform 0.45s cubic-bezier(0.77, 0, 0.175, 1)",
        pointerEvents: "none",
      }}
    />
  );
}
