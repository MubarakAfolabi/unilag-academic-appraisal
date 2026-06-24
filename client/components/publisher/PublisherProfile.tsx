"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";
import LogoutModal from "@/components/LogoutModal";
import PublisherProfileCard from "@/components/publisher/PublisherProfileCard";
import PersonalInfoCard from "@/components/PersonalInfoCard";
import UploadListCard from "@/components/UploadListCard";
import { useUser } from "@/context/userContext";
import { useLayout } from "@/context/layoutContext";

export default function PublisherProfile() {
  const { user } = useUser();
  const { logOutModal, setLogOutModal } = useLayout();

  return (
    <section className="md:h-full md:overflow-y-auto flex-2 flex flex-col p-4 gap-6 mb-15 md:p-0 md:pb-6">
      {logOutModal && <LogoutModal onClose={() => setLogOutModal(false)} />}

      <div className="flex items-center justify-between md:p-6 md:border-b md:border-b-[hsla(0,0%,85%,1)]">
        <div className="flex-1 flex items-center gap-2">
          <div className="md:hidden">
            <Image
              src="/unilaglogo.svg"
              alt="UNILAG logo"
              width={50}
              height={50}
            />
          </div>

          <div>
            <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
              My Profile
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="border-solid border border-[hsla(0,0%,85%,1)] p-1 rounded-md md:hidden cursor-pointer"
            onClick={() => setLogOutModal(true)}
          >
            <LogOut size={22} />
          </button>

          <div className="cursor-pointer">
            <Image
              src={user?.avatar || "/profile-pic.svg"}
              alt="Profile Picture"
              width={30}
              height={30}
              className="w-7.5 h-7.5 md:w-12.5 md:h-12.5"
            />
          </div>
        </div>
      </div>

      <div className="md:px-6 flex flex-col gap-6 ">
        <PublisherProfileCard user={user!} />
        <PersonalInfoCard user={user!} />
        <UploadListCard />
      </div>
    </section>
  );
}
