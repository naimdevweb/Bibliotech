<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\StatsService;

/**
 * Controller StatsController - Statistiques (admin uniquement)
 *
 * Routes :
 * GET /api/stats/kpis - Indicateurs clés (adhérents actifs, livres, emprunts, retards)
 * GET /api/stats/loans-by-month - Évolution emprunts par mois (12 mois)
 * GET /api/stats/top-books - Top 10 livres les plus empruntés
 * GET /api/stats/books-by-genre - Répartition par genre
 * GET /api/stats/never-borrowed - Livres jamais empruntés
 * GET /api/stats/inactive-users - Adhérents inactifs (> 1 an)
 * GET /api/stats/export - Export PDF/CSV
 */
class StatsController extends Controller
{
    // TODO: Injecter StatsService
    // TODO: Implémenter toutes les méthodes
}
