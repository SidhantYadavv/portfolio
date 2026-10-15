"use client";

import { useEffect, useRef } from "react";

/*
  A scope trace that draws itself down the page as you scroll.
  Desktop (xl+): runs down the left margin, bursting into a wave packet at every
  element marked data-trace-burst, and ends at a marker by the contact section.
  Narrower screens: a thin progress line under the navbar.
  Reduced motion: the trace is shown fully drawn and the pen dot is hidden.
*/

const WIDTH = 40;
const MID = WIDTH / 2;
const BURST_LEN = 104; // px of page height one wave packet spans
const BURST_AMP = 13;
const BURST_CYCLES = 3.5;
const PEN_AT = 0.55; // the pen tracks this fraction of the viewport height

type Burst = { y: number; small: boolean };

function xAt(y: number, bursts: Burst[]) {
  for (const b of bursts) {
    if (y >= b.y && y <= b.y + BURST_LEN) {
      const u = (y - b.y) / BURST_LEN;
      const amp = b.small ? BURST_AMP * 0.55 : BURST_AMP;
      return MID + amp * Math.sin(Math.PI * u) * Math.sin(2 * Math.PI * BURST_CYCLES * u);
    }
  }
  return MID;
}

function buildPath(height: number, bursts: Burst[]) {
  let d = `M${MID} 0`;
  for (const b of bursts) {
    d += ` L${MID} ${b.y.toFixed(1)}`;
    for (let y = b.y + 2; y <= b.y + BURST_LEN; y += 2) {
      d += ` L${xAt(y, bursts).toFixed(1)} ${y.toFixed(1)}`;
    }
  }
  return `${d} L${MID} ${height.toFixed(1)}`;
}

export function ScrollTrace() {
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const litRef = useRef<SVGGElement>(null);
  const clipRef = useRef<SVGRectElement>(null);
  const penRef = useRef<SVGCircleElement>(null);
  const endRef = useRef<SVGGElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const host = svg?.parentElement;
    if (!svg || !host) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let height = 0;
    let bursts: Burst[] = [];
    let raf = 0;

    const layout = () => {
      height = host.offsetHeight;
      const hostTop = host.getBoundingClientRect().top;
      bursts = [...host.querySelectorAll<HTMLElement>("[data-trace-burst]")]
        .map((el) => ({
          y: el.getBoundingClientRect().top - hostTop + 8,
          small: el.dataset.traceBurst === "small",
        }))
        .filter((b) => b.y > 0 && b.y + BURST_LEN < height - 60)
        .sort((a, b) => a.y - b.y);

      svg.setAttribute("viewBox", `0 0 ${WIDTH} ${height}`);
      svg.style.height = `${height}px`;
      const d = buildPath(height - 40, bursts);
      trackRef.current?.setAttribute("d", d);
      litRef.current
        ?.querySelectorAll("path")
        .forEach((p) => p.setAttribute("d", d));
      endRef.current?.setAttribute(
        "transform",
        `translate(${MID} ${height - 40})`,
      );
      update();
    };

    const update = () => {
      raf = 0;
      const hostTop = host.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const end = height - 40;
      // Over the last screen of scrolling the pen slides down to meet the end marker
      const max = document.documentElement.scrollHeight - vh;
      const t = Math.min(1, Math.max(0, (window.scrollY - (max - vh)) / vh));
      const endFrac = (hostTop + end) / vh;
      const frac = PEN_AT + Math.max(0, endFrac - PEN_AT) * t;
      const penY = reduceMotion
        ? height
        : Math.min(height, Math.max(0, vh * frac - hostTop));
      clipRef.current?.setAttribute("height", String(penY));

      const pen = penRef.current;
      if (pen) {
        const visible = !reduceMotion && penY > 0 && penY < end;
        pen.style.opacity = visible ? "1" : "0";
        pen.setAttribute("cx", xAt(penY, bursts).toFixed(1));
        pen.setAttribute("cy", penY.toFixed(1));
      }
      endRef.current?.classList.toggle("is-lit", penY >= end);

      if (barRef.current) {
        const p = max > 0 ? window.scrollY / max : 0;
        barRef.current.style.transform = `scaleX(${p})`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(host);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Late-loading fonts and videos can shift section positions
    document.fonts?.ready.then(layout);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        aria-hidden
        width={WIDTH}
        className="scroll-trace pointer-events-none absolute top-0 left-[calc(50%-36rem-2.75rem)] hidden overflow-visible xl:block"
      >
        <defs>
          <clipPath id="scroll-trace-clip">
            <rect ref={clipRef} x="-20" y="0" width={WIDTH + 40} height="0" />
          </clipPath>
        </defs>
        <path
          ref={trackRef}
          fill="none"
          stroke="var(--ch1)"
          strokeOpacity="0.14"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <g ref={litRef} clipPath="url(#scroll-trace-clip)" fill="none" strokeLinejoin="round" strokeLinecap="round">
          {/* Phosphor bloom, then a crisp core */}
          <path stroke="var(--ch1)" strokeOpacity="0.28" strokeWidth="5" />
          <path stroke="var(--ch1)" strokeWidth="1.6" />
        </g>
        <circle
          ref={penRef}
          r="3.5"
          fill="var(--ch1)"
          style={{ filter: "drop-shadow(0 0 6px var(--ch1))", opacity: 0 }}
        />
        <g ref={endRef} className="scroll-trace-end">
          <circle r="7" fill="var(--screen)" stroke="var(--ch1)" strokeWidth="1.5" />
          <circle r="3" fill="var(--ch1)" className="scroll-trace-end-core" />
        </g>
      </svg>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-14 z-40 h-0.5 xl:hidden"
      >
        <div
          ref={barRef}
          className="h-full origin-left bg-ch1 shadow-[0_0_8px_var(--ch1)]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </>
  );
}
