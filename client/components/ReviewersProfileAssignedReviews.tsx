import { AssignedReviewItem} from "@/constant/reviewerDashboard";
import { ChevronRight, File, FileText, } from "lucide-react";

type Props = {
  assignedReviews: AssignedReviewItem[];
};

export default function AssignedReviews({ assignedReviews }: Props) {
  return (
        <div className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="flex items-center gap-2 text-[hsla(210,79%,46%,1)] text-lg font-semibold md:text-xl">
                <File className="w-5 h-5" />
                <span>Assigned Reviews</span>
                </h2>
                <p className="text-[hsla(210,79%,46%,1)] font-bold cursor-pointer">
                View all
                </p>
            </div>
        {assignedReviews.map((review, index) => (   
            <li
            key={index}
            className={`flex gap-2 ${
                index !== assignedReviews.length - 1
                ? "border-b border-[#eeeeee] pb-4"
                : ""
            }`}
            >
            <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg">
                <FileText className="lg:w-9 lg:h-9" />
            </div>

            <div className="flex-1 flex flex-col">
                <p className="font-semibold lg:text-lg">{review.title}</p>
                <p>{review.author}</p>
                <p className="text-sm text-[hsla(0,2%,42%,1)] lg:text-md">
                {review.date}
                </p>
            </div>

            <div className="flex justify-center items-center text-[hsla(0,2%,42%,1)]">
                <ChevronRight size={22} />
            </div>
            </li>
        ))}
        </div>
  );
}
