/**
 * Composant principal App - Configuration du routage de l'application
 *
 * Architecture des routes :
 *
 * Routes publiques (accessibles sans connexion) :
 *   /               → HomePage
 *   /catalogue      → CatalogPage
 *   /livre/:id      → BookDetailsPage
 *   /connexion      → LoginPage
 *   /inscription    → RegisterPage
 *
 * Routes utilisateur connecté :
 *   /mon-compte           → DashboardPage
 *   /mon-compte/emprunts  → MyLoansPage
 *   /mon-compte/reservations → MyReservationsPage
 *   /mon-compte/profil    → MyProfilePage
 *
 * Routes bibliothécaire :
 *   /bibliothecaire/          → LibrarianDashboardPage
 *   /bibliothecaire/livres    → ManageBooksPage
 *   /bibliothecaire/emprunts  → ManageLoansPage
 *   /bibliothecaire/adherents → ManageUsersPage
 *
 * Routes admin :
 *   /admin/       → AdminDashboardPage
 *   /admin/stats  → StatsPage
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages publiques
import HomePage        from './pages/public/HomePage';
import CatalogPage     from './pages/public/CatalogPage';
import BookDetailsPage from './pages/public/BookDetailsPage';
import LoginPage       from './pages/public/LoginPage';
import RegisterPage    from './pages/public/RegisterPage';

// Pages utilisateur connecté
import DashboardPage      from './pages/user/DashboardPage';
import MyLoansPage        from './pages/user/MyLoansPage';
import MyReservationsPage from './pages/user/MyReservationsPage';
import MyProfilePage      from './pages/user/MyProfilePage';

// Pages bibliothécaire
import LibrarianDashboardPage from './pages/librarian/LibrarianDashboardPage';
import ManageBooksPage        from './pages/librarian/ManageBooksPage';
import ManageLoansPage        from './pages/librarian/ManageLoansPage';
import ManageUsersPage        from './pages/librarian/ManageUsersPage';

// Pages admin
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import StatsPage          from './pages/admin/StatsPage';

/**
 * Composant de protection des routes privées
 *
 * Redirige vers /connexion si l'utilisateur n'est pas authentifié.
 * Redirige vers l'accueil si l'utilisateur n'a pas le bon rôle.
 *
 * @param {React.ReactNode} children - La page à protéger
 * @param {string[]}        roles    - Rôles autorisés (vide = tout utilisateur connecté)
 */
function PrivateRoute({ children, roles = [] }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Attendre la fin de la vérification du token
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  // Non connecté : rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />;
  }

  // Rôle insuffisant : rediriger vers l'accueil
  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

/**
 * AppRoutes - Définit toutes les routes de l'application
 *
 * Séparé de App pour pouvoir utiliser le hook useAuth()
 * (qui nécessite d'être dans un enfant de AuthProvider)
 */
function AppRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <Routes>
          {/* Routes publiques */}
          <Route path="/"            element={<HomePage />} />
          <Route path="/catalogue"   element={<CatalogPage />} />
          <Route path="/livre/:id"   element={<BookDetailsPage />} />
          <Route path="/connexion"   element={<LoginPage />} />
          <Route path="/inscription" element={<RegisterPage />} />

          {/* Routes utilisateur connecté (tous les rôles) */}
          <Route path="/mon-compte" element={
            <PrivateRoute><DashboardPage /></PrivateRoute>
          } />
          <Route path="/mon-compte/emprunts" element={
            <PrivateRoute><MyLoansPage /></PrivateRoute>
          } />
          <Route path="/mon-compte/reservations" element={
            <PrivateRoute><MyReservationsPage /></PrivateRoute>
          } />
          <Route path="/mon-compte/profil" element={
            <PrivateRoute><MyProfilePage /></PrivateRoute>
          } />

          {/* Routes bibliothécaire */}
          <Route path="/bibliothecaire" element={
            <PrivateRoute roles={['bibliothecaire', 'admin']}>
              <LibrarianDashboardPage />
            </PrivateRoute>
          } />
          <Route path="/bibliothecaire/livres" element={
            <PrivateRoute roles={['bibliothecaire', 'admin']}>
              <ManageBooksPage />
            </PrivateRoute>
          } />
          <Route path="/bibliothecaire/emprunts" element={
            <PrivateRoute roles={['bibliothecaire', 'admin']}>
              <ManageLoansPage />
            </PrivateRoute>
          } />
          <Route path="/bibliothecaire/adherents" element={
            <PrivateRoute roles={['bibliothecaire', 'admin']}>
              <ManageUsersPage />
            </PrivateRoute>
          } />

          {/* Routes admin */}
          <Route path="/admin" element={
            <PrivateRoute roles={['admin']}>
              <AdminDashboardPage />
            </PrivateRoute>
          } />
          <Route path="/admin/stats" element={
            <PrivateRoute roles={['admin']}>
              <StatsPage />
            </PrivateRoute>
          } />

          {/* 404 : rediriger vers l'accueil */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

/**
 * App - Composant racine
 *
 * Wrapping dans l'ordre :
 * 1. BrowserRouter (React Router)
 * 2. AuthProvider (contexte d'auth global)
 * 3. AppRoutes (les pages)
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
