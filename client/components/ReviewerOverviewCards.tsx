import { OverviewCard } from "@/constant/reviewerDashboard";

type Props = {
  reviewerOverviewCards: OverviewCard[];
};

export default function ReviewerOverviewCards({
  reviewerOverviewCards,
}: Props) {
  return (
    <ul className="flex gap-2 flex-wrap">
      {reviewerOverviewCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <li
            key={index}
            className={`${card.bgClass} flex-1 p-4 rounded-xl flex flex-col justify-between gap-4`}
          >
            <div>
              <div
                className={`${card.iconWrapper} ${card.iconColor} w-fit p-1 rounded-full`}
              >
                <Icon />
              </div> 
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{card.value}</p>
              <p className="text-[hsla(0,2%,42%,1)]">{card.label}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
