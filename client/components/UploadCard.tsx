"use client";

import { useMemo, useRef, useState } from "react";
import SubmitModal from "@/components/SubmitModal";
import ResetModal from "@/components/ResetModal";

type PublicationType = "Journal Article" | "Book Chapter" | "Book" | "Conference" | "";
type QuartileType = "Q1" | "Q2" | "Q3" | "others" | "";
type NonIndexedType = "University Based" | "Non-University Based" | "";
type ClassificationType = "National" | "International" | "";

export default function UploadDocumentForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const [form, setForm] = useState({
    publication: "",
    publicationType: "" as PublicationType,
    quartile: "" as QuartileType,
    nonIndexed: "" as NonIndexedType,
    classification: "" as ClassificationType,
    file: null as File | null,
  });

  const showNonIndexed = useMemo(() => form.quartile === "others", [form.quartile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "quartile" && value !== "others" ? { nonIndexed: "" } : {}),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, file }));
  };

  const handleReset = () => {
    try {
      setIsResetting(true);
      setShowResetModal(false);
      setForm({
      publication: "",
      publicationType: "",
      quartile: "",
      nonIndexed: "",
      classification: "",
      file: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    }
    catch (error) {
      alert("Failed to reset form");
    }
    finally {
      setIsResetting(false);
    }
  };

  const handleOpenModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };
  const handleActualSubmit = async () => {
    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token");
      const fd = new FormData();

      fd.append("publication", form.publication);
      fd.append("publicationType", form.publicationType);
      fd.append("quartile", form.quartile);
      fd.append("nonIndexed", form.nonIndexed);
      fd.append("classification", form.classification);

      if (form.file) {
        fd.append("file", form.file);
      }

      const res = await fetch("http://localhost:5000/api/publications", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to submit");
      return;
    }

    alert("Submitted successfully");
    setShowModal(false);
      handleReset();
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showModal && (
        <SubmitModal
          onClose={() => setShowModal(false)}
          onConfirm={handleActualSubmit}
        />
      )}
      {showResetModal && (
        <ResetModal
          onClose={() => setShowResetModal(false)}
          onConfirm={handleReset}
        />
      )}
      <form 
        onSubmit={handleOpenModal} 
        className="border border-solid border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl flex flex-col gap-4">
        <h2 className="mb-4 text-xl font-semibold text-black">Information</h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Publication (Full Citation)</label>
            <input
              name="publication"
              value={form.publication}
              onChange={handleChange}
              placeholder="Enter full citation"
              className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Publication Type</label>
            <select
              name="publicationType"
              value={form.publicationType}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">Select type</option>
              <option value="Journal Article">Journal Article</option>
              <option value="Book Chapter">Book Chapter</option>
              <option value="Book">Book</option>
              <option value="Conference">Conference</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Publication Quartile / Outlet Ranking / Index Status</label>
            <select
              name="quartile"
              value={form.quartile}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">Select quartile</option>
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="others">others</option>
            </select>
          </div>

          {showNonIndexed && (
            <div>
              <label className="mb-1 block text-sm font-medium">Non Indexed</label>
              <select
                name="nonIndexed"
                value={form.nonIndexed}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="">Select non indexed type</option>
                <option value="University Based">University Based</option>
                <option value="Non-University Based">Non-University Based</option>
              </select>
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium">Classification</label>
            <select
              name="classification"
              value={form.classification}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">Select classification</option>
              <option value="National">National</option>
              <option value="International">International</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Upload File</label>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-gray-400 px-4 py-3"
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="rounded-full border border-gray-400 bg-white px-5 py-2 font-semibold text-black"
              disabled={isResetting}
            >
              Reset information
            </button>

            <button
              type="submit"
              className="rounded-full bg-black px-6 py-2 font-semibold text-white"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}