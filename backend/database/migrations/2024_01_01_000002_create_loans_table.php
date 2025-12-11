<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration create_loans_table
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            // TODO: Ajouter user_id, book_id (foreign keys)
            // TODO: Ajouter loan_date, due_date, return_date, extension_count, status
            // TODO: Ajouter index sur user_id, book_id, status
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
