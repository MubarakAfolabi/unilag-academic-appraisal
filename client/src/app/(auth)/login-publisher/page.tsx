import AuthPage from "@/components/AuthPage";

export default function PublisherLoginPage() {
  return (
    <AuthPage
      title="PUBLISHER LOGIN"
      footerLink="/login-reviewer"
      forgotLink="/login-publisher/forgot-password"
    />
  );
}
