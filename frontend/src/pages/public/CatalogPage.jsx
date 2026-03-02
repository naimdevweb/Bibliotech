/**
 * Page CatalogPage - Catalogue complet des livres
 *
 * Fonctionnalités :
 * - Recherche full-text en temps réel (debounce 500ms)
 * - Filtres : genre, disponibilité
 * - Pagination
 * - Affichage du nombre de résultats
 */

import { useEffect, useState, useCallback } from 'react';
import { useBooks } from '../../hooks/useBooks';
import { BOOK_GENRES } from '../../utils/constants';
import BookCard from '../../components/books/BookCard';
import SearchBar from '../../components/books/SearchBar';

export default function CatalogPage() {
  const { books, pagination, isLoading, error, fetchBooks, searchBooks } = useBooks();

  // État des filtres actifs
  const [filters, setFilters] = useState({
    genre:     '',
    available: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Chargement initial et rechargement sur changement de filtres/page
  useEffect(() => {
    if (searchQuery.length >= 2) {
      searchBooks(searchQuery);
    } else {
      const activeFilters = {
        ...(filters.genre     && { genre: filters.genre }),
        ...(filters.available && { available: true }),
      };
      fetchBooks(currentPage, activeFilters);
    }
  }, [filters, currentPage, searchQuery, fetchBooks, searchBooks]);

  /**
   * Gère la recherche : si >= 2 caractères → search, sinon → liste normale
   */
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Revenir à la page 1 à chaque nouvelle recherche
  }, []);

  /**
   * Met à jour un filtre et revient à la page 1
   */
  function handleFilterChange(filterName, value) {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
    setSearchQuery(''); // Réinitialiser la recherche quand on filtre
  }

  /** Réinitialise tous les filtres */
  function resetFilters() {
    setFilters({ genre: '', available: false });
    setCurrentPage(1);
    setSearchQuery('');
  }

  const hasActiveFilters = filters.genre || filters.available;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* En-tête de la page */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Catalogue</h1>
        <p className="text-gray-500">
          Explorez notre collection de livres
          {pagination && (
            <span className="font-medium text-gray-700"> · {pagination.total.toLocaleString()} livres</span>
          )}
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex flex-col md:flex-row gap-6">

        {/* ---------------------------------------------------------------- */}
        {/* Panneau de filtres (sidebar gauche)                               */}
        {/* ---------------------------------------------------------------- */}
        <aside className="md:w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-700 text-sm">Filtres</h2>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Filtre genre */}
            <div className="mb-4">
              <label htmlFor="genre-filter" className="block text-xs font-medium text-gray-600 mb-2">
                Genre
              </label>
              <select
                id="genre-filter"
                value={filters.genre}
                onChange={e => handleFilterChange('genre', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tous les genres</option>
                {BOOK_GENRES.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Filtre disponibilité */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.available}
                  onChange={e => handleFilterChange('available', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300"
                />
                <span className="text-sm text-gray-600">Disponibles uniquement</span>
              </label>
            </div>
          </div>
        </aside>

        {/* ---------------------------------------------------------------- */}
        {/* Grille de livres (zone principale)                               */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex-grow">

          {/* Message d'erreur */}
          {error && (
            <div role="alert" className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-4 text-sm">
              Erreur : {error}
            </div>
          )}

          {/* État : chargement */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-48 mb-3" />
                  <div className="bg-gray-200 rounded h-3 mb-2" />
                  <div className="bg-gray-200 rounded h-3 w-2/3" />
                </div>
              ))}
            </div>
          )}

          {/* État : aucun résultat */}
          {!isLoading && books.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <span className="text-5xl block mb-4">🔍</span>
              <p className="font-medium">Aucun livre trouvé</p>
              <p className="text-sm mt-1">Essayez d&apos;autres mots-clés ou modifiez vos filtres.</p>
              {hasActiveFilters && (
                <button onClick={resetFilters} className="mt-4 text-blue-600 hover:underline text-sm">
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          )}

          {/* Grille des livres */}
          {!isLoading && books.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {books.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.lastPage > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Précédent
                  </button>

                  <span className="text-sm text-gray-500 px-4">
                    Page {pagination.currentPage} / {pagination.lastPage}
                  </span>

                  <button
                    onClick={() => setCurrentPage(p => Math.min(pagination.lastPage, p + 1))}
                    disabled={currentPage === pagination.lastPage}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Suivant →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
