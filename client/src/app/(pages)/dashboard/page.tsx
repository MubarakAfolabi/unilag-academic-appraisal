import Image from "next/image";
import {
  LogOut,
  Bell,
  Clock4,
  Hourglass,
  CircleCheckBig,
  FileText,
} from "lucide-react";

import { userProfile } from "@/constant/publisherDashboard";
import { recentSubmissions } from "@/constant/publisherDashboard";
import RecentSubmissions from "@/components/RecentSubmissions";

export default function Dashboard() {
  return (
    <section className="flex flex-col p-4 gap-6">
      <div className="flex items-center justify-between">
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
          <button className="border-solid border border-[hsla(0,0%,85%,1)] p-1 rounded-md cursor-pointer">
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

      <div className="flex flex-col">
        <h2 className="text-xl font-bold">
          Welcome back, <span>{userProfile.fullName}</span>
        </h2>
        <p className="text-[hsla(0,2%,42%,1)]">
          {userProfile.role === "PUBLISHER"
            ? "Track your submissions and progress"
            : ""}{" "}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg">Submission Overview</h2>

        <ul className="flex gap-2 flex-wrap">
          <li className="bg-[hsl(209,67%,89%)] flex-1 p-4 rounded-xl flex flex-col justify-between gap-4">
            <div>
              <div className="bg-[hsla(208,78%,85%,1)] text-[hsla(210,79%,46%,1)] w-fit p-1 rounded-full">
                <Clock4 />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-black">28</p>
              <p className="text-[hsla(0,2%,42%,1)]">Total Submission</p>
            </div>
          </li>
          <li className="bg-[hsl(45,100%,85%)] text-[hsla(45,100%,51%,1)] flex-1 p-4 rounded-xl flex flex-col justify-between gap-4">
            <div>
              <div className="bg-[hsla(60,100%,51%,0.2)] w-fit p-1 rounded-full">
                <Hourglass />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-black">8</p>
              <p className="text-[hsla(0,2%,42%,1)]">Under Review</p>
            </div>
          </li>
          <li className="bg-[hsl(150,28%,85%)] text-[hsla(150,90%,24%,1)] flex-1 p-4 rounded-xl flex flex-col justify-between gap-4">
            <div>
              <div className="bg-[hsla(150,90%,24%,0.2)] w-fit p-1 rounded-full">
                <CircleCheckBig />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-black">15</p>
              <p className="text-[hsla(0,2%,42%,1)]">Approved</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg">Recent Submission</h2>
          <p className="text-[hsla(210,79%,46%,1)] font-bold cursor-pointer">
            View all
          </p>
        </div>

        <RecentSubmissions recentSubmissions={recentSubmissions} />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg">Recent Upload Activity</h2>

        <ul className="flex flex-col gap-4">
          <li className="flex gap-2 border border-solid border-[hsla(0,0%,85%,1)] p-2 rounded-xl">
            <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
              <FileText />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div>
                <div className="flex justify-between">
                  <p className="font-bold">AI in Healthcare.pdf</p>
                  <p className="text-[hsla(210,79%,46%,1)]">Processing...</p>
                </div>
                <p className="text-sm text-[hsla(0,2%,42%,1)]">3.6MB</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-[hsla(0,0%,85%,1)] w-full h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[hsla(210,79%,46%,1)] h-full w-[60%]"></div>
                </div>
                <p className="text-[hsla(0,2%,42%,1)]">60%</p>
              </div>
            </div>
          </li>

          <li className="flex gap-2 border border-solid border-[hsla(0,0%,85%,1)] p-2 rounded-xl">
            <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
              <FileText />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div>
                <div className="flex justify-between">
                  <p className="font-bold">Chemical Interactions</p>
                  <p className="text-[hsla(210,79%,46%,1)]">Processing...</p>
                </div>
                <p className="text-sm text-[hsla(0,2%,42%,1)]">2.8MB</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-[hsla(0,0%,85%,1)] w-full h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[hsla(210,79%,46%,1)] h-full w-[75%]"></div>
                </div>
                <p className="text-[hsla(0,2%,42%,1)]">75%</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
