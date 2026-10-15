import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Shared by src/app/opengraph-image.tsx and twitter-image.tsx so both previews match.

const C = {
  panel: "#171b1a",
  bezel: "#212625",
  screen: "#0a1113",
  text: "#dbe6e2",
  dim: "#8fa5a0",
  grid: "rgba(143,165,160,0.14)",
  ch1: "#f2c230",
};

const SCREEN = { x: 40, y: 40, w: 1120, h: 550 };

/** The hero's test signal, as an SVG path across the bottom of the screen */
function tracePath() {
  const base = SCREEN.h * 0.74;
  const amp = 58;
  let d = "";
  for (let x = 0; x <= SCREEN.w; x += 4) {
    const w = (x / SCREEN.w) * Math.PI * 2 * 2.6 + 0.9;
    const y = base - amp * (Math.sin(w) + 0.12 * Math.sin(2 * w + 0.6));
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)} `;
  }
  return d;
}

function gridPath() {
  let d = "";
  for (let i = 1; i < 10; i++) {
    const x = Math.round((SCREEN.w / 10) * i);
    d += `M${x} 0V${SCREEN.h} `;
  }
  for (let j = 1; j < 8; j++) {
    const y = Math.round((SCREEN.h / 8) * j);
    d += `M0 ${y}H${SCREEN.w} `;
  }
  return d;
}

export async function renderOgCard() {
  const dir = join(process.cwd(), "assets/og");
  const [display, body, mono] = await Promise.all([
    readFile(join(dir, "BigShoulders-ExtraBold.woff")),
    readFile(join(dir, "SchibstedGrotesk-Regular.woff")),
    readFile(join(dir, "DepartureMono-Regular.otf")),
  ]);

  const trace = tracePath();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: C.panel,
          padding: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            padding: 12,
            borderRadius: 24,
            background: C.bezel,
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              borderRadius: 14,
              background: C.screen,
              overflow: "hidden",
              padding: "28px 48px",
            }}
          >
            <svg
              width={SCREEN.w}
              height={SCREEN.h}
              viewBox={`0 0 ${SCREEN.w} ${SCREEN.h}`}
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <path d={gridPath()} stroke={C.grid} strokeWidth={1} fill="none" />
              {/* Phosphor bloom, then a crisp core */}
              <path
                d={trace}
                stroke={C.ch1}
                strokeOpacity={0.12}
                strokeWidth={10}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={trace}
                stroke={C.ch1}
                strokeWidth={4}
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "Departure Mono",
                fontSize: 22,
                color: C.dim,
              }}
            >
              <div style={{ display: "flex", gap: 14 }}>
                <span style={{ color: C.ch1 }}>CH1</span>
                <span>1 V/div</span>
                <span>1 ms/div</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    background: C.ch1,
                    boxShadow: `0 0 12px ${C.ch1}`,
                  }}
                />
                <span>Locked</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                fontFamily: "Big Shoulders",
                fontSize: 168,
                lineHeight: 1,
                letterSpacing: -1,
                color: C.text,
                marginTop: 26,
              }}
            >
              SIDHANT YADAV
            </div>

            <div
              style={{
                display: "flex",
                fontFamily: "Schibsted Grotesk",
                fontSize: 46,
                color: C.ch1,
                marginTop: 6,
              }}
            >
              Software Engineer
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "auto",
                fontFamily: "Departure Mono",
                fontSize: 22,
                color: C.dim,
              }}
            >
              <span>Computer Engineering @ University of Waterloo</span>
              <span style={{ color: C.text }}>sidhantyadav.site</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Big Shoulders", data: display, style: "normal", weight: 800 },
        { name: "Schibsted Grotesk", data: body, style: "normal", weight: 400 },
        { name: "Departure Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
