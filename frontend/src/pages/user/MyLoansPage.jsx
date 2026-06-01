/**
 * Page MyLoansPage - Mes emprunts
 *
 * Affiche deux onglets :
 * - "En cours" : emprunts actifs avec possibilité de prolongation
 * - "Historique" : emprunts terminés
 *
 * Règles métier :
 * - Prolongation possible 3 fois maximum (+21 jours)
 * - Statut "en_retard" si la date de retour est dépassée
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loanService }              from '../../services/api/loanService';
import { LOAN_STATUS, MAX_LOAN_EXTENSIONS } from '../../utils/constants';
import { formatDate, formatDueDate }         from '../../utils/formatDate';
import Loading      from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import Button       from '../../components/common/Button';

/**
 * Carte d'un emprunt individuel
 */
function LoanCard({ loan, onExtend, isExtending }) {
  const isActive  = loan.status === LOAN_STATUS.EN_COURS;
  const isLate    = loan.status === LOAN_STATUS.EN_RETARD;
  const isDone    = loan.status === LOAN_STATUS.TERMINE;
  const canExtend = isActive && loan.extension_count < MAX_LOAN_EXTENSIONS;

  const statusConfig = {
    [LOAN_STATUS.EN_COURS]:  { label: 'En cours',  classes: 'bg-blue-100 text-blue-700' },
    [LOAN_STATUS.EN_RETARD]: { label: 'En retard',  classes: 'bg-red-100 text-red-600' },
    [LOAN_STATUS.TERMINE]:   { label: 'Terminé',   classes: 'bg-gray-100 text-gray-600' },
  };
  const status = statusConfig[loan.status] ?? statusConfig[LOAN_STATUS.EN_COURS];

  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-4">
      {/* Couverture miniature */}
      <div className="w-12 h-16 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
        {loan.book?.cover_image_url ? (
          <img src={loan.book.cover_image_url} alt="" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-xl" aria-hidden="true">📕</span>
        )}
      </div>

      {/* Informations */}
      <div className="flex-1 min-w-0">
        <Link to={`/livre/${loan.book_id}`} className="font-medium text-gray-800 hover:text-blue-600 block truncate">
          {loan.book?.title}
        </Link>
        <p className="text-sm text-gray-500 truncate">{loan.book?.author}</p>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span>Emprunté le {formatDate(loan.loan_date)}</span>
          {!isDone && (
            <span className={isLate ? 'text-red-600 font-medium' : ''}>
              Retour : {formatDueDate(loan.due_date)} ({formatDate(loan.due_date)})
            </span>
          )}
          {isDone && <span>Retourné le {formatDate(loan.return_date)}</span>}
          {loan.extension_count > 0 && (
            <span>{loan.extension_count} prolongation{loan.extension_count > 1 ? 's' : ''}</span>
          )}
        </div>
      </div>

      {/* Statut + action */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${status.classes}`}>
          {status.label}
        </span>
        {canExtend && (
          <Button
            size="sm"
            variant="outline"
            isLoading={isExtending}
            onClick={() => onExtend(loan.id)}
          >
            Prolonger
          </Button>
        )}
      </div>
    </article>
  );
}

export default function MyLoansPage() {
  const [loans, setLoans]         = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);
  const [activeTab, setActiveTab] = useState('en_cours');
  const [extendingId, setExtendingId] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadLoans();
  }, []);

  async function loadLoans() {
    try {
      setIsLoading(true);
      const data = await loanService.getMyLoans();
      setLoans(data.data ?? data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Prolonge un emprunt de 21 jours
   * @param {number} loanId
   */
  async function handleExtend(loanId) {
    setExtendingId(loanId);
    setNotification(null);
    try {
      const data = await loanService.extendLoan(loanId);
      // Mettre à jour l'emprunt dans la liste locale
      setLoans(prev => prev.map(l =>
        l.id === loanId ? (data.loan ?? data) : l
      ));
      setNotification({ type: 'success', message: 'Emprunt prolongé de 21 jours.' });
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setExtendingId(null);
    }
  }

  if (isLoading) return <div className="py-20"><Loading message="Chargement de vos emprunts..." /></div>;
  if (error)     return <div className="max-w-3xl mx-auto px-4 py-12"><ErrorMessage message={error} /></div>;

  const activeLoans  = loans.filter(l => [LOAN_STATUS.EN_COURS, LOAN_STATUS.EN_RETARD].includes(l.status));
  const historyLoans = loans.filter(l => l.status === LOAN_STATUS.TERMINE);
  const displayedLoans = activeTab === 'en_cours' ? activeLoans : historyLoans;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mes emprunts</h1>
        <Link to="/catalogue" className="text-sm text-blue-600 hover:underline">
          Découvrir des livres →
        </Link>
      </div>

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
        <button
          onClick={() => setActiveTab('en_cours')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'en_cours'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          En cours ({activeLoans.length})
        </button>
        <button
          onClick={() => setActiveTab('historique')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'historique'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Historique ({historyLoans.length})
        </button>
      </div>

      {/* Liste des emprunts */}
      {displayedLoans.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="text-5xl block mb-3">📚</span>
          <p className="text-sm">
            {activeTab === 'en_cours'
              ? "Aucun emprunt en cours."
              : "Aucun emprunt dans l'historique."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedLoans.map(loan => (
            <LoanCard
              key={loan.id}
              loan={loan}
              onExtend={handleExtend}
              isExtending={extendingId === loan.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
