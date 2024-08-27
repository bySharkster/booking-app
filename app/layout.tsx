import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booking App",
  description: "Your booking experience in Puerto Rico",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["booking", "barbers", "saas", "schedule", "appointment"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "Digital Sunsets" },
    {
      name: "Digital Sunsets",
      url: "https://www.linkedin.com/in/digital-sunsets/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon512_rounded.png" },
    { rel: "icon", url: "icons/icon512_maskable.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children} <Toaster />
      </body>
    </html>
  );
}
