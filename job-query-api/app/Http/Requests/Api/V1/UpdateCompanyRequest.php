<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyRequest extends FormRequest
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
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'description' => 'required|string|min:10|max:2500',
            'address' => 'required|string|min:5|max:30',
            'facebook' => 'required|string|min:3|max:20',
            'linkedin' => 'required|string|min:3|max:20',
            'twitter' => 'required|string|min:3|max:20',
            'website' => 'required|url:http,https',
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'slug' => 'required|string',
            'locations' => 'required|array',
            'locations.*' => 'required|integer',
        ];
    }
}
