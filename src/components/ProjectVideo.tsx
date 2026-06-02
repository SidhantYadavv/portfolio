"use client";

import { useEffect, useRef, useState } from "react";

type ProjectVideoProps = {
  src: string;
  title: string;
};

export function ProjectVideo({ src, title }: ProjectVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [missing, setMissing] = useState(false);
  const [inView, setInView] = useState(false);

  const filename = src.split("/").pop() ?? src;

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || missing) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setInView(visible);

        if (visible) {
          video.play().catch(() => {
            /* autoplay blocked — user can press play */
          });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: 0.45, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [missing]);

  if (missing) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700/80 bg-zinc-950/50 px-4 text-center">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Video preview
        </span>
        <p className="mt-2 text-sm text-zinc-400">
          Add your screen recording here:
        </p>
        <p className="mt-1 font-mono text-xs text-violet-400/80">
          public/videos/{filename}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-video overflow-hidden rounded-xl border border-zinc-800 bg-black"
    >
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80">
          <span className="text-xs text-zinc-500">Loading preview…</span>
        </div>
      )}
      {ready && !inView && (
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/50 to-transparent p-3">
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
            Scroll to play
          </span>
        </div>
      )}
      <video
        ref={videoRef}
        className="h-full w-full object-contain bg-black"
        src={src}
        controls
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${title} demo`}
        onLoadedData={() => setReady(true)}
        onError={() => setMissing(true)}
      >
        <source
          src={src}
          type={src.endsWith(".mov") ? "video/quicktime" : "video/mp4"}
        />
      </video>
    </div>
  );
}
