/**
 * Service userService - Appels API pour la gestion des utilisateurs
 */

import { apiRequest } from './apiClient';

export const userService = {
  /**
   * Récupère la liste des utilisateurs (bibliothécaire/admin)
   * @param {Object} params - Filtres : role, status, search, page
   * @returns {Promise<Object>}
   */
  getAllUsers(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/users${query ? `?${query}` : ''}`);
  },

  /**
   * Récupère un utilisateur par son ID
   * @param {number} userId
   * @returns {Promise<{user: Object}>}
   */
  getUserById(userId) {
    return apiRequest(`/users/${userId}`);
  },

  /**
   * Met à jour les informations d'un utilisateur
   * @param {number} userId
   * @param {Object} userData - Champs à modifier
   * @returns {Promise<{user: Object}>}
   */
  updateUser(userId, userData) {
    return apiRequest(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Supprime un compte (RGPD) — uniquement si aucun emprunt actif
   * @param {number} userId
   * @returns {Promise<null>}
   */
  deleteUser(userId) {
    return apiRequest(`/users/${userId}`, { method: 'DELETE' });
  },

  /**
   * Active un compte en attente de validation (bibliothécaire)
   * @param {number} userId
   * @returns {Promise<{user: Object}>}
   */
  activateUser(userId) {
    return apiRequest(`/users/${userId}/activate`, { method: 'PUT' });
  },

  /**
   * Suspend un compte (bibliothécaire)
   * @param {number} userId
   * @returns {Promise<{user: Object}>}
   */
  suspendUser(userId) {
    return apiRequest(`/users/${userId}/suspend`, { method: 'PUT' });
  },

  /**
   * Exporte les données personnelles de l'utilisateur connecté (RGPD)
   * @returns {Promise<Object>} JSON avec toutes les données
   */
  exportMyData() {
    return apiRequest('/users/export-my-data');
  },
};
