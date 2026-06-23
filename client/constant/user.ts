type Role = "VC" | "HRMD" | "PUBLISHER" | "ACCESSOR";

export type User = {
  firstname: string;
  lastname: string;
  title: string;
  email: string;
  role: Role;
  avatar: string;
};

export const publisher: User = {
  firstname: "Idris",
  lastname: "Mubarak",
  title: "Dr.",
  email: "mubarakbolu150@gmail.com",
  role: "PUBLISHER",
  avatar: "/profile-pic.svg",
};

export const accessor: User = {
  firstname: "John",
  lastname: "Doe",
  title: "Mr.",
  email: "john.doe@example.com",
  role: "ACCESSOR",
  avatar: "/userAvatar_r.svg",
};

export const vc: User = {
  firstname: "Folashade",
  lastname: "T. Ogunsola",
  title: "Professor.",
  email: "folashade.ogunsola@example.com",
  role: "VC",
  avatar: "/userAvatar_r.svg",
};

export const hrmd: User = {
  firstname: "Emily",
  lastname: "Johnson",
  title: "Ms.",
  email: "emily.johnson@example.com",
  role: "HRMD",
  avatar: "/userAvatar_r.svg",
};
