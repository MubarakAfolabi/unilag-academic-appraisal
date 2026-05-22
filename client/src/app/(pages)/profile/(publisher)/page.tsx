"use client";

import Image from "next/image";
import { userProfile } from "@/constant/publisherDashboard";
import { LogOut, Bell, UserRound, SquarePen } from "lucide-react";
import { useState } from "react";
import LogoutModal from "@/components/LogoutModal";
import PublisherProfileCard from "@/components/PublisherProfileCard";
import PersonalInfoCard from "@/components/PersonalInfoCard";

export default function PublisherProfilePage() {
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
            <h2 className="font-bold text-xl">My Profile</h2>
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

          <div className="cursor-pointer hidden">
            <Image
              src={userProfile.avatar}
              alt="Profile Picture"
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>

      <div>
        <PublisherProfileCard />
      </div>

      <div>
        <PersonalInfoCard />
      </div>
    </section>
  );
}
