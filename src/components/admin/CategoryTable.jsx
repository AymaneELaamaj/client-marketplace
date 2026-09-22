import { Edit3, Trash2 } from "lucide-react";

export default function CategoryTable({ categories, loading, onDelete, onEdit, saving }) {
  return (
    <div className="admin-table-panel">
      <h2>Categories</h2>

      {loading ? (
        <p className="admin-muted">Chargement...</p>
      ) : categories.length ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.description || "-"}</td>
                  <td>
                    <div className="admin-row-actions">
                      <button type="button" onClick={() => onEdit(category)}>
                        <Edit3 size={16} />
                      </button>
                      <button
                        type="button"
                        className="admin-danger-button"
                        onClick={() => onDelete(category._id)}
                        disabled={saving}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="admin-muted">Aucune categorie.</p>
      )}
    </div>
  );
}
