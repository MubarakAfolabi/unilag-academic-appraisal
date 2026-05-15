"use client";

import Link from "next/link";
import { LayoutGrid, CloudUpload, UserRound } from "lucide-react";

const navBarArr = [
  {
    name: "Dashboard",
    path: "/publisher",
    icon: <LayoutGrid size={18} />,
  },
  {
    name: "Upload",
    path: "/#",
    icon: <CloudUpload size={18} />,
  },
  {
    name: "User",
    path: "/#",
    icon: <UserRound size={18} />,
  },
];

import { usePathname } from "next/navigation";

export default function PublisherNavigationLayout() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <aside className="fixed bottom-0 left-0 right-0 bg-white p-2 border-t border-[hsla(0,0%,85%,1)]">
      <div className="md:hidden flex justify-between px-6">
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
    </aside>
  );
}
