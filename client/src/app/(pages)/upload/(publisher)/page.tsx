"use client";

import Image from "next/image";
import { LogOut, ArrowLeft } from "lucide-react";

import {
  userProfile,
} from "@/constant/publisherDashboard";
import UploadCard from "@/components/UploadCard";
import LogoutModal from "@/components/LogoutModal";
import { useState } from "react";

export default function UploadPage() {
  const [modal, setModal] = useState(false);

  return (
    <section className="md:h-full md:overflow-y-auto flex-2 flex flex-col p-4 mb-15 md:p-0 md:pb-6 bg-white min-h-screen">
      {modal && <LogoutModal onClose={() => setModal(false)} />}

      <div className="block lg:hidden flex items-center justify-between mb-7 md:p-2 md:border-b md:border-b-[hsla(0,0%,85%,1)]">
        {/* Left: Back Arrow Button */}
        <button 
          className="block lg:hidden p-1 cursor-pointer text-gray-800 hover:text-black transition-colors"
          onClick={() => window.history.back()}
          aria-label="Go back"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>

        <div className="block lg:hidden flex items-center gap-3">
          <button
            className="border border-[hsla(0,0%,85%,1)] p-1.5 rounded-md cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setModal(true)}
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>

          <div className=" block lg:hidden cursor-pointer overflow-hidden rounded-full border border-gray-200">
            <Image
              src={userProfile.avatar}
              alt="Profile Picture"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto px-4 py-8">
        <div className="relative w-24 h-24 flex items-center justify-center mb-2">
          <Image
            src="/unilaglogo.svg" 
            alt="University of Lagos Logo"
            width={96}
            height={96}
            priority
            className="object-contain"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl font-extrabold text-black tracking-tight sm:text-4xl">
          Upload Your Document
        </h1>
        
        {/* Subtext */}
        <p className="text-sm sm:text-base text-gray-500 max-w-xl">
          Fill in the details below and attach your file. Once submitted, your document will be published and visible online.
        </p>

        {/* Form/Card Component */}
      <div className="flex flex-col text-left">
        <UploadCard />
      </div>
      </div>

    </section>
  );
}
