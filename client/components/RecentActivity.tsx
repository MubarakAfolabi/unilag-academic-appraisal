import { RecentActivityItem } from "@/constant/reviewerDashboard";
import {
  Check,
  X,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

type Props = {
  recentActivity: RecentActivityItem[];
};

export default function RecentActivity({
  recentActivity,
}: Props) {
  
  const renderIcon = (
    status: RecentActivityItem["iconState"]
  ) => {
    switch (status) {
      case "success":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dff3e8]">
            <Check
              size={18}
              className="text-[#1d8f5f]"
              strokeWidth={3}
            />
          </div>
        );

      case "error":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f9dde2]">
            <X
              size={18}
              className="text-[#e5485d]"
              strokeWidth={3}
            />
          </div>
        );

      case "info":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dbeafe]">
            <MessageCircle
              size={16}
              className="text-[#2d77c7]"
              strokeWidth={2.5}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="rounded-2xl border border-[#e5e5e5] bg-white p-5 shadow-sm">
      <ul className="space-y-1">
        {recentActivity.map((activity, index) => (
          <li
            key={index}
            className={`flex items-start justify-between py-4 ${
              index !== recentActivity.length - 1
                ? "border-b border-[#eeeeee]"
                : ""
            }`}
          >
            <div className="flex items-start gap-4">
              {renderIcon(activity.iconState)}
              <div>
                <h3 className="text-[17px] font-semibold leading-[1.35] text-[#111111]">
                  {activity.title}
                </h3>

                <p className="mt-1 text-[13px] text-[#7a7a7a]">
                  {activity.date}
                </p>
              </div>
            </div>
            <ChevronRight
              size={20}
              className="mt-1 flex-shrink-0 text-[#8c8c8c]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}