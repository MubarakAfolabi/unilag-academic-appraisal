"use client";

import Image from "next/image";
import { LogOut, Bell } from "lucide-react";

import { userProfile } from "@/constant/publisherDashboard";
import { recentSubmissions } from "@/constant/publisherDashboard";
import RecentSubmissions from "@/components/RecentSubmissions";
import { recentUploadActivity } from "@/constant/publisherDashboard";
import { publisherOverviewCards } from "@/constant/publisherDashboard";
import RecentUploads from "@/components/RecentUploads";
import PublisherOverviewCards from "@/components/PublisherOverviewCards";
import LogoutModal from "@/components/LogoutModal";
import { useState } from "react";
import PublisherNavigationLayout from "@/components/PublisherNavigationLayout";

export default function Dashboard() {
  const [modal, setModal] = useState(false);

  return (
    <section className="flex flex-col p-4 gap-6 mb-15">
      {modal && <LogoutModal onClose={() => setModal(false)} />}

      <div className="flex items-center justify-between">
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
          <button className="border-solid border border-[hsla(0,0%,85%,1)] p-1 rounded-md cursor-pointer relative">
            <div className="bg-[hsla(0,93%,52%,1)] absolute right-1 h-1 w-1 rounded-full"></div>

            <Bell size={22} />
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

      <div className="flex flex-col">
        <h2 className="text-xl font-bold">
          Welcome back, <span>{userProfile.fullName}</span>
        </h2>
        <p className="text-[hsla(0,2%,42%,1)]">
          Track your submissions and progress
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Submission Overview</h2>
        <PublisherOverviewCards
          publisherOverviewCards={publisherOverviewCards}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Submission</h2>
          <p className="text-[hsla(210,79%,46%,1)] font-bold cursor-pointer">
            View all
          </p>
        </div>
        <RecentSubmissions recentSubmissions={recentSubmissions} />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Recent Upload Activity</h2>
        <RecentUploads recentUploadActivity={recentUploadActivity} />
      </div>

      <PublisherNavigationLayout />
    </section>
  );
}
