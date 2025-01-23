<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecruiterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $detailed = $request->has('detailed') && $request->get('detailed') === 'true';

        $data = [
            'id' => $this->id,
            'expertise' => $this->expertise,
            'description' => $this->description,
            'user' => new UserResource($this->whenLoaded('user')),
            'currency' => new CurrencyResource($this->currency),
            'userId' => $this->user_id
        ];

        if ($detailed) {
            $data['company'] = new CompanyResource($this->whenLoaded('company'));
            $data['jobs'] = JobResource::collection($this->whenLoaded('jobs'));
        }

        return $data;
    }
}
