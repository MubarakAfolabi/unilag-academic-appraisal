"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/context/userContext";
import { ArrowLeft, FileText, Info } from "lucide-react";

export default function ReviewPage() {
  const { user } = useUser();
  const params = useParams();

  console.log(params);

  const handleSubmitScore = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="md:h-full md:overflow-y-auto flex-2 flex flex-col p-4 gap-6 mb-15 md:p-0 md:pb-6">
      <div className="flex justify-between items-center md:border-b md:border-b-[hsla(0,0%,85%,1)] md:p-6">
        <div className="flex items-center gap-2 text-[hsla(210,79%,46%,1)] cursor-pointer">
          <button>
            <ArrowLeft />
          </button>
          <p>Back to Reviews</p>
        </div>

        <div className="gap-4 items-center hidden md:flex">
          <Image
            src={user?.avatar || "/profile-pic.svg"}
            alt="Profile Picture"
            width={50}
            height={50}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-between">
        <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
          <FileText className="lg:w-9 lg:h-9" />
        </div>
        <div className="flex-1">
          <p className="font-semibold lg:text-lg">
            AI in Healthcare: Opportunities and Challenges
          </p>
          <p className="text-sm text-[hsla(0,2%,42%,1)] lg:text-md">
            By Mubarak Idris
          </p>
          <p className="text-sm text-[hsla(0,2%,42%,1)] lg:text-md">
            Submitted on April 23, 2026
          </p>
        </div>
        <div>
          <p className="bg-[hsla(60,100%,85%,0.7)] text-[hsla(35,98%,52%,1)] px-2 py-1 rounded-full w-fit">
            Pending
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:px-6 md:border-b md:border-b-[hsla(0,0%,85%,1)] md:pb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold md:text-xl">Recent Activity</h2>
        </div>
        <div className="flex flex-col gap-6 border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl">
          <div className="flex justify-between items-center">
            <p className="text-[hsla(0,2%,42%,1)]">Journal</p>
            <p>Unilag Academic Appraisal Journal</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[hsla(0,2%,42%,1)]">Manuscript Type</p>
            <p>Research Article</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[hsla(0,2%,42%,1)]">Subject Area</p>
            <p>Healthcare & Medicine</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[hsla(0,2%,42%,1)]">Index Status</p>
            <p>Q1</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[hsla(0,2%,42%,1)]">Author Position</p>
            <p>2nd</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[hsla(0,2%,42%,1)]">Date Submitted</p>
            <p>3rd May 2026</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[hsla(0,2%,42%,1)]">File</p>
            <div className="bg-[hsl(0,0%,96%)] flex gap-4 p-2 rounded-md">
              <div className="flex gap-1">
                <FileText size={22} />
                <p>filename.pdf</p>
              </div>
              <p className="text-[hsla(0,2%,42%,1)]">(1.2mb)</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Abstract</h3>
            <p className="text-sm">
              This paper explores the transformative potential of artificial
              intelligence in healthcare, highlighting its applications,
              benefits, and the challenges that must be addressed for successful
              implentation.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl">
        <div className="bg-[hsl(0,0%,96%)] p-2 rounded-md flex items-center gap-2">
          <div className="text-[hsla(210,79%,46%,1)]">
            <Info size={22} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Manuscript Evaluation</h3>
            <p className="text-sm text-[hsla(0,2%,42%,1)]">
              Scores must fall within the approved review scale (4.1–5.0)
            </p>
          </div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmitScore}>
          <label>
            <input
              type="text"
              placeholder="Input Score"
              className="focus:border-[hsl(216,100%,58%)] border w-full p-2 rounded-md outline-none"
            />
          </label>

          <button
            type="submit"
            className="text-white bg-[hsla(216,59%,54%,1)] p-2 rounded-md text-lg font-bold cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
