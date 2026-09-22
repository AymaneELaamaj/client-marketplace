import { Filter, RotateCcw, SlidersHorizontal } from "lucide-react";

const sortOptions = [
  { value: "createdAt_desc", label: "Plus recents" },
  { value: "createdAt_asc", label: "Plus anciens" },
  { value: "price_asc", label: "Prix croissant" },
  { value: "price_desc", label: "Prix decroissant" },
];

export default function ProductFilters({ filters, onChange, onApply, onReset }) {
  return (
    <div className="product-filters">
      <div className="product-filters__title">
        <SlidersHorizontal size={18} />
        <span>Filtres</span>
      </div>

      <label>
        Prix min
        <input
          type="number"
          min="0"
          value={filters.minPrice}
          onChange={(event) => onChange("minPrice", event.target.value)}
          placeholder="0"
        />
      </label>

      <label>
        Prix max
        <input
          type="number"
          min="0"
          value={filters.maxPrice}
          onChange={(event) => onChange("maxPrice", event.target.value)}
          placeholder="999"
        />
      </label>

      <label>
        Tri
        <select value={filters.sort} onChange={(event) => onChange("sort", event.target.value)}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <button type="button" className="product-filters__apply" onClick={onApply}>
        <Filter size={17} />
        Filtrer
      </button>

      <button type="button" className="product-filters__reset" onClick={onReset}>
        <RotateCcw size={17} />
        Reset
      </button>
    </div>
  );
}
