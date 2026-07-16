export type PendingReviewsItem = {
  id: number;
  createdAt: string;
  updatedAt: string;
  fullCitation: string;
  publicationType: string;
  quartileRanking: string;
  nonIndexed: string | null;
  classification: string;
  filePath: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  status: string;
  userId: number;
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
};
