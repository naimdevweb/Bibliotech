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
      // Foreign keys
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->foreignId('book_id')->constrained()->onDelete('restrict');

      // Dates
      $table->date('loan_date');
      $table->date('due_date');
      $table->date('return_date')->nullable();

      
      $table->integer('extension_count')->default(0);
      
      $table->enum('status', ['en_cours', 'termine', 'en_retard'])->default('en_cours');

      $table->timestamps();

      
     $table->index('user_id');
  $table->index('book_id');
  $table->index('status');


        });
    }

    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
