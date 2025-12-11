<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * FormRequest CreateBookRequest - Validation création livre
 */
class CreateBookRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Uniquement les bibliothécaires et admins
        return $this->user() && in_array($this->user()->role, ['bibliothecaire', 'admin']);
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|min:2|max:255',
            'author' => 'required|string|min:2|max:255',
            'isbn' => 'required|string|regex:/^\d{13}$/|unique:books,isbn',
            'publisher' => 'nullable|string|max:255',
            'publication_year' => 'nullable|integer|min:1000|max:' . date('Y'),
            'genre' => 'nullable|string|max:100',
            'summary' => 'nullable|string',
            'cover_image_url' => 'nullable|url',
            'total_quantity' => 'required|integer|min:1',
            'available_quantity' => 'required|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'isbn.regex' => 'L\'ISBN doit contenir exactement 13 chiffres.',
        ];
    }
}
