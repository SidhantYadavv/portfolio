"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  'a, button, [role="slider"], video, label, summary, input, select, textarea';

/**
 * A scope-style measurement cursor: a yellow dot on the pointer and a reticle
 * ring that trails it, opening up over anything clickable.
 * Only for fine pointers (mouse/trackpad); touch devices keep native behaviour.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let raf = 0;

    const place = () => {
      raf = 0;
      // The ring eases toward the pointer; the dot is always exact
      const k = reduceMotion ? 1 : 0.22;
      rx += (x - rx) * k;
      ry += (y - ry) * k;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (Math.abs(x - rx) + Math.abs(y - ry) > 0.2) {
        raf = requestAnimationFrame(place);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!root.classList.contains("cursor-visible")) {
        // First move: jump the ring to the pointer instead of flying in
        rx = x;
        ry = y;
        root.classList.add("cursor-visible");
      }
      const target = e.target as Element | null;
      root.classList.toggle(
        "cursor-active",
        Boolean(target?.closest?.(INTERACTIVE)),
      );
      schedule();
    };
    const onLeave = () => root.classList.remove("cursor-visible");
    const onDown = () => root.classList.add("cursor-down");
    const onUp = () => root.classList.remove("cursor-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.classList.remove(
        "has-custom-cursor",
        "cursor-visible",
        "cursor-active",
        "cursor-down",
      );
    };
  }, []);

  return (
    <div aria-hidden className="cursor-layer">
      <div ref={ringRef} className="cursor-ring">
        <svg viewBox="-20 -20 40 40" className="cursor-reticle">
          <circle r="11" />
          <path d="M0 -19V-14M0 14V19M-19 0H-14M14 0H19" />
        </svg>
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
