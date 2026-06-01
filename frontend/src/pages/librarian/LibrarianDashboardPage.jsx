/**
 * Page LibrarianDashboardPage - Tableau de bord bibliothécaire
 *
 * Affiche :
 * - KPI : emprunts actifs, retards, réservations disponibles
 * - Alertes si retards importants
 * - Liens rapides vers les fonctions de gestion
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loanService }        from '../../services/api/loanService';
import { reservationService } from '../../services/api/reservationService';
import { RESERVATION_STATUS } from '../../utils/constants';
import Loading      from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';

/**
 * Carte KPI réutilisable
 */
function KpiCard({ label, value, color = 'blue', icon, linkTo }) {
  const colorMap = {
    blue:   'border-l-blue-500   bg-blue-50   text-blue-700',
    red:    'border-l-red-500    bg-red-50    text-red-700',
    orange: 'border-l-orange-500 bg-orange-50 text-orange-700',
    green:  'border-l-green-500  bg-green-50  text-green-700',
  };
  const card = (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-5 border-l-4 ${colorMap[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-600 mt-1">{label}</p>
        </div>
        <span className="text-2xl" aria-hidden="true">{icon}</span>
      </div>
    </div>
  );
  return linkTo ? <Link to={linkTo}>{card}</Link> : card;
}

export default function LibrarianDashboardPage() {
  const [overdueLoans, setOverdueLoans]    = useState([]);
  const [allLoans, setAllLoans]            = useState([]);
  const [reservations, setReservations]    = useState([]);
  const [isLoading, setIsLoading]          = useState(true);
  const [error, setError]                  = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [loansData, overdueData, resData] = await Promise.all([
          loanService.getAllLoans({ status: 'en_cours', per_page: 5 }),
          loanService.getOverdueLoans(),
          reservationService.getQueue ? Promise.resolve({ data: [] }) : Promise.resolve({ data: [] }),
        ]);
        setAllLoans(loansData.data ?? loansData);
        setOverdueLoans(overdueData.data ?? overdueData);
        setReservations(resData.data ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) return <div className="py-20"><Loading message="Chargement..." /></div>;
  if (error)     return <div className="max-w-5xl mx-auto px-4 py-12"><ErrorMessage message={error} /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Espace bibliothécaire</h1>
          <p className="text-gray-500 mt-1">Vue d'ensemble de la bibliothèque</p>
        </div>
      </div>

      {/* Alerte retards importants */}
      {overdueLoans.length > 10 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-red-500 text-xl">⚠</span>
          <div>
            <p className="font-semibold text-red-700">
              {overdueLoans.length} emprunts en retard
            </p>
            <Link to="/bibliothecaire/emprunts" className="text-sm text-red-600 underline mt-1 inline-block">
              Voir les retards →
            </Link>
          </div>
        </div>
      )}

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Emprunts actifs"     value={allLoans.length}      color="blue"   icon="📚" linkTo="/bibliothecaire/emprunts" />
        <KpiCard label="Retards"             value={overdueLoans.length}  color="red"    icon="⏰" linkTo="/bibliothecaire/emprunts" />
        <KpiCard label="Adhérents"           value="—"                    color="green"  icon="👥" linkTo="/bibliothecaire/adherents" />
        <KpiCard label="Catalogue"           value="—"                    color="orange" icon="📖" linkTo="/bibliothecaire/livres" />
      </div>

      {/* Emprunts récents */}
      {allLoans.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Emprunts en cours (récents)</h2>
            <Link to="/bibliothecaire/emprunts" className="text-sm text-blue-600 hover:underline">
              Voir tout →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-2 font-medium">Adhérent</th>
                  <th className="pb-2 font-medium">Livre</th>
                  <th className="pb-2 font-medium">Retour prévu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allLoans.slice(0, 5).map(loan => (
                  <tr key={loan.id} className="hover:bg-gray-50">
                    <td className="py-2 text-gray-800">
                      {loan.user?.first_name} {loan.user?.last_name}
                    </td>
                    <td className="py-2 text-gray-600 max-w-xs truncate">{loan.book?.title}</td>
                    <td className="py-2 text-gray-500">
                      {new Date(loan.due_date).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Liens rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/bibliothecaire/livres"
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow text-center">
          <span className="text-3xl block mb-2">📖</span>
          <p className="font-medium text-gray-800">Gérer le catalogue</p>
          <p className="text-xs text-gray-500 mt-1">Ajouter, modifier, supprimer des livres</p>
        </Link>
        <Link to="/bibliothecaire/emprunts"
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow text-center">
          <span className="text-3xl block mb-2">🔄</span>
          <p className="font-medium text-gray-800">Gérer les emprunts</p>
          <p className="text-xs text-gray-500 mt-1">Prêts, retours, retards</p>
        </Link>
        <Link to="/bibliothecaire/adherents"
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow text-center">
          <span className="text-3xl block mb-2">👥</span>
          <p className="font-medium text-gray-800">Gérer les adhérents</p>
          <p className="text-xs text-gray-500 mt-1">Comptes, activations, suspensions</p>
        </Link>
      </div>
    </div>
  );
}
