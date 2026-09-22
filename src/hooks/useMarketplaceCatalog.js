import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const defaultFilters = {
  search: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  sort: "createdAt_desc",
};

const buildProductParams = (filters, page) => {
  const params = {
    page,
    limit: 12,
    sort: filters.sort,
  };

  if (filters.search.trim()) {
    params.search = filters.search.trim();
  }

  if (filters.category) {
    params.category = filters.category;
  }

  if (filters.minPrice !== "") {
    params.minPrice = filters.minPrice;
  }

  if (filters.maxPrice !== "") {
    params.maxPrice = filters.maxPrice;
  }

  return params;
};

export function useMarketplaceCatalog() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productParams = useMemo(
    () => buildProductParams(appliedFilters, page),
    [appliedFilters, page]
  );

  useEffect(() => {
    let ignore = false;

    const loadCategories = async () => {
      try {
        const response = await api.get("/categories");

        if (!ignore) {
          setCategories(response.data.categories || []);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    loadCategories();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/products", {
          params: productParams,
          signal: controller.signal,
        });

        if (!ignore) {
          setProducts(response.data.products || []);
          setPagination(
            response.data.pagination || {
              page,
              limit: 12,
              total: 0,
              totalPages: 1,
            }
          );
        }
      } catch (err) {
        if (!ignore && err.code !== "ERR_CANCELED") {
          setError(err.response?.data?.message || "Impossible de charger les produits.");
          setProducts([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [page, productParams]);

  const updateDraftFilter = (name, value) => {
    setDraftFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    setAppliedFilters({
      ...draftFilters,
      search: draftFilters.search.trim(),
    });
    setPage(1);
  };

  const applyCategoryFilter = (categoryId) => {
    setDraftFilters((current) => ({
      ...current,
      category: categoryId,
    }));
    setAppliedFilters((current) => ({
      ...current,
      category: categoryId,
    }));
    setPage(1);
  };

  const resetFilters = () => {
    setDraftFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setPage(1);
  };

  const updateSearch = (value) => {
    updateDraftFilter("search", value);
  };

  return {
    applyCategoryFilter,
    applyFilters,
    categories,
    draftFilters,
    error,
    loading,
    page,
    pagination,
    products,
    resetFilters,
    setPage,
    updateDraftFilter,
    updateSearch,
  };
}
