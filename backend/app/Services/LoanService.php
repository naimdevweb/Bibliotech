<?php

namespace App\Services;

use App\Models\Book;
use App\Models\Loan;
use App\Models\User;

/**
 * Service LoanService - Logique métier des emprunts
 *
 * Règles métier appliquées :
 * - Max 5 emprunts simultanés par utilisateur
 * - Durée d'emprunt : 21 jours
 * - Max 3 prolongations de 21 jours chacune
 * - Un utilisateur avec un retard ne peut pas emprunter
 */
class LoanService
{
    const MAX_LOANS_PER_USER = 5;
    const LOAN_DURATION_DAYS = 21;
    const MAX_EXTENSIONS     = 3;

    public function __construct(private ReservationService $reservationService) {}

    /**
     * Crée un nouvel emprunt (réservé aux bibliothécaires)
     *
     * Applique les règles métier :
     * 1. Vérifie que l'utilisateur n'a pas 5 emprunts en cours
     * 2. Vérifie qu'il n'a pas de retard
     * 3. Vérifie que le livre est disponible
     *
     * @param  int $userId L'identifiant de l'utilisateur lecteur
     * @param  int $bookId L'identifiant du livre à emprunter
     * @return Loan L'emprunt créé
     * @throws \Exception Si une règle métier n'est pas respectée
     */
    public function createLoan(int $userId, int $bookId): Loan
    {
        $user = User::findOrFail($userId);
        $book = Book::findOrFail($bookId);

        // Règle 1 : vérifier la limite de 5 emprunts simultanés
        $activeCount = $user->activeLoans()->count();
        if ($activeCount >= self::MAX_LOANS_PER_USER) {
            throw new \Exception(
                "Limite atteinte : {$user->first_name} a déjà {$activeCount} emprunts en cours (maximum " . self::MAX_LOANS_PER_USER . ")."
            );
        }

        // Règle 2 : vérifier l'absence de retard
        $hasOverdue = $user->loans()->where('status', 'en_retard')->exists();
        if ($hasOverdue) {
            throw new \Exception(
                "Emprunt impossible : {$user->first_name} a un ou plusieurs livres en retard."
            );
        }

        // Règle 3 : vérifier la disponibilité du livre
        if (!$book->isAvailable()) {
            throw new \Exception(
                "Le livre \"{$book->title}\" n'est pas disponible (0 exemplaire disponible)."
            );
        }

        // Créer l'emprunt avec une date de retour prévue à +21 jours
        $loan = Loan::create([
            'user_id'         => $userId,
            'book_id'         => $bookId,
            'loan_date'       => now(),
            'due_date'        => now()->addDays(self::LOAN_DURATION_DAYS),
            'extension_count' => 0,
            'status'          => 'en_cours',
        ]);

        // Décrémenter le stock disponible du livre
        $book->decrement('available_quantity');

        return $loan->load('user', 'book'); // Charger les relations pour la réponse
    }

    /**
     * Prolonge un emprunt de 21 jours supplémentaires (max 3 fois)
     *
     * @param  int $loanId L'identifiant de l'emprunt
     * @return Loan L'emprunt mis à jour
     * @throws \Exception Si le nombre maximum de prolongations est atteint
     */
    public function extendLoan(int $loanId): Loan
    {
        $loan = Loan::findOrFail($loanId);

        if (!$loan->canExtend()) {
            throw new \Exception(
                "Prolongation impossible : cet emprunt a déjà été prolongé " . self::MAX_EXTENSIONS . " fois ou n'est plus en cours."
            );
        }

        $loan->update([
            'due_date'        => $loan->due_date->addDays(self::LOAN_DURATION_DAYS),
            'extension_count' => $loan->extension_count + 1,
        ]);

        return $loan->fresh()->load('user', 'book');
    }

    /**
     * Enregistre le retour d'un livre
     *
     * Actions effectuées :
     * - Marque l'emprunt comme terminé
     * - Réincrémente le stock du livre
     * - Si des réservations existent, notifie le prochain dans la file
     *
     * @param  int $loanId L'identifiant de l'emprunt
     * @return Loan L'emprunt mis à jour
     */
    public function returnBook(int $loanId): Loan
    {
        $loan = Loan::with('book')->findOrFail($loanId);

        $loan->update([
            'return_date' => now(),
            'status'      => 'termine',
        ]);

        // Remettre le livre en stock
        $loan->book->increment('available_quantity');

        // Si des réservations sont en attente, notifier le premier de la file
        $hasReservations = $loan->book->reservations()
            ->where('status', 'en_attente')
            ->exists();

        if ($hasReservations) {
            $this->reservationService->notifyNextInQueue($loan->book_id);
        }

        return $loan->fresh()->load('user', 'book');
    }

    /**
     * Récupère les emprunts d'un utilisateur donné
     *
     * @param  int $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getMyLoans(int $userId)
    {
        return Loan::with('book')
            ->where('user_id', $userId)
            ->orderByDesc('loan_date')
            ->get();
    }

    /**
     * Récupère tous les emprunts en retard (pour le dashboard bibliothécaire)
     *
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getOverdueLoans()
    {
        return Loan::with(['user', 'book'])
            ->where('status', 'en_retard')
            ->orderBy('due_date')
            ->paginate(20);
    }

    /**
     * Met à jour les emprunts dépassant la date limite (appelé par une commande CRON)
     *
     * @return int Nombre d'emprunts marqués en retard
     */
    public function markOverdueLoans(): int
    {
        return Loan::where('status', 'en_cours')
            ->where('due_date', '<', now())
            ->update(['status' => 'en_retard']);
    }
}
