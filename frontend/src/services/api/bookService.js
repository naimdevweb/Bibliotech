/**
 * Service BookService - Gestion des livres
 *
 * Fonctions :
 * - getAllBooks(page, limit, filters) : GET /api/books
 * - getBookById(id) : GET /api/books/:id
 * - searchBooks(query) : GET /api/books/search?q=...
 * - createBook(bookData) : POST /api/books (bibliothécaire uniquement)
 * - updateBook(id, bookData) : PUT /api/books/:id
 * - deleteBook(id) : DELETE /api/books/:id
 * - importBooksCSV(file) : POST /api/books/import
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const bookService = {
  // TODO: Implémenter toutes les fonctions
};
