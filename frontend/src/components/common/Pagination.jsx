/**
 * Composant Pagination - Navigation entre les pages de résultats
 *
 * Affiche toujours la 1ère page, la dernière, et les voisines de la page courante.
 * Insère "..." pour les sauts de pages.
 *
 * @param {number}   currentPage  - Page courante (commence à 1)
 * @param {number}   totalPages   - Nombre total de pages
 * @param {Function} onPageChange - Appelée avec le numéro de la nouvelle page
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  /**
   * Construit la liste ordonnée des numéros de pages à afficher,
   * avec '...' pour les écarts (ex: [1, '...', 4, 5, 6, '...', 20])
   */
  function getPageNumbers() {
    const pageSet = new Set([1, totalPages]);
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pageSet.add(i);
    }
    const sorted = [...pageSet].sort((a, b) => a - b);

    const result = [];
    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('...');
      result.push(sorted[i]);
    }
    return result;
  }

  const pages = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-1 mt-6" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Page précédente"
      >
        ←
      </button>

      {pages.map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">…</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`px-3 py-2 text-sm rounded-lg border ${
              page === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Page suivante"
      >
        →
      </button>
    </nav>
  );
}
