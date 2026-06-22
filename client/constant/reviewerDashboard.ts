import {
  CircleCheckBig,
  Settings,
  FileText,
  Download,
  CircleCheck,
  FileSpreadsheet,
  MessageSquareText,
  Clock,
  Megaphone,
  Clock4,
  Hourglass,
  LucideIcon,
} from "lucide-react";

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

export type AssignedReviewItem = {
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

export type Reviews = {
  title: string;
  manuscriptId: string;
  date: string;
  dueDate?: string;
  status: string;
};
export type Notifications = {
  id: number;
  title: string;
  details: string;
  timeReceived: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  isUnread: boolean;
};

export const ReviewerNotifications: Notifications[] = [
  {
    id: 1,
    title: "New review assigned",
    details:
      "You have been assigned a review for “Deep Learning Approaches in Medical Imaging” by Dr. Adeola John (Computer Science Department).",
    timeReceived: "10 mins ago",
    icon: FileText,
    iconColor: "hsla(261,79%,54%,1)",
    iconBgColor: "hsla(261,79%,54%,0.1)",
    isUnread: true,
  },
  {
    id: 2,
    title: "Review submitted successfully",
    details:
      "Your review for “Blockchain Technology Overview”has been submitted successfully.",
    timeReceived: "1 hour ago",
    icon: CircleCheck,
    iconColor: "hsla(142,71%,45%,1)",
    iconBgColor: "hsla(142,71%,45%,0.1)",
    isUnread: true,
  },
  {
    id: 3,
    title: "Author responded to your review",
    details:
      "Dr. Samuel Okoro has responded to your review for “Advanced Alogorithms Lecture Notes”.",
    timeReceived: "Yesterday, 4:30 PM",
    icon: MessageSquareText,
    iconColor: "hsla(216,59%,54%,1)",
    iconBgColor: "hsla(216,59%,54%,0.1)",
    isUnread: false,
  },
  {
    id: 4,
    title: "New submission in your department",
    details:
      "A new work “AI and Society: Ethical Considerations” has been submitted in Computer Science Department.",
    timeReceived: "Yesterday, 11:15 AM",
    icon: FileSpreadsheet,
    iconColor: "hsla(271,70%,60%,1)",
    iconBgColor: "hsla(271,70%,60%,0.1)",
    isUnread: false,
  },
  {
    id: 5,
    title: "Documents available for download",
    details:
      "The revised version of “Data Structure and Applications” is available for rerview.",
    timeReceived: "May 7, 2024, 3:20PM",
    icon: Download,
    iconColor: "hsla(142,71%,45%,1)",
    iconBgColor: "hsla(142,71%,45%,0.1)",
    isUnread: false,
  },
  {
    id: 6,
    title: "System maintenance notice",
    details:
      "The APRI system will undergo scheduled maintenance on May 12, 2024 from 12:00 AM to 2:00 PM.",
    timeReceived: "May 5, 2024, 6:00PM",
    icon: Settings,
    iconColor: "hsla(220,15%,40%,1)",
    iconBgColor: "hsla(220,15%,40%,0.1)",
    isUnread: false,
  },
];

export const userProfile = {
  fullName: "Dr. John Doe",
  subtitle: "Track your submissions and progress",
  role: "REVIEWER",
  avatar: "/userAvatar_r.svg",
  portal: "Reviewer's Portal",
  notificationsCount: 4,
  specilaization: "Artificial Intelligence",
  rank: "Professor",
  faculty: "Science",
  department: "Computer Science",
  reviewerId: "REV-2024-0045",
  phone_number: "0803 123 4567",
  email: "kehinde.oladipo@gmail.com",
  dateJoined: "September 1, 2015",
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

export const assignedReviews: AssignedReviewItem[] = [
  {
    title: "Machine Learning Approaches in Data Mining",
    author: "By Dr. Adeola John",
    date: "Submitted on May 12, 2024",
  },
  {
    title: "Advanced Algorithms Lecture Notes",
    author: "By Dr. Samuel okoro",
    date: "Submitted on May 12, 2024",
  },
  {
    title: "Research Methodology in Computing",
    author: "By Dr. Maryam Bello",
    date: "Submitted on May 12, 2024",
  },
  {
    title: "Database System Course Material",
    author: "By Dr. Tunde Adebayo",
    date: "Submitted on May 12, 2024",
  },
  {
    title: "Ai and Society: Ethical Considerations",
    author: "By Dr. Ibrahim Hassan",
    date: "Submitted on May 12, 2024",
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

export const allReviews: Reviews[] = [
  {
    title: "AI in Healthcare: Opportunities and Challenges 1",
    manuscriptId: "RH-2026-0156",
    date: "Submitted on March 21, 2026",
    dueDate: "April 23, 2026",
    status: "Completed",
  },
  {
    title: "The Role of IoT in Smart Cities",
    manuscriptId: "RH-2026-0157",
    date: "Submitted on February 13, 2026",
    dueDate: "March 15, 2026",
    status: "Completed",
  },
  {
    title: "Quantum Computing: Current Advances",
    manuscriptId: "RH-2026-0158",
    date: "Submitted on March 1, 2026",
    dueDate: "March 3, 2026",
    status: "Completed",
  },
  {
    title: "Blockchain Technology in Education",
    manuscriptId: "RH-2026-0159",
    date: "Submitted on April 23, 2026",
    dueDate: "April 25, 2026",
    status: "Completed",
  },
  {
    title: "The future of Renewable Energy",
    manuscriptId: "RH-2026-0160",
    date: "Submitted on April 24, 2026",
    dueDate: "April 26, 2026",
    status: "Pending",
  },
  {
    title: "AI in Healthcare: Opportunities and Challenges 2",
    manuscriptId: "RH-2026-0161",
    date: "Submitted on April 25, 2026",
    dueDate: "April 27, 2026",
    status: "Pending",
  },
  {
    title: "AI in Healthcare: Opportunities and Challenges 3",
    manuscriptId: "RH-2026-0162",
    date: "Submitted on May 1, 2026",
    dueDate: "May 3, 2026",
    status: "Pending",
  },
  {
    title: "AI in Healthcare: Opportunities and Challenges 4",
    manuscriptId: "RH-2026-0163",
    date: "Submitted on May 5, 2026",
    dueDate: "May 7, 2026",
    status: "Pending",
  },
];
