import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl font-display">Not found</h1>
      <p className="mt-4 text-muted">We couldn't find that page.</p>
      <div className="mt-6">
        <Link to="/">Return home</Link>
      </div>
    </div>
  );
}
