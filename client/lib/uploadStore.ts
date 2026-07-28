import type { UploadItem } from "@/types/uploadItem";

let uploads: UploadItem[] = [];
let recentUploads: UploadItem[] = [];

const uploadListeners = new Set<(uploads: UploadItem[]) => void>();
const recentUploadListeners = new Set<(uploads: UploadItem[]) => void>();

function notifyUploads() {
  uploadListeners.forEach((listener) => listener([...uploads]));
}

function notifyRecentUploads() {
  recentUploadListeners.forEach((listener) => listener([...recentUploads]));
}

export function subscribe(listener: (uploads: UploadItem[]) => void) {
  uploadListeners.add(listener);

  return () => uploadListeners.delete(listener);
}

export function subscribeRecentUploads(
  listener: (uploads: UploadItem[]) => void,
) {
  recentUploadListeners.add(listener);

  return () => recentUploadListeners.delete(listener);
}

export function getUploads() {
  return uploads;
}

export function getRecentUploads() {
  return recentUploads;
}

export function addUpload(fileName: string): string {
  const id = `upload-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const upload: UploadItem = {
    id,
    fileName,
    progress: 0,
    status: "uploading",
  };

  uploads = [...uploads, upload];
  recentUploads = [...recentUploads, upload];

  notifyUploads();
  notifyRecentUploads();

  return id;
}

export function updateUploadProgress(id: string, progress: number) {
  uploads = uploads.map((upload) =>
    upload.id === id ? { ...upload, progress } : upload,
  );

  recentUploads = recentUploads.map((upload) =>
    upload.id === id ? { ...upload, progress } : upload,
  );

  notifyUploads();
  notifyRecentUploads();
}

export function finishUpload(id: string, success: boolean) {
  const updateStatus = (upload: UploadItem): UploadItem =>
    upload.id === id
      ? {
          ...upload,
          status: success ? "completed" : "error",
          progress: success ? 100 : upload.progress,
        }
      : upload;

  uploads = uploads.map(updateStatus);
  recentUploads = recentUploads.map(updateStatus);

  notifyUploads();
  notifyRecentUploads();

  setTimeout(() => {
    uploads = uploads.filter((upload) => upload.id !== id);
    notifyUploads();
  }, 5000);
}
