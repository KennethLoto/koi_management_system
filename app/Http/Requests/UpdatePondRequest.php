<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePondRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'capacity' => 'required|integer|min:1',
            'ph_level' => 'nullable|numeric|between:0,14',
            'temperature' => 'nullable|numeric|min:0',
            'ammonia_level' => 'nullable|numeric|min:0',
            'location_id' => 'required|string',
        ];
    }
}
