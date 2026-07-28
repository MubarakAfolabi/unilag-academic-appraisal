"use client";

import Image from "next/image";
import { FileText, CircleCheck, Clock3, Download } from "lucide-react";
import { useUser } from "@/context/userContext";

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
  const { user } = useUser();

  return (
    <div className="rounded-xl bg-white p-4 border border-solid border-[hsla(0,0%,85%,1)]">
      <div className="flex flex-col gap-4 lg:gap-6 lg:flex-row">
        <div className="flex flex-col items-center justify-center text-center lg:px-20">
          <div className="mb-4 h-40 w-40 overflow-hidden rounded-full bg-amber-100">
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
            {user?.title} {user?.firstname} {user?.lastname}
          </h3>

          <span className="mt-3 rounded-full bg-emerald-50 px-5 py-2 text-sm font-semibold text-blue-600">
            Lecturer
          </span>

          {user?.department && (
            <p className="mt-4 text-slate-600">
              Department of {user?.department}
            </p>
          )}
          <p className="mt-1 font-semibold text-slate-900">
            University of Lagos
          </p>
        </div>

        <div className="h-px w-full bg-[hsla(0,0%,85%,1)] lg:h-auto lg:w-px"></div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-4 flex items-center gap-2 text-[hsla(216,59%,54%,1)]">
            <h3 className="font-semibold">Overview</h3>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <li
                  key={item.name}
                  className="rounded-xl border border-solid border-[hsla(0,0%,85%,1)] p-4"
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
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
