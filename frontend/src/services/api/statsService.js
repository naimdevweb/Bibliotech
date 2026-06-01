/**
 * Service statsService - Appels API pour les statistiques (admin uniquement)
 */

import { apiRequest } from './apiClient';

export const statsService = {
  /**
   * Récupère les indicateurs clés (KPI) : adhérents, livres, emprunts, retards
   * @returns {Promise<Object>}
   */
  getKPIs() {
    return apiRequest('/stats/dashboard');
  },

  /**
   * Statistiques sur les livres (répartition par genre, jamais empruntés)
   * @returns {Promise<Object>}
   */
  getBooksStats() {
    return apiRequest('/stats/books');
  },

  /**
   * Statistiques sur les emprunts (évolution par mois, top 10 livres)
   * @returns {Promise<Object>}
   */
  getLoansStats() {
    return apiRequest('/stats/loans');
  },

  /**
   * Statistiques sur les utilisateurs (actifs, inactifs)
   * @returns {Promise<Object>}
   */
  getUsersStats() {
    return apiRequest('/stats/users');
  },
};
