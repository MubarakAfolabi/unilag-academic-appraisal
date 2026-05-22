"use client";

import Image from "next/image";
import { FileText, CircleCheck, Clock, Download } from "lucide-react";
import { Fragment } from "react";

export default function PublisherProfileCard() {
  const cardArr = [
    {
      name: "Uploads",
      amount: 28,
      icon: <FileText />,
      iconColor: "hsla(210,79%,46%,1)",
    },
    {
      name: "Received",
      amount: 8,
      icon: <CircleCheck />,
      iconColor: "hsla(124,93%,26%,1)",
    },
    {
      name: "Under Review",
      amount: 3,
      icon: <Clock />,
      iconColor: "hsla(35,98%,52%,1)",
    },
    {
      name: "Downloads",
      amount: 156,
      icon: <Download />,
      iconColor: "hsla(256,69%,50%,1)",
    },
  ];

  return (
    <div className="border border-solid border-[hsla(0,0%,85%,1)] p-4 rounded-xl flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div>
          <Image
            src="/profile-pic.svg"
            alt="UNILAG logo"
            width={100}
            height={100}
          />
        </div>
        <div>
          <p className="text-xl font-bold">Dr. Alex Johnson</p>
          <p className="text-[hsla(217,80%,48%,1)]">Lecturer</p>
          <p className="text-[hsla(0,2%,42%,1)]">
            Department of Computer Science{" "}
          </p>
          <p className="text-[hsla(0,2%,42%,1)]">University of Lagos </p>
        </div>
      </div>

      <ul className="flex justify-between border border-solid border-[hsla(0,0%,85%,1)] p-4 rounded-xl">
        {cardArr.map((item, index) => {
          return (
            <Fragment key={index}>
              <li className="flex flex-col items-center gap-4">
                <div style={{ color: item.iconColor }}>{item.icon}</div>
                <div className="text-center">
                  <p className="font-semibold text-lg">{item.amount}</p>
                  <p className="text-[hsla(0,2%,42%,1)] text-sm">{item.name}</p>
                </div>
              </li>

              {index < cardArr.length - 1 && (
                <hr className="border-l border-[hsla(0,0%,85%,1)] h-full" />
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}
