"use client";

import Image from "next/image";
import { userProfile } from "@/constant/publisherDashboard";
import { LogOut, Upload, Folder} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoutModal from "@/components/LogoutModal";
import PublisherProfileCard from "@/components/PublisherProfileCard";
import PersonalInfoCard from "@/components/PersonalInfoCard";
import UploadListCard from "@/components/UploadListCard";


export default function PublisherProfilePage() {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  return (
    <section className="md:h-full md:overflow-y-auto flex-2 flex flex-col p-4 gap-6 mb-15 md:p-0 md:pb-6">
      {modal && <LogoutModal onClose={() => setModal(false)} />}

      <div className="flex items-center justify-between md:p-2 md:border-b md:border-b-[hsla(0,0%,85%,1)]">
        <div className="flex-1 flex items-center gap-2">
          <div className="md:hidden">
            <Image
              src="/unilaglogo.svg"
              alt="UNILAG logo"
              width={50}
              height={50}
            />
          </div>

          <div className="hidden md:block">
          <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
            My Profile
          </h2>
          <p className="text-[hsla(210,79%,46%,1)] md:text-lg">
            <button onClick={() => router.push("/publisher")} className="hover:underline">
              Dashboard
            </button>
            / My profile
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

      <div className="md:px-6 flex flex-col gap-6 ">
        <PublisherProfileCard />
        <PersonalInfoCard />
      </div>

      <div className="md:px-6">
        <button onClick={() => router.push("/upload")} className="my-3 inline-flex items-center gap-5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
          <Upload className="h-4 w-4" />
          Upload New Work
        </button>
        <UploadListCard />
      </div>
    </section>
  );
}
