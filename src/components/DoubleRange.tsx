import React from "react";
export default function DoubleRange({
  min,
  max,
  low,
  high,
  onChange,
}: {
  min: number;
  max: number;
  low: number;
  high: number;
  onChange: (low: number, high: number) => void;
}) {
  return (
    <div className="grid gap-3 mt-4">
      <label className="text-xs">
        Minimum: ${low}
        <input
          className="block w-full"
          type="range"
          min={min}
          max={max}
          value={low}
          onChange={(e) =>
            onChange(Math.min(Number(e.target.value), high), high)
          }
        />
      </label>
      <label className="text-xs">
        Maximum: ${high}
        <input
          className="block w-full"
          type="range"
          min={min}
          max={max}
          value={high}
          onChange={(e) => onChange(low, Math.max(low, Number(e.target.value)))}
        />
      </label>
    </div>
  );
}
