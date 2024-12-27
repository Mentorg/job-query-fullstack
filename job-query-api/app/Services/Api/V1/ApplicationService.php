<?php

namespace App\Services\Api\V1;

use App\Http\Resources\V1\ApplicationCollection;
use App\Http\Resources\V1\JobCollection;
use App\Interfaces\ApplicationServiceInterface;
use App\Models\Applicant;
use App\Models\Application;
use Exception;
use Illuminate\Support\Facades\Auth;

class ApplicationService implements ApplicationServiceInterface
{
  public function createApplication($job, array $validated)
  {
    $applicant = Applicant::where('user_id', Auth::user()->id)->first();

    $existingApplication = Application::where('applicant_id', $applicant->id)
      ->where('job_listings_id', $job->id)
      ->first();

    if ($existingApplication) {
      throw new Exception('You have already applied for this job.');
    }

    $application = Application::create([
      'status' => $validated['status'],
      'job_listings_id' => $job->id,
      'applicant_id' => $applicant->id,
    ]);

    return $application;
  }

  public function getApplicantJobs($user)
  {
    $applicant = $user->applicant;

    if (!$applicant) {
      return null;
    }

    $applications = Application::with([
      'job',
      'job.company',
      'job.locations',
      'job.qualifications',
      'job.responsibilities'
    ])
      ->where('applicant_id', $applicant->id)
      ->get();

    if (!$applications) {
      return null;
    }

    $jobs = $applications->map(function ($application) {
      return $application->job;
    });

    return new JobCollection($jobs);
  }

  public function getRecruiterApplications($request)
  {
    $recruiterId = $request->user()->recruiter->id;

    $applications = Application::with([
      'applicant.user.location',
      'applicant.experiences.location',
      'applicant.educations',
      'applicant.languages',
      'applicant.skills',
      'job'
    ])
      ->whereHas('job', function ($query) use ($recruiterId) {
        $query->where('recruiter_id', $recruiterId);
      })->get();

    return new ApplicationCollection($applications);
  }

  public function updateStatus($application, array $validated)
  {
    $application->update([
      'status' => $validated['status']
    ]);

    return $application;
  }

  public function updateNote($application, array $validated)
  {
    $application->update([
      'note' => $validated['note']
    ]);

    return $application;
  }
}
