"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LogOut } from "lucide-react";
import { useUser } from "@/context/userContext";
import type { DesignateAssesorItem } from "@/components/HRMD/AssignAssessors"; // adjust path if needed

type AssignModalProps = {
  onClose: () => void;
  selectedAssessors: DesignateAssesorItem[];
  onAssign: () => void;
};

export default function AssignModal({
  onClose,
  selectedAssessors,
  onAssign,
}: AssignModalProps) {
  const router = useRouter();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user?.role !== "HRMD") {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const handleAssign = () => {
    onAssign();
    onClose();
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-[hsla(0,0%,85%,0.7)] z-1 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[hsla(210,79%,46%,0.2)] p-4 rounded-full self-center">
          <CheckCircle2 />
        </div>

        <div className="flex flex-col text-center gap-1">
          <p className="text-lg font-bold">
            Assign the selected assessor(s)?
          </p>
          <p className="text-sm text-[hsla(0,2%,42%,1)]">
            You are about to assign {selectedAssessors.length} assessor
            {selectedAssessors.length > 1 ? "s" : ""} to this publication.
          </p>
        </div>

        <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3">
          <p className="mb-2 text-sm font-semibold text-gray-700">
            Selected assessors
          </p>

          <div className="flex flex-col gap-2">
            {selectedAssessors.map((assessor) => (
              <div
                key={assessor.id}
                className="rounded-md bg-white px-3 py-2 border border-gray-200"
              >
                <p className="text-sm font-semibold text-gray-800">
                  {assessor.assessor}
                </p>
                <p className="text-xs text-gray-500">
                  {assessor.assessorId} • {assessor.faculty}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="flex-1 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>

          <button
            className="flex-1 p-3 bg-[hsla(194,30%,14%,1)] text-white rounded-lg cursor-pointer hover:opacity-90"
            onClick={handleAssign}
            type="button"
            disabled={selectedAssessors.length === 0}
          >
            Yes, Assign
          </button>
        </div>
      </div>
    </div>
  );
}