<?php

namespace App\Interfaces;

interface ApplicationServiceInterface
{
  public function createApplication($job, array $fields);

  public function getApplicantJobs($user);

  public function getRecruiterApplications($request);

  public function updateStatus($application, array $fields);

  public function updateNote($application, array $fields);
}
