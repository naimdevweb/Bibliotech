/**
 * Hook useBooks - Gestion de l'état des livres dans les composants
 *
 * Encapsule la logique de chargement + gestion des états (loading/error).
 *
 * Exemple d'utilisation :
 * const { books, pagination, isLoading, error, fetchBooks, searchBooks } = useBooks();
 */

import { useState, useCallback } from 'react';
import { bookService } from '../services/api/bookService';

export function useBooks() {
  const [books, setBooks]           = useState([]);
  const [pagination, setPagination] = useState(null); // Données de pagination Laravel
  const [isLoading, setIsLoading]   = useState(false);
  const [error, setError]           = useState(null);

  /**
   * Récupère les livres avec filtres et pagination
   *
   * @param {number} page    - Numéro de page
   * @param {Object} filters - Filtres optionnels
   */
  const fetchBooks = useCallback(async (page = 1, filters = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await bookService.getAllBooks(page, 20, filters);

      // La réponse Laravel paginée contient : data, current_page, last_page, total...
      setBooks(data.data);
      setPagination({
        currentPage : data.current_page,
        lastPage    : data.last_page,
        total       : data.total,
        perPage     : data.per_page,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Recherche des livres par mot-clé
   *
   * @param {string} query - Terme de recherche
   */
  const searchBooks = useCallback(async (query) => {
    if (query.length < 2) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await bookService.searchBooks(query);
      setBooks(data.data);
      setPagination({
        currentPage : data.current_page,
        lastPage    : data.last_page,
        total       : data.total,
        perPage     : data.per_page,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    books,
    pagination,
    isLoading,
    error,
    fetchBooks,
    searchBooks,
  };
}
