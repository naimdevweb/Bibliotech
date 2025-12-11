<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * FormRequest CreateLoanRequest - Validation création emprunt
 */
class CreateLoanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && in_array($this->user()->role, ['bibliothecaire', 'admin']);
    }

    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
        ];
    }
}
