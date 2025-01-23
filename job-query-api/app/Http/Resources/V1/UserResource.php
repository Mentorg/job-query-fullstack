<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $recruiterRegistration = $request->has('recruiterRegistration') && $request->get('recruiterRegistration') === 'true';

        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->role,
            'email' => $this->email,
            'phone' => $this->phone,
            'linkedinProfile' => $this->linkedin_profile,
            'language' => $this->language,
            'timezone' => $this->timezone,
            'mfa' => $this->mfa,
            'avatar' => $this->avatar,
            'location' => new LocationResource($this->location),
            'createdAt' => $this->created_at
        ];

        if ($recruiterRegistration) {
            $data['companies'] = new CompanyResource($this->companies);
        }

        return $data;
    }
}
