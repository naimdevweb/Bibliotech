/**
 * Page AdminDashboardPage - Tableau de bord administrateur
 *
 * Affiche :
 * - KPI globaux (adhérents, livres, emprunts, retards)
 * - Liens vers toutes les fonctions (bibliothécaire + admin)
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { statsService } from '../../services/api/statsService';
import Loading      from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';

function KpiCard({ label, value, icon, color = 'blue', linkTo }) {
  const colorMap = {
    blue:   'border-l-blue-500   bg-blue-50   text-blue-600',
    green:  'border-l-green-500  bg-green-50  text-green-600',
    orange: 'border-l-orange-500 bg-orange-50 text-orange-600',
    red:    'border-l-red-500    bg-red-50    text-red-600',
  };
  const inner = (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-5 border-l-4 ${colorMap[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-800">{value ?? '—'}</p>
          <p className="text-sm text-gray-500 mt-1">{label}</p>
        </div>
        <span className="text-3xl" aria-hidden="true">{icon}</span>
      </div>
    </div>
  );
  return linkTo ? <Link to={linkTo}>{inner}</Link> : inner;
}

export default function AdminDashboardPage() {
  const [kpis, setKpis]           = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    async function loadKPIs() {
      try {
        const data = await statsService.getKPIs();
        setKpis(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadKPIs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Administration</h1>
        <p className="text-gray-500 mt-1">Vue d'ensemble de la bibliothèque</p>
      </div>

      {/* KPI */}
      {isLoading ? (
        <div className="mb-8"><Loading message="Chargement des indicateurs..." size="sm" /></div>
      ) : error ? (
        <div className="mb-8"><ErrorMessage message={error} /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KpiCard label="Adhérents actifs"  value={kpis?.active_users}   color="green"  icon="👥" linkTo="/bibliothecaire/adherents" />
          <KpiCard label="Livres au catalogue" value={kpis?.total_books} color="blue"   icon="📚" linkTo="/bibliothecaire/livres" />
          <KpiCard label="Emprunts en cours" value={kpis?.active_loans}   color="orange" icon="🔄" linkTo="/bibliothecaire/emprunts" />
          <KpiCard label="Retards"           value={kpis?.overdue_loans}  color="red"    icon="⏰" linkTo="/bibliothecaire/emprunts" />
        </div>
      )}

      {/* Gestion bibliothèque */}
      <section className="mb-8">
        <h2 className="font-semibold text-gray-800 mb-4">Gestion de la bibliothèque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/bibliothecaire/livres"
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <span className="text-3xl block mb-2">📖</span>
            <p className="font-medium text-gray-800">Catalogue</p>
            <p className="text-xs text-gray-500 mt-1">Gérer les livres</p>
          </Link>
          <Link to="/bibliothecaire/emprunts"
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <span className="text-3xl block mb-2">🔄</span>
            <p className="font-medium text-gray-800">Emprunts</p>
            <p className="text-xs text-gray-500 mt-1">Prêts, retours, retards</p>
          </Link>
          <Link to="/bibliothecaire/adherents"
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <span className="text-3xl block mb-2">👥</span>
            <p className="font-medium text-gray-800">Adhérents</p>
            <p className="text-xs text-gray-500 mt-1">Comptes et activations</p>
          </Link>
        </div>
      </section>

      {/* Administration */}
      <section>
        <h2 className="font-semibold text-gray-800 mb-4">Administration</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/admin/stats"
            className="bg-white rounded-xl border border-blue-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <span className="text-3xl block mb-2">📊</span>
            <p className="font-medium text-gray-800">Statistiques détaillées</p>
            <p className="text-xs text-gray-500 mt-1">Analyses, tendances, top livres</p>
          </Link>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 opacity-60">
            <span className="text-3xl block mb-2">⚙️</span>
            <p className="font-medium text-gray-800">Configuration</p>
            <p className="text-xs text-gray-500 mt-1">Prochainement disponible</p>
          </div>
        </div>
      </section>
    </div>
  );
}
