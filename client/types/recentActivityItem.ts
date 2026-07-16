export type RecentActivityItem = {
  status: "PENDING" | "COMPLETED";
  openedAt: string | null;
  completedAt: string | null;
  publication: {
    id: number;
    fullCitation: string;
  };
};
