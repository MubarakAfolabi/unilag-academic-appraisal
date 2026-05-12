"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

type AuthPageProps = {
  title: string;
  footerText: string;
  footerLink: string;
};

export default function AuthPage({ title, footerText, footerLink }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-6"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >
      <div className="w-full max-w-2xl rounded-sm bg-white/75 shadow-2xl ring-1 ring-white/40 backdrop-blur-md">
        <div className="px-6 py-6 md:px-10">
          <Link
            href="/"
            className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex justify-center">
            <div className="mb-4 relative h-32 w-32">
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
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950">{title}</h2>
            <p className="mt-1 text-xs md:text-sm text-slate-600">Enter Login Details Here</p>
          </div>

          <form className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-900">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 w-full rounded-sm border border-sky-200 bg-sky-100 px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-900">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-sm border border-sky-200 bg-sky-100 px-4 pr-12 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 grid place-items-center text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <a href="#" className="text-xs text-slate-600 hover:text-slate-950">
                Forgot Password?
              </a>
              <button
                type="button"
                className="rounded-md bg-rose-700 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-rose-600"
              >
                Login
              </button>
            </div>
          </form>

          <Link
            href={footerLink}
            className="mt-6 inline-block text-left text-xs font-medium text-slate-800 hover:underline"
          >
            {footerText}
          </Link>
        </div>
      </div>
    </main>
  );
}
