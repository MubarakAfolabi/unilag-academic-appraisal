"use client";

import dynamic from "next/dynamic";
import { user } from "@/constant/user";

const VCNavigationLayout = dynamic(
  () => import("@/components/VC/VCNavigationLayout"),
);
const HRMDNavigationLayout = dynamic(
  () => import("@/components/HRMD/HRMDNavigationLayout"),
);

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigationLayouts = {
    VC: <VCNavigationLayout />,
    HRMD: <HRMDNavigationLayout />,
  };

  return (
    <div className="flex md:h-screen overflow-hidden">
      {navigationLayouts[user.role]}
      {children}
    </div>
  );
}
