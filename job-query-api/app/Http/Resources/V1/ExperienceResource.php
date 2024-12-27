<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
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
            'company' => $this->company,
            'dateEnd' => $this->date_end,
            'dateStart' => $this->date_start,
            'id' => $this->id,
            'title' => $this->title,
            'location' => $this->location,
            'locationId' => $this->location_id
        ];
    }
}
