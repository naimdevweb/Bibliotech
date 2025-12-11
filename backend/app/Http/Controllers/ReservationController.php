<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ReservationService;

/**
 * Controller ReservationController - Gestion des réservations
 *
 * Routes :
 * GET /api/reservations/my-reservations - Mes réservations
 * POST /api/reservations - Créer une réservation
 * DELETE /api/reservations/{id} - Annuler une réservation
 * GET /api/reservations/queue/{bookId} - File d'attente pour un livre
 */
class ReservationController extends Controller
{
    // TODO: Injecter ReservationService
    // TODO: Implémenter toutes les méthodes avec règles métier :
    // - File d'attente FIFO
    // - Disponible 7 jours après notification
    // - Auto-annulation si non retiré
}
