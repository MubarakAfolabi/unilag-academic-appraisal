"use client";

import { useUser } from "@/context/userContext";
import { PendingReviewsItem } from "@/types/pendingReviewsItem";
import { ChevronRight, FileText, FileX } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PendingReviews() {
  const { token } = useUser();
  const [pendingReviews, setPendingReviews] = useState<PendingReviewsItem[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${apiUrl}/api/accessor/pending-reviews`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          setPendingReviews(data?.pendingReviews);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl">
      {pendingReviews.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {pendingReviews.map((review, index) => (
            <li
              key={index}
              className={`flex gap-2 ${
                index !== pendingReviews.length - 1
                  ? "border-b border-[#eeeeee] pb-4"
                  : ""
              }`}
            >
              <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
                <FileText className="lg:w-9 lg:h-9" />
              </div>

              <div className="flex-1 flex flex-col">
                <p className="font-semibold lg:text-lg">
                  {review?.publication.fullCitation}
                </p>
                <p className="text-sm text-[hsla(0,2%,42%,1)] lg:text-md">
                  By {review?.publication.user.firstname}{" "}
                  {review?.publication.user.lastname}
                </p>
                <p className="text-sm text-[hsla(0,2%,42%,1)] lg:text-md">
                  Submitted on{" "}
                  {format(
                    new Date(review?.publication.createdAt),
                    "MMM d, yyyy",
                  )}
                </p>
              </div>

              <div className="flex justify-center items-center text-[hsla(0,2%,42%,1)]">
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
          <p>No Pending Reviews</p>
        </div>
      )}
    </div>
  );
}
