"use client";

import { FileText } from "lucide-react";

type Props = {
  assessor?: string;
};

type Manuscript = {
  id: number;
  title: string;
  manuscriptId: string;
  assessor: string;
  submittedDate?: string;
  assignedDate?: string;
};

const assessedManuscripts: Manuscript[] = [
  {
    id: 1,
    title: "AI in Healthcare: Opportunities and Challenges",
    manuscriptId: "RH-2026-0156",
    assessor: "Dr. Bayo Isaken",
    submittedDate: "March 21, 2026",
  },
  {
    id: 2,
    title: "The Role of IoT in Smart Cities",
    manuscriptId: "RH-2026-678",
    assessor: "Dr. Bayo Isaken",
    submittedDate: "February 13, 2026",
  },
  {
    id: 3,
    title: "Quantum Computing: Current Advances",
    manuscriptId: "RH-2025-767",
    assessor: "Dr. Bayo Isaken",
    submittedDate: "March 1, 2026",
  },
  {
    id: 4,
    title: "AI in Healthcare: Opportunities and Challenges",
    manuscriptId: "RH-2026-005",
    assessor: "Dr. Bayo Isaken",
    submittedDate: "March 2, 2026",
  },
  {
    id: 5,
    title: "AI in Healthcare: Opportunities and Challenges",
    manuscriptId: "RH-2026-447",
    assessor: "Dr. Bayo Isaken",
    submittedDate: "March 21, 2026",
  },
];

const pendingAssessments: Manuscript[] = [
  {
    id: 6,
    title: "AI in Healthcare: Opportunities and Challenges",
    manuscriptId: "RH-2025-187",
    assessor: "Dr. Bayo Isaken",
    assignedDate: "January 31, 2026",
  },
  {
    id: 7,
    title: "The Role of IoT in Smart Cities",
    manuscriptId: "RH-2026-678",
    assessor: "Dr. Bayo Isaken",
    assignedDate: "January 31, 2026",
  },
];

export default function AssessorsJobOverview({ assessor }: Props) {  
  const assessed = assessedManuscripts.filter(
  (item) => item.assessor === assessor
  );

    const pending = pendingAssessments.filter(
    (item) => item.assessor === assessor
);
 
  return (
    <div className="space-y-8">

      {/* Assessed Manuscripts */}
      <section>

        <div className="flex items-center gap-3 mb-4">
          <FileText className="text-[hsla(210,79%,46%,1)]" size={27} />
          <h2 className="text-xl font-semibold">
            Assessed Manuscripts
          </h2>
        </div>

        <div className="border border-solid border-[hsla(0,0%,85%,1)] p-4 rounded-xl flex flex-col gap-4">

          {assessed.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-4 border-b border-gray-200 last:border-none"
            >
              <div className="flex gap-4 min-w-0 w-full">

                <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg flex-shrink-0">
                  <FileText
                    size={27}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-xl xl:text-base truncate">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[hsla(0,2%,42%,1)]">
                    Manuscript: {item.manuscriptId}
                  </p>
                </div>

              </div>

              <p className="text-gray-500 text-sm">
                Submitted on {item.submittedDate}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* Pending Assessment */}

      <section>

        <div className="flex items-center gap-3 mt-4 mb-2">
          <FileText className="text-[hsla(210,79%,46%,1)]" size={27} />
          <h2 className="text-xl font-semibold">
            Pending Assessment
          </h2>
        </div>

        <div className="border border-solid border-[hsla(0,0%,85%,1)] p-4 rounded-xl flex flex-col gap-4">

          {pending.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-4 border-b border-gray-200 last:border-none"
            >
              <div className="flex gap-4 min-w-0 w-full">

                <div className="bg-[hsla(210,79%,46%,0.1)] text-[hsla(210,79%,46%,1)] w-fit h-fit p-2 rounded-lg flex-shrink-0">
                  <FileText
                    size={27}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-xl xl:text-base truncate">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[hsla(0,2%,42%,1)]">
                    Manuscript: {item.manuscriptId}
                  </p>
                </div>

              </div>

              <p className="text-gray-500 text-sm">
                Assigned on {item.assignedDate}
              </p>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}