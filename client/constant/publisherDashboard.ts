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
  author: string;
  staffId: string;
  academicunit: string;
  email: string;
  department: string;
  filename: string;
  manuscriptId: string;
  rating: "Positive" | "Negative";
  date: string;
  score: string;
  positiveRClass: string; 
  negativeRClass: string;
};
export type AssessedItem = {
  title: string;
  manuscriptId: string;
  rating: "Positive" | "Negative";
  date: string;
  score: string;
  assessedby: string;
  assessorcomments: string;
};

export const assessedSubmissions: AssessedItem[] = [
  {
    title: "AI in Healthcare: Opportunities and Challenges",
    manuscriptId: "RH-2026-0156",
    rating: "Positive",
    date: "March 25, 2026",
    score: "60%",
    assessedby: "Dr. Alex Johnson",
    assessorcomments: "The manuscript addresses a relevant topic with strong potential contribution to the field. The methodology is sound, and the results are well presented. Recommended for acceptance with minor revisions.",
  },
  {
    title: "Blockchain Technology in Education",
    manuscriptId: "RH-2026-0157",
    rating: "Negative",
    date: "March 10, 2026",
    score: "30%",
    assessedby: "Dr. Sarah Williams",
    assessorcomments: " The manuscript lacks depth in its analysis and fails to provide sufficient evidence to support its claims. The literature review is inadequate, and the conclusions drawn are not well substantiated. Major revisions are required before reconsideration.",
  },
  {
    title: "The Future of Renewable Energy",
    manuscriptId: "RH-2026-0158",
    rating: "Positive",
    date: "March 9, 2026",
    score: "70%",
    assessedby: "Dr. Michael Brown",
    assessorcomments: "The manuscript provides a comprehensive overview of the topic and presents the information in a clear and organized manner. The writing is well-structured and the arguments are logically presented. Recommended for acceptance.",
  },
  {
    title: "Quantum Computing: Current Advances",
    manuscriptId: "RH-2026-0159",
    rating: "Positive", 
    date: "March 8, 2026",
    score: "80%",
    assessedby: "Dr. Lisa Davis",
    assessorcomments: "The manuscript presents a thorough and insightful analysis of the current state of quantum computing. The theoretical framework is well-developed, and the practical applications are clearly demonstrated. Highly recommended for publication.",
  },
  {
    title: "AI in Finance: Opportunities and Challenges",
    manuscriptId: "RH-2026-0160",
    rating: "Positive",
    date: "March 7, 2026",
    score: "65%",
    assessedby: "Dr. James Wilson",
    assessorcomments: "The manuscript offers a valuable perspective on the integration of AI in Finance settings. The discussion is well-supported with relevant examples and references. Recommended for acceptance with minor revisions.",
  }
];
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
    author: "Dr. Adebayo Omotola",
    staffId: "UNILAG-2024-0892",
    academicunit: "Faculty of Science",
    email: "adebayo.omotola@unilag.edu.ng",
    department: "Department of Computer Science",
    filename: "AI_in_Healthcare_RH-2026-0156.pdf",
    rating: "Positive",
    manuscriptId: "RH-2026-0156",
    date: "Submitted on March 21, 2026",
    score: "60%",
    positiveRClass: "bg-[hsla(150,90%,24%,0.1)] text-[hsla(150,90%,24%,1)]",
    negativeRClass: "bg-[hsla(353,100%,46%,0.1)] text-[hsla(0,93%,52%,1)]",
  },
  {
    title: "Blockchain Technology in Education",
    author: "Prof. Chidi Obi",
    staffId: "UNILAG-2019-1145",
    academicunit: "Faculty of Education",
    email: "chidi.obi@unilag.edu.ng",
    department: "Department of Education",
    filename: "Blockchain_in_Education_RH-2026-0157.pdf",
    rating: "Negative",
    manuscriptId: "RH-2026-0157",
    date: "Submitted on March 2, 2026",
    score: "30%",
    positiveRClass: "bg-[hsla(150,90%,24%,0.1)] text-[hsla(150,90%,24%,1)]",
    negativeRClass: "bg-[hsla(353,100%,46%,0.1)] text-[hsla(0,93%,52%,1)]",
  },
  {
    title: "The Future of Renewable Energy",
    author: "Dr. Funke Adeyemi",
    staffId: "UNILAG-2024-0893",
    academicunit: "Faculty of Engineering",
    email: "funke.adeyemi@unilag.edu.ng",
    department: "Department of Survey Engineering",
    filename: "The_Future_of_Renewable_Energy_RH-2026-0158.pdf",
    rating: "Positive",
    manuscriptId: "RH-2026-0158",
    date: "Submitted on February 25, 2026",
    score: "70%",
    positiveRClass: "bg-[hsla(150,90%,24%,0.1)] text-[hsla(150,90%,24%,1)]",
    negativeRClass: "bg-[hsla(353,100%,46%,0.1)] text-[hsla(0,93%,52%,1)]",
  },
];

