"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { LogOut, Clock4, CircleX, CircleCheckBig } from "lucide-react";
import Image from "next/image";

import { recentSubmissions } from "@/constant/publisherDashboard";
import RecentSubmissions from "@/components/RecentSubmissions";
import {MOCK_SUBMISSIONS} from "@/components/VC/RecentSubmissions";
import LogoutModal from "@/components/LogoutModal";
import OverviewCards, { OverviewCard } from "@/components/OverviewCards";
import { useUser } from "@/context/userContext";

export default function AssesedDashboard() {

    const { user } = useUser();

    const [modal, setModal] = useState(false);

    const params = useParams();

    const staff = MOCK_SUBMISSIONS.find(
        item => item.staffId === params.id
    );

    if (!staff) {
        return (
            <div className="p-6">
                Staff not found
            </div>
        );
    }

const overviewCards: OverviewCard[] = [
  {
    label: "Total Submissions",
    value: String(
      (staff.totalPublications ??
        staff.positiveCount + staff.negativeCount)
      ),
    icon: Clock4,
    iconColor: "text-[hsla(210,79%,46%,1)]",
    iconWrapper: "bg-[hsla(208,78%,85%,1)]",
    bgClass: "bg-[hsl(209,67%,89%)]",
  },
  {
    label: "Positive",
    value: String(staff.positiveCount),
    icon: CircleCheckBig,
    iconColor: "text-[hsla(150,90%,24%,1)]",
    iconWrapper: "bg-[hsla(150,90%,24%,0.2)]",
    bgClass: "bg-[hsla(150,90%,24%,0.2)]",
  },
  {
    label: "Negative",
    value: String(staff.negativeCount),
    icon: CircleX,
    iconColor: "text-[hsla(0,93%,52%,1)]",
    iconWrapper: "bg-[hsla(0,93%,52%,0.1)]",
    bgClass: "bg-[hsla(353,100%,46%,0.2)]",
  },
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
            <h2 className="font-bold text-md">Unilag Academic Appraisal</h2>
            <p className="text-sm text-[hsla(0,2%,42%,1)]">
              Vice Chancellor&apos;s Portal
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

          <div className="cursor-pointer h-[50px] w-[50px] rounded-full overflow-hidden">
            <Image
              src="/profile-pic.svg"
              alt="Profile Picture"
              width={30}
              height={30}
              className="object-cover h-full w-full" 
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center md:border-b md:border-b-[hsla(0,0%,85%,1)] md:p-6">
        <div>
          <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
            {staff.fullName}'s Submission
            <span>
              
            </span>
          </h2>
          <p className="text-[hsla(0,2%,42%,1)] md:text-lg">
            Overview of the academic appraisal system
          </p>
        </div>

        <div className="gap-4 items-center hidden md:flex h-[50px] w-[50px] rounded-full overflow-hidden">
          <Image
            src="/profile-pic.svg"
            alt="Profile Picture"
            width={50}
            height={50}
            className="object-cover h-full w-full" 
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:px-6 md:border-b md:border-b-[hsla(0,0%,85%,1)] md:pb-10">
        <h2 className="text-lg font-semibold md:text-xl">Overview</h2>
        <OverviewCards overviewCards={overviewCards} />
      </div>

      <div className="flex flex-col gap-2 md:px-6 md:pb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold md:text-xl">
            Assessed Submissions
          </h2>
        </div>
        <RecentSubmissions recentSubmissions={recentSubmissions} />
      </div>
    </section>
     );
}