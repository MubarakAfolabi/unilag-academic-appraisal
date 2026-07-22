"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid,UserRoundPlus, LogOut } from "lucide-react";
import LogoutModal from "@/components/LogoutModal";
import Image from "next/image";
import { useState } from "react";

const navBarArr = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutGrid size={18} />,
  },
  {
    name: "Assignment",
    path: "/dashboard/h/designate",
    icon: <UserRoundPlus size={18} />,
  }
];

const sideBarArr = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutGrid />,
  },
  {
    name: "Assignment",
    path: "/dashboard/h/designate",
    icon: <UserRoundPlus />,
  },
  {
    name: "Logout",
    path: "/#",
    icon: <LogOut />,
    onClick: (setModal: (open: boolean) => void) => setModal(true),
  },
];

export default function HRMDNavigationLayout() {
  const pathname = usePathname();
  const [modal, setModal] = useState(false);

  return (
    <aside className=" fixed bottom-0 left-0 right-0 md:static flex-1 md:min-w-3xs md:max-w-sm bg-white p-2 border-t border-[hsla(0,0%,85%,1)] md:border-none md:bg-[hsla(194,53%,67%,1)] flex md:h-screen">
      {" "}
      {modal && <LogoutModal onClose={() => setModal(false)} />}
      <div className="md:hidden flex flex-1 justify-evenly gap-2 px-6">
        {navBarArr.map((item, index) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link
              href={item.path}
              key={index}
              className={`flex flex-col items-center gap-1 ${isActive ? "text-[hsla(210,79%,46%,1)]" : "text-[hsla(228,28%,29%,1)]"}  cursor-pointer`}
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
            <p className="text-[hsla(0,2%,42%,1)]">
              Human Resource Management and Development&apos;s Portal
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {sideBarArr.map((item, index) => {
            const isActive = item.path !== "/#" && pathname.startsWith(item.path);
            const baseStyles = `flex items-center gap-4 text-white w-full p-4 rounded-lg transition-all text-left font-semibold ${
               isActive ? "bg-[hsla(210,73%,64%,1)] shadow-sm" : "hover:bg-white/10"
            }`;

            if (item.onClick) {
              return (
                <button
                  key={index}
                  onClick={() => item.onClick!(setModal)}
                  className={`${baseStyles} cursor-pointer border-none bg-transparent`}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  <p>{item.name}</p>
                </button>
              );
            }
            return (
              <Link
                href={item.path}
                key={index}
                className={`flex items-center gap-4 text-white ${pathname.startsWith(item.path) ? "bg-[hsla(210,73%,64%,1)]" : ""} p-4 rounded-lg cursor-pointer`}
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
