<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration create_books_table
 *
 * Crée la table books avec tous les champs nécessaires + index
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            // TODO: Ajouter tous les champs (title, author, isbn, etc.)
            // TODO: Ajouter les index :
            // $table->index('title');
            // $table->index('author');
            // $table->unique('isbn');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
