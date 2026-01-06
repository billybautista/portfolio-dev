"use client";

import { useEffect, useState } from "react";

export function useGetPageViews(page: string) {
  const [views, setViews] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(
          `/api/views?page=${encodeURIComponent(page)}`
        );
        if (response.ok) {
          const data = await response.json();
          setViews(data.views || 0);
        }
      } catch (error) {
        console.error("Failed to fetch page views:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchViews();
  }, [page]);

  return { views, loading };
}
