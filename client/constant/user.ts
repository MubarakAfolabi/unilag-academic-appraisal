type Role = "VC" | "HRMD" | "PUBLISHER" | "ACCESSOR";

export type User = {
  firstname: string;
  lastname: string;
  title: string;
  email: string;
  role: Role;
  department: string;
  faculty: string;
  rank: string;
  staffId: string;
  bio: string;
  phoneNo: string;
  dateJoined: string;
  avatar: string;
};

export const user: User = {
  firstname: "Idris",
  lastname: "Mubarak",
  title: "Dr.",
  email: "mubarakbolu150@gmail.com",
  role: "PUBLISHER",
  department: "Computer Science",
  faculty: "Science",
  rank: "Lecturer 1",
  staffId: "UL/CSC/2015/1122",
  bio: "Lecturer in the Department of Computer Science with research interests in Artificial Intelligence, Data Mining and Mobile Computing.",
  phoneNo: "0806 881 7701",
  dateJoined: "September 1, 2015",
  avatar: "/profile-pic.svg",
};
