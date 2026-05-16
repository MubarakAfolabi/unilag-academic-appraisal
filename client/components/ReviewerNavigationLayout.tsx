"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, FileText, UserRound, Bell } from "lucide-react";
import Image from "next/image";

const navBarArr = [
  {
    name: "Dashboard",
    path: "/reviewer",
    icon: <LayoutGrid size={18} />,
  },
  {
    name: "My Reviews",
    path: "/#",
    icon: <FileText size={18} />,
  },
  {
    name: "Profile",
    path: "/#",
    icon: <UserRound size={18} />,
  },
];

const sideBarArr = [
  {
    name: "Dashboard",
    path: "/reviewer",
    icon: <LayoutGrid />,
  },
  {
    name: "Reviews",
    path: "/#",
    icon: <FileText />,
  },
  {
    name: "Notifications",
    path: "/#",
    icon: <Bell />,
  },
  {
    name: "Profile",
    path: "/#",
    icon: <UserRound />,
  },
];

export default function ReviewerNavigationLayout() {
  const pathname = usePathname();

  return (
    <aside className=" fixed bottom-0 left-0 right-0 md:static flex-1 md:min-w-3xs md:max-w-sm bg-white p-2 border-t border-[hsla(0,0%,85%,1)] md:border-none md:bg-[hsla(194,53%,67%,1)] flex md:h-screen">
      <div className="md:hidden flex flex-1 justify-between px-6">
        {navBarArr.map((item, index) => {
          return (
            <Link
              href={item.path}
              key={index}
              className={`flex flex-col items-center gap-1 ${pathname === item.path ? "text-[hsla(210,79%,46%,1)]" : "text-[hsla(228,28%,29%,1)]"}  cursor-pointer`}
            >
              <div>{item.icon}</div>
              <p className="text-xs">{item.name}</p>
            </Link>
          );
        })}
      </div>

      <div className="hidden p-2 md:flex flex-col gap-15">
        <div className="flex gap-2 items-center">
          <Image
            src="/unilaglogo.svg"
            alt="UNILAG logo"
            width={50}
            height={50}
          />
          <div className="text-white">
            <h1 className="text-lg font-semibold">Unilag Academic Appraisal</h1>
            <p className="text-[hsla(0,2%,42%,1)]">Publisher&apos;s Portal</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {sideBarArr.map((item, index) => {
            return (
              <Link
                href={item.path}
                key={index}
                className={`flex items-center gap-4 text-white ${pathname === item.path ? "bg-[hsla(210,73%,64%,1)]" : ""} p-4 rounded-lg cursor-pointer`}
              >
                <div>{item.icon}</div>
                <p className="font-semibold">{item.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
