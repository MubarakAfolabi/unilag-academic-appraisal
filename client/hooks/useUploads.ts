"use client";

import { useEffect, useState } from "react";
import { getUploads, subscribe } from "@/lib/uploadStore";
import type { UploadItem } from "@/types/uploadItem";

export function useUploads() {
  const [uploads, setUploads] = useState<UploadItem[]>(getUploads());

  useEffect(() => {
    return subscribe(setUploads);
  }, []);

  return uploads;
}
