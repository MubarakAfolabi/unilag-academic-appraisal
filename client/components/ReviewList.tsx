import { Fragment, useState } from "react";
import { Reviews } from "@/constant/reviewerDashboard";
import { FileText, Search } from "lucide-react";

type Props = {
  allReviews: Reviews[];
};

export default function ReviewPage({ allReviews }: Props) {
  const navArr = [
    {
      name: "All",
      value: "all",
      unread: 5,
    },
    {
      name: "Pending",
      value: "pending",
      unread: 2,
    },
    {
      name: "Completed",
      value: "completed",
      unread: 2,
    },
  ] as const;

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
                  setActiveTab(item.value as "all" | "pending" | "completed");
                }}
              >
                <button className="flex items-center gap-2 font-semibold cursor-pointer">
                  {item.name}
                  <span className="bg-[hsla(216,59%,54%,0.25)] text-sm h-5 w-5 rounded-full flex items-center justify-center">
                    {item.unread}
                  </span>
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

      <ul className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl flex flex-col gap-4">
        {filteredReviews.map((review, index) => {
          const isPending = review.status?.toLowerCase() === "pending";

          return (
            <Fragment key={index}>
              <li className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1 flex gap-1 md:gap-2">
                  <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
                    <FileText className="lg:w-9 lg:h-9" />
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold lg:text-lg">{review.title}</p>
                    <p className="text-sm text-[hsla(0,2%,42%,1)] lg:text-md">
                      Manuscript ID: {review.manuscriptId}
                    </p>
                    <p className="text-sm text-[hsla(0,2%,42%,1)] lg:text-md">
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

                    <p className="text-sm text-[hsla(0,2%,42%,1)] lg:text-md">
                      Due in 2 days
                    </p>
                    <p className="text-sm text-[hsla(0,2%,42%,1)] lg:text-md">
                      {review.dueDate}
                    </p>
                  </div>
                </div>

                <button className="bg-[hsla(194,30%,14%,1)] text-[hsla(0,0%,100%,1)] w-full md:w-fit md:h-fit md:self-center p-2 rounded-md cursor-pointer">
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
