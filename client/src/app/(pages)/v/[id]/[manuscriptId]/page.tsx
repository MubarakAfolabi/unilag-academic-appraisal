"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LogOut, Download, ChevronRight } from "lucide-react";
import Image from "next/image";

import LogoutModal from "@/components/LogoutModal";
import {recentSubmissions,} from "@/components/VC/AssessedSubmissions";
import { assessedSubmissions,} from "@/components/VC/AssessedSubmissions";
import { useUser } from "@/context/userContext";
import {redirect} from "next/navigation";


export default function AssesedPublication() {
  const { user } = useUser();
  const [modal, setModal] = useState(false);
  const params = useParams();
  const id = params?.id;   
  const router = useRouter();
  if (user?.role !== "VC") {
    redirect("/dashboard");
  }

  const currentManuscriptId = params?.manuscriptId as string;

  const submissionDetails = recentSubmissions.find(
    (item) => item.manuscriptId === currentManuscriptId
  );

  const assessmentDetails = assessedSubmissions.find(
    (item) => item.manuscriptId === currentManuscriptId
  );

  if (!submissionDetails) {
    return (
      <div className="p-6 text-center font-medium text-gray-500">
        Manuscript details not found.
      </div>
    );
  }

  return (
    <section className="md:h-full md:overflow-y-auto flex-1 flex flex-col p-4 md:p-6 gap-6 mb-15 md:pb-12 bg-gray-50/30">
      {modal && <LogoutModal onClose={() => setModal(false)} />}

      <div className="flex items-center justify-between md:hidden">
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-shrink-0">
            <Image
              src="/unilaglogo.svg"
              alt="UNILAG logo"
              width={50}
              height={50}
            />
          </div>
          <div>
            <h2 className="font-bold text-md leading-tight">Unilag Academic Appraisal</h2>
            <p className="text-xs text-[hsla(0,2%,42%,1)]">
              Vice Chancellor&apos;s Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="border border-[hsla(0,0%,85%,1)] p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setModal(true)}
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
          <div className="h-[44px] w-[44px] rounded-full overflow-hidden border border-gray-200">
            <Image
              src={user?.avatar || "/default-avatar.png"}
              alt="Profile Picture"
              width={44}
              height={44}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center md:border-b md:border-b-[hsla(0,0%,85%,1)] md:pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold md:text-3xl tracking-tight text-gray-900">
            Submissions Details
          </h2>
          <div className="hidden md:flex flex-wrap items-center gap-1.5 text-xs md:text-lg text-[hsla(0,2%,42%,1)] font-medium">
            <span 
              onClick={() => router.push(`/dashboard/`)}
              className="hover:underline cursor-pointer hover:text-gray-900"
            >
              Dashboard
            </span>
            <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
            <span className="text-gray-900 font-semibold">Submission Details</span>
          </div>
        </div>

        <div className="hidden md:block h-[50px] w-[50px] rounded-full overflow-hidden border border-gray-200">
          <Image
            src={user?.avatar || "/default-avatar.png"}
            alt="Profile Picture"
            width={50}
            height={50}
            className="object-cover h-full w-full"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6 shadow-sm flex flex-col gap-5">
        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
          Submission Summary
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-8">
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Title of Manuscript</p>
            <p className="text-medium font-bold text-gray-900 leading-relaxed">{submissionDetails.title}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Manuscript ID</p>
            <p className="text-medium font-medium text-gray-900">{submissionDetails.manuscriptId}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Submission Date</p>
            <p className="text-medium font-medium text-gray-800">{submissionDetails.date}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Author</p>
            <p className="text-medium font-medium text-gray-800">{submissionDetails.author}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Academic Unit</p>
            <p className="text-medium font-medium text-gray-800">{submissionDetails.academicunit}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</p>
            <p className="text-medium font-medium text-blue-600 break-all">{submissionDetails.email}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Department</p>
            <p className="text-medium font-medium text-gray-800">{submissionDetails.department}</p>
          </div>
          <div className="sm:col-span-1 lg:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 sm:mt-0 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-0.5">File Submitted</p>
              <p className="text-medium font-mono font-medium text-gray-700 break-all">{submissionDetails.filename}</p>
            </div>
            <button className="flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95 whitespace-nowrap w-full sm:w-auto">
              <Download size={16} />
              Download File
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6 shadow-sm flex flex-col gap-5">
        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
          Assessment Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-8">
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Assessment Status</p>
            <span 
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                    assessmentDetails?.rating === "Negative"
                    ? "bg-red-50 text-red-700 border-red-200" 
                    : "bg-green-50 text-green-700 border-green-200"
                }`}
                >
                {assessmentDetails?.rating || "Positive"}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Similarity Score</p>
            <p className="text-lg font-extrabold text-gray-900">{assessmentDetails?.score || "0%"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Assessed On</p>
            <p className="text-sm font-medium text-gray-800">{assessmentDetails?.date || "N/A"}</p>
          </div>
          <div className="sm:col-span-2 lg:col-span-2 order-2 lg:order-1">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Assessor Comments</p>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-medium text-gray-700 leading-relaxed font-medium space-y-2">
              {assessmentDetails?.assessorcomments ? (
                <p className="whitespace-pre-line">{assessmentDetails.assessorcomments}</p>
              ) : (
                <p className="text-gray-400 italic">No comments provided.</p>
              )}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Assessed By</p>
            <p className="text-medium font-bold text-gray-900">{assessmentDetails?.assessedby || "N/A"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
