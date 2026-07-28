import { FileText } from "lucide-react";
import type { UploadItem } from "@/types/uploadItem";

type Props = {
  recentUploadActivity: UploadItem[];
};

export default function RecentUploads({ recentUploadActivity }: Props) {
  return (
    <ul className="flex flex-col gap-4">
      {recentUploadActivity.toReversed().map((file) => {
        return (
          <li
            key={file.id}
            className="flex gap-2 border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 rounded-xl"
          >
            <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
              <FileText className="lg:w-9 lg:h-9" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div>
                <div className="flex justify-between">
                  <p className="font-semibold lg:text-lg">{file.fileName}</p>
                  <p className="text-[hsla(210,79%,46%,1)]">{file.status}</p>
                </div>
                {/* <p className="text-sm text-[hsla(0,2%,42%,1)] lg:text-md">
                  {file.meta}
                </p> */}
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-[hsla(0,0%,85%,1)] w-full h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[hsla(210,79%,46%,1)] h-full"
                    style={{ width: `${file.progress}%` }}
                  ></div>
                </div>
                <p className="text-[hsla(0,2%,42%,1)]">{file.progress}%</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
