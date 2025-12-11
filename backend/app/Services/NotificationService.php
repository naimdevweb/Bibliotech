<?php

namespace App\Services;

use App\Models\User;
use App\Models\Loan;
use App\Models\Reservation;
use Illuminate\Support\Facades\Mail;

/**
 * Service NotificationService - Envoi d'emails
 *
 * Emails à envoyer :
 * - Confirmation d'emprunt
 * - Rappel 3 jours avant échéance
 * - Alerte retard
 * - Réservation disponible
 * - Réservation annulée (expiration)
 */
class NotificationService
{
    /**
     * Envoie un email de confirmation d'emprunt
     *
     * @param Loan $loan
     * @return void
     */
    public function sendLoanConfirmation(Loan $loan): void
    {
        // TODO: Utiliser Laravel Mail
        // Mail::to($loan->user->email)->send(new LoanConfirmationMail($loan));
    }

    /**
     * Envoie un rappel d'échéance (3 jours avant)
     *
     * @param Loan $loan
     * @return void
     */
    public function sendDueReminder(Loan $loan): void
    {
        // TODO: Implémenter
    }

    /**
     * Envoie une alerte de retard
     *
     * @param Loan $loan
     * @return void
     */
    public function sendOverdueAlert(Loan $loan): void
    {
        // TODO: Implémenter
    }

    /**
     * Notifie qu'une réservation est disponible
     *
     * @param Reservation $reservation
     * @return void
     */
    public function sendReservationAvailable(Reservation $reservation): void
    {
        // TODO: Implémenter
    }

    // TODO: Méthode sendBulkReminders() appelée par CRON
}
