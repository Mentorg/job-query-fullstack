<?php

namespace App\Services\Api\V1;

use App\Http\Resources\V1\ApplicantResource;
use App\Http\Resources\V1\EducationResource;
use App\Http\Resources\V1\ExperienceResource;
use App\Interfaces\ApplicantServiceInterface;
use Exception;
use Illuminate\Support\Facades\DB;

class ApplicantService implements ApplicantServiceInterface
{
  protected function getAuthenticatedApplicant($request)
  {
    return $request->user()->applicant;
  }

  protected function handleEducationAttributes(array $validated)
  {
    return [
      'department' => $validated['department'],
      'degree' => $validated['degree'],
      'university' => $validated['university'],
      'honors' => $validated['honors'],
      'gpa' => $validated['gpa'],
      'date_start' => $validated['dateStart'],
      'date_end' => $validated['dateEnd'],
    ];
  }

  protected function handleExperienceAttributes(array $validated)
  {
    return [
      'company' => $validated['company'],
      'title' => $validated['title'],
      'date_start' => $validated['dateStart'],
      'date_end' => $validated['dateEnd'],
      'location_id' => $validated['locationId']
    ];
  }

  public function getById($request)
  {
    $applicant = $request->user()->applicant;
    return new ApplicantResource($applicant->load([
      'educations',
      'experiences',
      'experiences.location',
      'skills',
      'languages'
    ]));
  }

  public function createEducation(array $validated, $request)
  {
    $applicant = $this->getAuthenticatedApplicant($request);

    $validated['applicant_id'] = $applicant->id;

    DB::beginTransaction();

    try {
      $education = $applicant->educations()->create($this->handleEducationAttributes($validated));
      DB::commit();
      return new EducationResource($education);
    } catch (Exception $e) {
      DB::rollBack();
      throw new Exception("An error occurred while creating the education: " . $e->getMessage());
    }
  }

  public function updateEducation($applicant, $education, array $validated)
  {
    if ($education->applicant_id !== $applicant->id) {
      throw new Exception('Education data not found');
    }

    DB::beginTransaction();

    try {
      $education->update($this->handleEducationAttributes($validated));
      DB::commit();
      return new EducationResource($education);
    } catch (Exception $e) {
      DB::rollBack();
      throw new Exception("An error occurred while updating the education: " . $e->getMessage());
    }
  }

  public function deleteEducation($applicant, $education)
  {
    if ($education->applicant_id !== $applicant->id) {
      throw new Exception('Education data not found');
    }

    $education->delete();

    return $education;
  }

  public function createExperience(array $validated, $request)
  {
    $applicant = $this->getAuthenticatedApplicant($request);

    $validated['applicant_id'] = $applicant->id;

    DB::beginTransaction();

    try {
      $experience = $applicant->experiences()->create($this->handleExperienceAttributes($validated));
      DB::commit();
      return new ExperienceResource($experience);
    } catch (Exception $e) {
      DB::rollBack();
      throw new Exception("An error occurred while creating the experience: " . $e->getMessage());
    }
  }

  public function updateExperience($applicant, $experience, array $validated)
  {
    if ($experience->applicant_id !== $applicant->id) {
      throw new Exception('Experience data not found');
    }

    DB::beginTransaction();

    try {
      $experience->update($this->handleExperienceAttributes($validated));
      DB::commit();
      return new ExperienceResource($experience);
    } catch (Exception $e) {
      DB::rollBack();
      throw new Exception("An error occurred while updating the experience: " . $e->getMessage());
    }
  }

  public function deleteExperience($applicant, $experience)
  {
    if ($experience->applicant_id !== $applicant->id) {
      throw new Exception('Experience data not found');
    }

    $experience->delete();

    return $experience;
  }

  public function updateSkills(array $validated, $request)
  {
    $applicant = $this->getAuthenticatedApplicant($request);

    if (isset($validated['skills'])) {
      $applicant->skills()->sync($validated['skills']);
    }
    return $applicant;
  }

  public function updateLanguages(array $validated, $request)
  {
    $applicant = $this->getAuthenticatedApplicant($request);

    if (isset($validated['languages'])) {
      $applicant->languages()->sync($validated['languages']);
    }
    return $applicant;
  }
}
