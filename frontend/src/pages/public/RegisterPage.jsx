/**
 * Page RegisterPage - Inscription d'un nouveau lecteur
 *
 * Formulaire avec validation RGPD :
 * - Prénom, Nom, Email, Mot de passe, Confirmation
 * - Téléphone, Adresse (optionnels)
 * - Checkbox d'acceptation des CGU obligatoire
 * - Validation force mot de passe (8+ chars, maj, chiffre, spécial)
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Vérifie la force du mot de passe
 * Retourne un tableau des règles non respectées (vide = mot de passe valide)
 *
 * @param {string} password
 * @returns {string[]}
 */
function getPasswordErrors(password) {
  const errors = [];
  if (password.length < 8)           errors.push('8 caractères minimum');
  if (!/[A-Z]/.test(password))       errors.push('une lettre majuscule');
  if (!/[0-9]/.test(password))       errors.push('un chiffre');
  if (!/[@$!%*?&]/.test(password))   errors.push('un caractère spécial (@$!%*?&)');
  return errors;
}

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate     = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name:  '',
    email:      '',
    password:   '',
    password_confirmation: '',
    phone:      '',
    address:    '',
    acceptCgu:  false,
  });

  const [errors, setErrors]     = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  /** Validation côté client avant envoi */
  function validate() {
    const newErrors = {};

    if (!formData.first_name || formData.first_name.length < 2) {
      newErrors.first_name = 'Le prénom doit contenir au moins 2 caractères.';
    }
    if (!formData.last_name || formData.last_name.length < 2) {
      newErrors.last_name = 'Le nom doit contenir au moins 2 caractères.';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide.';
    }

    const passwordErrors = getPasswordErrors(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = `Le mot de passe doit contenir : ${passwordErrors.join(', ')}.`;
    }
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Les mots de passe ne correspondent pas.';
    }
    if (!formData.acceptCgu) {
      newErrors.acceptCgu = 'Vous devez accepter les conditions d\'utilisation.';
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError('');

    // Validation locale
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await register({
        first_name: formData.first_name,
        last_name:  formData.last_name,
        email:      formData.email,
        password:   formData.password,
        phone:      formData.phone   || undefined,
        address:    formData.address || undefined,
      });

      navigate('/mon-compte');
    } catch (err) {
      setApiError(err.message || "Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-lg">

        {/* En-tête */}
        <div className="text-center mb-8">
          <span className="text-4xl">📖</span>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Créer un compte</h1>
          <p className="text-gray-500 text-sm mt-1">
            Rejoignez la bibliothèque municipale
          </p>
        </div>

        {/* Erreur API */}
        {apiError && (
          <div role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Prénom + Nom */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                id="first_name" name="first_name" type="text"
                required value={formData.first_name} onChange={handleChange}
                placeholder="Jean"
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.first_name ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                id="last_name" name="last_name" type="text"
                required value={formData.last_name} onChange={handleChange}
                placeholder="Dupont"
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.last_name ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email" name="email" type="email"
              required value={formData.email} onChange={handleChange}
              placeholder="jean.dupont@email.com"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Mot de passe */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <input
              id="password" name="password" type="password"
              required value={formData.password} onChange={handleChange}
              placeholder="Min. 8 caractères, maj, chiffre, spécial"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirmation mot de passe */}
          <div className="mb-4">
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmer le mot de passe <span className="text-red-500">*</span>
            </label>
            <input
              id="password_confirmation" name="password_confirmation" type="password"
              required value={formData.password_confirmation} onChange={handleChange}
              placeholder="Répétez votre mot de passe"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password_confirmation ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
          </div>

          {/* Téléphone (optionnel) */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone <span className="text-gray-400 text-xs">(optionnel)</span>
            </label>
            <input
              id="phone" name="phone" type="tel"
              value={formData.phone} onChange={handleChange}
              placeholder="06 12 34 56 78"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* CGU (RGPD obligatoire) */}
          <div className="mb-6">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                name="acceptCgu" type="checkbox"
                checked={formData.acceptCgu} onChange={handleChange}
                className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600">
                J&apos;accepte les{' '}
                <Link to="/mentions-legales" className="text-blue-600 hover:underline">
                  conditions d&apos;utilisation
                </Link>{' '}
                et la{' '}
                <Link to="/confidentialite" className="text-blue-600 hover:underline">
                  politique de confidentialité
                </Link>
                {' '}<span className="text-red-500">*</span>
              </span>
            </label>
            {errors.acceptCgu && <p className="text-red-500 text-xs mt-1">{errors.acceptCgu}</p>}
          </div>

          {/* Bouton inscription */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Création du compte...' : 'Créer mon compte'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Déjà inscrit ?{' '}
          <Link to="/connexion" className="text-blue-600 hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
