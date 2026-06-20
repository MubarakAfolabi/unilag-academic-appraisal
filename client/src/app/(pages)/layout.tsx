"use client";

import dynamic from "next/dynamic";
import { UserContext } from "@/context/userContext";
import type { User } from "@/constant/user";
import { useState } from "react";

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

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialUser: User = {
    firstname: "Mubarak",
    lastname: "Idris",
    title: "Dr.",
    email: "mubarakbolu150@gmail.com",
    role: "PUBLISHER",
    department: "Computer Science",
    faculty: "Science",
    rank: "Lecturer 1",
    staffId: "UL/CSC/2015/1122",
    bio: "Lecturer in the Department of Computer Science with research interests in Artificial Intelligence, Data Mining and Mobile Computing.",
    phoneNo: "0806 881 7701",
    dateJoined: "September 1, 2015",
    avatar: "/profile-pic.svg",
  };

  const [user, setUser] = useState<User>(initialUser);

  const navigationLayouts = {
    VC: <VCNavigationLayout />,
    HRMD: <HRMDNavigationLayout />,
    ACCESSOR: <AccessorNavigationLayout />,
    PUBLISHER: <PublisherNavigationLayout />,
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="flex md:h-screen overflow-hidden">
        {navigationLayouts[user.role]}
        {children}
      </div>
    </UserContext.Provider>
  );
}
