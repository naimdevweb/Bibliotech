<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Model Notification - Notification (historique emails envoyés)
 *
 * Champs :
 * - id
 * - user_id (foreign key)
 * - type (enum : 'loan_confirmation', 'due_reminder', 'overdue_alert', 'reservation_available')
 * - subject (string)
 * - message (text)
 * - sent_at (timestamp)
 * - created_at, updated_at
 *
 * Relations :
 * - user : belongsTo(User)
 */
class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'subject',
        'message',
        'sent_at',
    ];

    protected $casts = [
        'sent_at' => 'datetime',
    ];

    // TODO: Définir relation user
}
