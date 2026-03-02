/**
 * Composant Header - Barre de navigation principale
 *
 * Affiche différents menus selon le rôle de l'utilisateur :
 * - Non connecté : Accueil, Catalogue, Connexion, S'inscrire
 * - Lecteur connecté : Accueil, Catalogue, Mon compte (dropdown)
 * - Bibliothécaire : + lien Espace bibliothécaire
 * - Admin : + lien Administration
 */

import { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // État du menu mobile (hamburger)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // État du dropdown "Mon compte"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /** Déconnecte et redirige vers l'accueil */
  async function handleLogout() {
    await logout();
    navigate('/');
  }

  /** Classes CSS pour les liens actifs (React Router NavLink) */
  function navLinkClass({ isActive }) {
    return isActive
      ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1'
      : 'text-gray-600 hover:text-blue-600 transition-colors';
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo / Nom de la bibliothèque */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="font-bold text-gray-800 text-lg hidden sm:block">
              Bibliothèque Municipale
            </span>
            <span className="font-bold text-gray-800 text-lg sm:hidden">
              Biblio
            </span>
          </Link>

          {/* Navigation principale (desktop) */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/"          end className={navLinkClass}>Accueil</NavLink>
            <NavLink to="/catalogue"     className={navLinkClass}>Catalogue</NavLink>

            {/* Lien bibliothécaire */}
            {isAuthenticated && user?.role === USER_ROLES.BIBLIOTHECAIRE && (
              <NavLink to="/bibliothecaire" className={navLinkClass}>
                Espace bibliothécaire
              </NavLink>
            )}

            {/* Lien admin */}
            {isAuthenticated && user?.role === USER_ROLES.ADMIN && (
              <NavLink to="/admin" className={navLinkClass}>
                Administration
              </NavLink>
            )}
          </nav>

          {/* Zone utilisateur (droite) */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              /* Utilisateur connecté : dropdown Mon compte */
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {user?.first_name?.[0]?.toUpperCase()}
                  </span>
                  <span className="text-sm font-medium">{user?.first_name}</span>
                  <span className="text-xs text-gray-400">▼</span>
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                    <Link
                      to="/mon-compte"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Mon tableau de bord
                    </Link>
                    <Link
                      to="/mon-compte/emprunts"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Mes emprunts
                    </Link>
                    <Link
                      to="/mon-compte/reservations"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Mes réservations
                    </Link>
                    <Link
                      to="/mon-compte/profil"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Mon profil
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Utilisateur non connecté : boutons Connexion / Inscription */
              <>
                <Link
                  to="/connexion"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Se connecter
                </Link>
                <Link
                  to="/inscription"
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  S&apos;inscrire
                </Link>
              </>
            )}
          </div>

          {/* Bouton hamburger (mobile) */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu de navigation"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Menu mobile (déroulant) */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-3">
            <NavLink to="/" end className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Accueil
            </NavLink>
            <NavLink to="/catalogue" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Catalogue
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink to="/mon-compte" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  Mon compte
                </NavLink>
                <button onClick={handleLogout} className="text-left text-red-600 text-sm">
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <NavLink to="/connexion"   className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Se connecter</NavLink>
                <NavLink to="/inscription" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>S&apos;inscrire</NavLink>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
