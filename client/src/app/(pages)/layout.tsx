// import { userProfile } from "@/constant/publisherDashboard";
import { userProfile } from "@/constant/reviewerDashboard";
import ReviewerNavigationLayout from "@/components/ReviewerNavigationLayout";
import PublisherNavigationLayout from "@/components/PublisherNavigationLayout";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex md:h-screen overflow-hidden">
      {userProfile.role === "PUBLISHER" ? (
        <PublisherNavigationLayout />
      ) : (
        <ReviewerNavigationLayout />
      )}
      {children}
    </div>
  );
}
