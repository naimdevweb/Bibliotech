/**
 * Page RegisterPage - Inscription d'un nouvel adhérent
 *
 * Validation frontend :
 * - Tous les champs obligatoires remplis
 * - Mot de passe >= 8 caractères, avec majuscule et chiffre
 * - Confirmation du mot de passe identique
 * - Acceptation des CGU obligatoire (RGPD)
 *
 * Après inscription : redirection vers /mon-compte
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input  from '../../components/common/Input';

/**
 * Vérifie la solidité du mot de passe
 * @param {string} password
 * @returns {string|null} Message d'erreur ou null si valide
 */
function validatePassword(password) {
  if (password.length < 8)     return 'Minimum 8 caractères.';
  if (!/[A-Z]/.test(password)) return 'Au moins une majuscule requise.';
  if (!/[0-9]/.test(password)) return 'Au moins un chiffre requis.';
  return null;
}

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    password: '', password_confirmation: '',
    phone: '', address: '',
  });
  const [acceptCGU, setAcceptCGU] = useState(false);
  const [errors, setErrors]       = useState({});
  const [apiError, setApiError]   = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /** Met à jour un champ et efface son erreur */
  function handleChange(field) {
    return (e) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      setErrors(prev => ({ ...prev, [field]: null }));
    };
  }

  /** Validation complète avant envoi */
  function validate() {
    const newErrors = {};
    if (!form.first_name.trim()) newErrors.first_name = 'Prénom requis.';
    if (!form.last_name.trim())  newErrors.last_name  = 'Nom requis.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email invalide.';
    }
    const pwdError = validatePassword(form.password);
    if (pwdError) newErrors.password = pwdError;
    if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = 'Les mots de passe ne correspondent pas.';
    }
    if (!acceptCGU) newErrors.cgu = 'Vous devez accepter les conditions.';
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const user = await register(form);
      navigate(user.role === 'lecteur' ? '/mon-compte' : '/');
    } catch (err) {
      setApiError(err.message || "Erreur lors de l'inscription.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg">

        {/* En-tête */}
        <div className="text-center mb-8">
          <span className="text-4xl">📚</span>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Créer un compte</h1>
          <p className="text-gray-500 mt-1">Rejoignez la bibliothèque municipale</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-4"
          noValidate
        >
          {/* Erreur API */}
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3" role="alert">
              {apiError}
            </div>
          )}

          {/* Prénom + Nom */}
          <div className="grid grid-cols-2 gap-4">
            <Input id="first_name" label="Prénom" value={form.first_name}
              onChange={handleChange('first_name')} error={errors.first_name}
              placeholder="Marie" required />
            <Input id="last_name" label="Nom" value={form.last_name}
              onChange={handleChange('last_name')} error={errors.last_name}
              placeholder="Dupont" required />
          </div>

          {/* Email */}
          <Input id="email" type="email" label="Adresse email" value={form.email}
            onChange={handleChange('email')} error={errors.email}
            placeholder="marie.dupont@email.com" required />

          {/* Téléphone (optionnel) */}
          <Input id="phone" type="tel" label="Téléphone (optionnel)" value={form.phone}
            onChange={handleChange('phone')} placeholder="06 12 34 56 78" />

          {/* Adresse (optionnel) */}
          <Input id="address" label="Adresse (optionnel)" value={form.address}
            onChange={handleChange('address')} placeholder="12 rue de la Paix, Paris" />

          {/* Mot de passe */}
          <Input id="password" type="password" label="Mot de passe" value={form.password}
            onChange={handleChange('password')} error={errors.password}
            placeholder="Min. 8 caractères, 1 majuscule, 1 chiffre" required />

          {/* Confirmation */}
          <Input id="password_confirmation" type="password" label="Confirmer le mot de passe"
            value={form.password_confirmation}
            onChange={handleChange('password_confirmation')}
            error={errors.password_confirmation}
            placeholder="Même mot de passe" required />

          {/* Acceptation CGU — RGPD */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptCGU}
                onChange={(e) => {
                  setAcceptCGU(e.target.checked);
                  setErrors(prev => ({ ...prev, cgu: null }));
                }}
                className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">
                {"J'accepte les "}
                <a href="#cgu" className="text-blue-600 underline">conditions générales</a>
                {" et la "}
                <a href="#confidentialite" className="text-blue-600 underline">politique de confidentialité</a>.
                {" Mes données sont traitées conformément au RGPD."}
              </span>
            </label>
            {errors.cgu && (
              <p className="text-xs text-red-600 mt-1" role="alert">{errors.cgu}</p>
            )}
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Créer mon compte
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          {"Déjà inscrit ? "}
          <Link to="/connexion" className="text-blue-600 hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
