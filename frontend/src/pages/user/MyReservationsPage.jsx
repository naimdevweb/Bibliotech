/**
 * Page MyReservationsPage - Mes réservations
 *
 * Affiche deux sections :
 * - "Disponibles" : le livre est prêt, à retirer sous 7 jours
 * - "En attente"  : position dans la file d'attente
 *
 * L'utilisateur peut annuler une réservation depuis cette page.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reservationService }          from '../../services/api/reservationService';
import { RESERVATION_STATUS }          from '../../utils/constants';
import { formatDate }                  from '../../utils/formatDate';
import Loading      from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import Button       from '../../components/common/Button';

/**
 * Carte d'une réservation individuelle
 */
function ReservationCard({ reservation, onCancel, isCancelling }) {
  const isAvailable = reservation.status === RESERVATION_STATUS.DISPONIBLE;
  const isPending   = reservation.status === RESERVATION_STATUS.EN_ATTENTE;

  const statusConfig = {
    [RESERVATION_STATUS.DISPONIBLE]: { label: 'Disponible',  classes: 'bg-green-100 text-green-700' },
    [RESERVATION_STATUS.EN_ATTENTE]: { label: 'En attente',  classes: 'bg-orange-100 text-orange-600' },
    [RESERVATION_STATUS.EXPIREE]:    { label: 'Expirée',     classes: 'bg-gray-100 text-gray-500' },
    [RESERVATION_STATUS.ANNULEE]:    { label: 'Annulée',     classes: 'bg-gray-100 text-gray-500' },
  };
  const statusInfo = statusConfig[reservation.status] ?? statusConfig[RESERVATION_STATUS.EN_ATTENTE];

  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-4">
      {/* Couverture miniature */}
      <div className="w-12 h-16 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
        {reservation.book?.cover_image_url ? (
          <img src={reservation.book.cover_image_url} alt="" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-xl" aria-hidden="true">📗</span>
        )}
      </div>

      {/* Informations */}
      <div className="flex-1 min-w-0">
        <Link to={`/livre/${reservation.book_id}`} className="font-medium text-gray-800 hover:text-blue-600 block truncate">
          {reservation.book?.title}
        </Link>
        <p className="text-sm text-gray-500 truncate">{reservation.book?.author}</p>

        <div className="mt-2 text-xs text-gray-500 space-y-1">
          <p>Réservé le {formatDate(reservation.reservation_date)}</p>
          {isPending && reservation.queue_position && (
            <p>Position dans la file : <span className="font-medium text-orange-600">#{reservation.queue_position}</span></p>
          )}
          {isAvailable && reservation.expiry_date && (
            <p className="text-green-600 font-medium">
              À retirer avant le {formatDate(reservation.expiry_date)}
            </p>
          )}
        </div>
      </div>

      {/* Statut + annulation */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusInfo.classes}`}>
          {statusInfo.label}
        </span>
        {(isAvailable || isPending) && (
          <Button
            size="sm"
            variant="secondary"
            isLoading={isCancelling}
            onClick={() => onCancel(reservation.id)}
          >
            Annuler
          </Button>
        )}
      </div>
    </article>
  );
}

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading]       = useState(true);
  const [error, setError]               = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadReservations();
  }, []);

  async function loadReservations() {
    try {
      setIsLoading(true);
      const data = await reservationService.getMyReservations();
      setReservations(data.data ?? data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Annule une réservation
   * @param {number} reservationId
   */
  async function handleCancel(reservationId) {
    setCancellingId(reservationId);
    setNotification(null);
    try {
      await reservationService.cancelReservation(reservationId);
      setReservations(prev => prev.filter(r => r.id !== reservationId));
      setNotification({ type: 'success', message: 'Réservation annulée.' });
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setCancellingId(null);
    }
  }

  if (isLoading) return <div className="py-20"><Loading message="Chargement de vos réservations..." /></div>;
  if (error)     return <div className="max-w-3xl mx-auto px-4 py-12"><ErrorMessage message={error} /></div>;

  const available = reservations.filter(r => r.status === RESERVATION_STATUS.DISPONIBLE);
  const pending   = reservations.filter(r => r.status === RESERVATION_STATUS.EN_ATTENTE);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mes réservations</h1>
        <Link to="/catalogue" className="text-sm text-blue-600 hover:underline">
          Parcourir le catalogue →
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

      {/* Section Disponibles */}
      {available.length > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-green-600">✓</span>
            Disponibles à retirer ({available.length})
          </h2>
          <div className="space-y-3">
            {available.map(r => (
              <ReservationCard
                key={r.id}
                reservation={r}
                onCancel={handleCancel}
                isCancelling={cancellingId === r.id}
              />
            ))}
          </div>
        </section>
      )}

      {/* Section En attente */}
      {pending.length > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-orange-500">⏳</span>
            En attente ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map(r => (
              <ReservationCard
                key={r.id}
                reservation={r}
                onCancel={handleCancel}
                isCancelling={cancellingId === r.id}
              />
            ))}
          </div>
        </section>
      )}

      {/* État vide */}
      {reservations.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <span className="text-5xl block mb-3">🔖</span>
          <p className="text-sm">Aucune réservation en cours.</p>
          <Link to="/catalogue" className="mt-3 inline-block text-sm text-blue-600 hover:underline">
            Parcourir le catalogue
          </Link>
        </div>
      )}
    </div>
  );
}
