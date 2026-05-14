import { PerformanceItem } from "@/constant/reviewerDashboard";
import { Check, Clock4, Star } from "lucide-react";

type Props = {
  reviewPerformance: PerformanceItem[];
};

export default function ReviewPerformance({
  reviewPerformance,
}: Props) {
  
  const renderIcon = (icon: string) => {
    switch (icon) {
      case "Check":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dff3e8]">
            <Check
              size={18}
              className="text-[#1d8f5f]"
              strokeWidth={3}
            />
          </div>
        );

      case "Clock4":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dbeafe]">
            <Clock4
              size={18}
              className="text-[#2d77c7]"
              strokeWidth={2.5}
            />
          </div>
        );

      case "Star":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff4cc]">
            <Star
              size={18}
              className="text-[#f4b400]"
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
      <div className="mb-6">
        <h2 className="text-[24px] font-semibold text-[#111111]">
          Review Performance
        </h2>
      </div>

      <ul className="grid grid-cols-1 divide-y divide-[#eeeeee] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        
        {reviewPerformance.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-4 px-2 py-6 lg:px-8"
          >
                        {renderIcon(item.icon)}
            <div>
              <h3 className="text-[32px] font-semibold leading-none text-[#111111]">
                {item.value}
              </h3>

              <p className="mt-1 text-[17px] text-[#222222]">
                {item.label}
              </p>

              <p className="mt-1 text-[13px] text-[#7a7a7a]">
                {item.sublabel}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}