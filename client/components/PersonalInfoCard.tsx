"use client";

import { SquarePen, UserRound } from "lucide-react";
import Link from "next/link";
import type { User } from "@/types/user";

type infoProps = {
  user: User;
};

export default function PersonalInfoCard({ user }: infoProps) {
  return (
    <div className="rounded-xl p-4 border border-solid border-[hsla(0,0%,85%,1)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[hsla(216,59%,54%,1)]">
          <UserRound className="h-5 w-5" />
          <h3 className="font-semibold">Personal Information</h3>
        </div>

        <Link
          href="/profile/edit"
          className="flex items-center gap-2 rounded-lg p-2 text-blue-600 transition bg-blue-50 cursor-pointer"
          aria-label="Edit profile"
        >
          <SquarePen className="h-5 w-5" />
          <p className="hidden md:block text-lg">Edit</p>
        </Link>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-slate-900">About Me</h4>
        <p className="text-sm text-[hsla(215,28%,37%,1)]">{user?.bio}</p>
      </div>

      <div className="h-px w-full bg-[hsla(0,0%,85%,1)]"></div>

      <ul className="flex flex-col gap-2">
        <li className="flex">
          <p className="font-semibold flex-1">Full Name:</p>
          <p className="text-slate-700 flex-1">
            {user?.title} {user?.firstname} {user?.lastname}
          </p>
        </li>
        <li className="flex">
          <p className="font-semibold flex-1">Staff ID:</p>
          <p className="text-slate-700 flex-1">{user?.staffId}</p>
        </li>
        <li className="flex">
          <p className="font-semibold flex-1">Email:</p>
          <p className="text-slate-700 flex-1">{user?.email}</p>
        </li>
        <li className="flex">
          <p className="font-semibold flex-1">Phone:</p>
          <p className="text-slate-700 flex-1">{user?.phoneNo}</p>
        </li>
        <li className="flex">
          <p className="font-semibold flex-1">Department:</p>
          <p className="text-slate-700 flex-1">{user?.department}</p>
        </li>
        <li className="flex">
          <p className="font-semibold flex-1">Faculty:</p>
          <p className="text-slate-700 flex-1">{user?.faculty}</p>
        </li>
        <li className="flex">
          <p className="font-semibold flex-1">Rank:</p>
          <p className="text-slate-700 flex-1">{user?.rank}</p>
        </li>
        <li className="flex">
          <p className="font-semibold flex-1">Date Joined:</p>
          <p className="text-slate-700 flex-1">{user?.dateJoined}</p>
        </li>
      </ul>
    </div>
  );
}
