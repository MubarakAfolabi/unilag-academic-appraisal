"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ReviewerNotifications } from "@/constant/reviewerDashboard";

export default function ReviewerNotification() {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");

  // Tab filtering calculations based on imported constant array
  const totalCount = ReviewerNotifications.length;
  const unreadCount = ReviewerNotifications.filter((n) => n.isUnread).length;
  const readCount = totalCount - unreadCount;

  const filteredNotifications = ReviewerNotifications.filter((n) => {
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
          {filteredNotifications.map((item) => {
            // Dynamic Lucide component instantiation
            const IconComponent = item.icon;

            return (
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
                  {IconComponent && <IconComponent className="w-5 h-5 lg:w-6 lg:h-6" />}
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
                  
                  {/* Timestamp */}
                  <span className="shrink-0 text-xs text-gray-400 whitespace-nowrap self-start pt-0.5">
                    {item.timeReceived}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

    </div>
  );
}
