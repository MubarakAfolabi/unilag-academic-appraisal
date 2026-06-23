type Role = "VC" | "HRMD" | "PUBLISHER" | "ACCESSOR";

export type User = {
  firstname: string;
  lastname: string;
  title: string;
  email: string;
  role: Role;
  department: string;
  faculty: string;
  rank: string ;
  staffId: string;
  bio: string;
  phoneNo: string;
  dateJoined: string;
  avatar: string;
};

export const publisher: User = {
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

export const accessor: User = {
  firstname: "John",
  lastname: "Doe",
  title: "Mr.",
  email: "john.doe@example.com",
  role: "ACCESSOR",
  department: "Computer Science",
  faculty: "Science",
  rank: "Lecturer 1",
  staffId: "UL/CSC/2015/1123",
  bio: "Lecturer in the Department of Computer Science with research interests in Artificial Intelligence, Data Mining and Mobile Computing.",
  phoneNo: "0806 881 7702",
  dateJoined: "September 1, 2013",
  avatar: "/userAvatar_r.svg",
};

export const vc: User = {
  firstname: "Folashade",
  lastname: "T. Ogunsola",
  title: "Professor.",
  email: "folashade.ogunsola@example.com",
  role: "VC",
  department: "Computer Science",
  faculty: "Science",
  rank: "Professor",
  staffId: "UL/CSC/2015/1124",
  bio: "Professor in the Department of Computer Science with research interests in Artificial Intelligence, Data Mining and Mobile Computing.",
  phoneNo: "0806 881 7703",
  dateJoined: "September 1, 2010",
  avatar: "/userAvatar_r.svg",
};

export const hrmd: User = {
  firstname: "Emily",
  lastname: "Johnson",
  title: "Ms.",
  email: "emily.johnson@example.com",
  role: "HRMD",
  department: "Computer Science",
  faculty: "Science",
  rank: "Lecturer 1",
  staffId: "UL/CSC/2015/1125",
  bio: "Lecturer in the Department of Computer Science with research interests in Artificial Intelligence, Data Mining and Mobile Computing.",
  phoneNo: "0806 881 7704",
  dateJoined: "September 1, 2015",
  avatar: "/userAvatar_r.svg",
};
