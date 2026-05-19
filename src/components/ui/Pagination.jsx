import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="p-2 rounded-xl glass disabled:opacity-40 hover:glow-hover"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={`min-w-[40px] h-10 rounded-xl font-medium transition-all ${
            p === page ? 'btn-gradient' : 'glass hover:glow-hover'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="p-2 rounded-xl glass disabled:opacity-40 hover:glow-hover"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
