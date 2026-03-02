<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Model Reservation - Réservation
 *
 * Champs :
 * - id
 * - user_id (foreign key)
 * - book_id (foreign key)
 * - reservation_date (date)
 * - status (enum : 'en_attente', 'disponible', 'expiree')
 * - queue_position (integer) : position dans la file d'attente
 * - expiry_date (date, nullable) : date limite de retrait (si disponible)
 * - created_at, updated_at
 *
 * Relations :
 * - user : belongsTo(User)
 * - book : belongsTo(Book)
 */
class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'reservation_date',
        'status',
        'queue_position',
        'expiry_date',
    ];

    protected $casts = [
        'reservation_date' => 'date',
        'expiry_date' => 'date',
    ];

    // -----------------------------------------------------------------------
    // Relations Eloquent
    // -----------------------------------------------------------------------

    /** La réservation appartient à un utilisateur */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /** La réservation appartient à un livre */
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
