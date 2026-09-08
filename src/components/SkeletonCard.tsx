import React from "react";

export default function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-56 bg-gray-100 rounded" />
      <div className="mt-3 h-4 bg-gray-100 w-3/4 rounded" />
      <div className="mt-2 h-3 bg-gray-100 w-1/4 rounded" />
    </div>
  );
}
