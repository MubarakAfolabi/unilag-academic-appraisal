"use client";

import { useState, useRef, useEffect } from "react";
import LogoutModal from "@/components/LogoutModal";
import Image from "next/image";
import { useUser } from "@/context/userContext";
import { LogOut, ShieldCheck } from "lucide-react";
import type { User } from "@/constant/user";

export default function profileEditPage() {
  const [modal, setModal] = useState(false);
  const { user, setUser } = useUser();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [user.bio]);

  const initialUser: User = { ...user };

  return (
    <section className="md:h-full md:overflow-y-auto flex-2 flex flex-col pb-4 gap-6 mb-15 md:p-0 md:pb-6">
      {modal && <LogoutModal onClose={() => setModal(false)} />}
      <div className="flex items-center justify-between border-b border-[hsla(0,0%,85%,1)] p-4">
        <div className="flex-1 flex items-center gap-2">
          <div>
            <Image
              src="/unilaglogo.svg"
              alt="UNILAG logo"
              width={50}
              height={50}
            />
          </div>

          <div>
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
              Edit Profile
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4 md:hiddenz">
          <button
            className="border-solid border border-[hsla(0,0%,85%,1)] p-1 rounded-md cursor-pointer"
            onClick={() => setModal(true)}
          >
            <LogOut size={22} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:p-4">
        <div className="p-4 lg:p-8 flex lg:flex-col lg:justify-start lg:h-fit justify-between items-center gap-2 border border-[hsla(0,0%,85%,1)] mx-4 rounded-xl">
          <div>
            <Image
              src={user.avatar}
              alt="Profile Picture"
              width={120}
              height={120}
            />
          </div>
          <div className="flex flex-col lg:items-center lg:gap-2">
            <p className="font-bold text-xl">
              {user.title} {user.firstname} {user.lastname}
            </p>
            <p className="text-[hsla(217,80%,48%,1)]">
              {user.role.toLowerCase()}
            </p>
            <p className="text-[hsla(215,28%,37%,1)]">
              Department of {user.department}
            </p>
            <p className="text-[hsla(215,28%,37%,1)]">University of Lagos</p>
            <p className="text-[hsla(215,28%,37%,1)] lg:hidden">
              Date Joined: {user.dateJoined}
            </p>

            <div className="flex items-center gap-2 bg-[hsla(153,28%,92%,1)] text-[hsla(217,80%,48%,1)] w-fit lg:w-full lg:justify-evenly p-2 rounded-xl">
              <div>
                <ShieldCheck size={30} />
              </div>
              <div>
                <p>Staff ID</p>
                <p>{user.staffId}</p>
              </div>
            </div>

            <div className="h-px w-full bg-[hsla(0,0%,85%,1)] my-2 hidden lg:block"></div>

            <p className="text-[hsla(215,28%,37%,1)] hidden lg:block">
              Date Joined: {user.dateJoined}
            </p>
          </div>
        </div>

        <form className="flex flex-col gap-6 lg:flex-1">
          <div className="flex flex-col gap-4 p-2 lg:p-8 border border-[hsla(0,0%,85%,1)] mx-4 rounded-xl">
            <h3 className="text-lg text-[hsla(217,80%,48%,1)] font-semibold">
              Personal Information
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label>First Name:</label>
                <input
                  type="text"
                  className=" rounded-lg border border-[hsla(0,2%,42%,1)] p-2 outline-none focus:border-blue-500"
                  value={user.firstname}
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      firstname: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <label>Last Name:</label>
                <input
                  type="text"
                  className=" rounded-lg border border-[hsla(0,2%,42%,1)] p-2 outline-none focus:border-blue-500"
                  value={user.lastname}
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      lastname: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <label>Phone:</label>
                <input
                  type="text"
                  className=" rounded-lg border border-[hsla(0,2%,42%,1)] p-2 outline-none focus:border-blue-500"
                  value={user.phoneNo}
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      phoneNo: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <label>Department:</label>
                <input
                  type="text"
                  className=" rounded-lg border border-[hsla(0,2%,42%,1)] p-2 outline-none focus:border-blue-500"
                  value={user.department}
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      department: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <label>Faculty:</label>
                <input
                  type="text"
                  className=" rounded-lg border border-[hsla(0,2%,42%,1)] p-2 outline-none focus:border-blue-500"
                  value={user.faculty}
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      faculty: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <label>Rank:</label>
                <input
                  type="text"
                  className=" rounded-lg border border-[hsla(0,2%,42%,1)] p-2 outline-none focus:border-blue-500"
                  value={user.rank}
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      rank: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-2 lg:p-8 border border-[hsla(0,0%,85%,1)] mx-4 rounded-xl">
            <h3 className="text-lg text-[hsla(217,80%,48%,1)] font-semibold">
              Change Password
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label>Password:</label>
                <input
                  type="password"
                  className=" rounded-lg border border-[hsla(0,2%,42%,1)] p-2 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  className=" rounded-lg border border-[hsla(0,2%,42%,1)] p-2 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label>New Password:</label>
                <input
                  type="password"
                  className=" rounded-lg border border-[hsla(0,2%,42%,1)] p-2 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-2 lg:p-8 border border-[hsla(0,0%,85%,1)] mx-4 rounded-xl">
            <h3 className="text-lg text-[hsla(217,80%,48%,1)] font-semibold">
              About Me
            </h3>
            <textarea
              ref={textareaRef}
              value={user.bio}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }))
              }
              className="min-h-12.5 w-full resize-none rounded-xl border border-[hsla(0,2%,42%,1)] bg-white px-3 py-2 leading-relaxed outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-between items-center mx-4 lg:justify-start lg:self-end gap-4">
            <button className="border border-[hsla(0,2%,42%,1)] text-[hsla(224,17%,43%,1)] px-4 py-1 lg:px-6 lg:py-2 cursor-pointer rounded-md">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[hsla(217,80%,48%,1)] text-white px-4 py-1 lg:px-6 lg:py-2 cursor-pointer rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
