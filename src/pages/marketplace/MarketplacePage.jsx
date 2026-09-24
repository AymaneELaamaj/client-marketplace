import { RefreshCw } from "lucide-react";
import CategoryFilter from "../../components/marketplace/CategoryFilter";
import MarketplacePagination from "../../components/marketplace/MarketplacePagination";
import ProductFilters from "../../components/marketplace/ProductFilters";
import ProductGrid from "../../components/marketplace/ProductGrid";
import SearchBar from "../../components/marketplace/SearchBar";
import { useMarketplaceCatalog } from "../../hooks/useMarketplaceCatalog";

export default function MarketplacePage() {
  const {
    applyCategoryFilter,
    applyFilters,
    categories,
    draftFilters,
    error,
    loading,
    pagination,
    products,
    resetFilters,
    setPage,
    updateDraftFilter,
    updateSearch,
  } = useMarketplaceCatalog();

  return (
    <section className="marketplace-page">
      <div className="marketplace-heading">
        <div>
          
          <h1>Marketplace</h1>
        </div>
        <p className="marketplace-count">
          {pagination.total} produit{pagination.total > 1 ? "s" : ""}
        </p>
      </div>

      <SearchBar
        value={draftFilters.search}
        onChange={updateSearch}
        onSubmit={applyFilters}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={draftFilters.category}
        onChange={applyCategoryFilter}
      />

      <ProductFilters
        filters={draftFilters}
        onChange={updateDraftFilter}
        onApply={applyFilters}
        onReset={resetFilters}
      />

      {error && (
        <div className="marketplace-alert" role="alert">
          <span>{error}</span>
          <button type="button" onClick={resetFilters}>
            <RefreshCw size={18} />
            Reessayer
          </button>
        </div>
      )}

      <ProductGrid loading={loading} products={products} />

      <MarketplacePagination
        error={error}
        loading={loading}
        onPageChange={setPage}
        pagination={pagination}
      />
    </section>
  );
}
