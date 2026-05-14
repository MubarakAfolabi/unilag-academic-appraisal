import { PendingSubmissionItem } from "@/constant/reviewerDashboard";
import { ChevronRight, FileText } from "lucide-react";

type Props = {
  pendingSubmissions: PendingSubmissionItem[];
};

export default function PendingSubmissions({ pendingSubmissions }: Props) {
  return (
    <ul className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 rounded-xl flex flex-col gap-4">
      {pendingSubmissions.map((submission, index) => (
        <li
          key={index}
          className={`flex gap-2 ${
            index !== pendingSubmissions.length - 1
              ? "border-b border-[#eeeeee] pb-4"
              : ""
          }`}
        >
          <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
            <FileText />
          </div>

          <div className="flex-1 flex flex-col">
            <p className="font-semibold">{submission.title}</p>
            <p>{submission.author}</p>
            <p className="text-sm text-[hsla(0,2%,42%,1)]">{submission.date}</p>
          </div>

          <div className="flex justify-center items-center text-[hsla(0,2%,42%,1)]">
            <ChevronRight size={22} />
          </div>
        </li>
      ))}
    </ul>
  );
}
