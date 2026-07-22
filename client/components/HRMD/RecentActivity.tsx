"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FileText, ChevronRight } from "lucide-react";

export type RecentActivityItem = {
  assessedby: string;
  title: string;
  date: string;
  manuscriptId: string;
  assessorId: string;
};


type Props = {
  recentActivity: RecentActivityItem[];
};

export default function RecentActivity({ recentActivity }: Props) {
  const [showAll, setShowAll] = useState(false);

  const params = useParams();
  const currentAssessorId =
    (params?.assessorId as string);

  const displayedActivities = showAll
    ? recentActivity
    : recentActivity.slice(0, 5);

  return (
    <div className="flex flex-col gap-2 md:px-6 md:pb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold md:text-xl">
            Recent Submission
          </h2>
          <button 
          className="text-[hsla(210,79%,46%,1)] font-semibold cursor-pointer transition hover:underline"
          onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>

      <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="grid grid-cols-[2fr_0.9fr_1fr_auto] md:grid-cols-[4fr_2fr_1.5fr] gap-4 px-6 py-4 bg-gray-200 border-b border-gray-200 font-semibold text-medium text-gray-700">
          <div>Assessed By</div>
          <div>Date Submitted</div>
          <div className="hidden lg:block text-right">Action</div>
          <div className="lg:hidden w-4"></div> 
        </div>

        {/* List */}
        <ul className="px-6 py-2 flex flex-col gap-2">
          {displayedActivities.map((activity, index) => {
            const targetUrl = `/h/${activity.assessorId}`;

            return (
              <li
                key={activity.manuscriptId}
                className="grid grid-cols-[2fr_0.9fr_1fr_auto] md:grid-cols-[4fr_2fr_1.5fr] gap-4 items-center py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg flex-shrink-0">
                    <FileText size={24} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-medium lg:text-base truncate">
                      Assessed By: {activity.assessedby}
                    </p>
                  </div>
                </div>

                {/* Middle - Date */}
                <div className="col-span-1 flex items-center justify-center lg:justify-start lg:ml-6">
                  <p className="text-medium font-medium text-gray-700 lg:text-base truncate">
                    {activity.date}
                  </p>
                </div>

                {/* Action - Right */}
                <div className="col-span-2 flex justify-end items-center text-[hsla(0,2%,42%,1)] text-sm font-medium">
                    <div>
                      <Link
                        href={targetUrl}
                        className="inline-flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all whitespace-nowrap"
                      >
                        View now
                        <ChevronRight size={12} className="text-gray-400" />
                      </Link>
                    </div>
                  </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}