"use client";

import { useEffect, useRef, useState } from "react";
import { Check, SquarePen, UserRound } from "lucide-react";
import { User } from "@/constant/user";

type infoProps = {
  user: User;
};

export default function PersonalInfoCard({ user }: infoProps) {
  const [edit, setEdit] = useState(false);

  const [info, setInfo] = useState(
    "Lecturer in the Department of Computer Science with research interests in Artificial Intelligence, Data Mining and Mobile Computing.",
  );

  const [phone, setPhone] = useState("0803 123 4567");
  const [department, setDepartment] = useState("Computer Science");
  const [faculty, setFaculty] = useState("Science");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [info, edit]);

  const profileFields = [
    { label: "Full Name", value: "Dr. Alex Johnson", editable: false },
    { label: "Staff ID", value: "UL/CSC/2015/1122", editable: false },
    { label: "Email", value: "alex.johnson@gmail.com", editable: false },
    { label: "Phone", value: phone, editable: true, setter: setPhone },
    {
      label: "Department",
      value: department,
      editable: true,
      setter: setDepartment,
    },
    { label: "Faculty", value: faculty, editable: true, setter: setFaculty },
    { label: "Rank", value: "Lecturer I", editable: false },
    { label: "Date Joined", value: "September 1, 2015", editable: false },
  ] as const;

  const handleSave = () => {
    setEdit(false);
  };

  return (
    <div className="rounded-xl p-4 border border-solid border-[hsla(0,0%,85%,1)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600">
          <UserRound className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Personal Information</h3>
        </div>

        <button
          onClick={() => (edit ? handleSave() : setEdit(true))}
          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
          aria-label={edit ? "Save changes" : "Edit profile"}
        >
          {edit ? (
            <Check className="h-5 w-5" />
          ) : (
            <SquarePen className="h-5 w-5" />
          )}
        </button>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-slate-900">About Me</h4>

        {edit ? (
          <textarea
            ref={textareaRef}
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="min-h-[80px] w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm leading-relaxed text-slate-700 outline-none focus:border-blue-500"
          />
        ) : (
          <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-relaxed text-slate-700">
            {info}
          </p>
        )}
      </div>

      <div className="h-px w-full bg-[hsla(0,0%,85%,1)]"></div>

      <div className="space-y-3">
        {profileFields.map((field) => (
          <div key={field.label} className="grid grid-cols-[140px_1fr] gap-3">
            <p className="font-semibold text-slate-900">{field.label}:</p>

            {edit && field.editable ? (
              <input
                type="text"
                value={field.value}
                onChange={(e) => field.setter?.(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
              />
            ) : (
              <p className="text-slate-600">{field.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
