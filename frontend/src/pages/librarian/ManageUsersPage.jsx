/**
 * Page ManageUsersPage - Gestion des adhérents
 *
 * Fonctionnalités :
 * - Liste des adhérents avec recherche et filtre par statut
 * - Activer les comptes "en attente"
 * - Suspendre / Réactiver un compte
 * - Supprimer un compte (confirmation requise)
 */

import { useState, useEffect } from 'react';
import { userService }              from '../../services/api/userService';
import { USER_STATUS, USER_ROLES }  from '../../utils/constants';
import { formatDate }               from '../../utils/formatDate';
import Loading      from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import Button       from '../../components/common/Button';
import Input        from '../../components/common/Input';
import Modal        from '../../components/common/Modal';
import Pagination   from '../../components/common/Pagination';

export default function ManageUsersPage() {
  const [users, setUsers]           = useState([]);
  const [isLoading, setIsLoading]   = useState(true);
  const [error, setError]           = useState(null);
  const [search, setSearch]         = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage]   = useState(1);
  const [totalPages, setTotalPages]     = useState(1);
  const [notification, setNotification] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser]       = useState(null);
  const [isDeleting, setIsDeleting]           = useState(false);
  const [actioningId, setActioningId]         = useState(null);

  useEffect(() => {
    loadUsers();
  }, [currentPage, search, statusFilter]);

  async function loadUsers() {
    try {
      setIsLoading(true);
      const params = { page: currentPage };
      if (search)       params.search = search;
      if (statusFilter) params.status = statusFilter;
      const data = await userService.getAllUsers(params);
      setUsers(data.data ?? data);
      if (data.last_page) setTotalPages(data.last_page);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function notify(type, message) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  }

  async function handleActivate(userId) {
    setActioningId(userId);
    try {
      await userService.activateUser(userId);
      notify('success', 'Compte activé.');
      loadUsers();
    } catch (err) {
      notify('error', err.message);
    } finally {
      setActioningId(null);
    }
  }

  async function handleSuspend(userId) {
    setActioningId(userId);
    try {
      await userService.suspendUser(userId);
      notify('success', 'Compte suspendu.');
      loadUsers();
    } catch (err) {
      notify('error', err.message);
    } finally {
      setActioningId(null);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await userService.deleteUser(selectedUser.id);
      setShowDeleteModal(false);
      notify('success', 'Compte supprimé.');
      loadUsers();
    } catch (err) {
      notify('error', err.message);
    } finally {
      setIsDeleting(false);
    }
  }

  const statusConfig = {
    [USER_STATUS.EN_ATTENTE]: { label: 'En attente', classes: 'bg-yellow-100 text-yellow-700' },
    [USER_STATUS.ACTIF]:      { label: 'Actif',      classes: 'bg-green-100 text-green-700' },
    [USER_STATUS.SUSPENDU]:   { label: 'Suspendu',   classes: 'bg-red-100 text-red-600' },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestion des adhérents</h1>

      {/* Notification */}
      {notification && (
        <div className={`mb-4 rounded-lg p-3 text-sm border ${
          notification.type === 'success'
            ? 'bg-green-50 border-green-200 text-green-700'
            : 'bg-red-50 border-red-200 text-red-700'
        }`} role={notification.type === 'error' ? 'alert' : 'status'}>
          {notification.message}
        </div>
      )}

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input id="search" placeholder="Rechercher par nom, email..." value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
        </div>
        <select value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Tous les statuts</option>
          <option value={USER_STATUS.EN_ATTENTE}>En attente</option>
          <option value={USER_STATUS.ACTIF}>Actifs</option>
          <option value={USER_STATUS.SUSPENDU}>Suspendus</option>
        </select>
      </div>

      {/* Tableau */}
      {isLoading ? (
        <Loading message="Chargement des adhérents..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadUsers} />
      ) : (
        <>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-gray-600">
                  <th className="px-4 py-3 font-medium">Adhérent</th>
                  <th className="px-4 py-3 font-medium">N° adhérent</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Statut</th>
                  <th className="px-4 py-3 font-medium">Inscrit le</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map(u => {
                  const statusInfo = statusConfig[u.status] ?? statusConfig[USER_STATUS.ACTIF];
                  return (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {u.first_name} {u.last_name}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-blue-600">{u.membership_number}</td>
                      <td className="px-4 py-3 text-gray-600">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusInfo.classes}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(u.created_at)}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2 flex-wrap">
                          {u.status === USER_STATUS.EN_ATTENTE && (
                            <Button size="sm" variant="success"
                              isLoading={actioningId === u.id}
                              onClick={() => handleActivate(u.id)}>
                              Activer
                            </Button>
                          )}
                          {u.status === USER_STATUS.ACTIF && (
                            <Button size="sm" variant="secondary"
                              isLoading={actioningId === u.id}
                              onClick={() => handleSuspend(u.id)}>
                              Suspendre
                            </Button>
                          )}
                          {u.status === USER_STATUS.SUSPENDU && (
                            <Button size="sm" variant="outline"
                              isLoading={actioningId === u.id}
                              onClick={() => handleActivate(u.id)}>
                              Réactiver
                            </Button>
                          )}
                          <Button size="sm" variant="danger"
                            onClick={() => { setSelectedUser(u); setShowDeleteModal(true); }}>
                            Supprimer
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                      Aucun adhérent trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}

      {/* Modal suppression */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}
        title="Confirmer la suppression">
        <p className="text-sm text-gray-600 mb-2">
          Supprimer le compte de <span className="font-medium">{selectedUser?.first_name} {selectedUser?.last_name}</span> ?
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Cette action est irréversible. L'adhérent ne doit avoir aucun emprunt actif.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Annuler</Button>
          <Button variant="danger" isLoading={isDeleting} onClick={handleDelete}>Supprimer</Button>
        </div>
      </Modal>
    </div>
  );
}
