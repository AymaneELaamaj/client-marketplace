import { useState } from "react";
import { RotateCcw } from "lucide-react";
import AdminTabs from "../../components/admin/AdminTabs";
import CategoryForm from "../../components/admin/CategoryForm";
import CategoryTable from "../../components/admin/CategoryTable";
import {
  defaultCategoryForm,
  defaultProductForm,
  toProductForm,
} from "../../components/admin/adminFormUtils";
import ProductForm from "../../components/admin/ProductForm";
import ProductTable from "../../components/admin/ProductTable";
import { useAdminCatalog } from "../../hooks/useAdminCatalog";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("products");
  const [categoryForm, setCategoryForm] = useState(defaultCategoryForm);
  const [productForm, setProductForm] = useState(defaultProductForm);
  const [editingCategoryId, setEditingCategoryId] = useState("");
  const [editingProductId, setEditingProductId] = useState("");

  const {
    categories,
    deleteCategory,
    deleteProduct,
    error,
    loadAdminData,
    loading,
    message,
    products,
    saveCategory,
    saveProduct,
    saving,
    setError,
  } = useAdminCatalog();

  const resetCategoryForm = () => {
    setCategoryForm(defaultCategoryForm);
    setEditingCategoryId("");
  };

  const resetProductForm = () => {
    setProductForm(defaultProductForm);
    setEditingProductId("");
  };

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;

    setCategoryForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleProductChange = (event) => {
    const { name, value } = event.target;

    setProductForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCategorySubmit = async (event) => {
    event.preventDefault();

    const saved = await saveCategory({
      form: categoryForm,
      editingId: editingCategoryId,
    });

    if (saved) {
      resetCategoryForm();
    }
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();

    const saved = await saveProduct({
      form: productForm,
      editingId: editingProductId,
    });

    if (saved) {
      resetProductForm();
    }
  };

  const editCategory = (category) => {
    setActiveSection("categories");
    setEditingCategoryId(category._id);
    setCategoryForm({
      name: category.name || "",
      description: category.description || "",
    });
  };

  const editProduct = (product) => {
    setActiveSection("products");
    setEditingProductId(product._id);
    setProductForm(toProductForm(product));
  };

  const removeCategory = async (categoryId) => {
    const deleted = await deleteCategory(categoryId);

    if (deleted && editingCategoryId === categoryId) {
      resetCategoryForm();
    }
  };

  const removeProduct = async (productId) => {
    const deleted = await deleteProduct(productId);

    if (deleted && editingProductId === productId) {
      resetProductForm();
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-heading">
        <div>
          <p className="admin-eyebrow">Administration</p>
          <h1>Gestion Marketplace</h1>
        </div>
        <button type="button" onClick={loadAdminData} disabled={loading || saving}>
          <RotateCcw size={18} />
          Actualiser
        </button>
      </div>

      <AdminTabs activeSection={activeSection} onChange={setActiveSection} />

      {error && <p className="admin-alert admin-alert--error">{error}</p>}
      {message && <p className="admin-alert admin-alert--success">{message}</p>}

      {activeSection === "products" && (
        <div className="admin-layout">
          <ProductForm
            categories={categories}
            editingProductId={editingProductId}
            form={productForm}
            onCancel={resetProductForm}
            onChange={handleProductChange}
            onImageError={setError}
            onSubmit={handleProductSubmit}
            saving={saving}
            setForm={setProductForm}
          />

          <ProductTable
            loading={loading}
            onDelete={removeProduct}
            onEdit={editProduct}
            products={products}
            saving={saving}
          />
        </div>
      )}

      {activeSection === "categories" && (
        <div className="admin-layout">
          <CategoryForm
            editingCategoryId={editingCategoryId}
            form={categoryForm}
            onCancel={resetCategoryForm}
            onChange={handleCategoryChange}
            onSubmit={handleCategorySubmit}
            saving={saving}
          />

          <CategoryTable
            categories={categories}
            loading={loading}
            onDelete={removeCategory}
            onEdit={editCategory}
            saving={saving}
          />
        </div>
      )}
    </section>
  );
}
