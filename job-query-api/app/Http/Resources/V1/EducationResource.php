<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EducationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'applicantId' => $this->applicant_id,
            'dateEnd' => $this->date_end,
            'dateStart' => $this->date_start,
            'degree' => $this->degree,
            'department' => $this->department,
            'gpa' => $this->gpa,
            'honors' => $this->honors,
            'id' => $this->id,
            'university' => $this->university
        ];
    }
}
