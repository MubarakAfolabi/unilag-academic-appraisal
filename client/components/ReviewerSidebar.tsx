"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    path: "/reviewer",
    icon: "/dashboard-icons/house.svg",
  },
  {
    name: "My Reviews",
    path: "/reviewer/reviews",
    icon: "/dashboard-icons/file-white.svg",
  },
  {
    name: "Notifications",
    path: "/reviewer/notification",
    icon: "/dashboard-icons/white-bell.svg",
  },
  {
    name: "Profile",
    path: "/reviewer/profile",
    icon: "/dashboard-icons/user-round.svg",
  },
];

export default function ReviewerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-[280px] bg-[#8ec6dc] text-white p-6">
      <div className="flex items-center gap-3 mb-10">
        <img
          src="/unilaglogo.ico" 
          alt="logo"
          className="w-14 h-14"
        />

        <div>
          <h1 className="font-bold text-lg leading-tight">
            Unilag Academic Appraisal
          </h1>
          <p className="text-sm opacity-80 text-[#8B4513]">Reviewer’s Portal</p>
        </div>
      </div>

      <nav className="space-y-4">
        {menuItems.map((item) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                active
                  ? "bg-[#5ba3f5] text-white"
                  : "hover:bg-[#78b9d2]"
              }`}
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-6 h-6"
              />

              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}

        <button className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-[#78b9d2] w-full mt-10">
          <img
            src="/dashboard-icons/log-out.svg"
            alt="logout"
            className="w-6 h-6"
          />

          <span className="font-medium">Logout</span>
        </button>
      </nav>
    </aside>
  );
}