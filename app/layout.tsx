import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Osa Mining | Leading the Future of Mining in Tanzania",
  description:
    "Osa Mining is a premier gold mining and mineral exploration company based in Chunya, Mbeya, Tanzania. Founded in 2013, we deliver excellence in gold mining, extraction, processing, and consultation services.",
  keywords: [
    "gold mining",
    "Tanzania mining",
    "mineral exploration",
    "Chunya mining",
    "Mbeya mining",
    "Osa Mining",
    "mining consultation",
  ],
  generator: "Next.js",
  icons: {
    icon: "/Favicon.png",
    apple: "/Favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1408",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
