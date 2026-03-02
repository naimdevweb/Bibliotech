<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Model Book - Livre
 *
 * Champs :
 * - id
 * - title (string)
 * - author (string)
 * - isbn (string, unique)
 * - publisher (string, nullable)
 * - publication_year (integer, nullable)
 * - genre (string, nullable)
 * - summary (text, nullable)
 * - cover_image_url (string, nullable)
 * - total_quantity (integer, défaut 1)
 * - available_quantity (integer, défaut 1)
 * - created_at, updated_at
 *
 * Relations :
 * - loans : hasMany(Loan)
 * - reservations : hasMany(Reservation)
 */
class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'isbn',
        'publisher',
        'publication_year',
        'genre',
        'summary',
        'cover_image_url',
        'total_quantity',
        'available_quantity',
    ];

    // -----------------------------------------------------------------------
    // Relations Eloquent
    // -----------------------------------------------------------------------

    /** Un livre peut avoir plusieurs emprunts */
    public function loans()
    {
        return $this->hasMany(Loan::class);
    }

    /** Un livre peut avoir plusieurs réservations en file d'attente */
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    // -----------------------------------------------------------------------
    // Méthodes utilitaires
    // -----------------------------------------------------------------------

    /** Vérifie si le livre est disponible pour emprunt */
    public function isAvailable(): bool
    {
        return $this->available_quantity > 0;
    }

    /** Récupère la prochaine réservation en attente (FIFO) */
    public function nextReservation()
    {
        return $this->reservations()
            ->where('status', 'en_attente')
            ->orderBy('queue_position')
            ->first();
    }
}
