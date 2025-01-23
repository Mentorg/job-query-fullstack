<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CurrencyResource extends JsonResource
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
            'symbol' => $this->symbol,
            'name' => $this->name,
            'symbolNative' => $this->symbol_native,
            'decimalDigits' => $this->decimal_digits,
            'rounding' => $this->rounding,
            'code' => $this->code,
            'namePlural' => $this->name_plural
        ];
    }
}
