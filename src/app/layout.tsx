import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Priyanku Gogoi — Developer & Tinkerer",
  description: "I write code that mostly behaves itself and build things that don't fall apart when you look away.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${sans.variable} ${mono.variable} font-sans bg-[#0a0a0a] text-zinc-100 antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
