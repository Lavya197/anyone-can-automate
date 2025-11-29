import "./globals.css";

export const metadata = {
  title: "Automation Builder",
  description: "No-code automation designer"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
