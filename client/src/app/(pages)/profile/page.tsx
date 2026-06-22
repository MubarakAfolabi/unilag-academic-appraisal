"use client";

import { useUser } from "@/context/userContext";
import dynamic from "next/dynamic";

const PublisherProfile = dynamic(
  () => import("@/components/publisher/PublisherProfile"),
);

const AccessorProfile = dynamic(
  () => import("@/components/accessor/AccessorProfile"),
);

export default function ProfilePage() {
  const { user } = useUser();

  const profilePages = {
    ACCESSOR: <AccessorProfile />,
    PUBLISHER: <PublisherProfile />,
  };

  return profilePages[user.role];
}
