<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\LoanService;

/**
 * Controller LoanController - Gestion des emprunts
 *
 * Routes :
 * GET /api/loans/my-loans - Mes emprunts (utilisateur connecté)
 * GET /api/loans - Tous les emprunts (bibliothécaire)
 * GET /api/loans/overdue - Emprunts en retard (bibliothécaire)
 * POST /api/loans - Créer un emprunt (bibliothécaire)
 * PUT /api/loans/{id}/return - Retourner un livre (bibliothécaire)
 * PUT /api/loans/{id}/extend - Prolonger un emprunt (utilisateur)
 */
class LoanController extends Controller
{
    // TODO: Injecter LoanService
    // TODO: Implémenter toutes les méthodes avec règles métier :
    // - Max 5 emprunts par utilisateur
    // - Durée 21 jours
    // - Max 3 prolongations
}
