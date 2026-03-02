/**
 * Hook useAuth - Accès au contexte d'authentification
 *
 * Raccourci pour utiliser l'AuthContext dans n'importe quel composant.
 *
 * Exemple d'utilisation :
 * const { user, isAuthenticated, login, logout } = useAuth();
 *
 * @returns {Object} { user, isAuthenticated, isLoading, login, logout, register }
 * @throws {Error} Si utilisé en dehors d'un AuthProvider
 */

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un <AuthProvider>');
  }

  return context;
}
