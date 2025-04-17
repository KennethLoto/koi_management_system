<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWaterLogRequest extends FormRequest
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
            'ph_level' => 'required|numeric|between:0,14',
            'temperature' => 'required|numeric|between:0,100',
            'ammonia_level' => 'required|numeric|between:0,10',
            'notes' => 'nullable|string|max:255',
            'pond_id' => 'required',
        ];
    }
}
