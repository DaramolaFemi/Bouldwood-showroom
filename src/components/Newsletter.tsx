import React from "react";

export default function Newsletter() {
  return (
    <section className="bg-neutral-50 card-bg py-12">
      <div className="container mx-auto px-6 text-center">
        <h4 className="text-lg font-display">Join our newsletter</h4>
        <p className="mt-2 text-muted">
          Receive new arrivals and curated edits — delivered monthly.
        </p>
        <div className="mt-4 flex justify-center">
          <input
            aria-label="Email"
            placeholder="Email address"
            className="px-4 py-3 border rounded-l w-80 bg-white dark:bg-transparent"
          />
          <button
            aria-label="Subscribe to newsletter"
            className="px-4 py-3 bg-black text-white rounded-r"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
