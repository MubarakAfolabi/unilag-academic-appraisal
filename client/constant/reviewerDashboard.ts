export type OverviewCard = {
  label: string;
  value: string;
  icon: string;
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
    icon: "/dashboard-icons/clock-4.svg",
    bgClass: "bg-[#e8f0ff]",
  },
  {
    label: "In Progress",
    value: "6",
    icon: "/dashboard-icons/hourglass.svg",
    bgClass: "bg-[#f5f3a5]",
  },
  {
    label: "Completed",
    value: "18",
    icon: "/dashboard-icons/approvedCardIcon.svg",
    bgClass: "bg-[#dff3e8]",
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

export const recentActivities: RecentActivityItem[] = [
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
    iconState: "info",
  },
];

export const reviewerPerformance: PerformanceItem[] = [
  {
    value: "18",
    label: "Completed Reviews",
    sublabel: "This month",
    icon: "/dashboard-icons/file-text.svg",
  },
  {
    value: "2.4 Days",
    label: "Average Review Time",
    sublabel: "This month",
    icon: "/dashboard-icons/file-text.svg",
  },
  {
    value: "4.8 / 5",
    label: "Quality Score",
    sublabel: "Based on editor feedback",
    icon: "/dashboard-icons/file-text.svg",
  },
];