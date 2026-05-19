import Image from "next/image";
import { OverviewCard } from "@/constant/publisherDashboard";

type Props = {
  publisherOverviewCards: OverviewCard[];
};

export default function UploadPage({ publisherOverviewCards }: Props) {
  return (
    <div className="flex flex-col gap-6 p-6 w-full max-w-4xl mx-auto bg-white">
      {/* 1. Overview Statistic Cards */}
      <ul className="flex flex-col gap-4 w-full">
        {publisherOverviewCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <li
              key={index}
              className={`${card.bgClass} flex items-center gap-4 p-5 rounded-2xl w-full`}
            >
              {/* Icon Container */}
              <div className={`${card.iconWrapper} ${card.iconColor} p-2 rounded-full flex items-center justify-center`}>
                <Icon className="w-6 h-6" />
              </div>

              {/* Text Values */}
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 leading-none">
                  {card.value}
                </span>
                <span className="text-sm text-gray-500 font-medium mt-1">
                  {card.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* 2. Article Submissions Upload Area */}
      <div className="border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center bg-white shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 self-start mb-6">
          Article Submissions
        </h2>
        
        {/* Dropzone Container */}
        <div className="flex flex-col items-center justify-center text-center group cursor-pointer">
          <Image 
            src="/cloud-upload.svg" 
            alt="Cloud Upload" 
            width={120} 
            height={120} 
            className="mb-2"
          />
          <span className="text-xs uppercase tracking-wider text-gray-400 italic font-medium mb-4">
            CLICK TO UPLOAD ARTICLE
          </span>
          <button className="bg-[#a3d4e5] hover:bg-[#8ec4d6] text-white font-semibold px-12 py-2.5 rounded-full text-lg shadow-sm transition-colors w-64">
            Upload
          </button>
        </div>
      </div>

      {/* 3. Submissions Table Section */}
      <div className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-3 text-sm font-semibold text-gray-700 w-1/5">Document</th>
              <th className="pb-3 text-sm font-semibold text-gray-700 w-1/5">Article</th>
              <th className="pb-3 text-sm font-semibold text-gray-700 w-1/5">Submitted To</th>
              <th className="pb-3 text-sm font-semibold text-gray-700 w-1/5">Status</th>
              <th className="pb-3 text-sm font-semibold text-gray-700 w-1/5">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Empty table layout mirroring the reference visual */}
            <tr className="h-32">
              <td colSpan={5} className="text-center text-gray-400 text-sm">
                No submissions found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
