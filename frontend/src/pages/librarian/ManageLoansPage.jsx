/**
 * Page ManageLoansPage - Gestion des prêts et retours
 *
 * Fonctionnalités :
 * - Onglet "Enregistrer un prêt" : saisir l'ID adhérent + ID livre
 * - Onglet "Emprunts en cours" : liste + bouton retour
 * - Onglet "Retards" : emprunts en retard avec alerte
 */

import { useState, useEffect } from 'react';
import { loanService } from '../../services/api/loanService';
import { LOAN_STATUS } from '../../utils/constants';
import { formatDate }  from '../../utils/formatDate';
import Loading      from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import Button       from '../../components/common/Button';
import Input        from '../../components/common/Input';

/** Formulaire de création d'un emprunt */
function NewLoanForm({ onLoanCreated }) {
  const [userId, setUserId]     = useState('');
  const [bookId, setBookId]     = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState(null);
  const [success, setSuccess]     = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!userId || !bookId) return;
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await loanService.createLoan(parseInt(userId, 10), parseInt(bookId, 10));
      setSuccess('Emprunt enregistré avec succès !');
      setUserId('');
      setBookId('');
      onLoanCreated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h2 className="font-semibold text-gray-800 mb-4">Enregistrer un prêt</h2>
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3" role="status">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <Input id="userId" label="ID adhérent" type="number" value={userId}
          onChange={(e) => setUserId(e.target.value)} placeholder="123" required />
        <Input id="bookId" label="ID livre" type="number" value={bookId}
          onChange={(e) => setBookId(e.target.value)} placeholder="456" required />
        <div className="flex items-end">
          <Button type="submit" isLoading={isLoading}>Enregistrer</Button>
        </div>
      </form>
      <p className="text-xs text-gray-400 mt-2">
        Les ID se trouvent dans la page de gestion des adhérents et du catalogue.
      </p>
    </div>
  );
}

/** Ligne d'un emprunt dans la table */
function LoanRow({ loan, onReturn, isReturning }) {
  const isLate = loan.status === LOAN_STATUS.EN_RETARD;
  return (
    <tr className={`hover:bg-gray-50 ${isLate ? 'bg-red-50' : ''}`}>
      <td className="px-4 py-3 text-sm text-gray-800">
        {loan.user?.first_name} {loan.user?.last_name}
        <span className="block text-xs text-gray-400 font-mono">{loan.user?.membership_number}</span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{loan.book?.title}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{formatDate(loan.loan_date)}</td>
      <td className="px-4 py-3 text-sm">
        <span className={isLate ? 'text-red-600 font-medium' : 'text-gray-500'}>
          {formatDate(loan.due_date)}
        </span>
      </td>
      <td className="px-4 py-3">
        <Button size="sm" variant={isLate ? 'danger' : 'secondary'}
          isLoading={isReturning} onClick={() => onReturn(loan.id)}>
          Retour
        </Button>
      </td>
    </tr>
  );
}

export default function ManageLoansPage() {
  const [activeLoans, setActiveLoans]   = useState([]);
  const [overdueLoans, setOverdueLoans] = useState([]);
  const [isLoading, setIsLoading]       = useState(true);
  const [error, setError]               = useState(null);
  const [activeTab, setActiveTab]       = useState('en_cours');
  const [returningId, setReturningId]   = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadLoans();
  }, []);

  async function loadLoans() {
    try {
      setIsLoading(true);
      const [activeData, overdueData] = await Promise.all([
        loanService.getAllLoans({ status: 'en_cours' }),
        loanService.getOverdueLoans(),
      ]);
      setActiveLoans(activeData.data ?? activeData);
      setOverdueLoans(overdueData.data ?? overdueData);
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

  async function handleReturn(loanId) {
    setReturningId(loanId);
    try {
      await loanService.returnBook(loanId);
      notify('success', 'Retour enregistré.');
      loadLoans();
    } catch (err) {
      notify('error', err.message);
    } finally {
      setReturningId(null);
    }
  }

  const tabs = [
    { id: 'nouveau',   label: 'Nouveau prêt' },
    { id: 'en_cours',  label: `En cours (${activeLoans.length})` },
    { id: 'retards',   label: `Retards (${overdueLoans.length})` },
  ];

  const displayedLoans = activeTab === 'retards' ? overdueLoans : activeLoans;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestion des emprunts</h1>

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

      {/* Onglets */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Onglet Nouveau prêt */}
      {activeTab === 'nouveau' && (
        <NewLoanForm onLoanCreated={loadLoans} />
      )}

      {/* Onglets En cours / Retards */}
      {activeTab !== 'nouveau' && (
        isLoading ? (
          <Loading message="Chargement des emprunts..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadLoans} />
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-gray-600">
                  <th className="px-4 py-3 font-medium">Adhérent</th>
                  <th className="px-4 py-3 font-medium">Livre</th>
                  <th className="px-4 py-3 font-medium">Emprunté le</th>
                  <th className="px-4 py-3 font-medium">Retour prévu</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {displayedLoans.map(loan => (
                  <LoanRow
                    key={loan.id}
                    loan={loan}
                    onReturn={handleReturn}
                    isReturning={returningId === loan.id}
                  />
                ))}
                {displayedLoans.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                      Aucun emprunt.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}
