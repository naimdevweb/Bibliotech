/**
 * Service authService - Appels API pour l'authentification
 *
 * Toutes les fonctions renvoient la réponse JSON du serveur.
 * Le token est stocké/retiré du localStorage à chaque action.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Fonction utilitaire : retourne les headers avec le token Bearer si disponible
 *
 * @returns {Object} Headers HTTP à inclure dans chaque requête
 */
function getAuthHeaders() {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const authService = {
  /**
   * Connecte un utilisateur
   *
   * Stocke le token reçu dans le localStorage pour les requêtes suivantes.
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{user: Object, token: string}>}
   */
  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur de connexion.');
    }

    // Stocker le token pour les prochaines requêtes authentifiées
    localStorage.setItem('auth_token', data.token);

    return data;
  },

  /**
   * Inscrit un nouveau lecteur
   *
   * @param {Object} userData { first_name, last_name, email, password, phone?, address? }
   * @returns {Promise<{user: Object, token: string}>}
   */
  async register(userData) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de l'inscription.");
    }

    localStorage.setItem('auth_token', data.token);

    return data;
  },

  /**
   * Déconnecte l'utilisateur (révoque le token côté serveur)
   *
   * @returns {Promise<void>}
   */
  async logout() {
    const token = localStorage.getItem('auth_token');

    if (token) {
      // On essaie de révoquer côté serveur, mais on ne bloque pas si ça échoue
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders(),
      }).catch(() => {});
    }

    // Supprimer le token localement dans tous les cas
    localStorage.removeItem('auth_token');
  },

  /**
   * Récupère le profil de l'utilisateur actuellement connecté
   *
   * Appelé au chargement de l'app pour restaurer la session.
   *
   * @returns {Promise<{user: Object}>}
   */
  async getCurrentUser() {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      // Token invalide ou expiré : on nettoie le localStorage
      localStorage.removeItem('auth_token');
      throw new Error('Session expirée, veuillez vous reconnecter.');
    }

    return response.json();
  },
};
