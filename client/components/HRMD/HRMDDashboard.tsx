"use client";

import Image from "next/image";
import { useState } from "react";
import LogoutModal from "@/components/LogoutModal";
import { LogOut } from "lucide-react";
import RecentActivity from "@/components/RecentActivity";
import { RecentActivityItem } from "@/components/RecentActivity";
import { User } from "@/constant/user";

export const recentActivity: RecentActivityItem[] = [
  {
    title: "Reviewed: Blockchain Tech in Education",
    date: "Reviewed on March 20, 2026",
    iconState: "success",
  },
  {
    title: "Reviewed: The Future of Renewable Energy",
    date: "Reviewed on March 23, 2026",
    iconState: "success",
  },
  {
    title: "Reviewed: Data Privacy in the Digital Age",
    date: "Reviewed on March 28, 2026",
    iconState: "error",
  },
  {
    title: "Reviewed: Cloud Computing Adoption",
    date: "Reviewed on April 2, 2026",
    iconState: "success",
  },
];

type HRMDDashboardProps = {
  user: User;
};

export default function HRMDDashboard({ user }: HRMDDashboardProps) {
  const [modal, setModal] = useState(false);

  return (
    <section className="md:h-full md:overflow-y-auto flex-2 flex flex-col p-4 gap-6 mb-15 md:p-0 md:pb-6">
      {modal && <LogoutModal onClose={() => setModal(false)} />}

      <div className="flex items-center justify-between md:hidden">
        <div className="flex-1 flex items-center gap-2">
          <div>
            <Image
              src="/unilaglogo.svg"
              alt="UNILAG logo"
              width={50}
              height={50}
            />
          </div>

          <div>
            <h2 className="font-bold text-md">Unilag Academic Appraisal</h2>
            <p className="text-sm text-[hsla(0,2%,42%,1)]">
              Human Resource Management and Development&apos;s Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="border-solid border border-[hsla(0,0%,85%,1)] p-1 rounded-md cursor-pointer"
            onClick={() => setModal(true)}
          >
            <LogOut size={22} />
          </button>

          <div className="cursor-pointer">
            <Image
              src={user.avatar}
              alt="Profile Picture"
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center md:border-b md:border-b-[hsla(0,0%,85%,1)] md:p-6">
        <div>
          <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
            Welcome back,{" "}
            <span>
              {user.title} {user.firstname} {user.lastname}
            </span>
          </h2>
          <p className="text-[hsla(0,2%,42%,1)] md:text-lg">
            Review Assessed Submissions
          </p>
        </div>

        <div className="gap-4 items-center hidden md:flex">
          <Image
            src={user.avatar}
            alt="Profile Picture"
            width={50}
            height={50}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:px-6 md:pb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold md:text-xl">Recent Activity</h2>
          <p className="text-[hsla(210,79%,46%,1)] md:hidden font-bold cursor-pointer">
            View all
          </p>
        </div>
        <RecentActivity recentActivity={recentActivity} />
      </div>
    </section>
  );
}
