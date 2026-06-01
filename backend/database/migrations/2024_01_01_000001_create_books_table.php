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
            $table->string('title', 255);
            $table->string('author', 255);
            $table->string('isbn', 13)->unique();
            $table->string('publisher', 255)->nullable();
            $table->integer('publication_year')->nullable();
            $table->string('genre', 100)->nullable();
            $table->text('summary')->nullable();
            $table->string('cover_image_url', 255)->nullable();
            $table->integer('total_quantity')->default(1);
            $table->integer('available_quantity')->default(1);
            $table->timestamps();
            $table->index('title');
            $table->index('author');
            $table->index('genre');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
   