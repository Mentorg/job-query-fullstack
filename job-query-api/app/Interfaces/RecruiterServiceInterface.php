<?php

namespace App\Interfaces;

interface RecruiterServiceInterface
{
  public function getById($request);

  public function update(array $validated, $request);

  public function getCompanyRecruiters($request);

  public function getRecruiterCompany($request);

  public function getNotificationSettings($request);

  public function updateNotificationSetting(array $validated, $request);
}
