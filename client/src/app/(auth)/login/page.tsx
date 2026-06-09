"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950">
          LOGIN
        </h2>
        <p className="text-sm text-slate-600">Enter Login Details Here</p>
      </div>

      <form className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-900">
            Staff ID
          </label>
          <input
            type="text"
            className="w-full rounded-md bg-[hsla(203,100%,89%,1)] p-3 text-md text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-400"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-900">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-md bg-[hsla(203,100%,89%,1)] p-3 text-md text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 grid place-items-center text-slate-600"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <Link
            href="/login/forgot-password"
            className="text-sm text-slate-600 hover:text-slate-950"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="rounded-md bg-rose-700 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-rose-600 cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}
