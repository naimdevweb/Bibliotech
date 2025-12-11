<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;

/**
 * Controller UserController - Gestion des utilisateurs
 *
 * Routes :
 * GET /api/users - Liste des utilisateurs (bibliothécaire/admin)
 * GET /api/users/{id} - Détails utilisateur
 * PUT /api/users/{id} - Modifier utilisateur
 * DELETE /api/users/{id} - Supprimer utilisateur
 * PUT /api/users/{id}/activate - Activer compte (bibliothécaire)
 * PUT /api/users/{id}/suspend - Suspendre compte (bibliothécaire)
 * GET /api/users/export-my-data - Export RGPD (utilisateur)
 */
class UserController extends Controller
{
    // TODO: Injecter UserService
    // TODO: Implémenter toutes les méthodes
    // - Vérifier qu'un utilisateur n'a pas d'emprunts actifs avant suppression
}
