<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration create_notifications_table
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();

            // Foreign key
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Colonnes
            $table->enum('type', ['loan_confirmation', 'due_reminder', 'overdue_alert', 'reservation_available']);
            $table->string('subject', 255);
            $table->text('message');
            $table->timestamp('sent_at');

            $table->timestamps();

            // Index pour optimiser les recherches
            $table->index('user_id');
            $table->index('type');
            $table->index('sent_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
