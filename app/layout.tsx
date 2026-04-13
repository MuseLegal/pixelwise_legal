import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pixelwise Legal",
  description: "AI-native law firm for startups and growth-stage companies"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
