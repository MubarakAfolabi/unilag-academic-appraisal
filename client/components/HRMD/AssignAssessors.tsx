"use client";

import { useMemo, useState } from "react";
import { CircleUserRound, ChevronRight, Check } from "lucide-react";
import AssignModal from "@/components/AssignModal";

type Props = {
  designateAssesor: DesignateAssesorItem[];
};

export type DesignateAssesorItem = {
  id: number;
  assessorId: string;
  assessor: string;
  email: string;
  faculty: string;
};

export const designateAssesor: DesignateAssesorItem[] = [
  {
    id: 1,
    assessorId: "ASS-26-007",
    assessor: "Dr. Bayo Isaken",
    email: "bayoisaken@unilag.edu.ng",
    faculty: "Computing and informatics",
  },
  {
    id: 2,
    assessorId: "ASS-26-001",
    assessor: "Dr. Emily Davis",
    email: "emilydavis@unilag.edu.ng",
    faculty: "Life science",
  },
  {
    id: 3,
    assessorId: "ASS-26-002",
    assessor: "Dr. David Brown",
    email: "davidbrown@unilag.edu.ng",
    faculty: "Social sciences",
  },
  {
    id: 4,
    assessorId: "ASS-26-003",
    assessor: "Dr. Sarah Williams",
    email: "sarahwilliams@unilag.edu.ng",
    faculty: "College of Medcine",
  },
  {
    id: 5,
    assessorId: "ASS-26-004",
    assessor: "Dr. Michael Johnson",
    email: "michaeljohnson@unilag.edu.ng",
    faculty: "Physical and Earth science ",
  },
  {
    id: 6,
    assessorId: "ASS-26-005",
    assessor: "Dr. Jane Smith",
    email: "janesmith@unilag.edu.ng",
    faculty: "Engineering",
  },
];

export default function AssignAssessors({ designateAssesor }: Props) {
  const [modal, setModal] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredAssessors = designateAssesor.filter((assessor) => {
    const term = searchTerm.toLowerCase();
    return (
      assessor.assessor.toLowerCase().includes(term) ||
      assessor.assessorId.toLowerCase().includes(term) ||
      assessor.email.toLowerCase().includes(term) ||
      assessor.faculty.toLowerCase().includes(term)
    );
  });

  const displayedAssessors = showAll
    ? filteredAssessors
    : filteredAssessors.slice(0, 5);

  const selectedAssessors = useMemo(
    () => designateAssesor.filter((item) => selectedIds.includes(item.id)),
    [designateAssesor, selectedIds]
  );

  const toggleAssessor = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-4 md:px-6 pb-32 w-full">
      {modal && (
        <AssignModal
          onClose={() => setModal(false)}
          selectedAssessors={selectedAssessors}
          onAssign={() => {
            console.log("Assign these assessors:", selectedAssessors);
            setSelectedIds([]);
            setModal(false);
        }}
        />
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold md:text-xl">Assign Assessors</h2>

        <button
          type="button"
          className="text-[hsla(210,79%,46%,1)] font-semibold cursor-pointer transition hover:underline"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search assessor by name, ID, email or faculty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white h-10 pl-10 py-2.5 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-[2fr_0.9fr_1fr_auto] md:grid-cols-[4fr_2fr_1.5fr] gap-4 px-6 py-4 bg-gray-200 border-b border-gray-200 font-semibold text-medium text-gray-700">
          <div>Assessor</div>
          <div>Faculty</div>
          <div className="hidden lg:block text-right">Action</div>
          <div className="lg:hidden w-4"></div>
        </div>

        <ul className="px-6 py-2 flex flex-col gap-2">
          {displayedAssessors.length > 0 ? (
            displayedAssessors.map((activity) => {
              const isSelected = selectedIds.includes(activity.id);

              return (
                <li
                  key={activity.id}
                  className={[
                    "grid grid-cols-[2fr_0.9fr_1fr_auto] md:grid-cols-[4fr_2fr_1.5fr] gap-4 items-center py-3 rounded-lg transition",
                    isSelected ? "bg-blue-50" : "",
                    ].join(" ")}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg flex-shrink-0">
                      <CircleUserRound size={24} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-medium lg:text-base truncate">
                        Assessor: {activity.assessor}
                      </p>
                      <p className="text-sm text-[hsla(0,2%,42%,1)]">
                        Assessor ID: {activity.assessorId}
                      </p>

                      {isSelected && (
                        <span className="mt-1 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold text-black">
                          Selected
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-1 flex items-center justify-center lg:justify-start lg:ml-6 min-w-0 flex-1">
                    <p className="text-medium font-medium text-gray-700 lg:text-base truncate">
                      {activity.faculty}
                    </p>
                  </div>

                  <div className=" flex justify-end items-center text-[hsla(0,2%,42%,1)] text-sm font-medium">
                    <button
                      type="button"
                      onClick={() => toggleAssessor(activity.id)}
                      className={[
                        "inline-flex items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold shadow-sm transition-all whitespace-nowrap",
                        isSelected
                          ? " border-blue-600 bg-[rgb(100,168,198)] text-white hover:bg-[rgb(60,103,121)]"
                          : "border-gray-10 bg-white text-gray-700 hover:bg-gray-50",
                      ].join(" ")}
                    >
                      {isSelected ? "Selected" : "Select"}
                      {isSelected ? (
                        <Check size={12} className="text-[hsla(0,2%,42%,1)]" />
                      ) : (
                        <ChevronRight size={12} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="py-10 text-center text-gray-500">
              No assessor found.
            </li>
          )}
        </ul>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={selectedAssessors.length === 0}
          onClick={() => setModal(true)}
          className="rounded bg-[rgb(100,165,198)]  px-6 py-2 font-semibold text-white cursor-pointer text-white hover:bg-[rgb(60,103,121)]"
        >
          Assign {selectedAssessors.length > 0 ? `(${selectedAssessors.length})` : ""}
        </button>
      </div>
    </div>
  );
}