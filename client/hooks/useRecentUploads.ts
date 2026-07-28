"use client";

import { getRecentUploads, subscribeRecentUploads } from "@/lib/uploadStore";
import { useState, useEffect } from "react";

export function useRecentUploads() {
  const [recentUploads, setRecentUploads] =
    useState<UploadItem[]>(getRecentUploads());

  useEffect(() => {
    return subscribeRecentUploads(setRecentUploads);
  }, []);

  return recentUploads;
}
