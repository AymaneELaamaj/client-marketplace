import { Plus, Save } from "lucide-react";

export default function CategoryForm({
  editingCategoryId,
  form,
  onCancel,
  onChange,
  onSubmit,
  saving,
}) {
  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2>{editingCategoryId ? "Modifier une categorie" : "Ajouter une categorie"}</h2>

      <label>
        Nom
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          minLength={2}
          maxLength={80}
          required
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          maxLength={500}
          rows={5}
        />
      </label>

      <div className="admin-form__actions">
        <button type="submit" disabled={saving}>
          {editingCategoryId ? <Save size={18} /> : <Plus size={18} />}
          {editingCategoryId ? "Enregistrer" : "Creer"}
        </button>
        {editingCategoryId && (
          <button type="button" className="admin-secondary-button" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
