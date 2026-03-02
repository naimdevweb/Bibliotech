<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Services\BookService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Controller BookController - Gestion du catalogue de livres
 *
 * Routes publiques (sans authentification) :
 * GET  /api/books         - Liste paginée avec filtres
 * GET  /api/books/search  - Recherche full-text
 * GET  /api/books/{id}    - Détail d'un livre
 *
 * Routes protégées (bibliothécaire/admin uniquement) :
 * POST   /api/books       - Ajouter un livre
 * PUT    /api/books/{id}  - Modifier un livre
 * DELETE /api/books/{id}  - Supprimer un livre
 */
class BookController extends Controller
{
    /**
     * Injection du BookService via le constructeur (Dependency Injection)
     * C'est une bonne pratique Laravel qui facilite les tests unitaires.
     */
    public function __construct(private BookService $bookService) {}

    /**
     * Retourne la liste paginée des livres avec filtres optionnels
     *
     * Paramètres GET : ?genre=Roman&available=1&publication_year=2020&limit=20
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['genre', 'available', 'publication_year']);
        $limit   = (int) $request->get('limit', 20);

        $books = $this->bookService->getAllBooks($filters, $limit);

        return response()->json($books);
    }

    /**
     * Recherche des livres par titre, auteur ou ISBN
     *
     * Paramètres GET : ?q=tolkien&limit=20
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function search(Request $request): JsonResponse
    {
        $searchTerm = $request->get('q', '');

        if (strlen($searchTerm) < 2) {
            return response()->json([
                'message' => 'La recherche doit contenir au moins 2 caractères.',
            ], 422);
        }

        $limit = (int) $request->get('limit', 20);
        $books = $this->bookService->searchBooks($searchTerm, $limit);

        return response()->json($books);
    }

    /**
     * Retourne le détail d'un livre
     *
     * @param  int $id Identifiant du livre
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $book = $this->bookService->getBookById($id);

        return response()->json(['book' => $book]);
    }

    /**
     * Crée un nouveau livre (bibliothécaire uniquement)
     *
     * @param  CreateBookRequest $request
     * @return JsonResponse
     */
    public function store(CreateBookRequest $request): JsonResponse
    {
        $book = $this->bookService->createBook($request->validated());

        return response()->json([
            'message' => 'Livre ajouté au catalogue avec succès.',
            'book'    => $book,
        ], 201);
    }

    /**
     * Met à jour les informations d'un livre (bibliothécaire uniquement)
     *
     * @param  UpdateBookRequest $request
     * @param  int               $id
     * @return JsonResponse
     */
    public function update(UpdateBookRequest $request, int $id): JsonResponse
    {
        $book = $this->bookService->updateBook($id, $request->validated());

        return response()->json([
            'message' => 'Livre mis à jour avec succès.',
            'book'    => $book,
        ]);
    }

    /**
     * Supprime un livre du catalogue (bibliothécaire uniquement)
     *
     * @param  int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $this->bookService->deleteBook($id);

            return response()->json([
                'message' => 'Livre supprimé du catalogue.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 409); // 409 Conflict : le livre ne peut pas être supprimé
        }
    }
}
