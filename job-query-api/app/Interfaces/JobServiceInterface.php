<?php

namespace App\Interfaces;

interface JobServiceInterface
{
  public function getJobs();

  public function create(array $fields, $request);

  public function getById($job);

  public function update($job, array $validated);

  public function delete($job);

  public function getJobsByRecruiter($user);

  public function updateStatus($job, array $validated);
}
