"use client";

import Image from "next/image";
import { useState } from "react";
import LogoutModal from "@/components/LogoutModal";
import { LogOut } from "lucide-react";
import RecentPublication from "@/components/HRMD/RecentPublication";
import { RecentPublicationItem } from "@/components/HRMD/RecentPublication";
import { useUser } from "@/context/userContext";
import {redirect} from "next/navigation";

export const recentPublication: RecentPublicationItem[] = [
   {
    title: "AI in Healthcare: Opportunities and Challenges",
    date: "May 6, 2026",
    manuscriptId: "RH-2026-0156",
  },
  {
    title: "The Future of Renewable Energy",  
    date: "May 5, 2026",
    manuscriptId: "RH-2026-0167",
  },
  {
    title: "The Impact of Social Media on Mental Health",  
    date: "April 30, 2026",
    manuscriptId: "RH-2026-0166",
  },
  {
    title: "The Role of Big Data in Healthcare",  
    date: "April 25, 2026",
    manuscriptId: "RH-2026-0165",
  },
  {
    title: "The Future of Space Exploration", 
    date: "April 20, 2026",
    manuscriptId: "RH-2026-0164",
  },
  {
    title: "The Ethics of Genetic Engineering",
    date: "April 15, 2026",
    manuscriptId: "RH-2026-0163",
  },
  {
    title: "The Impact of Artificial Intelligence on Employment",
    date: "April 10, 2026",
    manuscriptId: "RH-2026-0162",
  },
 
  {
    title: "The Role of IoT in Smart Cities",
    date: "April 5, 2026",
    manuscriptId: "RH-2026-0161",
  },
  {
    title: "Cloud Computing Adoption",
    date: "April 2, 2026",
    manuscriptId: "RH-2026-0160",
  },
  {
    title: "Data Privacy in the Digital Age",
    date: "March 28, 2026",
    manuscriptId: "RH-2026-0159",
  },
  {
    title: "The Future of Renewable Energy",
    date: "March 23, 2026",
    manuscriptId: "RH-2026-0158",
  },
  {
    title: "Blockchain Tech in Education",
    date: "March 10, 2026",
    manuscriptId: "RH-2026-0157",
  },
];

export default function HRMDDashboard() {
  const { user } = useUser();
  const [modal, setModal] = useState(false);
    if (user?.role !== "HRMD") {
      redirect("/dashboard");
    }

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
            Review Unassigned Publications
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
        <RecentPublication recentPublication={recentPublication} />
      </div>
    </section>
  );
}
