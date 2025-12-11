<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

/**
 * Seeder BookSeeder - Remplir la BDD avec des livres
 *
 * Pour le développement : quelques livres de test
 * Pour la production : import depuis OpenLibrary (100k livres)
 */
class BookSeeder extends Seeder
{
    public function run(): void
    {
        // TODO: Créer des livres de test
        // Book::create([...]);

        // OU importer depuis CSV OpenLibrary
        // $csv = storage_path('app/openlibrary_books.csv');
        // Importer...
    }
}
