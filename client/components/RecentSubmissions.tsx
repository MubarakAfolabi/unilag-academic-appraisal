import { SubmissionItem } from "@/constant/publisherDashboard";
import { FileText, Star, ChevronRight } from "lucide-react";
import { Fragment } from "react";

type Props = {
  recentSubmissions: SubmissionItem[];
};

export default function RecentSubmissions({ recentSubmissions }: Props) {
  return (
    <ul className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl flex flex-col gap-4">
      {recentSubmissions.map((submission, index) => {
        return (
          <Fragment key={index}>
            <li className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-2 flex-3">
                <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
                  <FileText className="lg:w-9 lg:h-9" />
                </div>

                <div>
                  <p className="font-semibold lg:text-lg">{submission.title}</p>
                  <p className="text-sm lg:text-md text-[hsla(0,2%,42%,1)]">
                    Manuscript ID: {submission.manuscriptId}
                  </p>
                  <p className="text-sm lg:text-md text-[hsla(0,2%,42%,1)]">
                    {submission.date}
                  </p>
                </div>
              </div>

              <div className="flex-1">
                <div
                  className={`${submission.rating === "In Progress" ? "bg-[hsla(35,98%,52%,0.1)] text-[hsla(35,98%,52%,1)]" : submission.rating === "Not Available" ? "bg-[hsla(353,100%,46%,0.1)] text-[hsla(0,93%,52%,1)]" : "bg-[hsla(150,90%,24%,0.1)] text-[hsla(210,79%,46%,1)]"} w-fit h-fit p-1 rounded-lg flex items-center justify-center `}
                >
                  {typeof submission.rating === "number" ? (
                    <p className="flex items-center gap-1">
                      <Star size={18} />
                      {submission.rating}/5
                    </p>
                  ) : (
                    <p>{submission.rating}</p>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div
                  className={`${submission.status === "Under Review" ? "bg-[hsla(35,98%,52%,0.1)] text-[hsla(35,98%,52%,1)]" : submission.status === "Approved" ? "bg-[hsla(150,90%,24%,0.1)] text-[hsla(150,90%,24%,1)]" : "bg-[hsla(353,100%,46%,0.1)] text-[hsla(0,93%,52%,1)]"} w-fit h-fit p-1 rounded-lg flex items-center justify-center`}
                >
                  {submission.status}
                </div>
              </div>

              <div className="text-[hsla(0,2%,42%,1)]">
                <ChevronRight size={22} />
              </div>
            </li>

            {index < recentSubmissions.length - 1 && (
              <hr className="w-full border-[hsla(0,0%,85%,1)]" />
            )}
          </Fragment>
        );
      })}
    </ul>
  );
}
