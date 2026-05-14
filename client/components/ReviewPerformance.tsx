import { PerformanceItem } from "@/constant/reviewerDashboard";
import { Check, Clock4, Star } from "lucide-react";

type Props = {
  reviewPerformance: PerformanceItem[];
};

export default function ReviewPerformance({ reviewPerformance }: Props) {
  const renderIcon = (icon: string) => {
    switch (icon) {
      case "Check":
        return (
          <div className="bg-[hsla(150,90%,24%,0.2)] text-[hsla(150,90%,24%,1)] w-fit p-1 rounded-full">
            <Check size={22} />
          </div>
        );

      case "Clock4":
        return (
          <div className="bg-[hsla(210,79%,46%,0.2)] text-[hsla(210,79%,46%,1)] w-fit p-1 rounded-full">
            <Clock4 size={22} />
          </div>
        );

      case "Star":
        return (
          <div className="bg-[hsla(45,100%,51%,0.1)] text-[hsla(45,100%,51%,1)] w-fit p-1 rounded-full">
            <Star size={22} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ul className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 rounded-xl flex gap-4">
      {reviewPerformance.map((item, index) => (
        <li key={index} className="flex flex-col items-center gap-2">
          {renderIcon(item.icon)}
          <div className="flex flex-col items-center text-center">
            <p className="text-xl font-semibold ">{item.value}</p>
            <p className="">{item.label}</p>
            <p className="text-sm text-[hsla(0,2%,42%,1)]">{item.sublabel}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
