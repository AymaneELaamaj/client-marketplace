export default function CategoryFilter({ categories, selectedCategory, onChange }) {
  return (
    <div className="category-filter" aria-label="Categories">
      <button
        type="button"
        className={!selectedCategory ? "is-active" : ""}
        onClick={() => onChange("")}
      >
        Toutes
      </button>

      {categories.map((category) => (
        <button
          type="button"
          key={category._id}
          className={selectedCategory === category._id ? "is-active" : ""}
          onClick={() => onChange(category._id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
