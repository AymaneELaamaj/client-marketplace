import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      className="marketplace-search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <Search size={20} />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Rechercher un produit"
        aria-label="Rechercher un produit"
      />
      <button type="submit">
        <Search size={17} />
        Rechercher
      </button>
    </form>
  );
}
