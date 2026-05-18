import { useState } from "react";
import { Reviews } from "@/constant/reviewerDashboard";
import { ChevronRight, FileText, Search } from "lucide-react";

type Props = {
  allReviews: Reviews[];
};

export default function ReviewPage({ allReviews }: Props) {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");


  const filteredReviews = allReviews.filter((review) => {
    if (activeTab === "pending" && review.status?.toLowerCase() !== "pending") return false;
    if (activeTab === "completed" && review.status?.toLowerCase() !== "completed") return false;

    // 2. Filter by Search Query
    return review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           review.manuscriptId.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Count metrics for tab labels
  const pendingCount = allReviews.filter(r => r.status?.toLowerCase() === "pending").length;
  const completedCount = allReviews.filter(r => r.status?.toLowerCase() === "completed").length;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:space-y-6 bg-white">
      {/* 1. Tabs Navigation */}
      <div className="flex items-center gap-8 border-b border-gray-100 text-sm font-medium text-gray-500 pb-1">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-3 relative transition-colors ${activeTab === "all" ? "text-blue-600 font-semibold" : "hover:text-gray-700"}`}
        >
          All Reviews
          {activeTab === "all" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600" />}
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-3 relative transition-colors ${activeTab === "pending" ? "text-blue-600 font-semibold" : "hover:text-gray-700"}`}
        >
          Pending({pendingCount})
          {activeTab === "pending" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600" />}
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`pb-3 relative transition-colors ${activeTab === "completed" ? "text-blue-600 font-semibold" : "hover:text-gray-700"}`}
        >
          Completed({completedCount})
          {activeTab === "completed" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600" />}
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 border border-gray-200 rounded-xl text-xs md:text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
        />
      </div>

      <ul className="border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col divide-y divide-gray-100">
        {filteredReviews.map((review, index) => {
          const isPending = review.status?.toLowerCase() === "pending";

          return (
            <li key={review.manuscriptId || index} className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 py-5 first:pt-1 last:pb-1">
              {/* Left Column: Icon and Text Details */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="bg-blue-50 text-blue-500 p-3 rounded-xl shrink-0 mt-0.5">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex flex-col space-y-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm md:text-base leading-snug truncate">
                    {review.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium">
                    Manuscript ID: <span className="text-gray-500 font-normal">{review.manuscriptId}</span>
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                    Submitted on <span className="text-gray-500 font-normal">{review.date}</span>
                  </p>
                </div>
              </div>

              {/* Right Column: Status info, Buttons, and Chevron */}
              <div className="flex items-center gap-4 shrink-0">
                {/* Due Date & Badge Box */}
                <div className="hidden sm:flex flex-col items-center text-center space-y-1 min-w-[90px]">
                  {isPending ? (
                    <span className="px-3 py-1 bg-amber-50 text-amber-500 rounded-full text-xs font-semibold">
                      Pending
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold">
                      Completed
                    </span>
                  )}
                  <p className="text-[10px] text-gray-400 font-medium leading-none pt-1">Due in 2 days</p>
                  <p className="text-[10px] text-gray-400 leading-none">{review.dueDate}</p>
                </div>

                {/* Conditional Action Button */}
                {isPending ? (
                  <button className="bg-gray-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
                    Review Now
                  </button>
                ) : (
                  <button className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                    View Review
                  </button>
                )}

                {/* Arrow Icon */}
                <div className="text-gray-300">
                  <ChevronRight size={18} />
                </div>
              </div>
            </li>
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
