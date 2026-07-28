"use client";

import { Fragment, useEffect, useState } from "react";
import { FileText, Search } from "lucide-react";
import { useUser } from "@/context/userContext";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type Review = {
  id: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  assignedAt: string;
  openedAt: string | null;
  completedAt: string | null;
  publication: {
    id: number;
    fullCitation: string;
    createdAt: string;
    updatedAt: string;
    user: {
      id: number;
      firstname: string;
      lastname: string;
    };
  };
};

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useUser();
  const router = useRouter();

  const navArr = [
    {
      name: "All",
      value: "all",
    },
    {
      name: "Pending",
      value: "pending",
    },
    {
      name: "In Progress",
      value: "in progress",
    },
    {
      name: "Completed",
      value: "completed",
    },
  ] as const;

  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "in progress" | "completed"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReviews = reviews.filter((review) => {
    if (activeTab === "pending" && review?.status !== "PENDING") return false;
    if (activeTab === "in progress" && review?.status !== "IN_PROGRESS")
      return false;
    if (activeTab === "completed" && review?.status !== "COMPLETED")
      return false;

    const query = searchQuery.toLowerCase();

    return (
      review.publication.fullCitation.toLowerCase().includes(query) ||
      review.publication.user.firstname.toLowerCase().includes(query) ||
      review.publication.user.lastname.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${apiUrl}/api/accessor/reviews`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          setReviews(data?.reviews);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <nav className="flex items-center gap-6">
          {navArr.map((item, index) => {
            return (
              <div
                key={index}
                className={`${activeTab === item.value ? "text-[hsla(216,59%,54%,1)]" : "text-[hsla(237,15%,47%,1)]"} flex flex-col gap-1 cursor-pointer relative`}
                onClick={() => {
                  setActiveTab(
                    item.value as
                      | "all"
                      | "in progress"
                      | "pending"
                      | "completed",
                  );
                }}
              >
                <button className="flex items-center gap-2 font-semibold cursor-pointer">
                  {item.name}
                </button>
                {activeTab === item.value && (
                  <hr className="border rounded-full absolute bottom-[-5] left-0 right-0" />
                )}
              </div>
            );
          })}
        </nav>

        <div className="border border-solid border-[hsla(0,0%,85%,1)] text-[hsla(0,2%,42%,1)] rounded-lg p-2 flex gap-2 items-center">
          <div>
            <Search />
          </div>
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none"
          />
        </div>
      </div>

      {!loading ? (
        <ul className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl flex flex-col gap-4">
          {filteredReviews.map((review, index) => {
            const isPending = review?.status === "PENDING";
            const isInProgress = review?.status === "IN_PROGRESS";
            const isCompleted = review?.status === "COMPLETED";

            return (
              <Fragment key={review?.id}>
                <li className="flex flex-col gap-4 md:flex-row">
                  <div className="flex-1 flex gap-1 md:gap-2">
                    <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
                      <FileText className="lg:w-9 lg:h-9" />
                    </div>

                    <div className="flex-1">
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

                    <div className="flex justify-center items-center">
                      {isPending && (
                        <p className="bg-[hsla(60,100%,85%,0.7)] text-[hsla(35,98%,52%,1)] px-2 py-1 rounded-full">
                          Pending
                        </p>
                      )}

                      {isInProgress && (
                        <p className="bg-[hsla(60,100%,85%,0.7)] text-[hsla(35,98%,52%,1)] px-2 py-1 rounded-full">
                          In Progress
                        </p>
                      )}

                      {isCompleted && (
                        <p className="bg-[hsla(150,90%,24%,0.1)] text-[hsla(150,90%,24%,1)] px-2 py-1 rounded-full">
                          Completed
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    className="text-[hsla(194,30%,14%,1)] border border-[hsla(194,30%,14%,1)] w-full md:w-fit md:h-fit md:self-center p-2 rounded-md cursor-pointer"
                    onClick={() => router.push(`/reviews/${review?.id}`)}
                  >
                    View Review
                  </button>
                </li>

                {index < filteredReviews.length - 1 && (
                  <hr className="w-full border-[hsla(0,0%,85%,1)]" />
                )}
              </Fragment>
            );
          })}

          {filteredReviews.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              {searchQuery.trim().length > 0
                ? "No reviews match your search."
                : "No Reviews"}
            </div>
          )}
        </ul>
      ) : (
        <div className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
