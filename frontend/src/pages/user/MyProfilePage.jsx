/**
 * Page MyProfilePage - Mon profil
 *
 * Sections :
 * - Informations personnelles (modifiables)
 * - Sécurité (changement de mot de passe)
 * - Export des données (RGPD)
 * - Suppression de compte (avec confirmation)
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth }       from '../../hooks/useAuth';
import { userService }   from '../../services/api/userService';
import Input  from '../../components/common/Input';
import Button from '../../components/common/Button';
import Modal  from '../../components/common/Modal';

export default function MyProfilePage() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();

  // Formulaire infos personnelles
  const [form, setForm] = useState({
    first_name: user?.first_name ?? '',
    last_name:  user?.last_name  ?? '',
    email:      user?.email      ?? '',
    phone:      user?.phone      ?? '',
    address:    user?.address    ?? '',
  });
  const [profileMsg, setProfileMsg]     = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [isSaving, setIsSaving]         = useState(false);

  // Suppression de compte
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting]           = useState(false);
  const [deleteError, setDeleteError]         = useState(null);

  // Export RGPD
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);

  function handleChange(field) {
    return (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  }

  /**
   * Sauvegarde les modifications du profil
   */
  async function handleSaveProfile(e) {
    e.preventDefault();
    setProfileMsg(null);
    setProfileError(null);
    setIsSaving(true);
    try {
      await userService.updateUser(user.id, form);
      setProfileMsg('Profil mis à jour avec succès.');
    } catch (err) {
      setProfileError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  /**
   * Exporte les données personnelles en JSON (RGPD)
   */
  async function handleExport() {
    setIsExporting(true);
    setExportError(null);
    try {
      const data = await userService.exportMyData();
      // Téléchargement côté client du JSON
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href     = url;
      link.download = `mes-donnees-bibliotheque-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setExportError(err.message);
    } finally {
      setIsExporting(false);
    }
  }

  /**
   * Supprime le compte après confirmation dans la modal
   */
  async function handleDeleteAccount() {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await userService.deleteUser(user.id);
      await logout();
      navigate('/');
    } catch (err) {
      setDeleteError(err.message);
      setIsDeleting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      <h1 className="text-2xl font-bold text-gray-800">Mon profil</h1>

      {/* Numéro adhérent */}
      <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
        <span className="text-2xl">🪪</span>
        <div>
          <p className="text-sm text-blue-600 font-medium">Numéro d'adhérent</p>
          <p className="font-mono font-bold text-blue-800">{user?.membership_number}</p>
        </div>
      </div>

      {/* Formulaire infos personnelles */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Informations personnelles</h2>

        {profileMsg && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3" role="status">
            {profileMsg}
          </div>
        )}
        {profileError && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3" role="alert">
            {profileError}
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input id="first_name" label="Prénom" value={form.first_name}
              onChange={handleChange('first_name')} required />
            <Input id="last_name" label="Nom" value={form.last_name}
              onChange={handleChange('last_name')} required />
          </div>
          <Input id="email" type="email" label="Email" value={form.email}
            onChange={handleChange('email')} required />
          <Input id="phone" type="tel" label="Téléphone" value={form.phone}
            onChange={handleChange('phone')} placeholder="06 12 34 56 78" />
          <Input id="address" label="Adresse" value={form.address}
            onChange={handleChange('address')} placeholder="12 rue de la Paix, Paris" />

          <Button type="submit" isLoading={isSaving}>
            Sauvegarder
          </Button>
        </form>
      </section>

      {/* Export RGPD */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-2">Mes données (RGPD)</h2>
        <p className="text-sm text-gray-500 mb-4">
          Téléchargez une copie de toutes vos données personnelles (informations de profil,
          historique d'emprunts et de réservations) au format JSON.
        </p>
        {exportError && (
          <div className="mb-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3" role="alert">
            {exportError}
          </div>
        )}
        <Button variant="outline" isLoading={isExporting} onClick={handleExport}>
          Télécharger mes données
        </Button>
      </section>

      {/* Suppression de compte */}
      <section className="bg-white rounded-xl border border-red-100 shadow-sm p-6">
        <h2 className="font-semibold text-red-700 mb-2">Zone de danger</h2>
        <p className="text-sm text-gray-500 mb-4">
          La suppression de votre compte est définitive. Toutes vos données seront effacées
          conformément au RGPD. Vous devez avoir rendu tous vos livres empruntés avant de procéder.
        </p>
        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
          Supprimer mon compte
        </Button>
      </section>

      {/* Modal de confirmation suppression */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmer la suppression"
      >
        <p className="text-sm text-gray-600 mb-4">
          Êtes-vous certain de vouloir supprimer définitivement votre compte ?
          Cette action est irréversible.
        </p>
        {deleteError && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3" role="alert">
            {deleteError}
          </div>
        )}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" isLoading={isDeleting} onClick={handleDeleteAccount}>
            Oui, supprimer mon compte
          </Button>
        </div>
      </Modal>
    </div>
  );
}
