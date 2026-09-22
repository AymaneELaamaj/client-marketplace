export default function AdminTabs({ activeSection, onChange }) {
  return (
    <div className="admin-tabs" aria-label="Sections admin">
      <button
        type="button"
        className={activeSection === "products" ? "is-active" : ""}
        onClick={() => onChange("products")}
      >
        Produits
      </button>
      <button
        type="button"
        className={activeSection === "categories" ? "is-active" : ""}
        onClick={() => onChange("categories")}
      >
        Categories
      </button>
    </div>
  );
}
