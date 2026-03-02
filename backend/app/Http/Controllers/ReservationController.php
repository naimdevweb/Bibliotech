<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateReservationRequest;
use App\Services\ReservationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Controller ReservationController - Gestion des réservations
 *
 * Routes utilisateur connecté :
 * GET    /api/reservations/my-reservations  - Mes réservations
 * POST   /api/reservations                 - Réserver un livre
 * DELETE /api/reservations/{id}            - Annuler ma réservation
 *
 * Routes bibliothécaire :
 * GET    /api/reservations/queue/{bookId}  - File d'attente d'un livre
 */
class ReservationController extends Controller
{
    public function __construct(private ReservationService $reservationService) {}

    /**
     * Retourne les réservations de l'utilisateur connecté
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function myReservations(Request $request): JsonResponse
    {
        $reservations = $this->reservationService->getMyReservations($request->user()->id);

        return response()->json(['reservations' => $reservations]);
    }

    /**
     * Retourne la file d'attente pour un livre donné (bibliothécaire)
     *
     * @param  int $bookId
     * @return JsonResponse
     */
    public function queue(int $bookId): JsonResponse
    {
        $queue = \App\Models\Reservation::with('user')
            ->where('book_id', $bookId)
            ->where('status', 'en_attente')
            ->orderBy('queue_position')
            ->get();

        return response()->json([
            'book_id' => $bookId,
            'count'   => $queue->count(),
            'queue'   => $queue,
        ]);
    }

    /**
     * Crée une réservation pour un livre
     *
     * @param  CreateReservationRequest $request
     * @return JsonResponse
     */
    public function store(CreateReservationRequest $request): JsonResponse
    {
        try {
            $reservation = $this->reservationService->createReservation(
                $request->user()->id,
                $request->book_id
            );

            return response()->json([
                'message'     => "Réservation créée. Vous êtes en position {$reservation->queue_position} dans la file d'attente.",
                'reservation' => $reservation,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Annule une réservation
     *
     * @param  Request $request
     * @param  int     $id Identifiant de la réservation
     * @return JsonResponse
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        try {
            $this->reservationService->cancelReservation($id);

            return response()->json([
                'message' => 'Réservation annulée avec succès.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }
    }
}
