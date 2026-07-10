import type { UploadItem } from "@/types/uploadItem";

let uploads: UploadItem[] = [];

const listeners = new Set<(uploads: UploadItem[]) => void>();

function notify() {
  listeners.forEach((listener) => listener([...uploads]));
}

export function subscribe(listener: (uploads: UploadItem[]) => void) {
  listeners.add(listener);

  return () => listeners.delete(listener);
}

export function getUploads() {
  return uploads;
}

export function addUpload(fileName: string): string {
  const id = `upload-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  uploads = [
    ...uploads,
    {
      id,
      fileName,
      progress: 0,
      status: "uploading",
    },
  ];

  notify();

  return id;
}

export function updateUploadProgress(id: string, progress: number) {
  uploads = uploads.map((u) => (u.id === id ? { ...u, progress } : u));

  notify();
}

export function finishUpload(id: string, success: boolean) {
  uploads = uploads.map((u) =>
    u.id === id
      ? {
          ...u,
          status: success ? "completed" : "error",
          progress: success ? 100 : u.progress,
        }
      : u,
  );

  notify();

  setTimeout(() => {
    uploads = uploads.filter((u) => u.id !== id);
    notify();
  }, 5000);
}
