"use client";

import Image from "next/image";
import { FileText, CircleCheck, Clock3, Download } from "lucide-react";

const stats = [
  {
    name: "Works Uploaded",
    amount: 28,
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    name: "Received",
    amount: 8,
    icon: CircleCheck,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    name: "Under Review",
    amount: 3,
    icon: Clock3,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    name: "Total Download",
    amount: 156,
    icon: Download,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
];

export default function PublisherProfileCard() {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        {/* Left profile block */}
        <div className="flex flex-col items-center justify-center border-b border-slate-200 pb-5 text-center lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">
          <div className="mb-4 h-40 w-40 overflow-hidden rounded-full bg-amber-100 shadow-inner">
            <Image
              src="/profile-pic.svg"
              alt="Profile picture"
              width={160}
              height={160}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <h3 className="text-2xl font-semibold text-slate-900">
            Dr. Alex Johnson
          </h3>

          <span className="mt-3 rounded-full bg-emerald-50 px-5 py-2 text-sm font-semibold text-blue-600">
            Lecturer
          </span>

          <p className="mt-4 text-slate-600">Department of Computer Science</p>
          <p className="mt-1 font-semibold text-slate-900">University of Lagos</p>
        </div>

        {/* Stats block */}
        <div className="w-full">
          {/* Overview Title */}
          <div className="mb-4 flex items-center gap-2 text-blue-600">
            <h3 className="mt-10 text-lg font-semibold">Overview</h3>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
                    >
                      <Icon className={`h-5 w-5 ${item.iconColor}`} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-2xl font-semibold text-slate-900 md:text-3xl">
                        {item.amount}
                      </p>
                      <p className="text-sm text-slate-500 break-words">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}