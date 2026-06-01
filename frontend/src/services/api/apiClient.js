/**
 * apiClient - Helper HTTP partagé par tous les services
 *
 * Centralise :
 * - L'URL de base de l'API (depuis variable d'environnement)
 * - Les headers d'authentification (token Bearer)
 * - La gestion des erreurs HTTP
 *
 * Utilisation dans un service :
 *   import { apiRequest } from './apiClient';
 *   const data = await apiRequest('/books');
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Construit les headers avec le token Bearer si l'utilisateur est connecté
 * @returns {Object} Headers HTTP
 */
function buildHeaders() {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**
 * Effectue une requête HTTP et gère les erreurs de manière uniforme
 *
 * @param {string} endpoint - URL relative (ex: '/books')
 * @param {Object} options  - Options fetch (method, body, etc.)
 * @returns {Promise<any>}  - Les données JSON de la réponse
 * @throws {Error}          - Message d'erreur lisible pour l'utilisateur
 */
export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: { ...buildHeaders(), ...options.headers },
  });

  // Réponse vide (ex : 204 No Content après un DELETE)
  if (response.status === 204) return null;

  const data = await response.json();

  if (!response.ok) {
    // Utilise le message du serveur si disponible, sinon message générique
    throw new Error(data.message || `Erreur HTTP ${response.status}`);
  }

  return data;
}
