<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
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
            'applicants' => $this->applicants,
            'title' => $this->title,
            'isFulltime' => $this->is_fulltime,
            'workPreference' => $this->work_preference,
            'seniority' => $this->seniority,
            'experience' => $this->experience,
            'salaryFrom' => $this->salary_from,
            'salaryTo' => $this->salary_to,
            'isSalaryMonthly' => $this->is_salary_monthly,
            'hasVisaSponsorship' => $this->has_visa_sponsorship,
            'education' => $this->education,
            'status' => $this->status,
            'applicants' => $this->applicants,
            'slug' => $this->slug,
            'positionOverview' => $this->position_overview,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'deadline' => $this->deadline,
            'locations' => $this->getLocations(),
            'company' => $this->getCompany(),
            'recruiter' => $this->getRecruiter(),
            'qualifications' => $this->getQualifications(),
            'responsibilities' => $this->getResponsibilities(),
        ];
    }

    private function getLocations()
    {
        return LocationResource::collection($this->whenLoaded('locations'));
    }

    private function getCompany()
    {
        return new CompanyResource($this->company);
    }

    private function getRecruiter()
    {
        return new RecruiterResource($this->recruiter);
    }

    private function getQualifications()
    {
        return CompetencyResource::collection($this->whenLoaded('qualifications'));
    }

    private function getResponsibilities()
    {
        return CompetencyResource::collection($this->whenLoaded('responsibilities'));
    }
}
