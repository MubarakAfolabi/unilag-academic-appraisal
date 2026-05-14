import { RecentActivityItem } from "@/constant/reviewerDashboard";
import { Check, X, ChevronRight } from "lucide-react";

type Props = {
  recentActivity: RecentActivityItem[];
};

export default function RecentActivity({ recentActivity }: Props) {
  const renderIcon = (status: RecentActivityItem["iconState"]) => {
    switch (status) {
      case "success":
        return (
          <div className="bg-[hsla(150,90%,24%,0.2)] text-[hsla(150,90%,24%,1)] w-fit p-1 rounded-full">
            <Check size={22} />
          </div>
        );

      case "error":
        return (
          <div className="bg-[hsla(353,100%,46%,0.2)] text-[hsla(353,100%,46%,1)] w-fit p-1 rounded-full">
            <X size={22} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ul className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 rounded-xl flex flex-col gap-4">
      {recentActivity.map((activity, index) => (
        <li
          key={index}
          className={`flex items-center gap-2 ${
            index !== recentActivity.length - 1
              ? "border-b border-[#eeeeee] pb-4"
              : ""
          }`}
        >
          {renderIcon(activity.iconState)}

          <div className="flex-1 flex flex-col">
            <p className="font-semibold">{activity.title}</p>
            <p className="text-sm text-[hsla(0,2%,42%,1)]">{activity.date}</p>
          </div>

          <div className="text-[hsla(0,2%,42%,1)]">
            <ChevronRight size={22} />
          </div>
        </li>
      ))}
    </ul>
  );
}
