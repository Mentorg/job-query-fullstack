<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentRequest extends FormRequest
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
            'cardType' => 'required|string',
            'cardNumber' => 'required|string',
            'expirationDate' => 'required|string',
            'cvv' => 'required|string',
            'isActive' => 'required|boolean'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'card_type' => $this->cardType,
            'card_number' => $this->cardNumber,
            'expiration_date' => $this->expirationDate,
            'is_active' => $this->isActive,
        ]);
    }
}
