/**
 * Service UserService - Gestion des utilisateurs
 *
 * Fonctions :
 * - getAllUsers() : GET /api/users (bibliothécaire/admin uniquement)
 * - getUserById(id) : GET /api/users/:id
 * - updateUser(id, userData) : PUT /api/users/:id
 * - deleteUser(id) : DELETE /api/users/:id
 * - activateUser(id) : PUT /api/users/:id/activate
 * - suspendUser(id) : PUT /api/users/:id/suspend
 * - exportMyData() : GET /api/users/export-my-data (RGPD)
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const userService = {
  // TODO: Implémenter toutes les fonctions
};
