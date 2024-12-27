<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentMethodResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cardType' => $this->card_type,
            'cardNumber' => $this->card_number,
            'expirationDate' => $this->expiration_date,
            'cvv' => $this->cvv,
            'isActive' => $this->is_active
        ];
    }
}
