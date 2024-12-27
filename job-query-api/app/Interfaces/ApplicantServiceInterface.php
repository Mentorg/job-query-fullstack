<?php

namespace App\Interfaces;

interface ApplicantServiceInterface
{
  public function getById($request);

  public function createEducation(array $validated, $request);

  public function updateEducation($applicant, $education, array $validated);

  public function deleteEducation($applicant, $education);

  public function createExperience(array $validated, $request);

  public function updateExperience($applicant, $experience, array $validated);

  public function deleteExperience($applicant, $experience);

  public function updateSkills(array $validated, $request);

  public function updateLanguages(array $validated, $request);
}
