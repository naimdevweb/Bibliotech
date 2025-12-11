<?php

namespace App\Services;

use App\Models\Reservation;
use App\Models\Book;

/**
 * Service ReservationService - Logique métier des réservations
 *
 * Règles métier IMPORTANTES :
 * - File d'attente FIFO (premier arrivé, premier servi)
 * - Lorsqu'un livre devient disponible :
 *   1. Notifier le premier de la file
 *   2. Réserver le livre 7 jours pour lui
 * - Si non retiré après 7 jours : annulation auto, notifier le suivant
 */
class ReservationService
{
    const RESERVATION_EXPIRY_DAYS = 7;

    /**
     * Crée une réservation
     *
     * Vérifications :
     * - Le livre existe
     * - L'utilisateur n'a pas déjà réservé ce livre
     *
     * Actions :
     * - Ajouter à la file d'attente
     * - Calculer la position dans la file
     *
     * @param int $userId
     * @param int $bookId
     * @return Reservation
     */
    public function createReservation(int $userId, int $bookId): Reservation
    {
        // TODO: Vérifier que l'utilisateur n'a pas déjà réservé ce livre
        // TODO: Créer la réservation avec status = 'en_attente'
        // TODO: Calculer queue_position
    }

    /**
     * Annule une réservation
     *
     * @param int $reservationId
     * @return bool
     */
    public function cancelReservation(int $reservationId): bool
    {
        // TODO: Supprimer la réservation
        // TODO: Recalculer les positions de la file
    }

    /**
     * Notifie le premier de la file qu'un livre est disponible
     *
     * @param int $bookId
     * @return void
     */
    public function notifyNextInQueue(int $bookId): void
    {
        // TODO: Récupérer la première réservation en attente
        // TODO: Changer status en 'disponible'
        // TODO: Définir expiry_date = now() + 7 jours
        // TODO: Appeler NotificationService->sendReservationAvailable()
    }

    /**
     * Annule les réservations expirées (CRON quotidien)
     *
     * @return int Nombre de réservations annulées
     */
    public function cancelExpiredReservations(): int
    {
        // TODO: Trouver toutes les réservations avec expiry_date < now()
        // TODO: Les supprimer
        // TODO: Notifier les suivants dans la file
    }

    // TODO: Ajouter méthode getMyReservations($userId)
}
