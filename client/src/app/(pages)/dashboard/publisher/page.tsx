"use client";

import Image from "next/image";
import { LogOut, Bell } from "lucide-react";

import { userProfile } from "@/constant/publisherDashboard";
import { recentSubmissions } from "@/constant/publisherDashboard";
import RecentSubmissions from "@/components/VC/RecentSubmissions";
import { recentUploadActivity } from "@/constant/publisherDashboard";
import { publisherOverviewCards } from "@/constant/publisherDashboard";
import RecentUploads from "@/components/RecentUploads";
import PublisherOverviewCards from "@/components/OverviewCards";
import LogoutModal from "@/components/LogoutModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const [modal, setModal] = useState(false);
  const router = useRouter();

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
              {userProfile.portal}
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
              src={userProfile.avatar}
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
            Welcome back, <span>{userProfile.fullName}</span>
          </h2>
          <p className="text-[hsla(0,2%,42%,1)] md:text-lg">
            Track your submissions and progress
          </p>
        </div>

        <div className="gap-4 items-center hidden md:flex">
          <Image
            src={userProfile.avatar}
            alt="Profile Picture"
            width={50}
            height={50}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:px-6 md:border-b md:border-b-[hsla(0,0%,85%,1)] md:pb-10">
        <h2 className="text-lg font-semibold md:text-xl">
          Submission Overview
        </h2>
        <PublisherOverviewCards
          publisherOverviewCards={publisherOverviewCards}
        />
      </div>

      <div className="flex flex-col gap-2 md:px-6 md:border-b md:border-b-[hsla(0,0%,85%,1)] md:pb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold md:text-xl">
            Recent Submission
          </h2>
          <p className="text-[hsla(210,79%,46%,1)] md:hidden font-bold cursor-pointer">
            View all
          </p>
        </div>
        <RecentSubmissions recentSubmissions={recentSubmissions} />
      </div>

      <div className="flex flex-col gap-2 md:px-6">
        <h2 className="text-lg font-semibold md:text-xl">
          Recent Upload Activity
        </h2>
        <RecentUploads recentUploadActivity={recentUploadActivity} />
      </div>
    </section>
  );
}
