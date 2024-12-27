<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicantResource extends JsonResource
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
            'userId' => $this->user_id,
            'locationId' => $this->location_id,
            'educations' => $this->getEducations(),
            'experiences' => $this->getExperiences(),
            'languages' => $this->getLanguages(),
            'skills' => $this->getSkills(),
            'user' => $this->getUser()
        ];
    }

    private function getEducations()
    {
        return EducationResource::collection($this->whenLoaded('educations'));
    }

    private function getExperiences()
    {
        return ExperienceResource::collection($this->whenLoaded('experiences'));
    }

    private function getLanguages()
    {
        return LanguageResource::collection($this->whenLoaded('languages'));
    }

    private function getSkills()
    {
        return SkillResource::collection($this->whenLoaded('skills'));
    }

    private function getUser()
    {
        return new UserResource($this->user);
    }
}
