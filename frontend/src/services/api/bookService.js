/**
 * Service bookService - Appels API pour la gestion des livres
 *
 * Fonctions publiques (sans token) : getAllBooks, getBookById, searchBooks
 * Fonctions protégées (token requis) : createBook, updateBook, deleteBook
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/** Construit les headers HTTP (avec token si disponible) */
function getHeaders(withAuth = false) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (withAuth) {
    const token = localStorage.getItem('auth_token');
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

/** Gère les erreurs de réponse HTTP uniformément */
async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue.');
  }
  return data;
}

export const bookService = {
  /**
   * Récupère la liste paginée des livres avec filtres optionnels
   *
   * @param {number} page    - Numéro de page (défaut 1)
   * @param {number} limit   - Résultats par page (défaut 20)
   * @param {Object} filters - Filtres { genre, available, publication_year }
   * @returns {Promise<Object>} Réponse paginée Laravel
   */
  async getAllBooks(page = 1, limit = 20, filters = {}) {
    const params = new URLSearchParams({ page, limit, ...filters });
    const response = await fetch(`${API_URL}/books?${params}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  /**
   * Récupère le détail d'un livre par son ID
   *
   * @param {number} id - Identifiant du livre
   * @returns {Promise<{book: Object}>}
   */
  async getBookById(id) {
    const response = await fetch(`${API_URL}/books/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  /**
   * Recherche des livres par titre, auteur ou ISBN
   *
   * @param {string} query - Terme de recherche (min 2 caractères)
   * @param {number} limit - Nombre de résultats
   * @returns {Promise<Object>} Résultats paginés
   */
  async searchBooks(query, limit = 20) {
    const params = new URLSearchParams({ q: query, limit });
    const response = await fetch(`${API_URL}/books/search?${params}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  /**
   * Crée un nouveau livre (bibliothécaire uniquement)
   *
   * @param {Object} bookData - Données du livre
   * @returns {Promise<{book: Object}>}
   */
  async createBook(bookData) {
    const response = await fetch(`${API_URL}/books`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(bookData),
    });
    return handleResponse(response);
  },

  /**
   * Met à jour un livre (bibliothécaire uniquement)
   *
   * @param {number} id       - Identifiant du livre
   * @param {Object} bookData - Données à mettre à jour
   * @returns {Promise<{book: Object}>}
   */
  async updateBook(id, bookData) {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(bookData),
    });
    return handleResponse(response);
  },

  /**
   * Supprime un livre (bibliothécaire uniquement)
   *
   * @param {number} id - Identifiant du livre
   * @returns {Promise<{message: string}>}
   */
  async deleteBook(id) {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },
};
