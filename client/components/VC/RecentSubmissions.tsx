import { Fragment } from "react";
import { ChevronRight, FileText } from "lucide-react";
import Link from "next/link";

export type StaffPublicationAssessment = {
  id: number;
  fullName: string;
  staffId: string;
  submittedAt: string; 
  totalPublications?: number; 
  positiveCount: number;
  negativeCount: number;
};

type Props = {
  recentSubmissions?: StaffPublicationAssessment[]; 
};

export const MOCK_SUBMISSIONS: StaffPublicationAssessment[] = [
  {
    id: 1,
    fullName: "Dr. Adebayo Omotola",
    staffId: "UNILAG-2024-0892",
    submittedAt: "2026-07-01T10:30:00Z",
    positiveCount: 14,
    negativeCount: 2,
  },
  {
    id: 2,
    fullName: "Prof. Chidi Obi",
    staffId: "UNILAG-2019-1145",
    submittedAt: "2026-07-05T14:15:00Z",
    positiveCount: 8,
    negativeCount: 5,
  },
  {
    id: 3,
    fullName: "Dr. Funke Adeyemi",
    staffId: "UNILAG-2024-0893",
    submittedAt: "2026-07-08T09:45:00Z",
    positiveCount: 8,
    negativeCount: 10,
  },
  {
    id: 4,
    fullName: "Prof. Amina Yusuf",
    staffId: "UNILAG-2020-1234",
    submittedAt: "2026-07-10T11:20:00Z",
    positiveCount: 9,
    negativeCount: 8,
  },
  {
    id: 5,
    fullName: "Dr. Emeka Nwosu",
    staffId: "UNILAG-2021-0987",
    submittedAt: "2026-07-12T13:30:00Z",
    positiveCount: 9,
    negativeCount: 12,
  }
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getPercent(value: number, total: number) {
  if (!total) return "0";
  const percent = (value / total) * 100;
  return percent % 1 === 0 ? percent.toFixed(0) : percent.toFixed(1);
}

export default function RecentSubmissions({ recentSubmissions }: Props) {
  // Clear fallback assignment regardless of state layout types
  const dataToRender = Array.isArray(recentSubmissions) && recentSubmissions.length > 0 
    ? recentSubmissions 
    : MOCK_SUBMISSIONS;

  return (
    <div className="w-full block clear-both border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden min-h-[150px]">
      
      {/* Table Headings */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] md:grid-cols-[1.8fr_0.8fr_0.8fr_0.6fr] gap-4 px-6 py-4 bg-gray-200 border-b border-gray-200 font-semibold text-sm text-gray-700">
        <div>Publisher Details</div>
        <div className="text-center">Positive Reviews</div>
        <div className="text-center">Negative Reviews</div>
        <div className="text-right">Action</div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-200">
        {dataToRender.map((staff) => {
          const total = staff.totalPublications ?? staff.positiveCount + staff.negativeCount;

          return (
            <Fragment key={staff.id}>
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] md:grid-cols-[1.8fr_0.8fr_0.8fr_0.6fr] gap-4 px-6 py-5 items-center hover:bg-gray-50 transition-colors">
                
                {/* Profile Details */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-semibold shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {staff.fullName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      ID: {staff.staffId}
                    </p>
                    <p className="text-xs text-[hsla(0,2%,42%,1)]">
                      Submitted: {formatDate(staff.submittedAt)}
                    </p>
                  </div>
                </div>

                {/* Positive Count */}
                <div className="text-center">
                  <span className="text-green-700 bg-green-50 px-2 py-1 rounded-md font-medium text-xs sm:text-sm">
                    {staff.positiveCount} ({getPercent(staff.positiveCount, total)}%)
                  </span>
                </div>

                {/* Negative Count */}
                <div className="text-center">
                  <span className="text-red-600 bg-red-50 px-2 py-1 rounded-md font-medium text-xs sm:text-sm">
                    {staff.negativeCount} ({getPercent(staff.negativeCount, total)}%)
                  </span>
                </div>

                {/* Action Link Button */}
                <div className="text-right">
                  <Link
                     href={`/dashboard/assesment/${staff.id}`}
                    className="inline-flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
                  >
                    View Now
                    <ChevronRight size={12} className="text-gray-400" />
                  </Link>
                </div>

              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
