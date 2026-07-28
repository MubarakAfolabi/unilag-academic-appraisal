"use client";

import { useUser } from "@/context/userContext";
import { Check, Clock3, ChevronRight, FileX } from "lucide-react";
import { useEffect, useState } from "react";
import { RecentActivityItem } from "@/types/recentActivityItem";
import { format } from "date-fns";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function RecentActivity() {
  const { token } = useUser();
  const [recentActivities, setRecentActivities] = useState<
    RecentActivityItem[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${apiUrl}/api/accessor/recent-activities`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          setRecentActivities(data?.recentActivities);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const renderIcon = (status: RecentActivityItem["status"]) => {
    switch (status) {
      case "COMPLETED":
        return (
          <div className="bg-[hsla(150,90%,24%,0.2)] text-[hsla(150,90%,24%,1)] w-fit p-1 rounded-full">
            <Check size={22} />
          </div>
        );

      case "IN_PROGRESS":
        return (
          <div className="bg-[hsl(45,100%,85%)] text-[hsl(45,100%,51%)] w-fit p-1 rounded-full">
            <Clock3 size={22} />
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl">
      {recentActivities.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {recentActivities.map((activity, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 ${
                index !== recentActivities.length - 1
                  ? "border-b border-[#eeeeee] pb-4"
                  : ""
              }`}
            >
              {renderIcon(activity?.status)}

              <div className="flex-1 flex flex-col">
                <p className="font-semibold lg:text-lg">
                  <span>
                    {activity?.status === "COMPLETED"
                      ? "Reviewed: "
                      : "In Progress: "}
                  </span>
                  {activity?.publication.fullCitation}
                </p>
                <p className="text-sm text-[hsla(0,2%,42%,1)] lg:text-md">
                  {activity?.status === "COMPLETED" ? (
                    <span>
                      Reviewed on{" "}
                      {format(new Date(activity?.completedAt), "MMM d, yyyy")}
                    </span>
                  ) : (
                    <span>
                      Viewed on{" "}
                      {format(new Date(activity?.openedAt), "MMM d, yyyy")}
                    </span>
                  )}
                </p>
              </div>

              <div className="text-[hsla(0,2%,42%,1)]">
                <ChevronRight size={22} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-[hsl(0,2%,42%)]">
          <div>
            <FileX />
          </div>
          <p>No Recent Activity</p>
        </div>
      )}
    </div>
  );
}
