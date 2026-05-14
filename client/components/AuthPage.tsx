"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

type AuthPageProps = {
  title: string;
  footerLink: string;
  forgotLink: string;
};

export default function AuthPage({
  title,
  footerLink,
  forgotLink,
}: AuthPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const role = footerLink.startsWith("/login-publisher")
    ? "REVIEWER"
    : "PUBLISHER";
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${apiUrl}/api/${role}/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponseData(data);
      });
  };

  useEffect(() => {
    if (responseData?.success) {
      localStorage.setItem("token", responseData.token);
      router.replace("/dashboard");
    }
  }, [responseData]);

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-6"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >
      <div className="w-full max-w-2xl rounded-sm bg-white/75 shadow-2xl ring-1 ring-white/40 backdrop-blur-md">
        <div className="px-6 py-4 md:px-10 flex flex-col gap-2">
          <div className="flex justify-center">
            <div className="relative h-50 w-50">
              <Image
                src="/unilaglogo.svg"
                alt="Company Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 140px, 140px"
              />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950">
              {title}
            </h2>
            <p className="text-sm text-slate-600">Enter Login Details Here</p>
          </div>

          {!responseData?.success && (
            <aside className="text-red-500 text-center">
              {responseData?.message}
            </aside>
          )}

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-900">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md bg-[hsla(203,100%,89%,1)] p-3 text-md text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-900">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
                href={forgotLink}
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

          {footerLink.startsWith("/login-reviewer") ? (
            <div className="flex gap-2 items-center">
              <p className="text-sm">Are you a reviewer?</p>
              <Link href={footerLink} className="text-sm font-bold underline">
                Reviewer Login
              </Link>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <p className="text-sm">Are you a publisher?</p>
              <Link href={footerLink} className="text-sm font-bold underline">
                Publisher Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
