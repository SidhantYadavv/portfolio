import { renderOgCard } from "@/lib/og-card";

export const alt =
  "Sidhant Yadav, Software Engineer: an oscilloscope screen with a yellow trace";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgCard();
}
