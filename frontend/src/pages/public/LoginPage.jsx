/**
 * Page LoginPage - Connexion à l'application
 *
 * Formulaire de connexion avec :
 * - Email + mot de passe
 * - Gestion des erreurs API
 * - Redirection selon le rôle après connexion
 * - Lien vers l'inscription
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate  = useNavigate();

  // État du formulaire
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError]       = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Met à jour un champ du formulaire
   * On réutilise la même fonction pour tous les champs grâce à e.target.name
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Effacer l'erreur quand l'utilisateur recommence à taper
  }

  /**
   * Soumet le formulaire de connexion
   */
  async function handleSubmit(e) {
    e.preventDefault(); // Empêcher le rechargement de page (comportement par défaut du form)
    setIsLoading(true);
    setError('');

    try {
      const user = await login(formData.email, formData.password);

      // Rediriger selon le rôle
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'bibliothecaire') {
        navigate('/bibliothecaire');
      } else {
        navigate('/mon-compte');
      }
    } catch (err) {
      setError(err.message || 'Email ou mot de passe incorrect.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">

        {/* En-tête */}
        <div className="text-center mb-8">
          <span className="text-4xl">📚</span>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Connexion</h1>
          <p className="text-gray-500 text-sm mt-1">
            Accédez à votre espace bibliothèque
          </p>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm"
          >
            {error}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Champ Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Adresse email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-required="true"
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Votre mot de passe"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-required="true"
            />
          </div>

          {/* Bouton de connexion */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        {/* Liens de navigation */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Pas encore de compte ?{' '}
          <Link to="/inscription" className="text-blue-600 hover:underline font-medium">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
