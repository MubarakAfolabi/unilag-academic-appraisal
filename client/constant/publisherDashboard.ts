import {
  CircleCheck,
  CircleCheckBig,
  Clock,
  Clock4,
  Download,
  FileSpreadsheet,
  FileText,
  Hourglass,
  LucideIcon,
  Megaphone,
  MessageSquareText,
  Settings,
} from "lucide-react";

export type OverviewCard = {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  iconWrapper: string;
  bgClass: string;
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

export type SubmissionItem = {
  title: string;
  manuscriptId: string;
  rating: number | "In Progress" | "Not Available";
  date: string;
  status: "Under Review" | "Rejected" | "Approved";
  statusClass: string;
};

export const PublisherNotifications: Notifications[] = [
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
    title: "Reviewer reminder",
    details: "Please complete your review for “Mobile Computing trends”",
    timeReceived: "Yesterday, 11:15 AM",
    icon: Clock,
    iconColor: "hsla(271,70%,60%,1)",
    iconBgColor: "hsla(271,70%,60%,0.1)",
    isUnread: false,
  },
  {
    id: 5,
    title: "System announcement",
    details: "New guidelines for reviewers have been updated ",
    timeReceived: "Yesterday, 3:20PM",
    icon: Megaphone,
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
    icon: Clock4,
    iconColor: "text-[hsla(210,79%,46%,1)]",
    iconWrapper: "bg-[hsla(208,78%,85%,1)]",
    bgClass: "bg-[hsl(209,67%,89%)]",
  },
  {
    label: "Under Review",
    value: "8",
    icon: Hourglass,
    iconColor: "text-[hsla(45,100%,51%,1)]",
    iconWrapper: "bg-[hsla(60,100%,51%,0.2)]",
    bgClass: "bg-[hsl(45,100%,85%)]",
  },
  {
    label: "Scored",
    value: "15",
    icon: CircleCheckBig,
    iconColor: "text-[hsla(150,90%,24%,1)]",
    iconWrapper: "bg-[hsla(150,90%,24%,0.2)]",
    bgClass: "bg-[hsl(150,28%,85%)]",
  },
];

export const recentSubmissions: SubmissionItem[] = [
  {
    title: "AI in Healthcare: Opportunities and Challenges",
    rating: "In Progress",
    manuscriptId: "RH-2026-0156",
    date: "Submitted on March 21, 2026",
    status: "Under Review",
    statusClass: "bg-[hsla(60,100%,85%,0.7)] text-[hsla(35,98%,52%,1)]",
  },
  {
    title: "Blockchain Technology in Education",
    rating: 4.7,
    manuscriptId: "RH-2026-0156",
    date: "Submitted on February 20, 2026",
    status: "Approved",
    statusClass: "bg-[hsla(150,90%,24%,0.1)] text-[hsla(150,90%,24%,1)]",
  },
  {
    title: "The Future of Renewable Energy",
    rating: "Not Available",
    manuscriptId: "RH-2026-0156",
    date: "Submitted on March 3, 2026",
    status: "Rejected",
    statusClass: "bg-[hsla(353,100%,46%,0.1)] text-[hsla(0,93%,52%,1)]",
  },
];

export const recentUploadActivity: UploadActivityItem[] = [
  {
    filename: "AI in Healthcare.pdf",
    meta: "3.6MB",
    status: "Processing...",
    progressValue: 60,
  },
  {
    filename: "Chemical Interactions",
    meta: "2.8MB",
    status: "Processing...",
    progressValue: 75,
  },
];
