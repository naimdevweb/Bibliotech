/**
 * Context AuthContext - Gestion globale de l'état d'authentification
 *
 * Ce contexte est "wrappé" autour de toute l'application dans main.jsx.
 * N'importe quel composant peut accéder aux données auth avec le hook useAuth().
 *
 * Données exposées :
 * - user         : objet utilisateur connecté (ou null)
 * - isAuthenticated : booléen, vrai si l'utilisateur est connecté
 * - isLoading    : booléen, vrai pendant la vérification du token au démarrage
 * - login()      : fonction de connexion
 * - logout()     : fonction de déconnexion
 * - register()   : fonction d'inscription
 */

import { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api/authService';

// Créer le contexte (valeur initiale null, sera remplie par AuthProvider)
export const AuthContext = createContext(null);

/**
 * AuthProvider - Composant qui fournit le contexte d'auth à toute l'app
 *
 * @param {React.ReactNode} children - Les composants enfants
 */
export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true au démarrage : on vérifie le token

  // Au chargement de l'app : vérifier si un token valide existe en localStorage
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('auth_token');

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        // Vérifier la validité du token auprès du serveur
        const data = await authService.getCurrentUser();
        setUser(data.user);
      } catch {
        // Token invalide ou expiré : on réinitialise
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []); // [] = s'exécute une seule fois au montage du composant

  /**
   * Connecte un utilisateur et met à jour le state
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} L'utilisateur connecté
   */
  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.user);
    return data.user;
  }, []);

  /**
   * Inscrit un nouvel utilisateur
   *
   * @param {Object} userData
   * @returns {Promise<Object>} L'utilisateur créé
   */
  const register = useCallback(async (userData) => {
    const data = await authService.register(userData);
    setUser(data.user);
    return data.user;
  }, []);

  /**
   * Déconnecte l'utilisateur et réinitialise le state
   */
  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  // Valeur exposée à tous les composants enfants
  const contextValue = {
    user,
    isAuthenticated: !!user, // !! convertit null/undefined en false, objet en true
    isLoading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
