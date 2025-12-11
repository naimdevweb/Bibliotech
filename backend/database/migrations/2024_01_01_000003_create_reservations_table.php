<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration create_reservations_table
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            // TODO: Ajouter user_id, book_id (foreign keys)
            // TODO: Ajouter reservation_date, status, queue_position, expiry_date
            // TODO: Index sur user_id, book_id, status
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
