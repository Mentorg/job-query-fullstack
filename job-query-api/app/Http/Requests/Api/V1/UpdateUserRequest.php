<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'required|string',
            'phone' => 'required|string',
            'linkedinProfile' => 'required|string|min:4',
            'locationId' => 'required|exists:locations,id'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'linkedin_profile' => $this->linkedinProfile,
        ]);
    }
}
