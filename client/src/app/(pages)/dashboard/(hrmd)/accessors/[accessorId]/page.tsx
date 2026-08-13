"use client";
import { useUser } from "@/context/userContext";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LogoutModal from "@/components/LogoutModal";
import { LogOut, FileText, Calendar } from "lucide-react";
import { format } from "date-fns";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// import { assessedSubmissions } from "@/constant/publisherDashboard";
// import { recentActivity } from "@/components/HRMD/HRMDDashboard";
// import AssessorsJobOverview from "@/components/HRMD/AssessorsJobOverview";
// import { da } from "date-fns/locale";

export default function OverviewHRMDDashboard() {
  const { user, token } = useUser();
  const [modal, setModal] = useState(false);
  const { accessorId } = useParams();
  const [accessor, setAccessor] = useState(null);
  const [reviewOverview, setReviewOverview] = useState(null);

  if (user?.role !== "HRMD") {
    redirect("/dashboard");
  }

  useEffect(() => {
    if (!token) return;

    fetch(`${apiUrl}/api/user/${accessorId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          setAccessor(data?.user);
        }
      })
      .then(() => {
        return fetch(
          `${apiUrl}/api/accessors/reviews/overview?userId=${accessorId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data?.success) {
          setReviewOverview(data?.reviewCount);
        }
      });
  }, [token, accessorId]);

  // const value = recentActivity.find(
  //   item => item.assessorId === params.id
  // );

  // Filter manuscripts belonging strictly to the selected assessor
  // const filteredManuscripts = assessedSubmissions.filter(
  //   item => item.assessedby === value?.assessedby
  // );

  return (
    <section className="md:h-full md:overflow-y-auto flex-2 flex flex-col p-4 gap-6 mb-15 md:p-0 md:pb-6 bg-gray-50 min-h-screen">
      {modal && <LogoutModal onClose={() => setModal(false)} />}

      {/* Mobile Header */}
      <div className="flex items-center justify-between md:hidden">
        <div className="flex-1 flex items-center gap-2">
          <div>
            <Image
              src="/unilaglogo.svg"
              alt="UNILAG logo"
              width={50}
              height={50}
            />
          </div>
          <div>
            <h2 className="font-bold text-md">Unilag Academic Appraisal</h2>
            <p className="text-sm text-[hsla(0,2%,42%,1)]">
              Human Resource Management and Development&apos;s Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="border-solid border border-[hsla(0,0%,85%,1)] p-1 rounded-md cursor-pointer"
            onClick={() => setModal(true)}
          >
            <LogOut size={22} />
          </button>
          <div className="cursor-pointer">
            <Image
              src="/profile-pic.svg"
              alt="Profile Picture"
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="flex justify-between items-center md:border-b md:border-b-[hsla(0,0%,85%,1)] md:p-6 bg-white">
        <div>
          <h3 className="text-gray-500 font-medium md:text-lg">
            Publications Assessed by
          </h3>
          <h2 className="text-2xl font-bold md:text-3xl text-gray-900 mt-1">
            {/* {value?.assessedby} */}
            {accessor?.firstname} {accessor?.lastname}
          </h2>
          <p className="text-gray-500 text-medium mt-1">
            Explore all manuscripts assessed by {accessor?.firstname}{" "}
            {accessor?.lastname}
          </p>
        </div>

        <div className="gap-4 items-center hidden md:flex">
          <Image
            className="rounded-full border border-gray-200"
            src="/profile-pic.svg"
            alt="Profile Picture"
            width={60}
            height={60}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 md:p-6">
        {/* Overview Stats Summary */}
        <div className="w-full bg-white border border-gray-200 rounded-xl flex flex-col md:flex-row overflow-hidden">
          {/* Assessor */}
          <div className="flex flex-1 items-center gap-4 px-6 py-5">
            <Image
              src="/profile-pic.svg"
              alt="Assessor"
              width={56}
              height={56}
              className="rounded-full bg-gray-100"
            />

            <div>
              <p className="text-gray-500 text-lg">Assessor</p>
              <p className="font-bold text-xl text-gray-900">
                {accessor?.firstname} {accessor?.lastname}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-200 my-2" />

          {/* Total Manuscripts */}
          <div className="flex flex-1 items-center gap-4 px-6 py-5 ">
            <div className="p-3 rounded-lg bg-blue-50 text-[hsla(210,79%,46%,1)]">
              <FileText size={30} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-gray-500 text-lg">
                Total Assessed Manuscripts
              </p>

              <p className="font-bold text-xl text-gray-900">
                {reviewOverview?.completedReviews} out of{" "}
                {reviewOverview?.totalReviews}
              </p>
            </div>
          </div>

          <div className="hidden md:block w-px bg-gray-200 my-2" />

          {/* Last Assessed */}
          <div className="flex flex-1 items-center gap-4 px-6 py-5 ">
            <div className="p-3 rounded-lg bg-blue-50 text-[hsla(210,79%,46%,1)]">
              <Calendar size={30} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-gray-500 text-lg">Last Assessed</p>

              <p className="font-bold text-xl text-gray-900">
                {reviewOverview?.recentReview
                  ? format(
                      new Date(reviewOverview?.recentReview.completedAt),
                      "MMM d, yyyy",
                    )
                  : "Never Accessed"}
              </p>
            </div>
          </div>
        </div>
        Assessed Manuscripts Interactive List Section
        {/* <AssessorsJobOverview assessor={value?.assessedby} /> */}
      </div>
    </section>
  );
}
