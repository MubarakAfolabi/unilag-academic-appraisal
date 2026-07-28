import type { Metadata } from "next";
import "./globals.css";
import UploadProgressManager from "@/components/UploadProgressManager";

export const metadata: Metadata = {
  title: "Academic Appraisal",
  description: "Centralized Online Research Assessment and Submission System",
  icons: {
    icon: "/unilaglogo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <UploadProgressManager />
      </body>
    </html>
  );
}
