/**
 * Service reservationService - Appels API pour les réservations
 */

import { apiRequest } from './apiClient';

export const reservationService = {
  /**
   * Récupère les réservations de l'utilisateur connecté
   * @returns {Promise<{data: Array}>}
   */
  getMyReservations() {
    return apiRequest('/reservations/my-reservations');
  },

  /**
   * Crée une réservation pour un livre
   * @param {number} bookId
   * @returns {Promise<{reservation: Object}>}
   */
  createReservation(bookId) {
    return apiRequest('/reservations', {
      method: 'POST',
      body: JSON.stringify({ book_id: bookId }),
    });
  },

  /**
   * Annule une réservation
   * @param {number} reservationId
   * @returns {Promise<null>}
   */
  cancelReservation(reservationId) {
    return apiRequest(`/reservations/${reservationId}`, { method: 'DELETE' });
  },

  /**
   * Récupère la file d'attente pour un livre (bibliothécaire)
   * @param {number} bookId
   * @returns {Promise<{data: Array}>}
   */
  getQueue(bookId) {
    return apiRequest(`/reservations/queue/${bookId}`);
  },
};
