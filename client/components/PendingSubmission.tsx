import { PendingSubmissionItem } from "@/constant/reviewerDashboard";
import { ChevronRight, FileText } from "lucide-react";


type Props = {
  pendingSubmissions: PendingSubmissionItem[];
};

export default function PendingSubmissions({
  pendingSubmissions,
}: Props) {
  return (
    <div className="border border-solid border-[hsla(0,0%,85%,1)] p-2 rounded-xl flex flex-col gap-4">
      <ul className="space-y-1">
        {pendingSubmissions.map((submission, index) => (
          <li flex-col gap-4 
            key={`${submission.title}-${index}`}
            className={`flex items-center justify-between py-4 ${
              index !== pendingSubmissions.length - 1
                ? "border-b border-[#eeeeee]"
                : ""
            }`}
          >
            <div className="flex items-start gap-4">
              
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] ring-1 ring-[#b9d1ff]">
                <FileText
                  size={28}
                  className="text-[#2d77c7]"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <h3 className="max-w-[420px] text-[17px] font-semibold leading-[1.35] text-[#111111]">
                  {submission.title}
                </h3>

                <p className="mt-1 text-[15px] font-medium text-[#222222]">
                  {submission.author}
                </p>

                <p className="mt-1 text-[13px] text-[#7a7a7a]">
                  {submission.date}
                </p>
              </div>
            </div>

            <ChevronRight
              size={20}
              className="flex-shrink-0 text-[#8c8c8c]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}