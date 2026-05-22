"use client";

import { UserRound, SquarePen, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function PersonalInfoCard() {
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState(
    " Lecturer in the Department of Computer Science with research interests in Artificial Intelligence, Data Mining and Mobile Computing.",
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [info]);

  return (
    <div className="border border-solid border-[hsla(0,0%,85%,1)] p-4 rounded-xl flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center justify-between text-[hsla(216,59%,54%,1)]">
          <div className="flex items-center gap-2">
            <div>
              <UserRound />
            </div>
            <p className="font-semibold">Personal Information</p>
          </div>
          {edit ? (
            <button className="cursor-pointer" onClick={() => setEdit(false)}>
              <Check />
            </button>
          ) : (
            <button
              className="cursor-pointer"
              onClick={() => setEdit((prev) => !prev)}
            >
              <SquarePen />
            </button>
          )}
        </div>

        <div>
          {edit ? (
            <textarea
              ref={textareaRef}
              className="border border-[hsla(0,0%,85%,1)] w-full min-h-10 max-h-75 rounded-md outline-none px-3 py-2 resize-none leading-relaxed"
              value={info}
              onChange={(e) => {
                setInfo(e.target.value);
                adjustHeight();
              }}
            />
          ) : (
            <div>
              {info.trim().length > 0 ? (
                <p className="text-[hsla(215,28%,37%,1)]">{info}</p>
              ) : (
                <p className="text-[hsla(215,28%,37%,1)] text-sm text-center">
                  No Bio
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <hr className="border-solid border-[hsla(0,0%,85%,1)]" />

      <ul className="flex flex-col gap-4">
        <li className="flex">
          <p className="flex-1 font-semibold">Full Name:</p>
          <p className="flex-1 text-[hsla(215,28%,37%,1)]">Dr. Alex Johnson</p>
        </li>
        <li className="flex">
          <p className="flex-1 font-semibold">Staff ID:</p>
          <p className="flex-1 text-[hsla(215,28%,37%,1)]">UL/CSC/2015/1122</p>
        </li>
        <li className="flex">
          <p className="flex-1 font-semibold">Email:</p>
          <p className="flex-1 text-[hsla(215,28%,37%,1)]">
            alex.johnson@gmail.com
          </p>
        </li>
        <li className="flex">
          <p className="flex-1 font-semibold">Phone:</p>
          <p className="flex-1 text-[hsla(215,28%,37%,1)]">0803 123 4567</p>
        </li>
        <li className="flex">
          <p className="flex-1 font-semibold">Department:</p>
          <p className="flex-1 text-[hsla(215,28%,37%,1)]">Computer Science</p>
        </li>
        <li className="flex">
          <p className="flex-1 font-semibold">Faculty:</p>
          <p className="flex-1 text-[hsla(215,28%,37%,1)]">Science</p>
        </li>
        <li className="flex">
          <p className="flex-1 font-semibold">Rank:</p>
          <p className="flex-1 text-[hsla(215,28%,37%,1)]">Lecturer I</p>
        </li>
        <li className="flex">
          <p className="flex-1 font-semibold">Date Joined:</p>
          <p className="flex-1 text-[hsla(215,28%,37%,1)]">Septemper 1, 2015</p>
        </li>
      </ul>
    </div>
  );
}
