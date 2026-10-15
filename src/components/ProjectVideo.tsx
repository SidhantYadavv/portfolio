"use client";

import { useEffect, useRef, useState } from "react";

type ProjectVideoProps = {
  src: string;
  title: string;
  poster?: string;
};

export function ProjectVideo({ src, title, poster }: ProjectVideoProps) {
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
      <div className="flex aspect-video flex-col items-center justify-center px-4 text-center">
        <p className="text-sm text-screen-text">No signal — demo video missing.</p>
        <p className="mt-1 font-mono text-[0.8125rem] text-screen-dim">
          Add it at public/videos/{filename}
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative aspect-video bg-black">
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[0.8125rem] text-screen-dim">
            Loading demo…
          </span>
        </div>
      )}
      {ready && !inView && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
          <span className="font-mono text-[0.8125rem] text-screen-text">
            Plays when in view
          </span>
        </div>
      )}
      <video
        ref={videoRef}
        className="h-full w-full bg-black object-contain"
        src={src}
        poster={poster}
        controls
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${title} demo recording`}
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
