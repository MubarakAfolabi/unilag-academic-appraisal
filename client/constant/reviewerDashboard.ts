import { CircleCheckBig, Clock4, Hourglass, LucideIcon } from "lucide-react";

export type OverviewCard = {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  iconWrapper: string;
  bgClass: string;
};

export type PendingSubmissionItem = {
  title: string;
  author: string;
  date: string;
};

export type RecentActivityItem = {
  title: string;
  date: string;
  iconState: "success" | "warning" | "info" | "error";
};

export type PerformanceItem = {
  value: string;
  label: string;
  sublabel: string;
  icon: string;
};

export const UserProfile = {
  fullName: "Dr. John Doe",
  subtitle: "Track your submissions and progress",
  role: "REVIEWER",
  avatar: "/userAvatar_r.svg",
  portal: "Reviewer's Portal",
  notificationsCount: 4,
};

export const reviewerOverviewCards: OverviewCard[] = [
  {
    label: "Pending Reviews",
    value: "24",
    icon: Clock4,
    iconColor: "text-[hsla(210,79%,46%,1)]",
    iconWrapper: "bg-[hsla(208,78%,85%,1)]",
    bgClass: "bg-[hsl(209,67%,89%)]",
  },
  {
    label: "In Progress",
    value: "6",
    icon: Hourglass,
    iconColor: "text-[hsla(45,100%,51%,1)]",
    iconWrapper: "bg-[hsla(60,100%,51%,0.2)]",
    bgClass: "bg-[hsl(45,100%,85%)]",
  },
  {
    label: "Completed",
    value: "18",
    icon: CircleCheckBig,
    iconColor: "text-[hsla(150,90%,24%,1)]",
    iconWrapper: "bg-[hsla(150,90%,24%,0.2)]",
    bgClass: "bg-[hsl(150,28%,85%)]",
  },
];

export const pendingSubmissions: PendingSubmissionItem[] = [
  {
    title: "AI in Healthcare: Opportunities and Challenges",
    author: "By Dr. Alex Johnson",
    date: "Submitted on March 21, 2026",
  },
  {
    title: "The Role of IoT in Smart Cities",
    author: "By Dr. Bunmi Fashina",
    date: "Submitted on February 13, 2026",
  },
  {
    title: "Quantum Computing: Current Advances",
    author: "By Dr. Kemi Williams",
    date: "Submitted on March 1, 2026",
  },
  {
    title: "AI in Healthcare: Opportunities and Challenges",
    author: "By Dr. Anthony Lade",
    date: "Submitted on March 2, 2026",
  },
];

export const recentActivity: RecentActivityItem[] = [
  {
    title: "Reviewed: Blockchain Tech in Education",
    date: "Reviewed on March 20, 2026",
    iconState: "success",
  },
  {
    title: "Reviewed: The Future of Renewable Energy",
    date: "Reviewed on March 23, 2026",
    iconState: "success",
  },
  {
    title: "Reviewed: Data Privacy in the Digital Age",
    date: "Reviewed on March 28, 2026",
    iconState: "error",
  },
  {
    title: "Reviewed: Cloud Computing Adoption",
    date: "Reviewed on April 2, 2026",
    iconState: "success",
  },
];

export const reviewerPerformance: PerformanceItem[] = [
  {
    value: "18",
    label: "Completed Reviews",
    sublabel: "This month",
    icon: "Check",
  },
  {
    value: "2.4 Days",
    label: "Average Review Time",
    sublabel: "This month",
    icon: "Clock4",
  },
  {
    value: "4.8 / 5",
    label: "Quality Score",
    sublabel: "Based on editor feedback",
    icon: "Star",
  },
];
