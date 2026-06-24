"use client";

import dynamic from "next/dynamic";
import { UserContext } from "@/context/userContext";
import type { User } from "@/types/user";
import { useEffect, useState } from "react";

const VCNavigationLayout = dynamic(
  () => import("@/components/VC/VCNavigationLayout"),
);
const HRMDNavigationLayout = dynamic(
  () => import("@/components/HRMD/HRMDNavigationLayout"),
);
const AccessorNavigationLayout = dynamic(
  () => import("@/components/accessor/AccessorNavigationLayout"),
);
const PublisherNavigationLayout = dynamic(
  () => import("@/components/publisher/PublisherNavigationLayout"),
);

import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch(`${apiUrl}/api/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data.user);
      });
  }, [router]);

  if (!user) {
    return <p>loading...</p>;
  }

  const navigationLayouts = {
    VC: <VCNavigationLayout />,
    HRMD: <HRMDNavigationLayout />,
    ACCESSOR: <AccessorNavigationLayout />,
    PUBLISHER: <PublisherNavigationLayout />,
  };

  return (
    <ProtectedRoute>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="flex md:h-screen overflow-hidden">
          {navigationLayouts[user.role]}
          {children}
        </div>
      </UserContext.Provider>
    </ProtectedRoute>
  );
}
