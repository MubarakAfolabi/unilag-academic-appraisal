"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/context/userContext";
import { ArrowLeft, FileText, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ReviewPage() {
  const { user, token } = useUser();
  const { publisherId } = useParams();
  const router = useRouter();
  const [publication, setPublication] = useState(null);

  const handleSubmitScore = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!token) return;

    fetch(`${apiUrl}/api/accessor/publications/${publisherId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setPublication(data?.publication);
        }
      });
  }, [token, publisherId]);

  const handleDownload = (id) => {
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
        a.download = publication?.originalName;

        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="md:h-full md:overflow-y-auto flex-2 flex flex-col p-4 gap-6 mb-15 md:p-0 md:pb-6">
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
            {publication?.fullCitation}
          </p>
          <p className="text-sm text-[hsla(0,2%,42%,1)] lg:text-md">
            By {publication?.user.firstname} {publication?.user.lastname}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center md:px-6">
          <h2 className="text-lg font-semibold md:text-xl">Recent Activity</h2>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row md:px-6">
          <div className="flex flex-col gap-6 border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl">
            <div className="flex justify-between items-center">
              <p className="text-[hsla(0,2%,42%,1)]">Journal</p>
              <p>Unilag Academic Appraisal Journal</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[hsla(0,2%,42%,1)]">Manuscript Type</p>
              <p>Research Article</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[hsla(0,2%,42%,1)]">Subject Area</p>
              <p>Healthcare & Medicine</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[hsla(0,2%,42%,1)]">Index Status</p>
              <p>Q1</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[hsla(0,2%,42%,1)]">Author Position</p>
              <p>2nd</p>
            </div>
            {publication?.createdAt && (
              <div className="flex justify-between items-center">
                <p className="text-[hsla(0,2%,42%,1)]">Date Submitted</p>
                <p>{format(new Date(publication?.createdAt), "MMM d, yyyy")}</p>
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
                    onClick={() => handleDownload(publication?.id)}
                  >
                    {publication?.originalName}
                  </div>
                </div>
                <p className="text-[hsla(0,2%,42%,1)]">
                  ({(publication?.fileSize / (1024 * 1024)).toFixed(1)}mb)
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold">Abstract</h3>
              <p className="text-sm">
                This paper explores the transformative potential of artificial
                intelligence in healthcare, highlighting its applications,
                benefits, and the challenges that must be addressed for
                successful implentation.
              </p>
            </div>
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
              <label>
                <input
                  type="text"
                  placeholder="Input Score"
                  className="focus:border-[hsl(216,100%,58%)] border w-full p-2 rounded-md outline-none"
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
