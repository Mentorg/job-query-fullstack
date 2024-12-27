<?php

namespace App\Services\Api\V1;

use App\Http\Resources\V1\CompanyResource;
use App\Http\Resources\V1\RecruiterResource;
use App\Interfaces\RecruiterServiceInterface;

class RecruiterService implements RecruiterServiceInterface
{
  protected function getAuthenticatedRecruiter($request)
  {
    return $request->user()->recruiter;
  }

  public function getById($request)
  {
    $recruiter = $this->getAuthenticatedRecruiter($request)->load(
      'company',
      'jobs.locations'
    );

    if (!$recruiter) {
      return null;
    }

    return new RecruiterResource($recruiter);
  }

  public function update(array $validated, $request)
  {
    $recruiter = $this->getAuthenticatedRecruiter($request);

    if (!$recruiter) {
      return null;
    }

    $recruiter->update([
      'expertise' => $validated['expertise'],
      'description' => $validated['description'],
    ]);

    return new RecruiterResource($recruiter);
  }

  public function getCompanyRecruiters($request)
  {
    $company = $this->getAuthenticatedRecruiter($request)->company;

    if (!$company) {
      return null;
    }

    $recruiters = $company->recruiter()->with('user')->get();

    return RecruiterResource::collection($recruiters);
  }

  public function getRecruiterCompany($request)
  {
    $recruiterCompany = $this->getAuthenticatedRecruiter($request)->load('company.locations');

    if (!$recruiterCompany) {
      return null;
    }

    return new CompanyResource($recruiterCompany->company);
  }

  public function getNotificationSettings($request)
  {
    $recruiterNotificationSettings = $this->getAuthenticatedRecruiter($request)->notificationSetting;

    if (!$recruiterNotificationSettings) {
      return null;
    }

    return $recruiterNotificationSettings;
  }

  public function updateNotificationSetting(array $validated, $request)
  {
    $recruiterNotificationSettings = $this->getAuthenticatedRecruiter($request)->notificationSetting;

    if (!$recruiterNotificationSettings) {
      return null;
    }

    $allowedKeys = [
      'new_candidate',
      'communication_updates',
      'hiring_stage',
      'resume_status',
      'events_update',
      'recruitment_dates',
      'security_alerts',
      'renewal_dates',
    ];

    $updates = array_intersect_key($validated, array_flip($allowedKeys));

    if (!empty($updates)) {
      $recruiterNotificationSettings->update($updates);
    }

    return $recruiterNotificationSettings;
  }
}
