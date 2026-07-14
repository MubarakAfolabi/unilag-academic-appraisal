"use client";

import { useUser } from "@/context/userContext";
import { Check, Circle, X, FileText, FileX } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type SubmissionItem = {
  fullCitation: string;
  date: string;
  status: string;
  statusClass: string;
  progress: {
    label: string;
    state: "done" | "current" | "pending" | "failed";
  }[];
};

const getSubmissionData = (status: string) => {
  switch (status) {
    case "UNDER_REVIEW":
      return {
        status: "Under Review",
        statusClass: "bg-[hsla(60,100%,85%,0.7)] text-[hsla(35,98%,52%,1)]",
        progress: [
          { label: "Submitted", state: "done" },
          { label: "Under Review", state: "done" },
          { label: "Scored", state: "current" },
        ],
      };

    case "SCORED":
      return {
        status: "Scored",
        statusClass: "bg-[hsla(150,90%,24%,0.1)] text-[hsla(150,90%,24%,1)]",
        progress: [
          { label: "Submitted", state: "done" },
          { label: "Under Review", state: "done" },
          { label: "Scored", state: "done" },
        ],
      };

    case "PENDING":
      return {
        status: "Pending",
        statusClass: "bg-[hsla(60,100%,85%,0.7)] text-[hsla(35,98%,52%,1)]",
        progress: [
          { label: "Submitted", state: "done" },
          { label: "Under Review", state: "current" },
          { label: "Scored", state: "pending" },
        ],
      };

    default:
      return {
        status: status,
        statusClass: "",
        progress: [],
      };
  }
};

export default function RecentSubmissions() {
  const { token } = useUser();
  const [recentSubmissions, setRecentSubmissions] = useState<SubmissionItem[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${apiUrl}/api/publisher/recent-submissions`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          setRecentSubmissions(
            data.recentSubmissions.map((publication: any) => {
              const submissionData = getSubmissionData(publication.status);

              return {
                fullCitation: publication.fullCitation,
                date: `Submitted on ${new Date(
                  publication.createdAt,
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}`,
                ...submissionData,
              };
            }),
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

  if (loading) {
    return (
      <div className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl">
      {recentSubmissions.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {recentSubmissions.map((submission, index) => {
            return (
              <Fragment key={index}>
                <li className="flex flex-col gap-4 lg:flex-row">
                  <div className="flex gap-2 flex-1">
                    <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
                      <FileText className="lg:w-9 lg:h-9" />
                    </div>

                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1">
                        <p className="font-semibold lg:text-lg">
                          {submission.fullCitation}
                        </p>
                        <p className="text-sm lg:text-md text-[hsla(0,2%,42%,1)]">
                          {submission.date}
                        </p>
                      </div>

                      <div className="lg:flex-1 lg:flex lg:justify-center">
                        <div
                          className={`${submission.statusClass} w-fit h-fit p-1 rounded-lg flex items-center justify-center`}
                        >
                          {submission.status}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:w-md">
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
                </li>

                {index < recentSubmissions.length - 1 && (
                  <hr className="w-full border-[hsla(0,0%,85%,1)]" />
                )}
              </Fragment>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-[hsl(0,2%,42%)]">
          <div>
            <FileX />
          </div>
          <p>No Recent Submissions</p>
        </div>
      )}
    </div>
  );
}
