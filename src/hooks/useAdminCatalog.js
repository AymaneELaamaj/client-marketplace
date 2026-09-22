import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import {
  buildCategoryPayload,
  buildProductPayload,
} from "../components/admin/adminFormUtils";

export function useAdminCatalog() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const showSuccess = (text) => {
    setMessage(text);
    setError("");
  };

  const loadAdminData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [categoriesResponse, productsResponse] = await Promise.all([
        api.get("/categories"),
        api.get("/products", { params: { page: 1, limit: 100, sort: "createdAt_desc" } }),
      ]);

      setCategories(categoriesResponse.data.categories || []);
      setProducts(productsResponse.data.products || []);
    } catch (err) {
      setError(err.response?.data?.message || "Impossible de charger les donnees admin.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadAdminData();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [loadAdminData]);

  const saveCategory = async ({ form, editingId }) => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = buildCategoryPayload(form);

      if (editingId) {
        await api.patch(`/categories/${editingId}`, payload);
        showSuccess("Categorie modifiee.");
      } else {
        await api.post("/categories", payload);
        showSuccess("Categorie creee.");
      }

      await loadAdminData();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Impossible d'enregistrer la categorie.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveProduct = async ({ form, editingId }) => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = buildProductPayload(form);

      if (editingId) {
        await api.patch(`/products/${editingId}`, payload);
        showSuccess("Produit modifie.");
      } else {
        await api.post("/products", payload);
        showSuccess("Produit cree.");
      }

      await loadAdminData();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Impossible d'enregistrer le produit.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteCategory = async (categoryId) => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await api.delete(`/categories/${categoryId}`);
      showSuccess("Categorie supprimee.");
      await loadAdminData();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Impossible de supprimer la categorie.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (productId) => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await api.delete(`/products/${productId}`);
      showSuccess("Produit supprime.");
      await loadAdminData();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Impossible de supprimer le produit.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    categories,
    products,
    loading,
    saving,
    error,
    message,
    setError,
    loadAdminData,
    saveCategory,
    saveProduct,
    deleteCategory,
    deleteProduct,
  };
}
