<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
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
            'note' => $this->note,
            'resume' => $this->resume,
            'status' => $this->status,
            'applicantId' => $this->applicant_id,
            'jobListingsId' => $this->job_listings_id,
            'applicant' => $this->getApplicant(),
            'job' => $this->getJob(),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at
        ];
    }

    private function getApplicant()
    {
        return new ApplicantResource($this->applicant);
    }

    private function getJob()
    {
        return new JobResource($this->job);
    }
}
