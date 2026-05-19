"use client";

import { ChevronLeft, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { userProfile } from "@/constant/publisherDashboard";
import PublisherNotification from "@/components/PublisherNotification";

export default function PublisherNotifications() {
  const [filter, setFilter] = useState(0);

  const navArr = [
    {
      name: "All",
      unread: 5,
    },
    {
      name: "Submissions",
      unread: 2,
    },
  ];

  return (
    <section className="md:h-full md:overflow-y-auto flex-2 flex flex-col p-4 gap-6 mb-15 md:p-0 md:pb-6">
      <header className="md:border-b md:border-b-[hsla(0,0%,85%,1)] md:p-6">
        <div className="flex items-center gap-2 md:justify-between">
          <div className="border-solid border border-[hsla(0,0%,85%,1)] p-1 rounded-md cursor-pointer md:hidden">
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

      <nav className="flex items-center gap-6 md:px-6">
        {navArr.map((item, index) => {
          return (
            <div
              key={index}
              className={`${filter === index ? "text-[hsla(216,59%,54%,1)]" : "text-[hsla(237,15%,47%,1)]"} flex flex-col gap-1 cursor-pointer`}
              onClick={() => setFilter(index)}
            >
              <button className="flex items-center gap-2 font-semibold cursor-pointer">
                {item.name}
                <span className="bg-[hsla(216,59%,54%,0.25)] text-sm h-5 w-5 rounded-full flex items-center justify-center">
                  {item.unread}
                </span>
              </button>
              <hr className="border rounded-full" />
            </div>
          );
        })}
      </nav>

      <div className="flex items-center gap-1 justify-end text-[hsla(216,59%,54%,1)] md:px-6">
        <div className="cursor-pointer">
          <Check />
        </div>
        <p className="cursor-pointer">Mark all as read</p>
      </div>

      <div className="md:px-6">
        <PublisherNotification />
      </div>
    </section>
  );
}
