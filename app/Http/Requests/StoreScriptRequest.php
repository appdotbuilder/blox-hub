<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreScriptRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'game_title' => 'required|string|max:255',
            'thumbnail_url' => 'nullable|url|max:500',
            'script_code' => 'required|string',
            'type' => 'required|in:free,premium',
            'is_featured' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Script title is required.',
            'game_title.required' => 'Game title is required.',
            'script_code.required' => 'Script code is required.',
            'type.required' => 'Script type is required.',
            'type.in' => 'Script type must be either free or premium.',
            'thumbnail_url.url' => 'Thumbnail must be a valid URL.',
        ];
    }
}