/**
 * Service StatsService - Statistiques (admin uniquement)
 *
 * Fonctions :
 * - getKPIs() : GET /api/stats/kpis
 * - getLoansByMonth() : GET /api/stats/loans-by-month
 * - getTopBooks(limit) : GET /api/stats/top-books?limit=10
 * - getBooksByGenre() : GET /api/stats/books-by-genre
 * - getNeverBorrowedBooks() : GET /api/stats/never-borrowed
 * - getInactiveUsers() : GET /api/stats/inactive-users
 * - exportStats(format) : GET /api/stats/export?format=pdf
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const statsService = {
  // TODO: Implémenter toutes les fonctions
};
