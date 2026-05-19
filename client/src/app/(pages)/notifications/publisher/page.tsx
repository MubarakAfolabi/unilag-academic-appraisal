"use client";

import {
  ChevronLeft,
  Check,
  FileText,
  ChevronRight,
  CircleCheck,
  MessageSquareText,
  Clock,
  Megaphone,
} from "lucide-react";
import { Fragment, useState } from "react";

export default function publisherNotifications() {
  const [filter, setFilter] = useState(0);

  const navArr = [
    {
      name: "All",
      unread: 5,
    },
    {
      name: "Submissions",
      unread: 2,
    },
  ];

  const notificationsArr = [
    {
      title: "New review assigned",
      details:
        "You have been assigned a review for “Deep Learning Approaches in Medical Imaging” by...",
      timeReceived: "10 mins ago",
      icon: <FileText />,
      iconColor: "hsla(261,79%,54%,1)",
      iconBgColor: "hsla(261,79%,54%,0.25)",
    },
    {
      title: "Review submitted",
      details:
        "Your review for “Blockchain Technology Overview”has been submitted successfully.",
      timeReceived: "1 hour ago",
      icon: <CircleCheck />,
      iconColor: "hsla(124,93%,26%,1)",
      iconBgColor: "hsla(129,48%,95%,1)",
    },
    {
      title: "Author responded to your review",
      details:
        "Dr. Samuel Okoro has responded to your review for “Advanced Alogorithms Lecture Notes.",
      timeReceived: "Yesterday",
      icon: <MessageSquareText />,
      iconColor: "hsla(216,59%,54%,1)",
      iconBgColor: "hsla(216,59%,54%,0.25)",
    },
    {
      title: "Reviewer reminder",
      details: "Please complete your review for “Mobile Computing trends”",
      timeReceived: "Yesterday",
      icon: <Clock />,
      iconColor: "hsla(35,98%,52%,1)",
      iconBgColor: "hsla(35,98%,52%,0.25)",
    },
    {
      title: "System announcement",
      details: "New guidelines for reviewers have been updated ",
      timeReceived: "Yesterday",
      icon: <Megaphone />,
      iconColor: "hsla(207,98%,50%,1)",
      iconBgColor: "hsla(200,91%,95%,1)",
    },
  ];

  return (
    <section className="md:h-full md:overflow-y-auto flex-2 flex flex-col p-4 gap-6 mb-15 md:p-0 md:pb-6">
      <header>
        <div className="flex items-center gap-2">
          <div className="border-solid border border-[hsla(0,0%,85%,1)] p-1 rounded-md cursor-pointer">
            <ChevronLeft />
          </div>
          <h2 className="font-bold text-xl">Notifications</h2>
        </div>
      </header>

      <nav className="flex items-center gap-6">
        {navArr.map((item, index) => {
          return (
            <div
              key={index}
              className={`${filter === index ? "text-[hsla(216,59%,54%,1)]" : "text-[hsla(237,15%,47%,1)]"} flex flex-col gap-1 cursor-pointer`}
              onClick={() => setFilter(index)}
            >
              <button className="flex items-center gap-2 font-semibold cursor-pointer">
                {item.name}
                <span className="bg-[hsla(216,59%,54%,0.25)] text-sm h-5 w-5 rounded-full flex items-center justify-center">
                  {item.unread}
                </span>
              </button>
              <hr className="border rounded-full" />
            </div>
          );
        })}
      </nav>

      <div className="flex items-center gap-1 justify-end text-[hsla(216,59%,54%,1)]">
        <div className="cursor-pointer">
          <Check />
        </div>
        <p className="cursor-pointer">Mark all as read</p>
        <div></div>
      </div>

      <ul className="flex flex-col gap-4 border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 rounded-xl">
        {notificationsArr.map((item, index) => {
          return (
            <Fragment key={index}>
              <li className="flex items-center gap-1">
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
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-[hsla(229,20%,33%,1)]">
                      {item.timeReceived}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[hsla(229,20%,33%,1)]">
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
    </section>
  );
}
