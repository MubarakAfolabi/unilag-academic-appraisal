"use client";

import { useState, Fragment } from "react";
import {
  FileText,
  CircleCheck,
  Clock,
  MessageSquareText,
  FileSpreadsheet, // For "New submission in your department"
  Download,        // For "Documents available for download"
  Star,            // For "Review feedback appreciated"
  Settings,        // For "System maintenance notice"
  ArrowRight,
} from "lucide-react";

export default function ReviewerNotification() {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");

  // Mock array exactly matching the item content and dates shown in the UI image
  const notificationsArr = [
    {
      id: 1,
      title: "New review assigned",
      details: "You have been assigned a review for “Deep Learning Approaches in Medical Imaging” by Dr. Adeola John (Computer Science Department).",
      timeReceived: "10 mins ago",
      icon: <FileText className="w-5 h-5 lg:w-6 lg:h-6" />,
      iconColor: "hsla(261,79%,54%,1)",
      iconBgColor: "hsla(261,79%,54%,0.1)",
      isUnread: true,
    },
    {
      id: 2,
      title: "Review submitted successfully",
      details: "Your review for “Blockchain Technology Overview”has been submitted successfully.",
      timeReceived: "1 hour ago",
      icon: <CircleCheck className="w-5 h-5 lg:w-6 lg:h-6" />,
      iconColor: "hsla(142,71%,45%,1)",
      iconBgColor: "hsla(142,71%,45%,0.1)",
      isUnread: true,
    },
    {
      id: 3,
      title: "Review deadline reminder",
      details: "Review for “Mobile Computing Trends” is due in 2 days (May 14,2024).",
      timeReceived: "1 hour ago",
      icon: <Clock className="w-5 h-5 lg:w-6 lg:h-6" />,
      iconColor: "hsla(35,98%,52%,1)",
      iconBgColor: "hsla(35,98%,52%,0.1)",
      isUnread: true,
    },
    {
      id: 4,
      title: "Author responded to your review",
      details: "Dr. Samuel Okoro has responded to your review for “Advanced Alogorithms Lecture Notes”.",
      timeReceived: "Yesterday, 4:30 PM",
      icon: <MessageSquareText className="w-5 h-5 lg:w-6 lg:h-6" />,
      iconColor: "hsla(216,59%,54%,1)",
      iconBgColor: "hsla(216,59%,54%,0.1)",
      isUnread: false,
    },
    {
      id: 5,
      title: "New submission in your department",
      details: "A new work “AI and Society: Ethical Considerations” has been submitted in Computer Science Department.",
      timeReceived: "Yesterday, 11:15 AM",
      icon: <FileSpreadsheet className="w-5 h-5 lg:w-6 lg:h-6" />,
      iconColor: "hsla(271,70%,60%,1)",
      iconBgColor: "hsla(271,70%,60%,0.1)",
      isUnread: false,
    },
    {
      id: 6,
      title: "Documents available for download",
      details: "The revised version of “Data Structure and Applications” is available for rerview.",
      timeReceived: "May 7, 2024, 3:20PM",
      icon: <Download className="w-5 h-5 lg:w-6 lg:h-6" />,
      iconColor: "hsla(142,71%,45%,1)",
      iconBgColor: "hsla(142,71%,45%,0.1)",
      isUnread: false,
    },
    {
      id: 7,
      title: "Review feedback appreciated",
      details: "Thank you! Your review for “Machine Learning Approaches in Data Mining” has been rated positively by the author.",
      timeReceived: "May 6, 2024, 6:00PM",
      icon: <Star className="w-5 h-5 lg:w-6 lg:h-6" />,
      iconColor: "hsla(35,98%,52%,1)",
      iconBgColor: "hsla(35,98%,52%,0.1)",
      isUnread: false,
    },
    {
      id: 8,
      title: "System maintenance notice",
      details: "The APRI system will undergo scheduled maintenance on May 12, 2024 from 12:00 AM to 2:00 PM.",
      timeReceived: "May 5, 2024, 6:00PM",
      icon: <Settings className="w-5 h-5 lg:w-6 lg:h-6" />,
      iconColor: "hsla(220,15%,40%,1)",
      iconBgColor: "hsla(220,15%,40%,0.1)",
      isUnread: false,
    },
  ];

  // Tab filtering calculations
  const totalCount = notificationsArr.length;
  const unreadCount = notificationsArr.filter((n) => n.isUnread).length;
  const readCount = totalCount - unreadCount;

  const filteredNotifications = notificationsArr.filter((n) => {
    if (activeTab === "unread") return n.isUnread;
    if (activeTab === "read") return !n.isUnread;
    return true;
  });

  return (
    <div className="w-full font-sans bg-white p-4">
      {/* 1. Header Filter Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-100 pb-3 mb-4 text-sm font-medium">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 pb-3 -mb-[13px] border-b-2 transition-colors ${
            activeTab === "all"
              ? "border-[hsla(261,79%,54%,1)] text-[hsla(261,79%,54%,1)]"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          All{" "}
          <span className={`px-1.5 py-0.5 text-xs rounded-full ${activeTab === "all" ? "bg-[hsla(261,79%,54%,0.15)] text-[hsla(261,79%,54%,1)]" : "bg-gray-100 text-gray-600"}`}>
            {totalCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("unread")}
          className={`flex items-center gap-2 pb-3 -mb-[13px] border-b-2 transition-colors ${
            activeTab === "unread"
              ? "border-[hsla(261,79%,54%,1)] text-[hsla(261,79%,54%,1)]"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Unread{" "}
          <span className={`px-1.5 py-0.5 text-xs rounded-full ${activeTab === "unread" ? "bg-[hsla(261,79%,54%,0.15)] text-[hsla(261,79%,54%,1)]" : "bg-gray-100 text-gray-600"}`}>
            {unreadCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("read")}
          className={`flex items-center gap-2 pb-3 -mb-[13px] border-b-2 transition-colors ${
            activeTab === "read"
              ? "border-[hsla(261,79%,54%,1)] text-[hsla(261,79%,54%,1)]"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Read{" "}
          <span className={`px-1.5 py-0.5 text-xs rounded-full ${activeTab === "read" ? "bg-[hsla(261,79%,54%,0.15)] text-[hsla(261,79%,54%,1)]" : "bg-gray-100 text-gray-600"}`}>
            {readCount}
          </span>
        </button>
      </div>

      {/* 2. Notifications List Wrapper Container */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <ul className="flex flex-col divide-y divide-gray-100">
          {filteredNotifications.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-4 p-4 lg:p-5 transition-colors hover:bg-gray-50/50"
            >
              {/* Leftmost column: Unread indicator dot */}
              <div className="w-2 h-2 mt-4 shrink-0 flex items-center justify-center">
                {item.isUnread && (
                  <div className="h-2.5 w-2.5 rounded-full bg-[hsla(261,79%,54%,1)]" />
                )}
              </div>

              {/* Icon Container */}
              <div
                style={{
                  color: item.iconColor,
                  backgroundColor: item.iconBgColor,
                }}
                className="shrink-0 p-2.5 rounded-full flex items-center justify-center"
              >
                {item.icon}
              </div>

              {/* Main Text & Timeline Content */}
              <div className="flex-1 min-w-0 flex flex-col md:flex-row md:justify-between gap-1 md:gap-4">
                <div className="space-y-1">
                  <h4 className="font-semibold text-gray-900 text-sm lg:text-base">
                    {item.title}
                  </h4>
                  <p className="text-xs lg:text-sm text-gray-500 leading-relaxed max-w-4xl">
                    {item.details}
                  </p>
                </div>
                
                {/* Timestamp aligns neatly to the right */}
                <span className="shrink-0 text-xs text-gray-400 whitespace-nowrap self-start pt-0.5">
                  {item.timeReceived}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Bottom Pagination Action Link */}
      <div className="flex justify-center mt-6">
      </div>
    </div>
  );
}
