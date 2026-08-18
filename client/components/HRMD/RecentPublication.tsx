"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";
import { useUser } from "@/context/userContext";
import { format } from "date-fns";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type RecentPublicationItem = {
  title: string;
  date: string;
  manuscriptId: string;
};

export const recentPublication: RecentPublicationItem[] = [
  {
    title: "AI in Healthcare: Opportunities and Challenges",
    date: "May 6, 2026",
    manuscriptId: "RH-2026-0156",
  },
  {
    title: "The Future of Renewable Energy",
    date: "May 5, 2026",
    manuscriptId: "RH-2026-0167",
  },
  {
    title: "The Impact of Social Media on Mental Health",
    date: "April 30, 2026",
    manuscriptId: "RH-2026-0166",
  },
  {
    title: "The Role of Big Data in Healthcare",
    date: "April 25, 2026",
    manuscriptId: "RH-2026-0165",
  },
  {
    title: "The Future of Space Exploration",
    date: "April 20, 2026",
    manuscriptId: "RH-2026-0164",
  },
  {
    title: "The Ethics of Genetic Engineering",
    date: "April 15, 2026",
    manuscriptId: "RH-2026-0163",
  },
  {
    title: "The Impact of Artificial Intelligence on Employment",
    date: "April 10, 2026",
    manuscriptId: "RH-2026-0162",
  },

  {
    title: "The Role of IoT in Smart Cities",
    date: "April 5, 2026",
    manuscriptId: "RH-2026-0161",
  },
  {
    title: "Cloud Computing Adoption",
    date: "April 2, 2026",
    manuscriptId: "RH-2026-0160",
  },
  {
    title: "Data Privacy in the Digital Age",
    date: "March 28, 2026",
    manuscriptId: "RH-2026-0159",
  },
  {
    title: "The Future of Renewable Energy",
    date: "March 23, 2026",
    manuscriptId: "RH-2026-0158",
  },
  {
    title: "Blockchain Tech in Education",
    date: "March 10, 2026",
    manuscriptId: "RH-2026-0157",
  },
];

type Props = {
  recentPublication: RecentPublicationItem[];
};

export default function RecentPublication({ recentPublication }: Props) {
  const { token } = useUser();
  const [showAll, setShowAll] = useState(false);
  const [unassignedPublications, setUnassignedPublications] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${apiUrl}/api/hrmd/unassigned-publications`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          setUnassignedPublications(data?.unAssignedPublications);
        }
      });
  }, [token]);

  const displayedActivities = showAll
    ? recentPublication
    : recentPublication.slice(0, 5);

  return (
    <div className="flex flex-col gap-2 md:px-6 md:pb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold md:text-xl">
          Unassigned Publications
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
          <div>Publications</div>
          <div>Date Submitted</div>
          <div className="hidden lg:block text-right">Action</div>
          <div className="lg:hidden w-4"></div>
        </div>

        {/* List */}
        <ul className="px-6 py-2 flex flex-col gap-2">
          {unassignedPublications?.map((pub) => {
            const targetUrl = `/designate/${pub.id}`;

            return (
              <li
                key={pub.id}
                className="grid grid-cols-[2fr_0.9fr_1fr_auto] md:grid-cols-[4fr_2fr_1.5fr] gap-4 items-center py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg flex-shrink-0">
                    <FileText size={24} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-medium lg:text-base truncate">
                      {pub.fullCitation}
                    </p>
                    <p className="text-sm text-[hsla(0,2%,42%,1)]">
                      By {pub.user.firstname} {pub.user.lastname}
                    </p>
                  </div>
                </div>

                {/* Middle - Date */}
                <div className="col-span-1 flex items-center justify-center lg:justify-start lg:ml-6">
                  <p className="text-medium font-medium text-gray-700 lg:text-base truncate">
                    {format(new Date(pub.createdAt), "MMM d, yyyy")}
                  </p>
                </div>

                {/* Action - Right */}
                <div className="flex justify-end items-center text-[hsla(0,2%,42%,1)] text-sm font-medium">
                  <div>
                    <Link
                      href={targetUrl}
                      className="inline-flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all whitespace-nowrap"
                    >
                      Assign
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
