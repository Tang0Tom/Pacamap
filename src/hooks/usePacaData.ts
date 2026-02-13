"use client";

import { useState, useEffect } from "react";

type DataStatus = "idle" | "loading" | "success" | "error";

interface UsePacaDataReturn<T> {
  data: T | null;
  status: DataStatus;
  error: string | null;
}

export function usePacaData<T>(path: string): UsePacaDataReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<DataStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      try {
        const res = await fetch(`/data/${path}`);
        if (!res.ok) throw new Error(`Failed to load ${path}`);
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setStatus("success");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setStatus("error");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [path]);

  return { data, status, error };
}
