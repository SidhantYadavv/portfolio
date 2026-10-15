"use client";

import { useEffect, useRef } from "react";

type ScopeKnobProps = {
  label: string;
  steps: readonly string[];
  value: number;
  onChange: (index: number) => void;
};

const SWEEP = 270; // degrees of rotation across all steps
const DRAG_PX_PER_STEP = 18;

export function ScopeKnob({ label, steps, value, onChange }: ScopeKnobProps) {
  const knobRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  const max = steps.length - 1;

  useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
  });

  const set = (index: number) => {
    const next = Math.min(max, Math.max(0, index));
    if (next !== valueRef.current) onChangeRef.current(next);
  };

  // Wheel needs a non-passive listener so turning the knob doesn't scroll the page.
  useEffect(() => {
    const el = knobRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dir = e.deltaY < 0 || e.deltaX > 0 ? 1 : -1;
      const next = Math.min(max, Math.max(0, valueRef.current + dir));
      if (next !== valueRef.current) onChangeRef.current(next);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [max]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    el.focus();
    const startX = e.clientX;
    const startY = e.clientY;
    const startValue = valueRef.current;

    const onMove = (ev: PointerEvent) => {
      // Up or right turns clockwise
      const delta = ev.clientX - startX - (ev.clientY - startY);
      set(startValue + Math.round(delta / DRAG_PX_PER_STEP));
    };
    const onUp = () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, number> = {
      ArrowRight: value + 1,
      ArrowUp: value + 1,
      ArrowLeft: value - 1,
      ArrowDown: value - 1,
      PageUp: value + 2,
      PageDown: value - 2,
      Home: 0,
      End: max,
    };
    if (e.key in map) {
      e.preventDefault();
      set(map[e.key]);
    }
  };

  const angle = -SWEEP / 2 + (value / max) * SWEEP;

  return (
    <div className="flex items-center gap-3">
      <div
        ref={knobRef}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={steps[value]}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        className="relative size-11 shrink-0 sm:[@media(min-height:760px)]:size-14 cursor-grab touch-none select-none rounded-full active:cursor-grabbing"
      >
        <svg viewBox="0 0 56 56" className="size-full" aria-hidden>
          {steps.map((_, i) => {
            const a =
              ((-SWEEP / 2 + (i / max) * SWEEP - 90) * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={28 + Math.cos(a) * 25}
                y1={28 + Math.sin(a) * 25}
                x2={28 + Math.cos(a) * 27.5}
                y2={28 + Math.sin(a) * 27.5}
                stroke={i === value ? "var(--ink)" : "var(--ink-2)"}
                strokeOpacity={i === value ? 1 : 0.45}
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            );
          })}
          <circle cx="28" cy="28" r="21" fill="#0e1211" />
          <circle
            cx="28"
            cy="28"
            r="17"
            fill="#3a4240"
            stroke="#4c5552"
            strokeWidth="1"
          />
        </svg>
        <span
          aria-hidden
          className="absolute inset-0 transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <span className="absolute top-[20%] left-1/2 h-[21%] w-[3px] -translate-x-1/2 rounded-full bg-ch1" />
        </span>
      </div>
      <div className="leading-tight">
        <p className="font-mono text-[0.8125rem] text-ink-2">{label}</p>
        <p className="tabular font-mono text-base text-ink">
          {steps[value]}
        </p>
      </div>
    </div>
  );
}
