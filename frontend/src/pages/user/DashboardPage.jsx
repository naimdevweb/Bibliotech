/**
 * Page DashboardPage - Tableau de bord de l'utilisateur connecté
 *
 * Affiche :
 * - Message de bienvenue avec le numéro d'adhérent
 * - Résumé des emprunts en cours (nombre, prochaines échéances)
 * - Résumé des réservations (disponibles, en attente)
 * - Liens rapides vers les sections principales
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loanService }        from '../../services/api/loanService';
import { reservationService } from '../../services/api/reservationService';
import { useAuth }            from '../../hooks/useAuth';
import { LOAN_STATUS, RESERVATION_STATUS } from '../../utils/constants';
import { formatDate, formatDueDate }       from '../../utils/formatDate';
import Loading      from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';

/**
 * Carte statistique réutilisable dans le dashboard
 */
function StatCard({ label, value, color = 'blue', icon }) {
  const colorClasses = {
    blue:   'bg-blue-50 text-blue-600',
    green:  'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    red:    'bg-red-50 text-red-600',
  };
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className={`text-2xl p-2 rounded-lg ${colorClasses[color]}`} aria-hidden="true">
          {icon}
        </span>
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();

  const [loans, setLoans]             = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading]     = useState(true);
  const [error, setError]             = useState(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Charger emprunts et réservations en parallèle pour les performances
        const [loansData, reservationsData] = await Promise.all([
          loanService.getMyLoans(),
          reservationService.getMyReservations(),
        ]);
        setLoans(Array.isArray(loansData) ? loansData : (loansData.data || []));
        setReservations(Array.isArray(reservationsData) ? reservationsData : (reservationsData.data || []));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (isLoading) return <div className="py-20"><Loading message="Chargement de votre tableau de bord..." /></div>;
  if (error)     return <div className="max-w-4xl mx-auto px-4 py-12"><ErrorMessage message={error} /></div>;

  // Calculs pour les statistiques
  const activeLoans   = loans.filter(l => l.status === LOAN_STATUS.EN_COURS);
  const overdueLoans  = loans.filter(l => l.status === LOAN_STATUS.EN_RETARD);
  const availableRes  = reservations.filter(r => r.status === RESERVATION_STATUS.DISPONIBLE);
  const pendingRes    = reservations.filter(r => r.status === RESERVATION_STATUS.EN_ATTENTE);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* En-tête de bienvenue */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Bonjour, {user?.first_name} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          N° adhérent : <span className="font-mono font-medium text-blue-600">{user?.membership_number}</span>
        </p>
      </div>

      {/* Alerte si retards */}
      {overdueLoans.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-red-500 text-xl">⚠</span>
          <div>
            <p className="font-semibold text-red-700">
              {overdueLoans.length} emprunt{overdueLoans.length > 1 ? 's' : ''} en retard
            </p>
            <p className="text-sm text-red-600 mt-1">
              Veuillez retourner ces livres dès que possible.
            </p>
          </div>
        </div>
      )}

      {/* Alerte si réservation disponible */}
      {availableRes.length > 0 && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-green-600 text-xl">✓</span>
          <div>
            <p className="font-semibold text-green-700">
              {availableRes.length} réservation{availableRes.length > 1 ? 's' : ''} disponible{availableRes.length > 1 ? 's' : ''}
            </p>
            <p className="text-sm text-green-600 mt-1">
              Vous avez 7 jours pour récupérer votre livre à la bibliothèque.
            </p>
          </div>
        </div>
      )}

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Emprunts en cours" value={activeLoans.length}  color="blue"   icon="📚" />
        <StatCard label="En retard"          value={overdueLoans.length} color="red"    icon="⏰" />
        <StatCard label="Réservations"       value={pendingRes.length}   color="orange" icon="🔖" />
        <StatCard label="Disponibles"        value={availableRes.length} color="green"  icon="✅" />
      </div>

      {/* Prochaines échéances */}
      {activeLoans.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Prochaines échéances</h2>
            <Link to="/mon-compte/emprunts" className="text-sm text-blue-600 hover:underline">
              Voir tout →
            </Link>
          </div>
          <ul className="divide-y divide-gray-50">
            {activeLoans.slice(0, 3).map(loan => {
              const daysLabel = formatDueDate(loan.due_date);
              const isLate    = loan.status === LOAN_STATUS.EN_RETARD;
              return (
                <li key={loan.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{loan.book?.title}</p>
                    <p className="text-xs text-gray-500">{loan.book?.author}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    isLate ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {daysLabel}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Liens rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/mon-compte/emprunts"
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow text-center">
          <span className="text-3xl block mb-2">📚</span>
          <p className="font-medium text-gray-800">Mes emprunts</p>
          <p className="text-xs text-gray-500 mt-1">Gérer mes livres empruntés</p>
        </Link>
        <Link to="/mon-compte/reservations"
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow text-center">
          <span className="text-3xl block mb-2">🔖</span>
          <p className="font-medium text-gray-800">Mes réservations</p>
          <p className="text-xs text-gray-500 mt-1">Suivre mes réservations</p>
        </Link>
        <Link to="/catalogue"
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow text-center">
          <span className="text-3xl block mb-2">🔍</span>
          <p className="font-medium text-gray-800">Catalogue</p>
          <p className="text-xs text-gray-500 mt-1">Découvrir de nouveaux livres</p>
        </Link>
      </div>
    </div>
  );
}
