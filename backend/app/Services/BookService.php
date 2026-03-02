<?php

namespace App\Services;

use App\Models\Book;
use Illuminate\Support\Facades\Cache;

/**
 * Service BookService - Logique métier des livres
 *
 * Responsabilités :
 * - Récupérer les livres avec filtres et pagination
 * - Recherche full-text optimisée (PostgreSQL + cache Redis)
 * - Créer / Modifier / Supprimer un livre
 * - Contrôles de sécurité avant suppression
 */
class BookService
{
    /**
     * Récupère tous les livres avec pagination et filtres optionnels
     *
     * Filtres possibles : genre, available (bool), publication_year
     *
     * @param  array $filters Tableau de filtres ['genre' => 'Roman', 'available' => true]
     * @param  int   $limit   Nombre de résultats par page (max 100, défaut 20)
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getAllBooks(array $filters = [], int $limit = 20)
    {
        $query = Book::query();

        // Filtre par genre
        if (!empty($filters['genre'])) {
            $query->where('genre', $filters['genre']);
        }

        // Filtre disponibilité : uniquement les livres avec exemplaires disponibles
        if (!empty($filters['available'])) {
            $query->where('available_quantity', '>', 0);
        }

        // Filtre par année de publication
        if (!empty($filters['publication_year'])) {
            $query->where('publication_year', $filters['publication_year']);
        }

        // Tri par défaut : titre alphabétique
        $query->orderBy('title');

        return $query->paginate(min($limit, 100));
    }

    /**
     * Recherche full-text des livres (titre, auteur, ISBN)
     *
     * Utilise ILIKE (PostgreSQL) pour une recherche insensible à la casse.
     * Les résultats sont mis en cache Redis 1 heure pour les performances Big Data.
     *
     * @param  string $searchTerm Le terme recherché
     * @param  int    $limit      Nombre de résultats par page
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function searchBooks(string $searchTerm, int $limit = 20)
    {
        $cacheKey = 'search:' . md5($searchTerm . $limit);

        // Chercher dans le cache Redis avant la BDD (optimisation Big Data)
        return Cache::remember($cacheKey, 3600, function () use ($searchTerm, $limit) {
            return Book::where('title', 'ILIKE', "%{$searchTerm}%")
                ->orWhere('author', 'ILIKE', "%{$searchTerm}%")
                ->orWhere('isbn', 'LIKE', "%{$searchTerm}%")
                ->orderBy('title')
                ->paginate($limit);
        });
    }

    /**
     * Récupère un livre par son identifiant
     *
     * @param  int $bookId
     * @return Book
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si non trouvé
     */
    public function getBookById(int $bookId): Book
    {
        // findOrFail génère automatiquement une réponse 404 si non trouvé
        return Book::findOrFail($bookId);
    }

    /**
     * Crée un nouveau livre dans le catalogue
     *
     * @param  array $data Données validées par CreateBookRequest
     * @return Book
     */
    public function createBook(array $data): Book
    {
        return Book::create($data);
    }

    /**
     * Met à jour les informations d'un livre existant
     *
     * @param  int   $bookId
     * @param  array $data   Données validées par UpdateBookRequest
     * @return Book
     */
    public function updateBook(int $bookId, array $data): Book
    {
        $book = Book::findOrFail($bookId);
        $book->update($data);

        // fresh() recharge le modèle depuis la BDD avec les nouvelles valeurs
        return $book->fresh();
    }

    /**
     * Supprime un livre du catalogue
     *
     * Refus de suppression si des emprunts sont en cours sur ce livre.
     *
     * @param  int $bookId
     * @return bool
     * @throws \Exception Si le livre a des emprunts actifs
     */
    public function deleteBook(int $bookId): bool
    {
        $book = Book::findOrFail($bookId);

        // Sécurité : ne pas supprimer si des emprunts sont en cours
        $activeLoans = $book->loans()->where('status', 'en_cours')->count();
        if ($activeLoans > 0) {
            throw new \Exception(
                "Impossible de supprimer : {$activeLoans} emprunt(s) en cours sur ce livre."
            );
        }

        return $book->delete();
    }
}
