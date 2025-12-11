<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BookService;

/**
 * Controller BookController - Gestion des livres
 *
 * Routes :
 * GET /api/books - Liste des livres (pagination, filtres)
 * GET /api/books/{id} - Détails d'un livre
 * GET /api/books/search - Recherche
 * POST /api/books - Créer un livre (bibliothécaire)
 * PUT /api/books/{id} - Modifier un livre (bibliothécaire)
 * DELETE /api/books/{id} - Supprimer un livre (bibliothécaire)
 * POST /api/books/import - Import CSV (bibliothécaire)
 */
class BookController extends Controller
{
    // TODO: Injecter BookService dans le constructeur
    // TODO: Implémenter toutes les méthodes
}
