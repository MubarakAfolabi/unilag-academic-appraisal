"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/context/userContext";
import { ArrowLeft, FileText, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import AlertPopup from "@/components/AlertPopup";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type Review = {
  id: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  score: number;
  publication: {
    id: number;
    createdAt: string;
    updatedAt: string;
    fullCitation: string;
    publicationType: "JOURNAL_ARTICLE" | "CONFERENCE" | "BOOK" | "BOOK_CHAPTER";
    quartileRanking: "Q1" | "Q2" | "Q3" | "Q4" | "OTHERS";
    nonIndexed: "UNIVERSITY_BASED" | "FACULTY_BASED";
    classification: "INTERNATIONAL" | "NATIONAL";
    originalName: string;
    filePath: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    status: "PENDING" | "UNDER_REVIEW" | "SCORED" | "REJECTED";
    userId: number;
    user: {
      id: number;
      firstname: string;
      lastname: string;
    };
  };
};

export default function ReviewPage() {
  const { user, token } = useUser();
  const { reviewId } = useParams();
  const router = useRouter();
  const [review, setReview] = useState<Review | null>(null);
  const [errors, setErrors] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    if (!token) return;

    fetch(`${apiUrl}/api/accessor/reviews/${reviewId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "IN_PROGRESS" }),
    })
      .then((response) => response.json())
      .then(() => {
        return fetch(`${apiUrl}/api/accessor/reviews/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setReview(data.review);
        }
      })
      .catch(() => {
        setAlertType("error");
        setShowAlert(true);
      });
  }, [token, reviewId]);

  const handleDownload = (id: number) => {
    fetch(`${apiUrl}/api/accessor/publications/${id}/download`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Download failed");
        }

        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = review?.publication.originalName;

        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => {
        setAlertType("error");
        setShowAlert(true);
      });
  };

  const handleSubmitScore = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`${apiUrl}/api/accessor/reviews/${reviewId}/score`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ score: review?.score }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          setErrors(data.message);
        } else {
          setAlertType("success");
          setShowAlert(true);
          setErrors([]);
        }
      })
      .catch(() => {
        setAlertType("error");
        setShowAlert(true);
      });
  };

  useEffect(() => {
    if (!showAlert) return;
    const timer = setTimeout(() => setShowAlert(false), 3000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const getPublicationType = (publicationType: string) => {
    switch (publicationType) {
      case "JOURNAL_ARTICLE":
        return "Journal Article";
      case "CONFERENCE":
        return "Conference";
      case "BOOK":
        return "Book";
      case "BOOK_CHAPTER":
        return "Book Chapter";
    }
  };

  const getStatus = (status: string) => {
    switch (status) {
      case "IN_PROGRESS":
        return (
          <p className="bg-[hsla(60,100%,85%,0.7)] text-[hsla(35,98%,52%,1)] px-2 py-1 w-fit rounded-full">
            In Progress
          </p>
        );
      case "COMPLETED":
        return (
          <p className="bg-[hsla(150,90%,24%,0.1)] text-[hsla(150,90%,24%,1)] px-2 py-1 w-fit rounded-full">
            Completed
          </p>
        );
    }
  };

  const scoreError = errors.find((error) => error.path === "score");

  return (
    <section className="md:h-full md:overflow-y-auto flex-2 flex flex-col p-4 gap-6 mb-15 md:p-0 md:pb-6">
      {showAlert &&
        (alertType === "success" ? (
          <AlertPopup
            type="success"
            message="Publication Scored Succesfully"
            onClose={() => setShowAlert(false)}
          />
        ) : (
          <AlertPopup
            type="error"
            message="Something went wrong, try again"
            onClose={() => setShowAlert(false)}
          />
        ))}

      <div className="flex justify-between items-center md:border-b md:border-b-[hsla(0,0%,85%,1)] md:p-6">
        <div
          className="flex items-center gap-2 text-[hsla(210,79%,46%,1)] cursor-pointer"
          role="button"
          onClick={() => router.push("/reviews")}
        >
          <button>
            <ArrowLeft />
          </button>
          <p>Back to Reviews</p>
        </div>

        <div className="gap-4 items-center hidden md:flex">
          <Image
            src={user?.avatar || "/profile-pic.svg"}
            alt="Profile Picture"
            width={50}
            height={50}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-between md:px-6">
        <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
          <FileText className="lg:w-9 lg:h-9" />
        </div>
        <div className="flex-1">
          <p className="font-semibold lg:text-lg">
            {review?.publication.fullCitation}
          </p>
          <p className="text-sm text-[hsla(0,2%,42%,1)] lg:text-md">
            By {review?.publication.user.firstname}{" "}
            {review?.publication.user.lastname}
          </p>
        </div>
        <div>
          <p>Review Status</p>
          {getStatus(review?.status)}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center md:px-6">
          <h2 className="text-lg font-semibold md:text-xl">Recent Activity</h2>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row md:px-6">
          <div className="flex-1 flex flex-col gap-6 border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl">
            <div className="flex justify-between items-center">
              <p className="text-[hsla(0,2%,42%,1)]">Full Citation</p>
              <p>{review?.publication.fullCitation}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[hsla(0,2%,42%,1)]">Publication Type</p>
              <p>{getPublicationType(review?.publication.publicationType)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[hsla(0,2%,42%,1)]">Publication Quartile</p>
              <p>
                {review?.publication.quartileRanking === "OTHERS"
                  ? "Others"
                  : review?.publication.quartileRanking}
              </p>
            </div>
            {review?.publication.nonIndexed && (
              <div className="flex justify-between items-center">
                <p className="text-[hsla(0,2%,42%,1)]">Non-Indexed Type</p>
                <p>
                  {review?.publication.nonIndexed === "UNIVERSITY_BASED"
                    ? "University Based"
                    : "Non-university Based"}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <p className="text-[hsla(0,2%,42%,1)]">Classification</p>
              <p>
                {review?.publication.classification === "NATIONAL"
                  ? "National"
                  : "International"}
              </p>
            </div>

            {review?.publication.createdAt && (
              <div className="flex justify-between items-center">
                <p className="text-[hsla(0,2%,42%,1)]">Date Submitted</p>
                <p>
                  {format(
                    new Date(review?.publication.createdAt),
                    "MMM d, yyyy",
                  )}
                </p>
              </div>
            )}
            <div className="flex justify-between items-center">
              <p className="text-[hsla(0,2%,42%,1)]">File</p>
              <div className="bg-[hsl(0,0%,96%)] flex gap-4 p-2 rounded-md">
                <div className="flex gap-1">
                  <FileText size={22} />
                  <div
                    className="underline cursor-pointer"
                    role="button"
                    onClick={() => handleDownload(review?.publication.id)}
                  >
                    {review?.publication.originalName}
                  </div>
                </div>
                <p className="text-[hsla(0,2%,42%,1)]">
                  ({(review?.publication.fileSize / (1024 * 1024)).toFixed(1)}
                  mb)
                </p>
              </div>
            </div>

            {/* <div>
              <h3 className="font-bold">Abstract</h3>
              <p className="text-sm">
                This paper explores the transformative potential of artificial
                intelligence in healthcare, highlighting its applications,
                benefits, and the challenges that must be addressed for
                successful implentation.
              </p>
            </div> */}
          </div>

          <div className="h-fit flex flex-col gap-4 border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl ">
            <div className="bg-[hsl(0,0%,96%)] p-2 rounded-md flex items-center gap-2">
              <div className="text-[hsla(210,79%,46%,1)]">
                <Info size={22} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Manuscript Evaluation</h3>
                <p className="text-sm text-[hsla(0,2%,42%,1)]">
                  Scores must fall within the approved review scale (4.1–5.0)
                </p>
              </div>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmitScore}>
              {scoreError && (
                <p className="text-red-500 text-sm text-center">
                  {scoreError.msg}
                </p>
              )}

              <label>
                <input
                  type="text"
                  placeholder="Input Score"
                  className={`${scoreError ? "border-red-500" : "border-[hsla(0,2%,42%,1)] focus:border-blue-500"} border w-full p-2 rounded-md outline-none`}
                  value={review?.score ?? ""}
                  onChange={(e) =>
                    setReview((prev) => ({ ...prev, score: e.target.value }))
                  }
                />
              </label>

              <button
                type="submit"
                className="text-white bg-[hsla(216,59%,54%,1)] p-2 rounded-md text-lg font-bold cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
