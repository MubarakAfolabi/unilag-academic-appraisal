import { SubmissionItem } from "@/constant/publisherDashboard";
import { FileText, Star, ChevronRight } from "lucide-react"; 
import Link from "next/link"; 
import { Fragment } from "react";
import { useParams } from "next/navigation"; 
type Props = {
  recentSubmissions: SubmissionItem[];
};

export default function RecentSubmissions({ recentSubmissions }: Props) {
  const params = useParams(); 
  const id = params?.id;   
  return (
    <div className="w-full block clear-both border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden min-h-[150px]">
      
      {/* Table Headings */}
      <div className="grid grid-cols-[2fr_0.9fr_1fr_auto] md:grid-cols-[4fr_2fr_1.5fr_1.5fr] gap-4 px-6 py-4 bg-gray-200 border-b border-gray-200 font-semibold text-sm text-gray-700">
        <div>Documents Details</div>
        <div>Assessment Status</div>
        <div className="text-center">Score</div>
        <div className="hidden lg:block text-right">Action</div>
        <div className="lg:hidden w-4"></div> {/* Spacer for mobile layout alignment */}
      </div>

      <ul className="px-6 py-2 flex flex-col gap-2">
        {recentSubmissions.map((submission, index) => {
          return (
            <Fragment key={index}>
              <li className="grid grid-cols-[2fr_0.9fr_1fr_auto] md:grid-cols-[4fr_2fr_1.5fr_1.5fr] gap-4 items-center py-3">
                
                <div className="flex items-center gap-3 min-w-0">
                  <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg flex-shrink-0">
                    <FileText className="w-6 h-6 lg:w-9 lg:h-9" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm lg:text-base truncate">{submission.title}</p>
                    <p className="text-xs lg:text-sm text-[hsla(0,2%,42%,1)] truncate">
                      Manuscript ID: {submission.manuscriptId}
                    </p>
                    <p className="text-xs lg:text-sm text-[hsla(0,2%,42%,1)]">
                      {submission.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div
                    className={`${
                      submission.rating === "Positive" 
                        ? "bg-[hsla(150,90%,24%,0.1)] text-[hsla(150,90%,24%,1)]" 
                        : submission.rating === "Negative" 
                        ? "bg-[hsla(353,100%,46%,0.1)] text-[hsla(0,93%,52%,1)]" 
                        : "bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)]"
                    } w-fit h-fit px-2.5 py-1 rounded-lg flex items-center justify-center text-xs lg:text-sm font-medium`}
                  >
                    {typeof submission.rating === "number" ? (
                      <p className="flex items-center gap-1">
                        <Star size={14} className="fill-current" />
                        {submission.rating}
                      </p>
                    ) : (
                      <p>{submission.rating}</p>
                    )}
                  </div>
                </div>

                <div className="text-center font-semibold text-sm lg:text-base text-gray-900">
                  {submission.score}
                </div>

                <div className="text-[hsla(0,2%,42%,1)] text-sm font-medium flex justify-end items-center">
                  <Link
                  href={`/dashboard/assesment/${id}/${submission.manuscriptId}`}
                  className="lg:hidden flex-shrink-0 text-gray-400"
                  >
                    <ChevronRight size={22} />
                  </Link>

                  <div className="hidden lg:block">
                    <Link
                      href={`/dashboard/assesment/${id}/${submission.manuscriptId}`}
                      className="inline-flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all whitespace-nowrap"
                    >
                      View details
                      <ChevronRight size={12} className="text-gray-400" />
                    </Link>
                  </div>
                </div>

              </li>

              {index < recentSubmissions.length - 1 && (
                <hr className="w-full border-gray-100" />
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}
