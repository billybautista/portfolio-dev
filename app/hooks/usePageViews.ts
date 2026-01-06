"use client";

import { useEffect, useRef } from "react";

const DEBOUNCE_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

export function usePageViews(page: string) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Avoid tracking multiple times in development (React StrictMode)
    if (hasTracked.current) return;
    hasTracked.current = true;

    const incrementViews = async () => {
      try {
        // Check if user has viewed this page recently
        const lastViewedKey = `page_view_${page}`;
        const lastViewed = localStorage.getItem(lastViewedKey);
        const now = Date.now();

        if (lastViewed) {
          const timeSinceLastView = now - parseInt(lastViewed, 10);

          // If less than debounce time has passed, don't increment
          if (timeSinceLastView < DEBOUNCE_TIME) {
            return;
          }
        }

        // Increment the view counter
        await fetch("/api/views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page }),
        });

        // Store the current timestamp
        localStorage.setItem(lastViewedKey, now.toString());
      } catch (error) {
        console.error("Failed to track page view:", error);
      }
    };

    incrementViews();
  }, [page]);
}
