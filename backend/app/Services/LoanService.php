<?php

namespace App\Services;

use App\Models\Loan;
use App\Models\Book;
use App\Models\User;

/**
 * Service LoanService - Logique métier des emprunts
 *
 * Règles métier IMPORTANTES :
 * - Max 5 emprunts simultanés par utilisateur
 * - Durée d'emprunt : 21 jours
 * - Max 3 prolongations de 21 jours chacune
 * - Un utilisateur avec retards ne peut pas emprunter
 * - Notification automatique 3 jours avant échéance
 * - Notification automatique en cas de retard
 */
class LoanService
{
    const MAX_LOANS_PER_USER = 5;
    const LOAN_DURATION_DAYS = 21;
    const MAX_EXTENSIONS = 3;

    /**
     * Crée un nouvel emprunt
     *
     * Vérifications :
     * - L'utilisateur n'a pas atteint la limite de 5 emprunts
     * - Le livre est disponible (available_quantity > 0)
     * - L'utilisateur n'a pas de retard en cours
     *
     * Actions :
     * - Créer l'emprunt avec due_date = loan_date + 21 jours
     * - Décrémenter available_quantity du livre
     * - Envoyer email de confirmation
     *
     * @param int $userId
     * @param int $bookId
     * @return Loan
     * @throws \Exception Si les règles ne sont pas respectées
     */
    public function createLoan(int $userId, int $bookId): Loan
    {
        // TODO: Implémenter toutes les vérifications
        // TODO: Créer le prêt
        // TODO: Mettre à jour le stock
        // TODO: Appeler NotificationService->sendLoanConfirmation()
    }

    /**
     * Prolonge un emprunt (max 3 fois)
     *
     * @param int $loanId
     * @return Loan
     * @throws \Exception Si déjà prolongé 3 fois
     */
    public function extendLoan(int $loanId): Loan
    {
        // TODO: Vérifier extension_count < 3
        // TODO: Ajouter 21 jours à due_date
        // TODO: Incrémenter extension_count
    }

    /**
     * Retourne un livre
     *
     * Actions :
     * - Marquer le prêt comme terminé
     * - Incrémenter available_quantity du livre
     * - Si le livre était réservé, notifier le premier dans la file
     *
     * @param int $loanId
     * @return Loan
     */
    public function returnBook(int $loanId): Loan
    {
        // TODO: Implémenter
        // TODO: Vérifier s'il y a des réservations en attente
        // TODO: Appeler ReservationService->notifyNextInQueue()
    }

    // TODO: Ajouter méthodes :
    // - getMyLoans($userId)
    // - getOverdueLoans()
    // - sendOverdueReminders() (appelé par un CRON quotidien)
}
