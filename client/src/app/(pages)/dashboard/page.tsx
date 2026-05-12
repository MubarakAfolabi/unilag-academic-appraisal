import Image from "next/image";
import {
  LogOut,
  Bell,
  Clock4,
  Hourglass,
  CircleCheckBig,
  FileText,
  Circle,
  Check,
  X,
} from "lucide-react";

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
            <h2 className="font-bold">Unilag Academic Appraisal</h2>
            <p className="text-sm text-[hsla(0,2%,42%,1)]">
              Publisher&apos;s Portal
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
              src="/profile-pic.svg"
              alt="Profile Picture"
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl font-bold">Welcome back, Dr. Alex Johnson</h2>
        <p className="text-[hsla(0,2%,42%,1)]">
          Track your submission and progress
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

        <ul className="border border-solid border-[hsla(0,0%,85%,1)] p-2 rounded-xl flex flex-col gap-4">
          <li className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
                <FileText />
              </div>

              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1">
                  <p className="font-bold">
                    AI in Healthcare: Opportunities and Challenges
                  </p>
                  <p className="text-sm text-[hsla(0,2%,42%,1)]">
                    Submitted on April 23, 2026
                  </p>
                </div>

                <div className="bg-[hsla(60,100%,85%,0.7)] text-[hsla(35,98%,52%,1)] w-fit h-fit p-1 rounded-lg flex items-center justify-center">
                  Under Review
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-[hsla(150,90%,24%,1)] text-white h-6 w-6 p-1 rounded-full flex items-center justify-center">
                <Check />
              </div>
              <hr className="w-full border-[hsla(0,0%,85%,1)] border" />
              <div className="text-[hsla(35,98%,52%,1)]">
                <Circle size={24} strokeWidth={2} />
              </div>
              <hr className="w-full border-[hsla(0,0%,85%,1)] border" />
              <div className="text-[hsla(0,0%,85%,1)]">
                <Circle strokeWidth={2} />
              </div>
            </div>
          </li>

          <hr className="w-full border-[hsla(0,0%,85%,1)] border" />

          <li className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
                <FileText />
              </div>

              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1">
                  <p className="font-bold">
                    AI in Healthcare: Opportunities and Challenges
                  </p>
                  <p className="text-sm text-[hsla(0,2%,42%,1)]">
                    Submitted on April 23, 2026
                  </p>
                </div>

                <div className="bg-[hsla(150,90%,24%,0.1)] text-[hsla(150,90%,24%,1)] w-fit h-fit p-1 rounded-lg flex items-center justify-center">
                  Agreed
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-[hsla(150,90%,24%,1)] text-white h-6 w-6 p-1 rounded-full flex items-center justify-center">
                <Check />
              </div>
              <hr className="w-full border-[hsla(0,0%,85%,1)] border" />
              <div className="bg-[hsla(150,90%,24%,1)] text-white h-6 w-6 p-1 rounded-full flex items-center justify-center">
                <Check />
              </div>
              <hr className="w-full border-[hsla(0,0%,85%,1)] border" />
              <div className="bg-[hsla(150,90%,24%,1)] text-white h-6 w-6 p-1 rounded-full flex items-center justify-center">
                <Check />
              </div>
            </div>
          </li>

          <hr className="w-full border-[hsla(0,0%,85%,1)] border" />

          <li className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
                <FileText />
              </div>

              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1">
                  <p className="font-bold">
                    AI in Healthcare: Opportunities and Challenges
                  </p>
                  <p className="text-sm text-[hsla(0,2%,42%,1)]">
                    Submitted on April 23, 2026
                  </p>
                </div>

                <div className="bg-[hsla(353,100%,46%,0.1)] text-[hsla(0,93%,52%,1)] w-fit h-fit p-1 rounded-lg flex items-center justify-center">
                  Under Review
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-[hsla(150,90%,24%,1)] text-white h-6 w-6 p-1 rounded-full flex items-center justify-center">
                <Check />
              </div>
              <hr className="w-full border-[hsla(0,0%,85%,1)] border" />
              <div className="bg-[hsla(150,90%,24%,1)] text-white h-6 w-6 p-1 rounded-full flex items-center justify-center">
                <Check />
              </div>
              <hr className="w-full border-[hsla(0,0%,85%,1)] border" />
              <div className="bg-[hsla(353,100%,46%,1)] text-white h-6 w-6 p-1 rounded-full flex items-center justify-center">
                <X />
              </div>
            </div>
          </li>
        </ul>
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
                <p className="text-sm text-[hsla(0,2%,42%,1)]">3.6mb</p>
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
                <p className="text-sm text-[hsla(0,2%,42%,1)]">2.8mb</p>
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
