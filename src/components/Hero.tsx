"use client";

import { useRef, useState } from "react";
import { DecodeName } from "@/components/DecodeName";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { ScopeKnob } from "@/components/ScopeKnob";
import { ScopeTrace } from "@/components/ScopeTrace";
import { profile } from "@/data/profile";

// A 300 Hz test signal at 1.5 V peak, read through the knobs.
const TIME_STEPS = ["5 ms", "2 ms", "1 ms", "500 µs", "200 µs"] as const;
const TIME_CYCLES = [15, 6, 3, 1.5, 0.6];
const VOLT_STEPS = ["5 V", "2 V", "1 V", "500 mV", "200 mV"] as const;
const VOLT_DIVS = [0.3, 0.75, 1.5, 3, 7.5];

// Slowest sweep at the most sensitive range finds a pulse.
const HEARTBEAT = { time: 0, volts: 4 };

export function Hero() {
  const [time, setTime] = useState(2);
  const [volts, setVolts] = useState(2);
  const [locked, setLocked] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);
  const heartbeat = time === HEARTBEAT.time && volts === HEARTBEAT.volts;

  const social =
    "flex h-11 min-w-0 items-center justify-center gap-2 rounded-[6px] border border-ink/15 bg-panel px-3 font-medium text-ink transition-colors sm:justify-start sm:px-4";

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="mx-auto flex h-svh min-h-[32rem] max-w-6xl flex-col justify-center px-3 pt-[4.25rem] pb-3 sm:px-6 sm:pt-[4.75rem] sm:pb-5"
    >
      <div className="flex max-h-[54rem] min-h-0 flex-1 flex-col rounded-[14px] bg-panel-2 p-1.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_30px_60px_-30px_rgb(0_0_0/0.8)] sm:p-2.5">
        <div className="on-screen relative isolate flex min-h-[15rem] flex-1 flex-col overflow-hidden rounded-[8px] bg-screen text-screen-text shadow-[inset_0_0_60px_rgb(0_0_0/0.55)]">
          <ScopeTrace
            cycles={TIME_CYCLES[time]}
            amplitude={VOLT_DIVS[volts]}
            heartbeat={heartbeat}
            clearOf={textRef}
          />

          <div ref={textRef} className="relative">
            <div className="flex items-start justify-between gap-4 px-4 pt-3 font-mono text-[0.8125rem] text-screen-dim sm:px-6">
              <p className="tabular">
                <span className="text-ch1">CH1</span> {VOLT_STEPS[volts]}/div
                <span className="ml-3 hidden sm:inline">
                  {TIME_STEPS[time]}/div
                </span>
              </p>
              <p
                className="flex items-center gap-2 tabular"
                aria-live="polite"
              >
                <span
                  aria-hidden
                  className={`size-2 rounded-full transition-colors duration-300 ${
                    locked ? "bg-ch1 shadow-[0_0_8px_var(--ch1)]" : "bg-ch1/35"
                  }`}
                />
                {heartbeat ? "72 BPM" : locked ? "Locked" : "Acquiring…"}
              </p>
            </div>

            <div className="grid gap-4 px-4 pt-4 sm:grid-cols-[auto_1fr] sm:gap-8 sm:px-6 sm:pt-6 lg:gap-12">
              <DecodeName
                name={profile.name}
                onLocked={() => setLocked(true)}
                className="font-display text-[min(22vw,13svh)] leading-[0.8] font-extrabold tracking-[-0.01em] text-screen-text sm:text-[min(14.5vw,17svh,10.5rem)] lg:text-[min(11vw,17svh,10.5rem)]"
              />

              <div className="max-w-[24rem] space-y-3 sm:self-end sm:justify-self-end sm:pb-1">
                <p className="text-base leading-snug text-screen-text sm:text-lg [@media(min-height:760px)]:sm:text-xl">
                  {profile.tagline}
                  <span className="max-sm:hidden"> {profile.taglineMore}</span>
                </p>
                <dl className="grid gap-1 font-mono text-[0.8125rem] text-screen-dim">
                  <div className="flex gap-2">
                    <dt className="sr-only">Availability</dt>
                    <dd className="text-ch1">{profile.availability}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3 px-1.5 pt-3 pb-1.5 sm:px-2">
          <div
            className="flex gap-x-6 sm:gap-x-8"
            role="group"
            aria-label="Scope controls — turn the knobs to change the waveform"
          >
            <ScopeKnob
              label="Time/div"
              steps={TIME_STEPS}
              value={time}
              onChange={setTime}
            />
            <ScopeKnob
              label="Volts/div"
              steps={VOLT_STEPS}
              value={volts}
              onChange={setVolts}
            />
          </div>

          <div className="grid w-full grid-cols-2 gap-2 sm:ml-auto sm:flex sm:w-auto sm:flex-wrap sm:justify-end">
            <a
              href="#work"
              className="inline-flex h-11 items-center justify-center rounded-[6px] bg-ch1 px-5 font-medium text-screen transition-colors hover:bg-[#ffd659]"
            >
              See my work
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-[6px] border border-ink/25 px-5 font-medium text-ink transition-colors hover:border-ink/60 hover:bg-panel-3/40"
            >
              Resume (PDF)
            </a>
            <ul
              aria-label="Find me online"
              className="col-span-2 grid grid-cols-3 gap-2 sm:flex"
            >
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social} hover:border-ch1/70 hover:text-ch1`}
                >
                  <GitHubIcon className="size-[18px] shrink-0" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social} hover:border-ch1/70 hover:text-ch1`}
                >
                  <LinkedInIcon className="size-[18px] shrink-0" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className={`${social} hover:border-ch1/70 hover:text-ch1`}
                >
                  <MailIcon className="size-[18px] shrink-0" />
                  <span className="sm:hidden">Email</span>
                  <span className="truncate max-sm:sr-only">
                    {profile.email}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
