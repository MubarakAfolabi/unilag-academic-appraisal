"use client";

import {
  FileText,
  ChevronRight,
  CircleCheck,
  MessageSquareText,
  Clock,
  Megaphone,
} from "lucide-react";
import { Fragment } from "react";

export default function PublisherNotification() {
  const notificationsArr = [
    {
      title: "New review assigned",
      details:
        "You have been assigned a review for “Deep Learning Approaches in Medical Imaging” by...",
      timeReceived: "10 mins ago",
      icon: <FileText className="lg:w-9 lg:h-9" />,
      iconColor: "hsla(261,79%,54%,1)",
      iconBgColor: "hsla(261,79%,54%,0.25)",
    },
    {
      title: "Review submitted",
      details:
        "Your review for “Blockchain Technology Overview”has been submitted successfully.",
      timeReceived: "1 hour ago",
      icon: <CircleCheck className="lg:w-9 lg:h-9" />,
      iconColor: "hsla(124,93%,26%,1)",
      iconBgColor: "hsla(129,48%,95%,1)",
    },
    {
      title: "Author responded to your review",
      details:
        "Dr. Samuel Okoro has responded to your review for “Advanced Alogorithms Lecture Notes.",
      timeReceived: "Yesterday",
      icon: <MessageSquareText className="lg:w-9 lg:h-9" />,
      iconColor: "hsla(216,59%,54%,1)",
      iconBgColor: "hsla(216,59%,54%,0.25)",
    },
    {
      title: "Reviewer reminder",
      details: "Please complete your review for “Mobile Computing trends”",
      timeReceived: "Yesterday",
      icon: <Clock className="lg:w-9 lg:h-9" />,
      iconColor: "hsla(35,98%,52%,1)",
      iconBgColor: "hsla(35,98%,52%,0.25)",
    },
    {
      title: "System announcement",
      details: "New guidelines for reviewers have been updated ",
      timeReceived: "Yesterday",
      icon: <Megaphone className="lg:w-9 lg:h-9" />,
      iconColor: "hsla(207,98%,50%,1)",
      iconBgColor: "hsla(200,91%,95%,1)",
    },
  ];

  return (
    <ul className="flex flex-col gap-4 border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl">
      {notificationsArr.map((item, index) => {
        return (
          <Fragment key={index}>
            <li className="flex items-center gap-1 lg:gap-2">
              <div
                style={{ backgroundColor: item.iconColor }}
                className="shrink-0 h-2 w-2  rounded-full"
              ></div>
              <div
                style={{
                  color: item.iconColor,
                  backgroundColor: item.iconBgColor,
                }}
                className="w-fit h-fit p-2 rounded-full"
              >
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold lg:text-lg">{item.title}</p>
                  <p className="text-sm text-[hsla(229,20%,33%,1)] lg:text-md">
                    {item.timeReceived}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-[hsla(229,20%,33%,1)] lg:text-md">
                    {item.details}
                  </p>
                  <div className="text-[hsla(230,31%,24%,1)] cursor-pointer">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            </li>

            {index < notificationsArr.length - 1 && (
              <hr className="w-full border-[hsla(0,0%,85%,1)]" />
            )}
          </Fragment>
        );
      })}
    </ul>
  );
}
