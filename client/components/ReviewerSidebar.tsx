import { useState } from "react";
import { Reviews } from "@/constant/reviewerDashboard";
import { ChevronRight, FileText, Search, Clock, Calendar } from "lucide-react";

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

    return (
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.manuscriptId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const pendingCount = allReviews.filter(
    (r) => r.status?.toLowerCase() === "pending",
  ).length;
  const completedCount = allReviews.filter(
    (r) => r.status?.toLowerCase() === "completed",
  ).length;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4 md:space-y-6 bg-white">
      {/* 1. Tabs Navigation - Horizontal scrolling enabled on tiny devices */}
      <div className="flex items-center gap-4 md:gap-8 border-b border-gray-100 text-xs md:text-sm font-medium text-gray-500 overflow-x-auto scrollbar-none whitespace-nowrap">
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
          Pending ({pendingCount})
          {activeTab === "pending" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`pb-3 relative transition-colors ${activeTab === "completed" ? "text-blue-600 font-semibold" : "hover:text-gray-700"}`}
        >
          Completed ({completedCount})
          {activeTab === "completed" && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600" />
          )}
        </button>
      </div>

      {/* 2. Search Input */}
      <div className="relative">
        <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 border border-gray-200 rounded-xl text-xs md:text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
        />
      </div>

      {/* 3. Main Review List Box */}
      <ul className="border border-gray-100 shadow-sm rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col divide-y divide-gray-100">
        {filteredReviews.map((review, index) => {
          const isPending = review.status?.toLowerCase() === "pending";

          return (
            <li
              key={review.manuscriptId || index}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 md:py-5 first:pt-1 last:pb-1"
            >
              {/* Left Side Container */}
              <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                <div className="bg-blue-50 text-blue-500 p-2 md:p-3 rounded-lg md:rounded-xl shrink-0 mt-0.5">
                  <FileText className="h-5 w-5 md:h-6 md:w-6" />
                </div>

                <div className="flex flex-col space-y-1 min-w-0 flex-1">
                  <h4 className="font-bold text-gray-900 text-sm md:text-base leading-snug break-words pr-2 md:pr-0">
                    {review.title}
                  </h4>
                  <p className="text-[11px] md:text-xs text-gray-400 font-medium">
                    Manuscript ID:{" "}
                    <span className="text-gray-500 font-mono">
                      {review.manuscriptId}
                    </span>
                  </p>

                  {/* Mobile-only Quick Info Badges */}
                  <div className="flex flex-wrap gap-2 pt-1 md:hidden">
                    <span className="inline-flex items-center gap-1 text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                      <Calendar className="h-3 w-3 text-gray-400" />{" "}
                      {review.date}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded ${isPending ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}
                    >
                      <Clock className="h-3 w-3" /> Due: {review.dueDate}
                    </span>
                  </div>

                  {/* Desktop-only Submission Date */}
                  <p className="hidden md:block text-xs text-gray-400 font-medium">
                    Submitted on{" "}
                    <span className="text-gray-500 font-normal">
                      {review.date}
                    </span>
                  </p>
                </div>
              </div>

              {/* Right Side Actions Container */}
              <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 border-t border-dashed border-gray-100 pt-3 md:pt-0 md:border-t-0 shrink-0">
                {/* Desktop-only Due Date & Status Box */}
                <div className="hidden md:flex flex-col items-center text-center space-y-1 min-w-[100px]">
                  {isPending ? (
                    <span className="px-2.5 py-0.5 bg-amber-50 text-amber-600 rounded-full text-xs font-semibold">
                      Pending
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold">
                      Completed
                    </span>
                  )}
                  <p className="text-[10px] text-gray-400 leading-none pt-1">
                    Due: {review.dueDate}
                  </p>
                </div>

                {/* Action Button - Expands dynamically on small screens */}
                {isPending ? (
                  <button className="w-full md:w-auto bg-gray-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-center">
                    Review Now
                  </button>
                ) : (
                  <button className="w-full md:w-auto bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-center">
                    View Review
                  </button>
                )}

                {/* Right Arrow Icon */}
                <div className="text-gray-300 shrink-0">
                  <ChevronRight size={18} />
                </div>
              </div>
            </li>
          );
        })}

        {filteredReviews.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-xs">
            No reviews match your search.
          </div>
        )}
      </ul>
    </div>
  );
}
