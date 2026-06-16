"use client";

import dynamic from "next/dynamic";
import { user } from "@/constant/user";

const VCDashboard = dynamic(() => import("@/components/VC/VCDashboard"));
const HRMDDashboard = dynamic(() => import("@/components/HRMD/HRMDDashboard"));
const AccessorDashboard = dynamic(
  () => import("@/components/accessor/AccessorDashboard"),
);
const PublisherDashboard = dynamic(
  () => import("@/components/publisher/PublisherDashboard"),
);

export default function DashboardPage() {
  const dashboards = {
    VC: <VCDashboard user={user} />,
    HRMD: <HRMDDashboard user={user} />,
    ACCESSOR: <AccessorDashboard user={user} />,
    PUBLISHER: <PublisherDashboard user={user} />,
  };

  return dashboards[user.role];
}
