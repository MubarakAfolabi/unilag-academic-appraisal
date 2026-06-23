"use client";

import dynamic from "next/dynamic";
import { publisher } from "@/constant/user";

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
    VC: <VCDashboard user={publisher} />,
    HRMD: <HRMDDashboard user={publisher} />,
    ACCESSOR: <AccessorDashboard user={publisher} />,
    PUBLISHER: <PublisherDashboard user={publisher} />,
  };

  return dashboards[publisher.role];
}
