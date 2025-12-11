<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * FormRequest CreateReservationRequest - Validation création réservation
 */
class CreateReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null; // Tout utilisateur connecté
    }

    public function rules(): array
    {
        return [
            'book_id' => 'required|exists:books,id',
        ];
    }
}
