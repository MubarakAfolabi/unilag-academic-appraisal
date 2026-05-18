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
            className={`${card.bgClass} flex-1 p-4 rounded-xl flex flex-col lg:flex-row lg:py-6 lg:items-center lg:justify-start lg:h-50 justify-between gap-4`}
          >
            <div>
              <div
                className={`${card.iconWrapper} ${card.iconColor} w-fit p-1 rounded-full`}
              >
                <Icon className="lg:w-9 lg:h-9" />
              </div>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-black">
                {card.value}
              </p>
              <p className="text-[hsla(0,2%,42%,1)] lg:text-lg">{card.label}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
