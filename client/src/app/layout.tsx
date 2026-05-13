import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Academic Appraisal",
  description: "Centralized Online Research Assessment and Submission System",
  icons: {
    icon: "./unilaglogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
