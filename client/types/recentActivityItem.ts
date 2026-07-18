export type RecentActivityItem = {
  status: "IN_PROGRESS" | "COMPLETED";
  openedAt: string | null;
  completedAt: string | null;
  publication: {
    id: number;
    fullCitation: string;
  };
};
