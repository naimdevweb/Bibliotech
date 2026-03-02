<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Model User - Utilisateur
 *
 * Champs :
 * - id
 * - membership_number (string, unique) : numéro d'adhérent
 * - first_name (string)
 * - last_name (string)
 * - email (string, unique)
 * - password (string, hashed)
 * - phone (string, nullable)
 * - address (string, nullable)
 * - role (enum : 'lecteur', 'bibliothecaire', 'admin')
 * - status (enum : 'en_attente', 'actif', 'suspendu')
 * - created_at, updated_at
 *
 * Relations :
 * - loans : hasMany(Loan)
 * - reservations : hasMany(Reservation)
 * - notifications : hasMany(Notification)
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'membership_number',
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'address',
        'role',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // -----------------------------------------------------------------------
    // Relations Eloquent
    // -----------------------------------------------------------------------

    /** L'utilisateur peut avoir plusieurs emprunts */
    public function loans()
    {
        return $this->hasMany(Loan::class);
    }

    /** L'utilisateur peut avoir plusieurs réservations */
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    /** L'utilisateur peut avoir plusieurs notifications */
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    // -----------------------------------------------------------------------
    // Méthodes utilitaires
    // -----------------------------------------------------------------------

    /** Retourne les emprunts actuellement en cours */
    public function activeLoans()
    {
        return $this->loans()->whereIn('status', ['en_cours', 'en_retard']);
    }

    /** Vérifie si l'utilisateur peut emprunter un nouveau livre */
    public function canBorrow(): bool
    {
        // Règle métier : max 5 emprunts simultanés, aucun retard
        $activeCount = $this->activeLoans()->count();
        $hasOverdue  = $this->loans()->where('status', 'en_retard')->exists();

        return $activeCount < 5 && !$hasOverdue;
    }

    /** Génère un numéro d'adhérent unique (format BIB-YYYYXXXX) */
    public static function generateMembershipNumber(): string
    {
        $year   = date('Y');
        $random = str_pad(random_int(1, 9999), 4, '0', STR_PAD_LEFT);
        return "BIB-{$year}{$random}";
    }
}
