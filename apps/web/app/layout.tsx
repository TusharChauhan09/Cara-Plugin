import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cara — Developer Typing Analytics for VS Code",
  description:
    "Track your real-time WPM, run in-editor typing tests, and see your language breakdown — all inside VS Code. Free and open source.",
  keywords: ["VS Code extension", "typing speed", "wpm", "developer tools", "typing test"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
