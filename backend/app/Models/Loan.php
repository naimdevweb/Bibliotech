<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Model Loan - Emprunt
 *
 * Champs :
 * - id
 * - user_id (foreign key)
 * - book_id (foreign key)
 * - loan_date (date)
 * - due_date (date) : date de retour prévue
 * - return_date (date, nullable) : date de retour réelle
 * - extension_count (integer, défaut 0) : nombre de prolongations
 * - status (enum : 'en_cours', 'termine', 'en_retard')
 * - created_at, updated_at
 *
 * Relations :
 * - user : belongsTo(User)
 * - book : belongsTo(Book)
 */
class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'loan_date',
        'due_date',
        'return_date',
        'extension_count',
        'status',
    ];

    protected $casts = [
        'loan_date' => 'date',
        'due_date' => 'date',
        'return_date' => 'date',
    ];

    // TODO: Définir les relations
    // public function user() { return $this->belongsTo(User::class); }
    // public function book() { return $this->belongsTo(Book::class); }
}
