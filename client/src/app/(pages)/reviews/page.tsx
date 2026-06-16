"use client";

import Image from "next/image";
import { LogOut, Bell, Clock4, Hourglass, CircleCheckBig } from "lucide-react";
import LogoutModal from "@/components/LogoutModal";
import { useState } from "react";
import { allReviews } from "@/constant/reviewerDashboard";
import { user } from "@/constant/user";
import ReviewList from "@/components/accessor/ReviewList";
import OverviewCards from "@/components/OverviewCards";
import { OverviewCard } from "@/components/OverviewCards";

const overviewCards: OverviewCard[] = [
  {
    label: "Pending Reviews",
    value: "24",
    icon: Clock4,
    iconColor: "text-[hsla(210,79%,46%,1)]",
    iconWrapper: "bg-[hsla(208,78%,85%,1)]",
    bgClass: "bg-[hsl(209,67%,89%)]",
  },
  {
    label: "In Progress",
    value: "6",
    icon: Hourglass,
    iconColor: "text-[hsla(45,100%,51%,1)]",
    iconWrapper: "bg-[hsla(60,100%,51%,0.2)]",
    bgClass: "bg-[hsl(45,100%,85%)]",
  },
  {
    label: "Completed",
    value: "18",
    icon: CircleCheckBig,
    iconColor: "text-[hsla(150,90%,24%,1)]",
    iconWrapper: "bg-[hsla(150,90%,24%,0.2)]",
    bgClass: "bg-[hsl(150,28%,85%)]",
  },
];

export default function Reviews() {
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
              Accessor&apos;s Portal
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
            My Reviews
          </h2>
          <p className="text-[hsla(0,2%,42%,1)] md:text-lg">
            Manage and track your reviews
          </p>
        </div>
        <div className="gap-4 items-center hidden md:flex">
          <button className="bg-[hsla(0,0%,96%,1)] h-fit w-fit p-2 rounded-md relative cursor-pointer">
            <span className="bg-[hsla(0,93%,52%,1)] absolute top-[-3] right-[-3] h-3 w-3 rounded-full"></span>
            <Bell />
          </button>
          <Image
            src={user.avatar}
            alt="Profile Picture"
            width={50}
            height={50}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:px-6 md:border-b md:border-b-[hsla(0,0%,85%,1)] md:pb-10">
        <h2 className="text-lg font-semibold md:text-xl">Overview</h2>
        <OverviewCards overviewCards={overviewCards} />
      </div>

      <div className="md:px-6">
        <ReviewList allReviews={allReviews} />
      </div>
    </section>
  );
}
