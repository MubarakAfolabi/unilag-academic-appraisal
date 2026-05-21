"use client";

import Image from "next/image";
import { LogOut, Bell } from "lucide-react";
import PublisherOverviewCards from "@/components/PublisherOverviewCards";

import {
  publisherOverviewCards,
  userProfile,
} from "@/constant/publisherDashboard";
import UploadCard from "@/components/UploadCard";
import LogoutModal from "@/components/LogoutModal";
import { useState } from "react";

export default function UploadPage() {
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
              {userProfile.portal}
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
            Upload Article
          </h2>
          <p className="text-[hsla(0,2%,42%,1)] md:text-lg">
            Upload your submissions and documents
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

      <div className="flex flex-col gap-2 md:px-6 md:border-b md:border-b-[hsla(0,0%,85%,1)] md:pb-10">
        <h2 className="text-lg font-semibold md:text-xl">
          Submission Overview
        </h2>
        <PublisherOverviewCards
          publisherOverviewCards={publisherOverviewCards}
        />
      </div>

      <div className="flex flex-col gap-2 md:px-6 md:border-b md:border-b-[hsla(0,0%,85%,1)] md:pb-10">
        <h2 className="text-lg font-semibold md:text-xl">Article Submission</h2>
        <UploadCard />
      </div>

      <div className="md:px-6">
        <div className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl flex flex-col gap-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-sm font-semibold text-gray-700 w-1/5">
                  Document
                </th>
                <th className="pb-3 text-sm font-semibold text-gray-700 w-1/5">
                  Article
                </th>
                <th className="pb-3 text-sm font-semibold text-gray-700 w-1/5">
                  Submitted To
                </th>
                <th className="pb-3 text-sm font-semibold text-gray-700 w-1/5">
                  Status
                </th>
                <th className="pb-3 text-sm font-semibold text-gray-700 w-1/5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-32">
                <td colSpan={5} className="text-center text-gray-400 text-sm">
                  No submissions found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
