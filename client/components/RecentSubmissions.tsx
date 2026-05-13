import { SubmissionItem } from "@/constant/publisherDashboard";
import { Check, Circle, X, FileText } from "lucide-react";
import { Fragment } from "react";

type Props = {
  recentSubmissions: SubmissionItem[];
};

export default function RecentSubmissions({ recentSubmissions }: Props) {
  const renderIcon = (state: SubmissionItem["progress"][number]["state"]) => {
    switch (state) {
      case "done":
        return (
          <div className="bg-[hsla(150,90%,24%,1)] text-white h-6 w-6 p-1 rounded-full flex items-center justify-center">
            <Check />
          </div>
        );
      case "current":
        return (
          <div className="text-[hsla(35,98%,52%,1)]">
            <Circle size={24} strokeWidth={2} />
          </div>
        );
      case "pending":
        return (
          <div className="text-[hsla(0,0%,85%,1)]">
            <Circle size={24} strokeWidth={2} />
          </div>
        );
      case "failed":
        return (
          <div className="bg-[hsla(353,100%,46%,1)] text-white h-6 w-6 p-1 rounded-full flex items-center justify-center">
            <X />
          </div>
        );
    }
  };

  return (
    <ul className="border border-solid border-[hsla(0,0%,85%,1)] p-2 rounded-xl flex flex-col gap-4">
      {recentSubmissions.map((submission, index) => {
        return (
          <li key={index} className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
                <FileText />
              </div>

              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1">
                  <p className="font-bold">{submission.title}</p>
                  <p className="text-sm text-[hsla(0,2%,42%,1)]">
                    {submission.date}
                  </p>
                </div>

                <div
                  className={`${submission.statusClass} w-fit h-fit p-1 rounded-lg flex items-center justify-center`}
                >
                  {submission.status}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center px-6">
                {submission.progress.map((step, index) => {
                  return (
                    <Fragment key={step.label}>
                      {renderIcon(step.state)}

                      {index < submission.progress.length - 1 && (
                        <hr className="w-full border-[hsla(0,0%,85%,1)] border" />
                      )}
                    </Fragment>
                  );
                })}
              </div>

              <div className="flex justify-between">
                {submission.progress.map((step, index) => {
                  return <p key={index}>{step.label}</p>;
                })}
              </div>
            </div>

            {index < recentSubmissions.length - 1 && (
              <hr className="w-full border-[hsla(0,0%,85%,1)]" />
            )}
          </li>
        );
      })}
    </ul>
  );
}
