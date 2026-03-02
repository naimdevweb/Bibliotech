<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateLoanRequest;
use App\Services\LoanService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Controller LoanController - Gestion des emprunts
 *
 * Routes utilisateur connecté :
 * GET /api/loans/my-loans        - Mes emprunts
 * PUT /api/loans/{id}/extend     - Prolonger un emprunt
 *
 * Routes bibliothécaire/admin :
 * GET /api/loans                 - Tous les emprunts
 * GET /api/loans/overdue         - Emprunts en retard
 * POST /api/loans                - Créer un emprunt
 * PUT /api/loans/{id}/return     - Enregistrer un retour
 */
class LoanController extends Controller
{
    public function __construct(private LoanService $loanService) {}

    /**
     * Retourne les emprunts de l'utilisateur connecté
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function myLoans(Request $request): JsonResponse
    {
        $loans = $this->loanService->getMyLoans($request->user()->id);

        return response()->json(['loans' => $loans]);
    }

    /**
     * Retourne tous les emprunts (bibliothécaire uniquement)
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $loans = \App\Models\Loan::with(['user', 'book'])
            ->orderByDesc('loan_date')
            ->paginate(20);

        return response()->json($loans);
    }

    /**
     * Retourne les emprunts en retard (bibliothécaire uniquement)
     *
     * @return JsonResponse
     */
    public function overdue(): JsonResponse
    {
        $loans = $this->loanService->getOverdueLoans();

        return response()->json($loans);
    }

    /**
     * Crée un nouvel emprunt (bibliothécaire uniquement)
     *
     * @param  CreateLoanRequest $request
     * @return JsonResponse
     */
    public function store(CreateLoanRequest $request): JsonResponse
    {
        try {
            $loan = $this->loanService->createLoan(
                $request->user_id,
                $request->book_id
            );

            return response()->json([
                'message' => 'Emprunt créé avec succès. Retour prévu le ' . $loan->due_date->format('d/m/Y') . '.',
                'loan'    => $loan,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Enregistre le retour d'un livre (bibliothécaire uniquement)
     *
     * @param  int $id Identifiant de l'emprunt
     * @return JsonResponse
     */
    public function returnBook(int $id): JsonResponse
    {
        try {
            $loan = $this->loanService->returnBook($id);

            return response()->json([
                'message' => 'Retour enregistré avec succès.',
                'loan'    => $loan,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Prolonge un emprunt de 21 jours (utilisateur connecté)
     *
     * @param  Request $request
     * @param  int     $id Identifiant de l'emprunt
     * @return JsonResponse
     */
    public function extend(Request $request, int $id): JsonResponse
    {
        try {
            $loan = $this->loanService->extendLoan($id);

            return response()->json([
                'message'      => 'Emprunt prolongé. Nouvelle date de retour : ' . $loan->due_date->format('d/m/Y') . '.',
                'loan'         => $loan,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }
    }
}
