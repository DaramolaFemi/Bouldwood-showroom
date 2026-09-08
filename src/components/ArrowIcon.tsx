import React from "react";

export default function ArrowIcon({
  direction = "diagonal",
}: {
  direction?: "diagonal" | "up" | "down";
}) {
  return (
    <svg
      className="arrow-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={direction === "up" ? "M12 19V5m-6 6 6-6 6 6" : direction === "down" ? "M12 5v14m-6-6 6 6 6-6" : "M5 19 19 5M5 5h14v14"} />
    </svg>
  );
}
