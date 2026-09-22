import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MarketplacePagination({ loading, error, pagination, onPageChange }) {
  const canGoBackward = pagination.page > 1;
  const canGoForward = pagination.page < pagination.totalPages;

  if (loading || error || pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="marketplace-pagination">
      <button
        type="button"
        onClick={() => onPageChange((current) => Math.max(current - 1, 1))}
        disabled={!canGoBackward}
        aria-label="Page precedente"
      >
        <ChevronLeft size={18} />
      </button>

      <span>
        Page {pagination.page} / {pagination.totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange((current) => Math.min(current + 1, pagination.totalPages))}
        disabled={!canGoForward}
        aria-label="Page suivante"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
