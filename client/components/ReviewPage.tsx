import { Fragment, useState } from "react";
import { Reviews } from "@/constant/reviewerDashboard";
import { ChevronRight, FileText, Search } from "lucide-react";

type Props = {
  allReviews: Reviews[];
};

export default function ReviewPage({ allReviews }: Props) {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReviews = allReviews.filter((review) => {
    if (activeTab === "pending" && review.status?.toLowerCase() !== "pending")
      return false;
    if (
      activeTab === "completed" &&
      review.status?.toLowerCase() !== "completed"
    )
      return false;

    // 2. Filter by Search Query
    return (
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.manuscriptId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Count metrics for tab labels
  const pendingCount = allReviews.filter(
    (r) => r.status?.toLowerCase() === "pending",
  ).length;
  const completedCount = allReviews.filter(
    (r) => r.status?.toLowerCase() === "completed",
  ).length;

  return (
    <div className="flex flex-col gap-2">
      {/* 1. Tabs Navigation */}
      <div className="flex items-center gap-8 border-b border-gray-100 text-sm font-medium text-gray-500 pb-1">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-3 relative transition-colors ${activeTab === "all" ? "text-blue-600 font-semibold" : "hover:text-gray-700"}`}
        >
          All Reviews
          {activeTab === "all" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-3 relative transition-colors ${activeTab === "pending" ? "text-blue-600 font-semibold" : "hover:text-gray-700"}`}
        >
          Pending({pendingCount})
          {activeTab === "pending" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`pb-3 relative transition-colors ${activeTab === "completed" ? "text-blue-600 font-semibold" : "hover:text-gray-700"}`}
        >
          Completed({completedCount})
          {activeTab === "completed" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600" />
          )}
        </button>
      </div>

      <div className="border border-solid border-[hsla(0,0%,85%,1)] text-[hsla(0,2%,42%,1)] rounded-lg p-2 flex gap-2 items-center">
        <div>
          <Search className="" />
        </div>
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      <ul className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl flex flex-col gap-4">
        {filteredReviews.map((review, index) => {
          const isPending = review.status?.toLowerCase() === "pending";

          return (
            <Fragment key={index}>
              <li className="flex flex-col gap-4">
                <div className="flex gap-1">
                  <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
                    <FileText />
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold">{review.title}</p>
                    <p className="text-sm text-[hsla(0,2%,42%,1)]">
                      Manuscript ID: {review.manuscriptId}
                    </p>
                    <p className="text-sm text-[hsla(0,2%,42%,1)]">
                      {review.date}
                    </p>
                  </div>

                  <div>
                    {isPending ? (
                      <p className="bg-[hsla(60,100%,85%,0.7)] text-[hsla(35,98%,52%,1)] px-2 py-1 rounded-full">
                        Pending
                      </p>
                    ) : (
                      <p className="bg-[hsla(150,90%,24%,0.1)] text-[hsla(150,90%,24%,1)] px-2 py-1 rounded-full">
                        Completed
                      </p>
                    )}

                    <p className="text-sm text-[hsla(0,2%,42%,1)]">
                      Due in 2 days
                    </p>
                    <p className="text-sm text-[hsla(0,2%,42%,1)]">
                      {review.dueDate}
                    </p>
                  </div>
                </div>

                <button className="bg-[hsla(194,30%,14%,1)] text-[hsla(0,0%,100%,1)] w-full p-2 rounded-md cursor-pointer">
                  Review
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
            No reviews match your search.
          </div>
        )}
      </ul>
    </div>
  );
}
