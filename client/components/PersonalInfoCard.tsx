"use client";

import { SquarePen, UserRound } from "lucide-react";
import { User } from "@/constant/user";
import Link from "next/link";

type infoProps = {
  user: User;
};

export default function PersonalInfoCard({ user }: infoProps) {
  // const [phone, setPhone] = useState("0803 123 4567");
  // const [department, setDepartment] = useState("Computer Science");
  // const [faculty, setFaculty] = useState("Science");

  // const textareaRef = useRef<HTMLTextAreaElement>(null);

  // const adjustHeight = () => {
  //   const textarea = textareaRef.current;
  //   if (!textarea) return;
  //   textarea.style.height = "auto";
  //   textarea.style.height = `${textarea.scrollHeight}px`;
  // };

  // useEffect(() => {
  //   adjustHeight();
  // }, [info, edit]);

  return (
    <div className="rounded-xl p-4 border border-solid border-[hsla(0,0%,85%,1)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600">
          <UserRound className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Personal Information</h3>
        </div>

        <Link
          href="/profile/edit"
          className="flex items-center gap-2 rounded-lg p-2 text-blue-600 transition bg-blue-50 cursor-pointer"
          aria-label="Edit profile"
        >
          <SquarePen className="h-5 w-5" />
          <p className="hidden md:block text-lg">Edit</p>
        </Link>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-slate-900">About Me</h4>
        <p className="text-sm text-[hsla(215,28%,37%,1)]">{user.bio}</p>

        {/* {edit ? (
          <textarea
            ref={textareaRef}
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="min-h-[80px] w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm leading-relaxed text-slate-700 outline-none focus:border-blue-500"
          />
        ) : (
          <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-relaxed text-slate-700">
            {info}
          </p>
        )} */}
      </div>

      <div className="h-px w-full bg-[hsla(0,0%,85%,1)]"></div>

      <ul className="flex flex-col gap-2">
        <li className="flex">
          <p className="font-semibold flex-1">Full Name:</p>
          <p className="text-slate-700 flex-1">
            {user.title} {user.firstname} {user.lastname}
          </p>
        </li>
        <li className="flex">
          <p className="font-semibold flex-1">Staff ID:</p>
          <p className="text-slate-700 flex-1">{user.staffId}</p>
        </li>
        <li className="flex">
          <p className="font-semibold flex-1">Email:</p>
          <p className="text-slate-700 flex-1">{user.email}</p>
        </li>
        <li className="flex">
          <p className="font-semibold flex-1">Phone:</p>
          <p className="text-slate-700 flex-1">{user.phoneNo}</p>
        </li>
        <li className="flex">
          <p className="font-semibold flex-1">Department:</p>
          <p className="text-slate-700 flex-1">{user.department}</p>
        </li>
        <li className="flex">
          <p className="font-semibold flex-1">Faculty:</p>
          <p className="text-slate-700 flex-1">{user.faculty}</p>
        </li>
        <li className="flex">
          <p className="font-semibold flex-1">Rank:</p>
          <p className="text-slate-700 flex-1">{user.rank}</p>
        </li>
        <li className="flex">
          <p className="font-semibold flex-1">Date Joined:</p>
          <p className="text-slate-700 flex-1">{user.dateJoined}</p>
        </li>
      </ul>
    </div>
  );
}
