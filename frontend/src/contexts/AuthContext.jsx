/**
 * Context AuthContext - Gestion globale de l'authentification
 *
 * Fournit à toute l'application :
 * - user : utilisateur connecté (avec rôle)
 * - isAuthenticated : booléen
 * - isLoading : booléen (vérification du token au chargement)
 * - login(email, password) : fonction de connexion
 * - logout() : fonction de déconnexion
 * - register(userData) : fonction d'inscription
 *
 * Stocke le token JWT dans localStorage
 */

import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // TODO: Implémenter la logique d'authentification
  // - Vérifier le token au chargement (localStorage)
  // - Appeler authService.getCurrentUser()
  // - Stocker user dans le state

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}
