"use client";

import { ChevronRight, FileText, Folder } from "lucide-react";
import { Fragment } from "react";

export default function UploadListCard() {
  const uploadArr = [
    {
      title: "Machine Learning Approaches in Date Mining",
      author: "By Dr. Alex Johnson",
      dateSubmitted: "Submitted on April 23, 2026",
    },
    {
      title: "Advanced Algorithms Lecture Notes",
      author: "By Dr. Samuel Okoro",
      dateSubmitted: "Submitted on April 23, 2026",
    },
    {
      title: "Research Methodology in Computing",
      author: "By Dr. Maryam Bello",
      dateSubmitted: "Submitted on April 23, 2026",
    },
  ];

  return (
    <div className="border border-solid border-[hsla(0,0%,85%,1)] p-4 rounded-xl flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2 text-[hsla(216,59%,54%,1)]">
        <div className="flex items-center gap-2">
          <div>
            <Folder />
          </div>
          <p className="font-semibold">My Uploads</p>
        </div>
        <button className="font-semibold cursor-pointer">View All</button>
      </div>

      <ul className="flex flex-col gap-4">
        {uploadArr.map((item, index) => {
          return (
            <Fragment key={index}>
              <li className="flex gap-1">
                <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
                  <FileText />
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-[hsla(0,2%,42%,1)]">
                      {item.author}
                    </p>
                    <p className="text-sm text-[hsla(0,2%,42%,1)]">
                      {item.dateSubmitted}
                    </p>
                  </div>
                  <div className="cursor-pointer">
                    <ChevronRight />
                  </div>
                </div>
              </li>

              {index < uploadArr.length - 1 && (
                <hr className="w-full border-[hsla(0,0%,85%,1)]" />
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}
