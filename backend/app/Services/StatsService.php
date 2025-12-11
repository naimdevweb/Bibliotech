<?php

namespace App\Services;

use App\Models\Loan;
use App\Models\Book;
use App\Models\User;
use Illuminate\Support\Facades\DB;

/**
 * Service StatsService - Calcul des statistiques (admin)
 */
class StatsService
{
    /**
     * Récupère les KPI (indicateurs clés)
     *
     * @return array
     * [
     *   'total_users' => 150,
     *   'active_users' => 120,
     *   'total_books' => 100000,
     *   'available_books' => 95000,
     *   'active_loans' => 450,
     *   'overdue_loans' => 12
     * ]
     */
    public function getKPIs(): array
    {
        // TODO: Calculer tous les KPI avec Query Builder
    }

    /**
     * Évolution des emprunts par mois (12 derniers mois)
     *
     * @return array
     * [
     *   ['month' => 'Jan 2024', 'count' => 120],
     *   ['month' => 'Fev 2024', 'count' => 145],
     *   ...
     * ]
     */
    public function getLoansByMonth(): array
    {
        // TODO: Requête avec groupBy month
    }

    /**
     * Top 10 des livres les plus empruntés
     *
     * @param int $limit
     * @return \Illuminate\Support\Collection
     */
    public function getTopBooks(int $limit = 10)
    {
        // TODO: Jointure loans + books, groupBy, orderBy count DESC
    }

    /**
     * Répartition par genre
     *
     * @return array
     */
    public function getBooksByGenre(): array
    {
        // TODO: Grouper par genre, compter
    }

    // TODO: Ajouter méthodes :
    // - getNeverBorrowedBooks()
    // - getInactiveUsers() (> 1 an sans emprunt)
}
