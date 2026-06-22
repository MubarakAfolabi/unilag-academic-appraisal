"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { userProfile } from "@/constant/reviewerDashboard";
import ReviewerNotification from "@/components/ReviewerNotification";

export default function Notifications() {
  const router = useRouter();

  return (
    <section className="md:h-full md:overflow-y-auto flex-2 flex flex-col p-4 gap-6 mb-15 md:p-0 md:pb-6">
      <header className="md:border-b md:border-b-[hsla(0,0%,85%,1)] md:p-6">
        <div className="flex items-center gap-2 md:justify-between">
          <div
            className="border-solid border border-[hsla(0,0%,85%,1)] p-1 rounded-md cursor-pointer md:hidden"
            onClick={() => router.push("/reviewer")}
          >
            <ChevronLeft />
          </div>
          <div>
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
              Notifications
            </h2>
            <p className="text-[hsla(0,2%,42%,1)] md:text-lg hidden md:block">
              Stay updated with your review activities and system alerts.
            </p>
          </div>

          <div className="shrink-0 gap-4 items-center hidden md:flex">
            <Image
              src={userProfile.avatar}
              alt="Profile Picture"
              width={50}
              height={50}
            />
          </div>
        </div>
      </header>

      <div className="flex items-center gap-1 justify-end text-[hsla(216,59%,54%,1)] md:px-6">
        <ReviewerNotification />
      </div>
    </section>
  );
}
