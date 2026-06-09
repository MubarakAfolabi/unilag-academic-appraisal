"use client";

import { useState } from "react";

export default function ForgotPassword() {
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
    <>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950">
          LOGIN
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
                    onChange={(event) => setConfirmPassword(event.target.value)}
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
    </>
  );
}
