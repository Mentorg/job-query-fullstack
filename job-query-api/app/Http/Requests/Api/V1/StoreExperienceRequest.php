<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreExperienceRequest extends FormRequest
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
            'company' => 'required|string',
            'title' => 'required|string',
            'dateStart' => 'required|date_format:d.m.Y',
            'dateEnd' => 'required|date_format:d.m.Y',
            'locationId' => 'required|exists:locations,id'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'date_start' => $this->dateStart,
            'date_end' => $this->dateEnd,
            'location_id' => $this->locationId
        ]);
    }
}
