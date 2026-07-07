"use client";

import { useRef, useState, useEffect } from "react";
import SubmitModal from "@/components/SubmitModal";
import ResetModal from "@/components/ResetModal";
import { ChevronDown } from "lucide-react";
import AlertPopup from "@/components/AlertPopup";
import type { ValidationError } from "@/types/validationError";
import {
  addUpload,
  updateUploadProgress,
  finishUpload,
} from "@/components/UploadProgressManager";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type PublicationType =
  | "JOURNAL_ARTICLE"
  | "BOOK_CHAPTER"
  | "BOOK"
  | "CONFERENCE"
  | "";
type QuartileType = "Q1" | "Q2" | "Q3" | "OTHERS" | "";
type NonIndexedType = "UNIVERSITY_BASED" | "NON_UNIVERSITY_BASED" | "";
type ClassificationType = "NATIONAL" | "INTERNATIONAL" | "";

export default function UploadDocumentForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUploadXHR = useRef<XMLHttpRequest | null>(null);

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
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const validateForm = (): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!formData.publication.trim()) {
      errors.push({ path: "publication", msg: "Publication is required" });
    }
    if (!formData.publicationType) {
      errors.push({
        path: "publicationType",
        msg: "Publication type is required",
      });
    }
    if (!formData.quartile) {
      errors.push({ path: "quartile", msg: "Quartile is required" });
    }
    if (formData.quartile === "OTHERS" && !formData.nonIndexed) {
      errors.push({
        path: "nonIndexed",
        msg: "Please select a non-indexed type",
      });
    }
    if (!formData.classification) {
      errors.push({
        path: "classification",
        msg: "Classification is required",
      });
    }
    if (!formData.file) {
      errors.push({ path: "file", msg: "Please choose a file" });
    } else {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(formData.file.type)) {
        errors.push({
          path: "file",
          msg: "Only PDF, DOC and DOCX files are allowed",
        });
      }
    }

    return errors;
  };

  const handleDisplaySubmitModal: React.SubmitEventHandler<HTMLFormElement> = (
    e,
  ) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setDisplaySubmitModal(true);
  };

  const handleSubmit = () => {
    setDisplaySubmitModal(false);
    if (!formData.file) return;

    const uploadId = addUpload(formData.file.name);

    const uploadData = new FormData();
    uploadData.append("publication", formData.publication);
    uploadData.append("publicationType", formData.publicationType);
    uploadData.append("quartile", formData.quartile);
    uploadData.append("nonIndexed", formData.nonIndexed);
    uploadData.append("classification", formData.classification);
    uploadData.append("file", formData.file);

    const xhr = new XMLHttpRequest();
    currentUploadXHR.current = xhr;

    xhr.open("POST", `${apiUrl}/api/upload`);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        updateUploadProgress(uploadId, percent);
      }
    };

    xhr.onload = () => {
      // Don't let a non-JSON or empty body (e.g. a 200 with no payload)
      // throw and skip finishUpload entirely.
      let response: { errMessages?: ValidationError[] } = {};
      try {
        response = xhr.responseText ? JSON.parse(xhr.responseText) : {};
      } catch (err) {
        console.error("Failed to parse upload response:", err);
      }

      if (xhr.status === 200) {
        finishUpload(uploadId, true);
        setErrors([]);
        setShowAlert(true);
        setAlertType("success");
      } else if (xhr.status === 400) {
        finishUpload(uploadId, false);
        setErrors(response.errMessages || []);
      } else {
        finishUpload(uploadId, false);
        setShowAlert(true);
        setAlertType("error");
      }
    };

    xhr.onerror = () => {
      finishUpload(uploadId, false);
      setShowAlert(true);
      setAlertType("error");
    };

    xhr.send(uploadData);
  };

  const handleFormReset = () => {
    setFormData(form);
    setErrors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!showAlert) return;
    const timer = setTimeout(() => setShowAlert(false), 3000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const publicationError = errors.find((error) => error.path === "publication");
  const publicationTypeError = errors.find(
    (error) => error.path === "publicationType",
  );
  const quartileError = errors.find((error) => error.path === "quartile");
  const nonIndexedError = errors.find((error) => error.path === "nonIndexed");
  const classificationError = errors.find(
    (error) => error.path === "classification",
  );
  const fileError = errors.find((error) => error.path === "file");

  return (
    <>
      {displaySubmitModal && (
        <SubmitModal
          onClose={() => setDisplaySubmitModal(false)}
          onConfirm={handleSubmit}
        />
      )}
      {displayResetModal && (
        <ResetModal
          onClose={() => setDisplayResetModal(false)}
          onConfirm={handleFormReset}
        />
      )}

      {showAlert &&
        (alertType === "success" ? (
          <AlertPopup
            type="success"
            message="Document Uploaded Successfully"
            onClose={() => setShowAlert(false)}
          />
        ) : (
          <AlertPopup
            type="error"
            message="Something went wrong, try again"
            onClose={() => setShowAlert(false)}
          />
        ))}

      <form
        className="w-full border border-[hsla(0,0%,85%,1)] px-2 py-4 lg:px-4 lg:py-6 rounded-xl flex flex-col gap-4 max-w-4xl"
        onSubmit={handleDisplaySubmitModal}
      >
        <h2 className="text-xl font-semibold text-black">Information</h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Publication (Full Citation)
            </label>
            <input
              type="text"
              className={`w-full rounded-lg border px-4 py-3 outline-none ${
                publicationError
                  ? "border-red-500"
                  : "border-[hsla(0,2%,42%,1)] focus:border-blue-500"
              }`}
              value={formData.publication}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  publication: e.target.value,
                }))
              }
              placeholder="Enter full citation"
            />
            {publicationError && (
              <p className="text-red-500 text-sm">{publicationError.msg}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Publication Type
            </label>
            <div className="relative">
              <select
                name="publicationType"
                className={`appearance-none w-full rounded-lg border border-gray-400 px-4 py-3 outline-none cursor-pointer
                  ${
                    publicationTypeError
                      ? "border-red-500"
                      : "border-[hsla(0,2%,42%,1)] focus:border-blue-500"
                  }`}
                value={formData.publicationType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    publicationType: e.target.value as PublicationType,
                  }))
                }
              >
                <option value="">Select type</option>
                <option value="JOURNAL_ARTICLE">Journal Article</option>
                <option value="BOOK_CHAPTER">Book Chapter</option>
                <option value="BOOK">Book</option>
                <option value="CONFERENCE">Conference</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <ChevronDown />
              </div>
            </div>
            {publicationTypeError && (
              <p className="text-red-500 text-sm">{publicationTypeError.msg}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Publication Quartile / Outlet Ranking / Index Status
            </label>
            <div className="relative">
              <select
                name="quartile"
                className={`appearance-none w-full rounded-lg border border-gray-400 px-4 py-3 outline-none cursor-pointer
                  ${
                    quartileError
                      ? "border-red-500"
                      : "border-[hsla(0,2%,42%,1)] focus:border-blue-500"
                  }`}
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
                <option value="OTHERS">others</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <ChevronDown />
              </div>
            </div>
            {quartileError && (
              <p className="text-red-500 text-sm">{quartileError.msg}</p>
            )}
          </div>

          {formData.quartile === "OTHERS" && (
            <div>
              <label className="mb-1 block text-sm font-medium">
                Non Indexed
              </label>
              <div className="relative">
                <select
                  name="nonIndexed"
                  className={`appearance-none w-full rounded-lg border border-gray-400 px-4 py-3 outline-none cursor-pointer
                  ${
                    nonIndexedError
                      ? "border-red-500"
                      : "border-[hsla(0,2%,42%,1)] focus:border-blue-500"
                  }`}
                  value={formData.nonIndexed}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nonIndexed: e.target.value as NonIndexedType,
                    }))
                  }
                >
                  <option value="">Select non indexed type</option>
                  <option value="UNIVERSITY_BASED">University Based</option>
                  <option value="NON_UNIVERSITY_BASED">
                    Non-University Based
                  </option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <ChevronDown />
                </div>
              </div>
              {nonIndexedError && (
                <p className="text-red-500 text-sm">{nonIndexedError.msg}</p>
              )}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Classification
            </label>
            <div className="relative">
              <select
                name="classification"
                className={`appearance-none w-full rounded-lg border border-gray-400 px-4 py-3 outline-none cursor-pointer
                  ${
                    classificationError
                      ? "border-red-500"
                      : "border-[hsla(0,2%,42%,1)] focus:border-blue-500"
                  }`}
                value={formData.classification}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    classification: e.target.value as ClassificationType,
                  }))
                }
              >
                <option value="">Select classification</option>
                <option value="NATIONAL">National</option>
                <option value="INTERNATIONAL">International</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <ChevronDown />
              </div>
            </div>
            {classificationError && (
              <p className="text-red-500 text-sm">{classificationError.msg}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Upload File</label>

            <input
              ref={fileInputRef}
              type="file"
              id="file-upload"
              className="hidden"
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
              <>
                <p className="text-sm text-gray-600">
                  Selected:{" "}
                  <span className="font-medium">{formData.file.name}</span>
                </p>

                <p className="text-sm text-gray-600">
                  Size:{" "}
                  <span className="font-medium">
                    {(formData.file.size / (1024 * 1024)).toFixed(2)}MB
                  </span>
                </p>
              </>
            )}

            {fileError && (
              <p className="text-red-500 text-sm">{fileError.msg}</p>
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
