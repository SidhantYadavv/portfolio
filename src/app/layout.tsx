import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Schibsted_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { Cursor } from "@/components/Cursor";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-heading-face",
  subsets: ["latin"],
  axes: ["opsz"],
});

const body = Schibsted_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const readout = localFont({
  variable: "--font-readout",
  src: "../fonts/DepartureMono-Regular.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sidhant Yadav — Computer Engineering @ Waterloo",
  description:
    "Computer Engineering student at the University of Waterloo, seeking a Summer 2027 co-op. Projects in full-stack development, data engineering, and AI.",
  openGraph: {
    title: "Sidhant Yadav — Computer Engineering @ Waterloo",
    description:
      "Full-stack, data engineering and AI projects. Seeking a Summer 2027 co-op.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#171b1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${readout.variable}`}
    >
      <body className="min-h-screen antialiased">
        {children}
        <Cursor />
      </body>
    </html>
  );
}
