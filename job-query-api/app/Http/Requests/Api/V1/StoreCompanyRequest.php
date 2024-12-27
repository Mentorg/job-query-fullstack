<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompanyRequest extends FormRequest
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
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required|string',
            'description' => 'required|string|min:10|max:1000',
            'address' => 'required|string|min:5|max:30',
            'facebook' => 'required|string|min:3|max:20',
            'linkedin' => 'required|string|min:3|max:20',
            'twitter' => 'required|string|min:3|max:20',
            'website' => 'required|url:http,https',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'slug' => 'required|string',
            'locations' => 'required|array',
            'locations.*' => 'required|integer',
        ];
    }
}
