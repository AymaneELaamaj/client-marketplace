import { Edit3, Trash2 } from "lucide-react";
import { getCategoryName } from "./adminFormUtils";

export default function ProductTable({ loading, onDelete, onEdit, products, saving }) {
  return (
    <div className="admin-table-panel">
      <h2>Produits</h2>

      {loading ? (
        <p className="admin-muted">Chargement...</p>
      ) : products.length ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Categorie</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{getCategoryName(product.category)}</td>
                  <td>{product.price} DH</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className="admin-row-actions">
                      <button type="button" onClick={() => onEdit(product)}>
                        <Edit3 size={16} />
                      </button>
                      <button
                        type="button"
                        className="admin-danger-button"
                        onClick={() => onDelete(product._id)}
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
        <p className="admin-muted">Aucun produit.</p>
      )}
    </div>
  );
}
