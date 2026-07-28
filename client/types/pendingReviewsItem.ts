export type PendingReviewsItem = {
  publication: {
    fullCitation: string;
    createdAt: string;
    user: {
      id: number;
      firstname: string;
      lastname: string;
    };
  };
};
