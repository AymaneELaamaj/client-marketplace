import { ImagePlus, PackagePlus, Save, X } from "lucide-react";
import { isImportedImage } from "./adminFormUtils";

const MAX_IMAGE_SIZE = 1024 * 1024;
const acceptedImageTypes = ["image/jpeg", "image/png", "image/webp"];

export default function ProductForm({
  categories,
  editingProductId,
  form,
  onCancel,
  onChange,
  onImageError,
  onSubmit,
  saving,
  setForm,
}) {
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!acceptedImageTypes.includes(file.type)) {
      onImageError("Image invalide. Utilise JPG, PNG ou WebP.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      onImageError("Image trop lourde. Taille maximale: 1 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        imageUrl: reader.result,
      }));
      onImageError("");
    };

    reader.onerror = () => {
      onImageError("Impossible de lire cette image.");
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setForm((current) => ({
      ...current,
      imageUrl: "",
    }));
  };

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2>{editingProductId ? "Modifier un produit" : "Ajouter un produit"}</h2>

      <label>
        Nom
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          minLength={2}
          maxLength={120}
          required
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          maxLength={1000}
          rows={4}
        />
      </label>

      <div className="admin-form__row">
        <label>
          Prix
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Stock
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={onChange}
            required
          />
        </label>
      </div>

      <label>
        Categorie
        <select name="category" value={form.category} onChange={onChange} required>
          <option value="">Choisir une categorie</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <div className="admin-image-field">
        <span>Image</span>

        {form.imageUrl && (
          <div className="admin-image-preview">
            <img src={form.imageUrl} alt="Apercu produit" />
            <button type="button" onClick={removeImage} aria-label="Retirer l'image">
              <X size={16} />
            </button>
          </div>
        )}

        <label className="admin-file-button">
          <ImagePlus size={18} />
          Importer une image
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
          />
        </label>

        <label className="admin-image-url">
          URL image
          <input
            name="imageUrl"
            type="url"
            value={isImportedImage(form.imageUrl) ? "" : form.imageUrl}
            onChange={onChange}
            placeholder="https://..."
            disabled={isImportedImage(form.imageUrl)}
          />
        </label>
      </div>

      <div className="admin-form__actions">
        <button type="submit" disabled={saving || !categories.length}>
          {editingProductId ? <Save size={18} /> : <PackagePlus size={18} />}
          {editingProductId ? "Enregistrer" : "Creer"}
        </button>
        {editingProductId && (
          <button type="button" className="admin-secondary-button" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
