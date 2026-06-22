"use client";

import { useUser } from "@/context/userContext";
import dynamic from "next/dynamic";

const VCDashboard = dynamic(() => import("@/components/VC/VCDashboard"));
const HRMDDashboard = dynamic(() => import("@/components/HRMD/HRMDDashboard"));
const AccessorDashboard = dynamic(
  () => import("@/components/accessor/AccessorDashboard"),
);
const PublisherDashboard = dynamic(
  () => import("@/components/publisher/PublisherDashboard"),
);

export default function DashboardPage() {
  const { user } = useUser();

  const dashboards = {
    VC: <VCDashboard />,
    HRMD: <HRMDDashboard />,
    ACCESSOR: <AccessorDashboard />,
    PUBLISHER: <PublisherDashboard />,
  };

  return dashboards[user.role];
}
