type Role = "VC" | "HRMD" | "PUBLISHER" | "ACCESSOR";

type User = {
  firstname: string;
  lastname: string;
  title: string;
  email: string;
  role: Role;
  avatar: string;
};

export const user: User = {
  firstname: "Idris",
  lastname: "Mubarak",
  title: "Dr.",
  email: "mubarakbolu150@gmail.com",
  role: "VC",
  avatar: "/profile-pic.svg",
};
