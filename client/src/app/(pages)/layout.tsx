"use client";

import dynamic from "next/dynamic";
import { user } from "@/constant/user";

const VCNavigationLayout = dynamic(
  () => import("@/components/VC/VCNavigationLayout"),
);
const HRMDNavigationLayout = dynamic(
  () => import("@/components/HRMD/HRMDNavigationLayout"),
);
const AccessorNavigationLayout = dynamic(
  () => import("@/components/Accessor/AccessorNavigationLayout"),
);

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigationLayouts = {
    VC: <VCNavigationLayout />,
    HRMD: <HRMDNavigationLayout />,
    ACCESSOR: <AccessorNavigationLayout />,
  };

  return (
    <div className="flex md:h-screen overflow-hidden">
      {navigationLayouts[user.role]}
      {children}
    </div>
  );
}
