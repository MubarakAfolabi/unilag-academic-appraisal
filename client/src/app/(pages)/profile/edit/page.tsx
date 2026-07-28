"use client";

import { useState, useRef, useEffect } from "react";
import LogoutModal from "@/components/LogoutModal";
import Image from "next/image";
import { useUser } from "@/context/userContext";
import { LogOut, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useLayout } from "@/context/layoutContext";
import AlertPopup from "@/components/AlertPopup";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ProfileEditPage() {
  const { user, setUser, token } = useUser();
  const [initialUser, setInitialUser] = useState(user);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { logOutModal, setLogOutModal } = useLayout();
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayNewPassword, setDisplayNewPassword] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleProfileUpdate = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${apiUrl}/api/users/me`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...initialUser,
        password,
        newPassword,
        confirmNewPassword,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.errMessages) {
          setErrors(data.errMessages);
        }

        if (data?.success) {
          setUser(initialUser);
          setErrors([]);
          setShowAlert(true);
          setAlertType("success");
          setPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        }
      })
      .catch(() => {
        setShowAlert(true);
        setAlertType("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    adjustHeight();
  }, [initialUser?.bio]);

  useEffect(() => {
    if (!showAlert) return;

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showAlert]);

  const firstnameError = errors.find((error) => error.path === "firstname");
  const lastnameError = errors.find((error) => error.path === "lastname");
  const bioError = errors.find((error) => error.path === "bio");
  const passwordError = errors.find((error) => error.path === "password");
  const newPasswordError = errors.find((error) => error.path === "newPassword");
  const confirmNewPasswordError = errors.find(
    (error) => error.path === "confirmNewPassword",
  );

  useEffect(() => {
    if (firstnameError || lastnameError) {
      if (window.innerWidth >= 768) {
        sectionRef.current?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, [firstnameError, lastnameError]);

  return (
    <section
      ref={sectionRef}
      className="md:h-full md:overflow-y-auto flex-2 flex flex-col pb-4 gap-6 mb-15 md:p-0 md:pb-6"
    >
      {logOutModal && <LogoutModal onClose={() => setLogOutModal(false)} />}

      {showAlert &&
        (alertType === "success" ? (
          <AlertPopup
            type="success"
            message="Profile Updated Successfully"
            onClose={() => setShowAlert(false)}
          />
        ) : (
          <AlertPopup
            type="error"
            message="Something went wrong, try again"
            onClose={() => setShowAlert(false)}
          />
        ))}

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

        <div className="flex items-center gap-4 md:hidden">
          <button
            className="border-solid border border-[hsla(0,0%,85%,1)] p-1 rounded-md cursor-pointer"
            onClick={() => setLogOutModal(true)}
          >
            <LogOut size={22} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:p-4">
        <div className="p-4 lg:p-8 flex lg:flex-col lg:justify-start lg:h-fit justify-between items-center gap-2 border border-[hsla(0,0%,85%,1)] mx-4 rounded-xl">
          <div>
            <Image
              src={initialUser?.avatar || "/profile-pic.svg"}
              alt="Profile Picture"
              width={120}
              height={120}
            />
          </div>
          <div className="flex flex-col lg:items-center lg:gap-2">
            <p className="font-bold text-xl">
              {initialUser?.title} {initialUser?.firstname}{" "}
              {initialUser?.lastname}
            </p>
            <p className="text-[hsla(217,80%,48%,1)]">
              {initialUser?.role.toLowerCase()}
            </p>
            <p className="text-[hsla(215,28%,37%,1)]">
              Department of {initialUser?.department}
            </p>
            <p className="text-[hsla(215,28%,37%,1)]">University of Lagos</p>
            <p className="text-[hsla(215,28%,37%,1)] lg:hidden">
              Date Joined: {initialUser?.dateJoined}
            </p>

            <div className="flex items-center gap-2 bg-[hsla(153,28%,92%,1)] text-[hsla(217,80%,48%,1)] w-fit lg:w-full lg:justify-evenly p-2 rounded-xl">
              <div>
                <ShieldCheck size={30} />
              </div>
              <div>
                <p>Staff ID</p>
                <p>{initialUser?.staffId}</p>
              </div>
            </div>

            <div className="h-px w-full bg-[hsla(0,0%,85%,1)] my-2 hidden lg:block"></div>

            <p className="text-[hsla(215,28%,37%,1)] hidden lg:block">
              Date Joined: {initialUser?.dateJoined}
            </p>
          </div>
        </div>

        <form
          className="flex flex-col gap-6 lg:flex-1"
          onSubmit={handleProfileUpdate}
        >
          <div className="flex flex-col gap-4 p-2 lg:p-8 border border-[hsla(0,0%,85%,1)] mx-4 rounded-xl">
            <h3 className="text-lg text-[hsla(217,80%,48%,1)] font-semibold">
              Personal Information
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label>First Name:</label>
                <input
                  type="text"
                  className={`rounded-lg border p-2 outline-none ${
                    firstnameError
                      ? "border-red-500"
                      : "border-[hsla(0,2%,42%,1)] focus:border-blue-500"
                  }`}
                  value={initialUser?.firstname}
                  onChange={(e) =>
                    setInitialUser((prev) => {
                      if (!prev) {
                        return null;
                      }
                      return { ...prev, firstname: e.target.value };
                    })
                  }
                />
                {firstnameError && (
                  <p className="text-red-500 text-sm">{firstnameError.msg}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label>Last Name:</label>
                <input
                  type="text"
                  className={`rounded-lg border p-2 outline-none ${
                    lastnameError
                      ? "border-red-500"
                      : "border-[hsla(0,2%,42%,1)] focus:border-blue-500"
                  }`}
                  value={initialUser?.lastname}
                  onChange={(e) =>
                    setInitialUser((prev) => {
                      if (!prev) {
                        return null;
                      }
                      return { ...prev, lastname: e.target.value };
                    })
                  }
                />
                {lastnameError && (
                  <p className="text-red-500 text-sm">{lastnameError.msg}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label>Phone:</label>
                <input
                  type="text"
                  className=" rounded-lg border border-[hsla(0,2%,42%,1)] p-2 outline-none focus:border-blue-500"
                  value={initialUser?.phoneNo ?? ""}
                  onChange={(e) =>
                    setInitialUser((prev) => {
                      if (!prev) {
                        return null;
                      }
                      return { ...prev, phoneNo: e.target.value };
                    })
                  }
                />
              </div>

              <div className="flex flex-col">
                <label>Department:</label>

                <select
                  className="border p-2 rounded outline-none focus:border-blue-500 cursor-pointer"
                  value={initialUser?.department ?? ""}
                  onChange={(e) =>
                    setInitialUser((prev) => {
                      if (!prev) {
                        return null;
                      }
                      return { ...prev, department: e.target.value };
                    })
                  }
                >
                  {!initialUser?.department && (
                    <option value="">Select Department</option>
                  )}
                  <option value="Computer Science">Computer Science</option>
                  <option value="Industrial Maths">Industrial Maths</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label>Faculty:</label>

                <select
                  className="border p-2 rounded outline-none focus:border-blue-500 cursor-pointer"
                  value={initialUser?.faculty ?? ""}
                  onChange={(e) =>
                    setInitialUser((prev) => {
                      if (!prev) {
                        return null;
                      }
                      return { ...prev, faculty: e.target.value };
                    })
                  }
                >
                  {!initialUser?.faculty && (
                    <option value="">Select Faculty</option>
                  )}
                  <option value="Science">Science</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label>Rank:</label>

                <select
                  className="border p-2 rounded outline-none focus:border-blue-500 cursor-pointer"
                  value={initialUser?.rank ?? ""}
                  onChange={(e) =>
                    setInitialUser((prev) => {
                      if (!prev) {
                        return null;
                      }
                      return { ...prev, rank: e.target.value };
                    })
                  }
                >
                  {!initialUser?.rank && <option value="">Select Rank</option>}
                  <option value="Lecturer I">Lecturer I</option>
                  <option value="Lecturer II">Lecturer II</option>
                  <option value="Lecturer III">Lecturer III</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-2 lg:p-8 border border-[hsla(0,0%,85%,1)] mx-4 rounded-xl">
            <h3 className="text-lg text-[hsla(217,80%,48%,1)] font-semibold">
              About Me
            </h3>
            <div>
              <textarea
                ref={textareaRef}
                value={initialUser?.bio ?? ""}
                onChange={(e) =>
                  setInitialUser((prev) => {
                    if (!prev) {
                      return null;
                    }
                    return { ...prev, bio: e.target.value };
                  })
                }
                className={`min-h-12.5 w-full resize-none rounded-xl border border-[hsla(0,2%,42%,1)] bg-white px-3 py-2 leading-relaxed outline-none
                ${
                  bioError
                    ? "border-red-500"
                    : "border-[hsla(0,2%,42%,1)] focus:border-blue-500"
                }
                `}
              />

              {bioError && (
                <p className="text-red-500 text-sm">{bioError.msg}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 p-2 lg:p-8 border border-[hsla(0,0%,85%,1)] mx-4 rounded-xl">
            <h3 className="text-lg text-[hsla(217,80%,48%,1)] font-semibold">
              Change Password
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label>Password:</label>
                <div
                  className={`flex justify-between items-center rounded-lg border p-2 ${
                    passwordError
                      ? "border-red-500"
                      : "border-[hsla(0,2%,42%,1)] focus-within:border-blue-500"
                  }`}
                >
                  <input
                    className="flex-1 outline-none"
                    type={displayPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {displayPassword ? (
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => setDisplayPassword((prev) => !prev)}
                    >
                      <EyeOff size={20} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => setDisplayPassword((prev) => !prev)}
                    >
                      <Eye size={20} />
                    </button>
                  )}
                </div>

                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError.msg}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label>New Password:</label>
                <div
                  className={`flex justify-between items-center rounded-lg border p-2 outline-none ${
                    newPasswordError
                      ? "border-red-500"
                      : "border-[hsla(0,2%,42%,1)] focus:border-blue-500"
                  }`}
                >
                  <input
                    className="flex-1 outline-none"
                    type={displayNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  {displayNewPassword ? (
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => setDisplayNewPassword((prev) => !prev)}
                    >
                      <EyeOff size={20} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => setDisplayNewPassword((prev) => !prev)}
                    >
                      <Eye size={20} />
                    </button>
                  )}
                </div>

                {newPasswordError && (
                  <p className="text-red-500 text-sm">{newPasswordError.msg}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label>Confirm New Password:</label>
                <input
                  type="password"
                  className={`rounded-lg border p-2 outline-none ${
                    confirmNewPasswordError
                      ? "border-red-500"
                      : "border-[hsla(0,2%,42%,1)] focus:border-blue-500"
                  }`}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                {confirmNewPasswordError && (
                  <p className="text-red-500 text-sm">
                    {confirmNewPasswordError.msg}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mx-4 lg:justify-start lg:self-end gap-4">
            <button
              className="border border-[hsla(0,2%,42%,1)] text-[hsla(224,17%,43%,1)] px-4 py-1 lg:px-6 lg:py-2 cursor-pointer rounded-md"
              type="button"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="bg-[hsla(217,80%,48%,1)] text-white px-4 py-1 lg:px-6 lg:py-2 cursor-pointer rounded-md"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
