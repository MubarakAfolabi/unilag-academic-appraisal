"use client";
import { usePathname } from "next/navigation";
import ReviewerNavigationLayout from "@/components/ReviewerNavigationLayout";
import PublisherNavigationLayout from "@/components/PublisherNavigationLayout";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublisher =
    pathname.includes("/publisher") ||
    pathname.includes("/upload") ||
    pathname.includes("/profile");
  return (
    <div className="flex md:h-screen overflow-hidden">
      {isPublisher ? (
        <PublisherNavigationLayout />
      ) : (
        <ReviewerNavigationLayout />
      )}
      {children}
    </div>
  );
}
