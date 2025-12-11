<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * FormRequest UpdateBookRequest - Validation mise à jour livre
 */
class UpdateBookRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && in_array($this->user()->role, ['bibliothecaire', 'admin']);
    }

    public function rules(): array
    {
        $bookId = $this->route('id'); // Récupérer l'ID depuis la route

        return [
            'title' => 'sometimes|required|string|min:2|max:255',
            'author' => 'sometimes|required|string|min:2|max:255',
            'isbn' => 'sometimes|required|string|regex:/^\d{13}$/|unique:books,isbn,' . $bookId,
            'publisher' => 'nullable|string|max:255',
            'publication_year' => 'nullable|integer|min:1000|max:' . date('Y'),
            'genre' => 'nullable|string|max:100',
            'summary' => 'nullable|string',
            'cover_image_url' => 'nullable|url',
            'total_quantity' => 'sometimes|required|integer|min:1',
            'available_quantity' => 'sometimes|required|integer|min:0',
        ];
    }
}
