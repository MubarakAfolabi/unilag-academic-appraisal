"use client";

import Image from "next/image";
import { LogOut, Clock4, Hourglass, CircleCheckBig } from "lucide-react";
import { userProfile } from "@/constant/publisherDashboard";
import RecentUploads from "@/components/RecentUploads";
import OverviewCards from "@/components/OverviewCards";
import { OverviewCard } from "@/components/OverviewCards";
import LogoutModal from "@/components/LogoutModal";
import RecentSubmissions from "./RecentSubmissions";
import type { UploadItem } from "@/types/uploadItem";
import { useUser } from "@/context/userContext";
import { useLayout } from "@/context/layoutContext";
import { useEffect, useState } from "react";
import { useRecentUploads } from "@/hooks/useRecentUploads";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PublisherDashboard() {
  const { user, token } = useUser();
  const { logOutModal, setLogOutModal } = useLayout();
  const [overview, setOverview] = useState({
    publicationCount: 0,
    publicationUnderReviewCount: 0,
    publicationScoredCount: 0,
  });

  const items = useRecentUploads();
  const [recentUploadActivity, setRecentUploadActivity] = useState<
    UploadItem[]
  >([]);

  useEffect(() => {
    setRecentUploadActivity((prev) => {
      const next = [...prev];

      for (const item of items) {
        const index = next.findIndex((upload) => upload.id === item.id);

        if (index === -1) {
          next.push({ ...item });
        } else {
          next[index] = {
            ...next[index],
            ...item,
          };
        }
      }

      return next;
    });
  }, [items]);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${apiUrl}/api/publisher/overview`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          setOverview(data?.submissionOverviewCount);
        }
      });
  }, [token]);

  const overviewCards: OverviewCard[] = [
    {
      status: "TOTAL",
      label: "Total Submission",
      value: overview?.publicationCount,
      icon: Clock4,
      iconColor: "text-[hsla(210,79%,46%,1)]",
      iconWrapper: "bg-[hsla(208,78%,85%,1)]",
      bgClass: "bg-[hsl(209,67%,89%)]",
    },
    {
      status: "UNDER_REVIEW",
      label: "Under Review",
      value: overview?.publicationUnderReviewCount,
      icon: Hourglass,
      iconColor: "text-[hsla(45,100%,51%,1)]",
      iconWrapper: "bg-[hsla(60,100%,51%,0.2)]",
      bgClass: "bg-[hsl(45,100%,85%)]",
    },
    {
      status: "SCORED",
      label: "Scored",
      value: overview?.publicationScoredCount,
      icon: CircleCheckBig,
      iconColor: "text-[hsla(150,90%,24%,1)]",
      iconWrapper: "bg-[hsla(150,90%,24%,0.2)]",
      bgClass: "bg-[hsl(150,28%,85%)]",
    },
  ];

  return (
    <section className="md:h-full md:overflow-y-auto flex-2 flex flex-col p-4 gap-6 mb-15 md:p-0 md:pb-6">
      {logOutModal && <LogoutModal onClose={() => setLogOutModal(false)} />}

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
              Publisher&apos;s Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="border-solid border border-[hsla(0,0%,85%,1)] p-1 rounded-md cursor-pointer"
            onClick={() => setLogOutModal(true)}
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
            Welcome back,{" "}
            <span>
              {user?.title} {user?.firstname} {user?.lastname}
            </span>
          </h2>
          <p className="text-[hsla(0,2%,42%,1)] md:text-lg">
            Track your submissions and progress
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
        <h2 className="text-lg font-semibold md:text-xl">
          Submission Overview
        </h2>
        <OverviewCards overviewCards={overviewCards} />
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
        <RecentSubmissions />
      </div>

      {recentUploadActivity.length > 0 && (
        <div className="flex flex-col gap-2 md:px-6">
          <h2 className="text-lg font-semibold md:text-xl">
            Recent Upload Activity
          </h2>
          <RecentUploads recentUploadActivity={recentUploadActivity} />
        </div>
      )}
    </section>
  );
}
