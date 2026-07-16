"use client";

import { useEffect, useState } from "react";
import LogoutModal from "@/components/LogoutModal";
import Image from "next/image";
import { LogOut, Bell, Clock4, Hourglass, CircleCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";
import OverviewCards from "@/components/OverviewCards";
import { OverviewCard } from "@/components/OverviewCards";
import PendingReviews from "@/components/PendingReviews";
import RecentActivity from "@/components/RecentActivity";
import ReviewPerformance from "@/components/ReviewPerformance";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

import {
  pendingSubmissions,
  recentActivity,
  reviewerPerformance,
} from "@/constant/reviewerDashboard";
import { useUser } from "@/context/userContext";

export default function AccessorDashboard() {
  const { user, token } = useUser();
  const [modal, setModal] = useState(false);
  const [overviewCards, setOverviewCards] = useState<OverviewCard[]>([
    {
      status: "PENDING",
      label: "Pending Reviews",
      value: 0,
      icon: Clock4,
      iconColor: "text-[hsla(210,79%,46%,1)]",
      iconWrapper: "bg-[hsla(208,78%,85%,1)]",
      bgClass: "bg-[hsl(209,67%,89%)]",
    },
    {
      status: "IN_PROGRESS",
      label: "In Progress",
      value: 0,
      icon: Hourglass,
      iconColor: "text-[hsla(45,100%,51%,1)]",
      iconWrapper: "bg-[hsla(60,100%,51%,0.2)]",
      bgClass: "bg-[hsl(45,100%,85%)]",
    },
    {
      status: "COMPLETED",
      label: "Completed",
      value: 0,
      icon: CircleCheckBig,
      iconColor: "text-[hsla(150,90%,24%,1)]",
      iconWrapper: "bg-[hsla(150,90%,24%,0.2)]",
      bgClass: "bg-[hsl(150,28%,85%)]",
    },
  ]);

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${apiUrl}/api/accessor/overview`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          setOverviewCards((prev) =>
            prev.map((item) => ({
              ...item,
              value:
                data?.reviewOverview.find(
                  (review) => review.status === item.status,
                )?._count ?? 0,
            })),
          );
        }
      });
  }, [token]);

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

          <button
            onClick={() => router.push("/notifications/reviewer")}
            className="border-solid border border-[hsla(0,0%,85%,1)] p-1 rounded-md cursor-pointer relative"
          >
            <div className="bg-[hsla(0,93%,52%,1)] absolute right-1 h-1 w-1 rounded-full"></div>

            <Bell size={22} />
          </button>

          <div className="cursor-pointer">
            <Image
              src={user?.avatar || "profile-pic.svg"}
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
              {user?.title} {user?.firstname} {user?.lastname}
            </span>
          </h2>
          <p className="text-[hsla(0,2%,42%,1)] md:text-lg">
            Review Submissions
          </p>
        </div>

        <div className="gap-4 items-center hidden md:flex">
          <Image
            src={user?.avatar || "profile-pic.svg"}
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

      <div className="flex flex-col gap-2 md:px-6 md:border-b md:border-b-[hsla(0,0%,85%,1)] md:pb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold md:text-xl">Pending Reviews</h2>
          <p className="text-[hsla(210,79%,46%,1)] font-bold cursor-pointer">
            View all
          </p>
        </div>
        <PendingReviews pendingSubmissions={pendingSubmissions} />
      </div>

      <div className="flex flex-col gap-2 md:px-6 md:border-b md:border-b-[hsla(0,0%,85%,1)] md:pb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold md:text-xl">Recent Activity</h2>
          <p className="text-[hsla(210,79%,46%,1)] font-bold cursor-pointer">
            View all
          </p>
        </div>
        <RecentActivity recentActivity={recentActivity} />
      </div>

      <div className="flex flex-col gap-2 md:px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold md:text-xl">
            Review Performance
          </h2>
          <p className="text-[hsla(210,79%,46%,1)] font-bold cursor-pointer">
            View all
          </p>
        </div>
        <ReviewPerformance reviewPerformance={reviewerPerformance} />
      </div>
    </section>
  );
}
