"use client";

import { useEffect, useRef, type RefObject } from "react";

type ScopeTraceProps = {
  /** Full cycles across the 10 horizontal divisions */
  cycles: number;
  /** Peak amplitude in vertical divisions (screen is ±4) */
  amplitude: number;
  heartbeat: boolean;
  /** Element the trace must stay below; the 0V line centres in the space under it */
  clearOf?: RefObject<HTMLElement | null>;
};

const H_DIVS = 10;
const V_DIVS = 8;

function ecg(t: number) {
  // One beat per unit of t: P wave, QRS spike, T wave.
  const x = t - Math.floor(t);
  const g = (c: number, w: number, a: number) =>
    a * Math.exp(-((x - c) ** 2) / (2 * w * w));
  return (
    g(0.18, 0.025, 0.25) +
    g(0.3, 0.008, -0.35) +
    g(0.33, 0.01, 2.6) +
    g(0.36, 0.008, -0.6) +
    g(0.58, 0.05, 0.5)
  );
}

export function ScopeTrace({
  cycles,
  amplitude,
  heartbeat,
  clearOf,
}: ScopeTraceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useRef({ cycles, amplitude, heartbeat });
  const drawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    params.current = { cycles, amplitude, heartbeat };
    drawRef.current?.();
  }, [cycles, amplitude, heartbeat]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    let phase = 0;
    let phaseNudge = 0;
    let phaseNudgeTarget = 0;
    let shownCycles = params.current.cycles;
    let shownAmp = params.current.amplitude;
    let last = performance.now();
    // Where 0V sits and how many px one volt-division spans, from the free space
    let base = 0;
    let unit = 0;

    const styles = getComputedStyle(document.documentElement);
    const trace = styles.getPropertyValue("--ch1").trim() || "#f2c230";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const dy = height / V_DIVS;
      const blocker = clearOf?.current?.getBoundingClientRect();
      const top = blocker
        ? Math.min(height * 0.7, Math.max(0, blocker.bottom - rect.top + 12))
        : height * 0.5;
      const free = height - top;
      base = top + free / 2;
      // The default ±1.5 div signal (plus its harmonic) fits the free band
      unit = Math.min(dy, free / 3.6);
    };

    const drawGraticule = () => {
      const dx = width / H_DIVS;
      const dy = height / V_DIVS;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(143, 165, 160, 0.16)";
      ctx.beginPath();
      for (let i = 1; i < H_DIVS; i++) {
        const x = Math.round(i * dx) + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let j = 1; j < V_DIVS; j++) {
        const y = Math.round(j * dy) + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Minor ticks on the centre axes, like a real graticule
      const cx = Math.round(width / 2) + 0.5;
      const cy = Math.round(base) + 0.5;
      ctx.strokeStyle = "rgba(143, 165, 160, 0.32)";
      ctx.beginPath();
      for (let i = 0; i <= H_DIVS * 5; i++) {
        const x = Math.round((i * dx) / 5) + 0.5;
        ctx.moveTo(x, cy - 3);
        ctx.lineTo(x, cy + 3);
      }
      for (let j = 0; j <= V_DIVS * 5; j++) {
        const y = Math.round((j * dy) / 5) + 0.5;
        ctx.moveTo(cx - 3, y);
        ctx.lineTo(cx + 3, y);
      }
      ctx.stroke();
    };

    const sample = (u: number, t: number) => {
      const p = params.current;
      if (p.heartbeat) {
        // ~1.2 beats across the screen, scrolling like a monitor
        return ecg(u * 1.6 - t * 1.2) * 1.3 - 0.4;
      }
      const w = u * shownCycles * Math.PI * 2 + phase + phaseNudge;
      const noise = reduceMotion ? 0 : (Math.random() - 0.5) * 0.035;
      return shownAmp * (Math.sin(w) + 0.12 * Math.sin(2 * w + 0.6)) + noise;
    };

    const draw = (time = performance.now()) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, width, height);
      drawGraticule();

      const steps = Math.max(200, Math.floor(width));

      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = trace;
      ctx.shadowColor = trace;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const v = sample(u, t);
        const y = Math.min(height - 1, Math.max(1, base - v * unit));
        if (i === 0) ctx.moveTo(u * width, y);
        else ctx.lineTo(u * width, y);
      }
      // Phosphor bloom, then a crisp core
      ctx.lineWidth = 3;
      ctx.shadowBlur = 14;
      ctx.globalAlpha = 0.55;
      ctx.stroke();
      ctx.lineWidth = 1.6;
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.stroke();
    };

    const frame = (time: number) => {
      const dt = Math.min(0.05, (time - last) / 1000);
      last = time;
      const p = params.current;
      // Ease toward new knob settings so turning feels physical
      const k = 1 - Math.exp(-dt * 10);
      shownCycles += (p.cycles - shownCycles) * k;
      shownAmp += (p.amplitude - shownAmp) * k;
      phaseNudge += (phaseNudgeTarget - phaseNudge) * (1 - Math.exp(-dt * 4));
      phase += dt * 0.6;
      draw(time);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    drawRef.current = () => {
      if (reduceMotion) {
        shownCycles = params.current.cycles;
        shownAmp = params.current.amplitude;
        draw();
      }
    };

    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    if (clearOf?.current) ro.observe(clearOf.current);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const host = canvas.parentElement;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      phaseNudgeTarget = ((e.clientX - rect.left) / rect.width - 0.5) * 3;
    };
    const onPointerLeave = () => (phaseNudgeTarget = 0);
    host?.addEventListener("pointermove", onPointerMove);
    host?.addEventListener("pointerleave", onPointerLeave);

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host?.removeEventListener("pointermove", onPointerMove);
      host?.removeEventListener("pointerleave", onPointerLeave);
      drawRef.current = null;
    };
  }, [clearOf]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
    />
  );
}
