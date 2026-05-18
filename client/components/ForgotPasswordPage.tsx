"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type ForgotPasswordPageProps = {
  title: string;
  backLink: string;
  backText: string;
};

export default function ForgotPasswordPage({
  title,
  backLink,
  backText,
}: ForgotPasswordPageProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const canContinueEmail = email.trim().length > 0;
  const canContinueCode = code.every((digit) => digit.trim().length === 1);
  const canSubmitPassword =
    password.length >= 6 && password === confirmPassword;

  const updateCodeDigit = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const nextCode = [...code];
    nextCode[index] = value;
    setCode(nextCode);
  };

  const submitStep = () => {
    if (step === 1 && canContinueEmail) setStep(2);
    if (step === 2 && canContinueCode) setStep(3);
    if (step === 3 && canSubmitPassword) setSuccess(true);
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-6"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >
      <div className="w-full max-w-2xl rounded-sm bg-white/75 shadow-2xl ring-1 ring-white/40 backdrop-blur-md">
        <div className="px-6 py-4 md:px-10 flex flex-col gap-4">
          <div className="flex justify-center">
            <div className="relative h-50 w-50">
              <Image
                src="/unilaglogo.svg"
                alt="Company Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 128px, 128px"
              />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950">
              {title}
            </h2>
            <p className="text-sm text-slate-600">
              {step === 1 && "A code will be sent to your email."}
              {step === 2 &&
                "Enter the four digit code sent to the email provided."}
              {step === 3 && "Create a new password for your account."}
              {success && "Your password has been updated successfully."}
            </p>
          </div>

          <form
            className="flex flex-col gap-2"
            onSubmit={(event) => event.preventDefault()}
          >
            {!success && (
              <>
                {step === 1 && (
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-900">
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-md bg-[hsla(203,100%,89%,1)] p-3 text-md text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-400"
                    />
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <label className="flex justify-center gap-4">
                      {code.map((digit, index) => (
                        <input
                          key={index}
                          value={digit}
                          onChange={(event) =>
                            updateCodeDigit(index, event.target.value)
                          }
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          className="h-14 w-14 rounded-md border border-sky-200 bg-[hsla(203,100%,89%,1)] text-center text-2xl font-semibold text-slate-900 outline-none focus:border-sky-400"
                        />
                      ))}
                    </label>
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-slate-900">
                        Enter New Password
                      </label>
                      <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="Enter new password"
                        className="w-full rounded-md bg-[hsla(203,100%,89%,1)] p-3 text-md text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-400"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-slate-900">
                        Confirm New Password
                      </label>
                      <input
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full rounded-md bg-[hsla(203,100%,89%,1)] p-3 text-md text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-400"
                      />
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    onClick={submitStep}
                    disabled={
                      (step === 1 && !canContinueEmail) ||
                      (step === 2 && !canContinueCode) ||
                      (step === 3 && !canSubmitPassword)
                    }
                    className="w-full rounded-md bg-rose-700 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-rose-300 cursor-pointer"
                  >
                    {step < 3 ? "Continue" : "Reset Password"}
                  </button>
                </div>
              </>
            )}

            {success && (
              <div className="rounded-sm border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                Your password has been reset. You can now return to login.
              </div>
            )}
          </form>

          <div className="text-center text-sm text-slate-800">
            <Link href={backLink} className="font-medium hover:underline">
              {backText}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
