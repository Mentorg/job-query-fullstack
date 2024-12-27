<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'description' => $this->description,
            'address' => $this->address,
            'facebook' => $this->facebook,
            'linkedin' => $this->linkedin,
            'twitter' => $this->twitter,
            'website' => $this->website,
            'avatar' => $this->avatar,
            'slug' => $this->slug,
            'locations' => $this->getLocations(),
            'createdAt' => $this->created_at,
        ];
    }

    private function getLocations()
    {
        return LocationResource::collection($this->whenLoaded('locations'));
    }
}
