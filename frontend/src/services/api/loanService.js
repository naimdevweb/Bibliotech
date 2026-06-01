/**
 * Service loanService - Appels API pour la gestion des emprunts
 *
 * Toutes les routes nécessitent un token Bearer (utilisateur connecté).
 */

import { apiRequest } from './apiClient';

export const loanService = {
  /**
   * Récupère les emprunts de l'utilisateur connecté
   * @returns {Promise<{data: Array}>}
   */
  getMyLoans() {
    return apiRequest('/loans/my-loans');
  },

  /**
   * Récupère tous les emprunts (bibliothécaire/admin)
   * @param {Object} params - Filtres : status, page
   * @returns {Promise<Object>}
   */
  getAllLoans(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/loans${query ? `?${query}` : ''}`);
  },

  /**
   * Récupère les emprunts en retard (bibliothécaire/admin)
   * @returns {Promise<{data: Array}>}
   */
  getOverdueLoans() {
    return apiRequest('/loans/overdue');
  },

  /**
   * Crée un emprunt (le bibliothécaire enregistre le prêt physique)
   * @param {number} userId
   * @param {number} bookId
   * @returns {Promise<{loan: Object}>}
   */
  createLoan(userId, bookId) {
    return apiRequest('/loans', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, book_id: bookId }),
    });
  },

  /**
   * Enregistre le retour d'un livre (bibliothécaire)
   * @param {number} loanId
   * @returns {Promise<{loan: Object}>}
   */
  returnBook(loanId) {
    return apiRequest(`/loans/${loanId}/return`, { method: 'PUT' });
  },

  /**
   * Prolonge un emprunt de 21 jours (3 fois maximum)
   * @param {number} loanId
   * @returns {Promise<{loan: Object}>}
   */
  extendLoan(loanId) {
    return apiRequest(`/loans/${loanId}/extend`, { method: 'PUT' });
  },
};
