export type OverviewCard = {
  label: string;
  value: string;
  icon: string;
  bgClass: string;
};

export type SubmissionItem = {
  title: string;
  date: string;
  status: string;
  statusClass: string;
  progress: {
    label: string;
    state: "done" | "current" | "pending" | "failed";
  }[];
};

export type UploadActivityItem = {
  filename: string;
  meta: string;
  status: string;
  progressValue: number;
};

export const userProfile = {
  id: 1,
  fullName: "Dr. Alex Johnson",
  role: "PUBLISHER",
  subtitle: "Track your submissions and progress",
  avatar: "/profile-pic.svg",
  portal: "Publisher's Portal",
};

export const publisherOverviewCards: OverviewCard[] = [
  {
    label: "Total Submissions",
    value: "28",
    icon: "/dashboard-icons/clock-4.svg",
    bgClass: "bg-[#e8f0ff]",
  },
  {
    label: "Under Review",
    value: "8",
    icon: "/dashboard-icons/hourglass.svg",
    bgClass: "bg-[#f5f3a5]",
  },
  {
    label: "Approved",
    value: "15",
    icon: "/dashboard-icons/approvedCardIcon.svg",
    bgClass: "bg-[#dff3e8]",
  },
];

export const recentSubmissions: SubmissionItem[] = [
  {
    title: "AI in Healthcare: Opportunities and Challenges",
    date: "Submitted on March 21, 2026",
    status: "Under Review",
    statusClass: "bg-[hsla(60,100%,85%,0.7)] text-[hsla(35,98%,52%,1)]",
    progress: [
      { label: "Submitted", state: "done" },
      { label: "Under Review", state: "current" },
      { label: "Decision", state: "pending" },
    ],
  },
  {
    title: "Blockchain Technology in Education",
    date: "Submitted on February 20, 2026",
    status: "Agreed",
    statusClass: "bg-[hsla(150,90%,24%,0.1)] text-[hsla(150,90%,24%,1)]",
    progress: [
      { label: "Submitted", state: "done" },
      { label: "Under Review", state: "done" },
      { label: "Decision", state: "done" },
    ],
  },
  {
    title: "The Future of Renewable Energy",
    date: "Submitted on March 3, 2026",
    status: "Rejected",
    statusClass: "bg-[hsla(353,100%,46%,0.1)] text-[hsla(0,93%,52%,1)]",
    progress: [
      { label: "Submitted", state: "done" },
      { label: "Under Review", state: "done" },
      { label: "Decision", state: "failed" },
    ],
  },
];

export const recentUploadActivity: UploadActivityItem[] = [
  {
    filename: "AI in Healthcare.pdf",
    meta: "3.6 MB . PDF",
    status: "Processing...",
    progressValue: 60,
  },
];
