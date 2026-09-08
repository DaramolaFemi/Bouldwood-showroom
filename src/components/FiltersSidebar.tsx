import React from "react";
import DoubleRange from "./DoubleRange";

type Props = {
  categories?: string[];
  materials?: string[];
  minPrice?: number;
  maxPrice?: number;
  filters?: { minPrice?: number; maxPrice?: number; materials?: string[] };
  onFilter: (filters: {
    minPrice?: number;
    maxPrice?: number;
    materials?: string[];
  }) => void;
};

export default function FiltersSidebar({
  categories = ["Sofas", "Chairs", "Tables"],
  materials = ["Wood", "Upholstery"],
  minPrice = 0,
  maxPrice = 10000,
  filters,
  onFilter,
}: Props) {
  const initial = {
    minPrice: filters?.minPrice ?? minPrice,
    maxPrice: filters?.maxPrice ?? maxPrice,
    materials: filters?.materials ?? ([] as string[]),
  };
  const [localMin, setLocalMin] = React.useState<number>(initial.minPrice);
  const [localMax, setLocalMax] = React.useState<number>(initial.maxPrice);
  const [selMaterials, setSelMaterials] = React.useState<string[]>(
    initial.materials,
  );

  React.useEffect(() => {
    setLocalMin(initial.minPrice);
    setLocalMax(initial.maxPrice);
    setSelMaterials(initial.materials);
  }, [filters]);

  const toggleMaterial = (m: string) => {
    setSelMaterials((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m],
    );
  };

  const apply = () =>
    onFilter({
      minPrice: Number(localMin),
      maxPrice: Number(localMax),
      materials: selMaterials,
    });
  const reset = () => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
    setSelMaterials([]);
    onFilter({});
  };

  return (
    <aside className="w-full">
      <div className="p-4 border rounded">
        <h4 className="font-medium">Filters</h4>

        <div className="mt-4">
          <div className="text-sm font-semibold">Price</div>
          <div className="mt-2 flex items-center gap-2">
            <input
              aria-label="Min price"
              type="number"
              value={localMin}
              onChange={(e) => setLocalMin(Number(e.target.value))}
              className="w-full px-2 py-1 border"
            />
            <span className="opacity-60">—</span>
            <input
              aria-label="Max price"
              type="number"
              value={localMax}
              onChange={(e) => setLocalMax(Number(e.target.value))}
              className="w-full px-2 py-1 border"
            />
          </div>
          <div className="mt-2">
            <DoubleRange
              min={minPrice}
              max={maxPrice}
              low={localMin}
              high={localMax}
              onChange={(lo, hi) => {
                setLocalMin(lo);
                setLocalMax(hi);
              }}
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm font-semibold">Material</div>
          <div className="mt-2 flex flex-col gap-2">
            {materials.map((m) => (
              <label key={m} className="text-sm flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selMaterials.includes(m)}
                  onChange={() => toggleMaterial(m)}
                  className="mr-2"
                />
                {m}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button onClick={apply} className="px-4 py-2 bg-black text-white">
            Apply
          </button>
          <button onClick={reset} className="px-4 py-2 border">
            Reset
          </button>
        </div>
      </div>
    </aside>
  );
}
