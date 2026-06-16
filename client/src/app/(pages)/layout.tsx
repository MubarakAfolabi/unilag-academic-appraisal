"use client";

import dynamic from "next/dynamic";
import { user } from "@/constant/user";

const VCNavigationLayout = dynamic(
  () => import("@/components/VC/VCNavigationLayout"),
);

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigationLayouts = {
    VC: <VCNavigationLayout />,
  };

  return (
    <div className="flex md:h-screen overflow-hidden">
      {navigationLayouts[user.role]}
      {children}
    </div>
  );
}
