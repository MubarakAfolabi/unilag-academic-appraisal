"use client";

import { useState, useEffect } from "react";
import type { UploadItem } from "@/types/uploadItem";

let uploads: UploadItem[] = [];
const listeners = new Set<(u: UploadItem[]) => void>();

function notify() {
  const snapshot = [...uploads];
  listeners.forEach((l) => l(snapshot));
}

export function addUpload(fileName: string): string {
  const id = `upload-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  uploads = [...uploads, { id, fileName, progress: 0, status: "uploading" }];
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
      ? { ...u, status: success ? "completed" : "error", progress: 100 }
      : u,
  );
  notify();

  setTimeout(() => {
    uploads = uploads.filter((u) => u.id !== id);
    notify();
  }, 5000);
}

export default function UploadProgressManager() {
  const [items, setItems] = useState<UploadItem[]>(uploads);

  useEffect(() => {
    setItems([...uploads]);
    listeners.add(setItems);
    return () => {
      listeners.delete(setItems);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 max-w-xs w-full">
      {items.map((upload) => (
        <div
          key={upload.id}
          className="bg-white border border-gray-200 rounded-2xl shadow-xl p-4 text-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <p className="font-medium text-gray-800 line-clamp-1 pr-2">
              {upload.fileName}
            </p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                upload.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : upload.status === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
              }`}
            >
              {upload.status === "uploading"
                ? `${upload.progress}%`
                : upload.status}
            </span>
          </div>

          {upload.status === "uploading" && (
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-black h-1.5 rounded-full transition-all duration-200"
                style={{ width: `${upload.progress}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
