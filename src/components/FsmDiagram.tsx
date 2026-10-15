"use client";

import { useEffect, useRef, useState } from "react";

const STATES = [
  { id: "go", label: "Green", color: "#6bbf59", x: 90, y: 150 },
  { id: "slow", label: "Yellow", color: "var(--ch1)", x: 250, y: 60 },
  { id: "stop", label: "Red", color: "#e5484d", x: 410, y: 150 },
] as const;

const HOLD_MS = [2200, 900, 2200];

/** The traffic controller's light cycle drawn as a state machine; steps through states while in view. */
export function FsmDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), {
      threshold: 0.4,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(
      () => setActive((a) => (a + 1) % STATES.length),
      HOLD_MS[active],
    );
    return () => window.clearTimeout(id);
  }, [running, active]);

  const edges = [
    { from: STATES[0], to: STATES[1], bend: -40 },
    { from: STATES[1], to: STATES[2], bend: -40 },
    { from: STATES[2], to: STATES[0], bend: 60 },
  ];

  return (
    <svg
      ref={ref}
      viewBox="0 0 500 240"
      role="img"
      aria-label="State machine of the traffic light cycle: green, then yellow, then red, then back to green."
      className="block h-auto w-full"
    >
      <defs>
        <marker
          id="fsm-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--screen-dim)" />
        </marker>
      </defs>

      {edges.map(({ from, to, bend }, i) => {
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2 + bend;
        // Trim the curve so arrows meet the node edge, not its centre
        const r = 38;
        const a1 = Math.atan2(my - from.y, mx - from.x);
        const a2 = Math.atan2(my - to.y, mx - to.x);
        const d = `M${from.x + Math.cos(a1) * r} ${from.y + Math.sin(a1) * r} Q${mx} ${my} ${to.x + Math.cos(a2) * (r + 4)} ${to.y + Math.sin(a2) * (r + 4)}`;
        const isNext = i === active;
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={isNext ? from.color : "var(--screen-dim)"}
            strokeOpacity={isNext ? 0.9 : 0.45}
            strokeWidth="1.5"
            strokeDasharray={isNext ? undefined : "4 5"}
            markerEnd="url(#fsm-arrow)"
            className="transition-[stroke,stroke-opacity] duration-300"
          />
        );
      })}

      {STATES.map((s, i) => {
        const on = i === active;
        return (
          <g key={s.id}>
            <circle
              cx={s.x}
              cy={s.y}
              r="36"
              fill={on ? s.color : "var(--screen-2)"}
              fillOpacity={on ? 0.16 : 1}
              stroke={s.color}
              strokeOpacity={on ? 1 : 0.45}
              strokeWidth={on ? 2 : 1.25}
              style={on ? { filter: `drop-shadow(0 0 10px ${s.color})` } : undefined}
              className="transition-[fill-opacity,stroke-opacity] duration-300"
            />
            <text
              x={s.x}
              y={s.y + 5}
              textAnchor="middle"
              fill={on ? "var(--screen-text)" : "var(--screen-dim)"}
              className="font-mono text-[15px]"
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
