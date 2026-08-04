"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FileText, ChevronRight } from "lucide-react";
import { useUser } from "@/context/userContext";
import { format } from "date-fns";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type RecentActivityItem = {
  assessedby: string;
  title: string;
  date: string;
  manuscriptId: string;
  assessorId: string;
};

export default function Accessors() {
  const { token } = useUser();
  const [showAll, setShowAll] = useState(false);
  const [offset, setOffset] = useState(0);
  const [accessors, setAccessors] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const LIMIT = 10;

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${apiUrl}/api/users?role=ACCESSOR&take=10&offset=${offset}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          setAccessors(data?.users);
          setAccessors((prev) => {
            const existing = new Set(prev.map((user) => user.id));

            return [
              ...prev,
              ...data.users.filter(
                (user: { id: string }) => !existing.has(user.id),
              ),
            ];
          });

          if (data?.users.length < LIMIT) {
            setHasMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, offset]);

  return (
    <div className="flex flex-col gap-2 md:px-6 md:pb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold md:text-xl">Accessors</h2>
      </div>

      <div className="flex flex-col rounded-xl border border-gray-200 bg-white">
        {!loading ? (
          <>
            <div className="grid grid-cols-[2fr_0.9fr_1fr_auto] md:grid-cols-[4fr_2fr_1.5fr] gap-4 px-6 py-4 bg-gray-200 border-b border-gray-200 font-semibold text-medium text-gray-700">
              <div>Name</div>
              <div>Last Accessed On</div>
            </div>

            <ul className="px-6 py-2 flex flex-col gap-2">
              {accessors.map((accessor) => {
                const targetUrl = `/dashboard/h/${accessor?.id}`;

                return (
                  <li
                    key={accessor?.id}
                    className="grid grid-cols-[2fr_0.9fr_1fr_auto] md:grid-cols-[4fr_2fr_1.5fr] gap-4 items-center py-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg flex-shrink-0">
                        <FileText size={24} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-medium lg:text-base truncate">
                          {accessor?.firstname} {accessor?.lastname}
                        </p>
                      </div>
                    </div>

                    {/* Middle - Date */}
                    <div className="col-span-1 flex items-center justify-center lg:justify-start lg:ml-6">
                      <p className="text-medium font-medium text-gray-700 lg:text-base truncate">
                        {accessor?.reviews.length > 0
                          ? format(
                              new Date(accessor?.reviews[0].completedAt),
                              "MMM d, yyyy",
                            )
                          : "Never Accessed"}
                      </p>
                    </div>

                    {/* Action - Right */}
                    <div className="flex justify-end items-center text-[hsla(0,2%,42%,1)] text-sm font-medium">
                      {/* {activity.assessedby} */}
                      <div>
                        <Link
                          href={targetUrl}
                          className="inline-flex items-center justify-center gap-0.4 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all whitespace-nowrap"
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
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {hasMore && (
        <button
          className="text-[hsla(210,79%,46%,1)] font-semibold cursor-pointer transition hover:underline"
          onClick={() => setOffset((prev) => prev + LIMIT)}
        >
          Load More
        </button>
      )}
    </div>
  );
}
