"use client";

import Image from "next/image";
import { LogOut, Copy, ShieldCheck, Bell, CheckCircle, Clock, Download, FileText} from "lucide-react";
import { ReviewersProfileAbout } from "@/components/ReviewersProfileAbout";
import LogoutModal from "@/components/LogoutModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  userProfile,
  assignedReviews,
} from "@/constant/reviewerDashboard";
import AssignedReviews from "@/components/ReviewersProfileAssignedReviews";

export default function Reviews() {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const reviewerStats = [
    { label: "Assigned Reviews", count: 18, color: "text-blue-600", bg: "bg-blue-50", icon: FileText },
    { label: "Completed Reviews", count: 9, color: "text-green-600", bg: "bg-green-50", icon: CheckCircle },
    { label: "Pending Reviews", count: 5, color: "text-orange-500", bg: "bg-orange-50", icon: Clock },
    { label: "Total Reviews Done", count: 32, color: "text-purple-600", bg: "bg-purple-50", icon: Download },
  ];

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
            <h2 className="font-bold text-md">My Profile</h2>
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
          <div className="hidden md:block md:h-full md:overflow-y-auto cursor-pointer">
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
        <div className="hidden md:block">
          <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
            My Profile
          </h2>
          <p className="text-[hsla(210,79%,46%,1)] md:text-lg">
            <button onClick={() => router.push("/reviewer")} className="hover:underline">
              Dashboard
            </button>
            / My profile
          </p>
        </div>
        <div className="gap-4 items-center hidden md:flex">
          <button className="bg-[hsla(0,0%,96%,1)] h-fit w-fit p-2 rounded-md relative cursor-pointer">
            <span className="bg-[hsla(0,93%,52%,1)] absolute top-[-3] right-[-3] h-3 w-3 rounded-full"></span>
            <Bell />
          </button>
          <Image
            src={userProfile.avatar}
            alt="Profile Picture"
            width={50}
            height={50}
          />
        </div>
      </div>

      <div className="-mt-10 md:mt-0  flex flex-col gap-2 md:px-6 md:border-b md:border-b-[hsla(0,0%,85%,1)] md:pb-10">
        <div className="border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6 bg-white">
          
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
              <Image
                src={userProfile.avatar}
                alt="Profile Avatar"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-bold text-2xl md:text-lg text-gray-900">
                  {userProfile.rank} {userProfile.fullName.replace("Dr. ", "")}
                </h3>
                <ShieldCheck size={18} className="inline-block text-blue-600" />
              </div>
              <p className="text-lg text-gray-500 flex items-center gap-1">
                Reviewer ID: <span className="font-medium text-gray-800">{userProfile.reviewerId}</span>
                <button className="text-gray-400 hover:text-gray-600 ml-0.5">
                  <Copy size={12} className="inline" />
                </button>
              </p>
              <span className="mt-1 text-sm font-medium text-blue-600 border border-blue-200 bg-blue-50 px-2.5 py-0.5 rounded-full w-fit">
                <ShieldCheck size={12} className="inline mr-1" />
                Verified Reviewer
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 border border-gray-100 rounded-xl p-3 bg-gray-50/30">
            {reviewerStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center p-2 rounded-lg bg-white border border-gray-50 shadow-sm">
                  <div className={`p-1.5 rounded-md ${stat.bg} ${stat.color} mb-1.5`}>
                    <Icon size={35} />
                  </div>
                  <span className="font-bold text-lg md:text-lg text-gray-900">{stat.count}</span>
                  <span className="text-sm md:text-sm background: rgb(107, 116, 140) font-medium mt-0.5 max-w-[70px] md:max-w-none">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <ReviewersProfileAbout/>
      </div>

      <div className="md:px-6">
        <AssignedReviews assignedReviews={assignedReviews} />
      </div>
    </section>
  );
}
