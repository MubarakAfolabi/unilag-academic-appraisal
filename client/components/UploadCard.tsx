"use client";

import { useRef, useState } from "react";
import SubmitModal from "@/components/SubmitModal";
import ResetModal from "@/components/ResetModal";
import { ChevronDown } from "lucide-react";

type PublicationType =
  | "Journal Article"
  | "Book Chapter"
  | "Book"
  | "Conference"
  | "";
type QuartileType = "Q1" | "Q2" | "Q3" | "others" | "";
type NonIndexedType = "University Based" | "Non-University Based" | "";
type ClassificationType = "National" | "International" | "";

export default function UploadDocumentForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = {
    publication: "",
    publicationType: "" as PublicationType,
    quartile: "" as QuartileType,
    nonIndexed: "" as NonIndexedType,
    classification: "" as ClassificationType,
    file: null as File | null,
  };

  const [formData, setFormData] = useState(form);

  const [displaySubmitModal, setDisplaySubmitModal] = useState(false);
  const [displayResetModal, setDisplayResetModal] = useState(false);

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setDisplaySubmitModal(true);
  };

  const handleFormReset = () => {
    setFormData(form);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {displaySubmitModal && (
        <SubmitModal onClose={() => setDisplaySubmitModal(false)} />
      )}
      {displayResetModal && (
        <ResetModal
          onClose={() => setDisplayResetModal(false)}
          onConfirm={handleFormReset}
        />
      )}

      <form
        className="w-full border border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl flex flex-col gap-4 max-w-4xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-black">Information</h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Publication (Full Citation)
            </label>
            <input
              name="publication"
              value={formData.publication}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  publication: e.target.value,
                }))
              }
              placeholder="Enter full citation"
              className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Publication Type
            </label>
            <div className="relative">
              <select
                name="publicationType"
                className="appearance-none w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-blue-500 cursor-pointer"
                value={formData.publicationType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    publicationType: e.target.value as PublicationType,
                  }))
                }
              >
                <option value="">Select type</option>
                <option value="Journal Article">Journal Article</option>
                <option value="Book Chapter">Book Chapter</option>
                <option value="Book">Book</option>
                <option value="Conference">Conference</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <ChevronDown />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Publication Quartile / Outlet Ranking / Index Status
            </label>
            <div className="relative">
              <select
                name="quartile"
                className="appearance-none w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-blue-500"
                value={formData.quartile}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    quartile: e.target.value as QuartileType,
                  }))
                }
              >
                <option value="">Select quartile</option>
                <option value="Q1">Q1</option>
                <option value="Q2">Q2</option>
                <option value="Q3">Q3</option>
                <option value="others">others</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <ChevronDown />
              </div>
            </div>
          </div>

          {formData.quartile === "others" && (
            <div>
              <label className="mb-1 block text-sm font-medium">
                Non Indexed
              </label>
              <div className="relative">
                <select
                  name="nonIndexed"
                  className="appearance-none w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-blue-500"
                  value={formData.nonIndexed}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nonIndexed: e.target.value as NonIndexedType,
                    }))
                  }
                >
                  <option value="">Select non indexed type</option>
                  <option value="University Based">University Based</option>
                  <option value="Non-University Based">
                    Non-University Based
                  </option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <ChevronDown />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Classification
            </label>
            <div className="relative">
              <select
                name="classification"
                className="appearance-none w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-blue-500"
                value={formData.classification}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    classification: e.target.value as ClassificationType,
                  }))
                }
              >
                <option value="">Select classification</option>
                <option value="National">National</option>
                <option value="International">International</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <ChevronDown />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Upload File</label>

            <input
              ref={fileInputRef}
              type="file"
              id="file-upload"
              className="hidden" // ← Hide the default ugly input
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData((prev) => ({ ...prev, file }));
                }
              }}
            />

            <label
              htmlFor="file-upload"
              className="w-fit border border-gray-400 px-5 py-2 cursor-pointer rounded-lg"
            >
              Choose File
            </label>

            {formData.file && (
              <p className="text-sm text-gray-600">
                Selected:{" "}
                <span className="font-medium">{formData.file.name}</span>
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              className="rounded-full border border-gray-400 bg-white px-5 py-2 font-semibold text-black cursor-pointer"
              onClick={() => setDisplayResetModal(true)}
            >
              Reset information
            </button>

            <button
              type="submit"
              className="rounded-full bg-black px-6 py-2 font-semibold text-white cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
