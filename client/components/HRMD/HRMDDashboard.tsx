"use client";

import Image from "next/image";
import { useState } from "react";
import LogoutModal from "@/components/LogoutModal";
import { LogOut } from "lucide-react";
import RecentActivity from "@/components/HRMD/RecentActivity";
import { RecentActivityItem } from "@/components/HRMD/RecentActivity";
import { useUser } from "@/context/userContext";

export const recentActivity: RecentActivityItem[] = [
   {
    assessedby: "Dr. Bayo Isaken",
    assessorId: "ASS-26-007",
    title: "AI in Healthcare: Opportunities and Challenges",
    date: "May 6, 2026",
    manuscriptId: "RH-2026-0156",
  },
  {
    assessedby: "Dr. Emily Davis",
    assessorId: "ASS-26-001",
    title: "The Future of Renewable Energy",  
    date: "May 5, 2026",
    manuscriptId: "RH-2026-0167",
  },
  {
    assessedby: "Dr. David Brown",
    assessorId: "ASS-26-002",
    title: "The Impact of Social Media on Mental Health",  
    date: "April 30, 2026",
    manuscriptId: "RH-2026-0166",
  },
  {
    assessedby: "Dr. Sarah Williams",
    assessorId: "ASS-26-003",
    title: "The Role of Big Data in Healthcare",  
    date: "April 25, 2026",
    manuscriptId: "RH-2026-0165",
  },
  {
    assessedby: "Dr. Michael Johnson",
    assessorId: "ASS-26-004",
    title: "The Future of Space Exploration", 
    date: "April 20, 2026",
    manuscriptId: "RH-2026-0164",
  },
  { 
    assessedby: "Dr. Jane Smith",
    assessorId: "ASS-26-005",
    title: "The Ethics of Genetic Engineering",
    date: "April 15, 2026",
    manuscriptId: "RH-2026-0163",
  },
  {
    assessedby: "Dr. John Doe",
    assessorId: "ASS-26-006",
    title: "The Impact of Artificial Intelligence on Employment",
    date: "April 10, 2026",
    manuscriptId: "RH-2026-0162",
  },
 
  {
    assessedby: "Dr. Anjola Odunayo",
    assessorId: "ASS-26-008",
    title: "The Role of IoT in Smart Cities",
    date: "April 5, 2026",
    manuscriptId: "RH-2026-0161",
  },
  {
    assessedby: "Dr. Adeola Okunji",
    assessorId: "ASS-26-009",
    title: "Cloud Computing Adoption",
    date: "April 2, 2026",
    manuscriptId: "RH-2026-0160",
  },
  {
    assessedby: "Dr. Seyi Lola",
    assessorId: "ASS-26-010",
    title: "Data Privacy in the Digital Age",
    date: "March 28, 2026",
    manuscriptId: "RH-2026-0159",
  },
  {
    assessedby: "Dr. Segun Iftar",
    assessorId: "ASS-26-011",
    title: "The Future of Renewable Energy",
    date: "March 23, 2026",
    manuscriptId: "RH-2026-0158",
  },
  {
    assessedby: "Dr. Roseline Binta",
    assessorId: "ASS-26-012",
    title: "Blockchain Tech in Education",
    date: "March 10, 2026",
    manuscriptId: "RH-2026-0157",
  },
];

export default function HRMDDashboard() {
  const { user } = useUser();
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
        <RecentActivity recentActivity={recentActivity} />
      </div>
    </section>
  );
}
