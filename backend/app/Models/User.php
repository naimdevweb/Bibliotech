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

    // TODO: Définir les relations
    // public function loans() { return $this->hasMany(Loan::class); }
    // public function reservations() { return $this->hasMany(Reservation::class); }
    // public function notifications() { return $this->hasMany(Notification::class); }
}
