import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Automation Builder",
  description: "No-code automation designer",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
