"use client";

import { useEffect, useState } from "react";

const LiveDateTime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  const formatted =
    now.toLocaleDateString("en-US", {
      month: "short", // "Sep"
      day: "numeric", // "1"
      year: "numeric", // "2025"
    }) +
    " - " +
    now.toLocaleTimeString("en-US", {
      hour12: false, // 24-hour format
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <time dateTime={now.toISOString()} suppressHydrationWarning>
      {formatted}
    </time>
  );
};

export default LiveDateTime;
