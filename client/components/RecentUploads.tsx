import { UploadActivityItem } from "@/constant/publisherDashboard";
import { FileText } from "lucide-react";

type Props = {
  recentUploadActivity: UploadActivityItem[];
};

export default function RecentUploads({ recentUploadActivity }: Props) {
  return (
    <ul className="flex flex-col gap-4">
      {recentUploadActivity.map((file, index) => {
        return (
          <li
            key={index}
            className="flex gap-2 border border-solid border-[hsla(0,0%,85%,1)] p-2 rounded-xl"
          >
            <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
              <FileText />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div>
                <div className="flex justify-between">
                  <p className="font-bold">{file.filename}</p>
                  <p className="text-[hsla(210,79%,46%,1)]">{file.status}</p>
                </div>
                <p className="text-sm text-[hsla(0,2%,42%,1)]">{file.meta}</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-[hsla(0,0%,85%,1)] w-full h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`bg-[hsla(210,79%,46%,1)] h-full w-[${file.progressValue}%]`}
                  ></div>
                </div>
                <p className="text-[hsla(0,2%,42%,1)]">{file.progressValue}%</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
