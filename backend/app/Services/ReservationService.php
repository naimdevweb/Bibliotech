<?php

namespace App\Services;

use App\Models\Book;
use App\Models\Reservation;

/**
 * Service ReservationService - Logique métier des réservations
 *
 * Règles métier appliquées :
 * - File d'attente FIFO (premier réservé = premier servi)
 * - Quand un livre est rendu : le premier de la file est notifié
 * - Il a 7 jours pour venir le récupérer
 * - Après 7 jours sans retrait : annulation auto, le suivant est notifié
 */
class ReservationService
{
    const RESERVATION_EXPIRY_DAYS = 7;

    /**
     * Crée une réservation pour un livre non disponible
     *
     * Vérifie que l'utilisateur n'a pas déjà réservé ce même livre.
     * Calcule automatiquement la position dans la file d'attente.
     *
     * @param  int $userId
     * @param  int $bookId
     * @return Reservation
     * @throws \Exception Si l'utilisateur a déjà réservé ce livre
     */
    public function createReservation(int $userId, int $bookId): Reservation
    {
        $book = Book::findOrFail($bookId);

        // Vérifier si l'utilisateur a déjà réservé ce livre
        $existingReservation = Reservation::where('user_id', $userId)
            ->where('book_id', $bookId)
            ->whereIn('status', ['en_attente', 'disponible'])
            ->exists();

        if ($existingReservation) {
            throw new \Exception("Vous avez déjà une réservation en cours pour ce livre.");
        }

        // Calculer la position dans la file (on se met à la fin)
        $nextPosition = Reservation::where('book_id', $bookId)
            ->where('status', 'en_attente')
            ->count() + 1;

        $reservation = Reservation::create([
            'user_id'          => $userId,
            'book_id'          => $bookId,
            'reservation_date' => now(),
            'status'           => 'en_attente',
            'queue_position'   => $nextPosition,
        ]);

        return $reservation->load('user', 'book');
    }

    /**
     * Annule une réservation et recalcule les positions de la file
     *
     * @param  int $reservationId
     * @return bool
     */
    public function cancelReservation(int $reservationId): bool
    {
        $reservation = Reservation::findOrFail($reservationId);
        $bookId      = $reservation->book_id;
        $position    = $reservation->queue_position;

        $reservation->delete();

        // Recalculer les positions : décaler toutes celles après celle supprimée
        Reservation::where('book_id', $bookId)
            ->where('status', 'en_attente')
            ->where('queue_position', '>', $position)
            ->decrement('queue_position');

        return true;
    }

    /**
     * Passe le statut de la première réservation à 'disponible' (appelé lors d'un retour)
     *
     * Le livre est "bloqué" pour cet utilisateur pendant 7 jours.
     *
     * @param  int $bookId
     * @return void
     */
    public function notifyNextInQueue(int $bookId): void
    {
        $nextReservation = Reservation::where('book_id', $bookId)
            ->where('status', 'en_attente')
            ->orderBy('queue_position')
            ->first();

        if (!$nextReservation) {
            return; // Personne dans la file, rien à faire
        }

        $nextReservation->update([
            'status'      => 'disponible',
            'expiry_date' => now()->addDays(self::RESERVATION_EXPIRY_DAYS),
        ]);

        // TODO (ton travail) : envoyer un email de notification ici
        // NotificationService::sendReservationAvailable($nextReservation->user, $nextReservation->book);
    }

    /**
     * Annule les réservations expirées (statut 'disponible' depuis plus de 7 jours)
     * Méthode appelée par une commande CRON quotidienne.
     *
     * @return int Nombre de réservations annulées
     */
    public function cancelExpiredReservations(): int
    {
        $expired = Reservation::where('status', 'disponible')
            ->where('expiry_date', '<', now())
            ->get();

        $count = 0;
        foreach ($expired as $reservation) {
            $this->cancelReservation($reservation->id);

            // Notifier le prochain dans la file
            $this->notifyNextInQueue($reservation->book_id);
            $count++;
        }

        return $count;
    }

    /**
     * Récupère toutes les réservations d'un utilisateur
     *
     * @param  int $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getMyReservations(int $userId)
    {
        return Reservation::with('book')
            ->where('user_id', $userId)
            ->orderByDesc('reservation_date')
            ->get();
    }
}
