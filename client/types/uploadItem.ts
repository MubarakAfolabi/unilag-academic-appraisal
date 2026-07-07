export type UploadItem = {
  id: string;
  fileName: string;
  progress: number;
  status: "uploading" | "completed" | "error";
};
