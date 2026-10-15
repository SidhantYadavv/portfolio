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

const title = "Sidhant Yadav — Software Engineer";
const description =
  "Computer Engineering student at the University of Waterloo building full-stack web apps, data pipelines and AI tools, seeking a Summer 2027 co-op.";

// Preview images come from app/opengraph-image.tsx and app/twitter-image.tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://sidhantyadav.site"),
  title,
  description,
  applicationName: "Sidhant Yadav",
  authors: [{ name: "Sidhant Yadav", url: "https://sidhantyadav.site" }],
  creator: "Sidhant Yadav",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Sidhant Yadav",
    locale: "en_CA",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
