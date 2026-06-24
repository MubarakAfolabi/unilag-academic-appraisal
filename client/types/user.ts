type Role = "VC" | "HRMD" | "PUBLISHER" | "ACCESSOR";

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  title: string;
  email: string;
  role: Role;
  department: string | null;
  faculty: string | null;
  rank: string | null;
  staffId: string;
  bio: string | null;
  phoneNo: string | null;
  dateJoined: string | null;
  avatar: string | null;
};
