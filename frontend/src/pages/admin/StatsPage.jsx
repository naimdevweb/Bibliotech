/**
 * Page StatsPage - Statistiques complètes (admin)
 *
 * Affiche les résultats des 4 endpoints de stats :
 * - KPI : totaux globaux
 * - Livres : répartition par genre, livres jamais empruntés
 * - Emprunts : évolution par mois, top 10 livres
 * - Utilisateurs : actifs vs inactifs
 */

import { useState, useEffect } from 'react';
import { statsService } from '../../services/api/statsService';
import Loading      from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';

/** Carte de statistique */
function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
      <span className="text-3xl block mb-1" aria-hidden="true">{icon}</span>
      <p className="text-2xl font-bold text-gray-800">{value ?? '—'}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}

/** Table générique pour afficher des données tabulaires */
function DataTable({ headers, rows, emptyMessage = 'Aucune donnée.' }) {
  if (!rows || rows.length === 0) {
    return <p className="text-sm text-gray-400 py-4 text-center">{emptyMessage}</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-100">
            {headers.map(h => (
              <th key={h} className="pb-2 pr-4 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows}
        </tbody>
      </table>
    </div>
  );
}

export default function StatsPage() {
  const [kpis, setKpis]           = useState(null);
  const [booksStats, setBooksStats]   = useState(null);
  const [loansStats, setLoansStats]   = useState(null);
  const [usersStats, setUsersStats]   = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    async function loadAllStats() {
      try {
        // Charger toutes les stats en parallèle pour les performances
        const [kpisData, booksData, loansData, usersData] = await Promise.all([
          statsService.getKPIs(),
          statsService.getBooksStats(),
          statsService.getLoansStats(),
          statsService.getUsersStats(),
        ]);
        setKpis(kpisData);
        setBooksStats(booksData);
        setLoansStats(loansData);
        setUsersStats(usersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadAllStats();
  }, []);

  if (isLoading) return <div className="py-20"><Loading message="Chargement des statistiques..." /></div>;
  if (error)     return <div className="max-w-5xl mx-auto px-4 py-12"><ErrorMessage message={error} /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Statistiques</h1>
          <p className="text-gray-500 mt-1">Indicateurs clés de la bibliothèque</p>
        </div>
      </div>

      {/* KPI globaux */}
      <section>
        <h2 className="font-semibold text-gray-800 mb-4">Indicateurs globaux</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Adhérents total"  value={kpis?.total_users}    icon="👥" />
          <StatCard label="Adhérents actifs" value={kpis?.active_users}   icon="✅" />
          <StatCard label="Livres catalogue" value={kpis?.total_books}    icon="📚" />
          <StatCard label="Emprunts actifs"  value={kpis?.active_loans}   icon="🔄" />
          <StatCard label="Retards"          value={kpis?.overdue_loans}  icon="⏰" />
          <StatCard label="Réservations"     value={kpis?.total_reservations} icon="🔖" />
        </div>
      </section>

      {/* Top livres empruntés */}
      {loansStats?.top_books && (
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Top 10 livres les plus empruntés</h2>
          <DataTable
            headers={['Rang', 'Titre', 'Auteur', 'Nb emprunts']}
            rows={loansStats.top_books.map((book, idx) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="py-2 pr-4 text-gray-500 font-medium">#{idx + 1}</td>
                <td className="py-2 pr-4 text-gray-800 max-w-xs truncate">{book.title}</td>
                <td className="py-2 pr-4 text-gray-600">{book.author}</td>
                <td className="py-2 font-medium text-blue-600">{book.loans_count}</td>
              </tr>
            ))}
            emptyMessage="Aucun emprunt enregistré."
          />
        </section>
      )}

      {/* Répartition par genre */}
      {booksStats?.by_genre && (
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Répartition par genre</h2>
          <DataTable
            headers={['Genre', 'Nb livres', '% du catalogue']}
            rows={booksStats.by_genre.map(item => (
              <tr key={item.genre} className="hover:bg-gray-50">
                <td className="py-2 pr-4 text-gray-800">{item.genre ?? 'Non classé'}</td>
                <td className="py-2 pr-4 text-gray-600">{item.count}</td>
                <td className="py-2 text-gray-500">
                  {booksStats.total > 0
                    ? `${Math.round((item.count / booksStats.total) * 100)}%`
                    : '—'}
                </td>
              </tr>
            ))}
          />
        </section>
      )}

      {/* Évolution emprunts par mois */}
      {loansStats?.by_month && (
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Emprunts par mois (12 derniers mois)</h2>
          <div className="space-y-2">
            {loansStats.by_month.map(item => {
              const max   = Math.max(...loansStats.by_month.map(m => m.count), 1);
              const width = Math.round((item.count / max) * 100);
              return (
                <div key={item.month} className="flex items-center gap-3 text-sm">
                  <span className="w-24 text-gray-500 text-right">{item.month}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-blue-500 h-4 rounded-full transition-all"
                      style={{ width: `${width}%` }}
                      aria-label={`${item.count} emprunts`}
                    />
                  </div>
                  <span className="w-8 text-gray-700 font-medium">{item.count}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Utilisateurs inactifs */}
      {usersStats?.inactive_users && usersStats.inactive_users.length > 0 && (
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">
            Adhérents inactifs (pas d'emprunt depuis 1 an)
          </h2>
          <DataTable
            headers={['Nom', 'Email', 'Dernier emprunt']}
            rows={usersStats.inactive_users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="py-2 pr-4 text-gray-800">{u.first_name} {u.last_name}</td>
                <td className="py-2 pr-4 text-gray-600">{u.email}</td>
                <td className="py-2 text-gray-500">
                  {u.last_loan_date
                    ? new Date(u.last_loan_date).toLocaleDateString('fr-FR')
                    : 'Jamais'}
                </td>
              </tr>
            ))}
          />
        </section>
      )}
    </div>
  );
}
