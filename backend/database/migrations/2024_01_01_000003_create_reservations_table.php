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
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('book_id')->constrained()->onDelete('restrict');
            
            // TODO: Ajouter reservation_date, status, queue_position, expiry_date
            $table->date('reservation_date');
            $table->enum('status', ['en_attente', 'disponible', 'expiree'])->default('en_attente');
            $table->integer('queue_position');
            $table->date('expiry_date')->nullable();    
            // TODO: Index sur user_id, book_id, status
            $table->index('user_id');
            $table->index('book_id');
            $table->index('status');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};

 
