<?php

namespace App\Services\Api\V1;

use App\Http\Resources\V1\ApplicationCollection;
use App\Http\Resources\V1\JobCollection;
use App\Interfaces\ApplicationServiceInterface;
use App\Models\Applicant;
use App\Models\Application;
use App\Models\Company;
use App\Models\Job;
use App\Models\Recruiter;
use App\Models\User;
use App\Notifications\ApplicationStatusUpdatedNotification;
use App\Notifications\ApplicationSubmittedNotification;
use Exception;
use Illuminate\Support\Facades\Auth;

class ApplicationService implements ApplicationServiceInterface
{
    public function createApplication($job, array $validated)
    {
        $applicant = Applicant::where('user_id', Auth::user()->id)->first();
        $user = User::find($applicant->user_id);
        $company = Company::find($job->company_id);

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

        $user->notify(new ApplicationSubmittedNotification($job, $company));

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
        $user = User::where('id', $application->applicant_id)->first();
        $job = Job::find($application->job_listings_id);
        $recruiterData = Recruiter::where('id', $job->recruiter_id)->first();
        $recruiter = User::where('id', $recruiterData->id)->first();
        $company = Company::where('id', $job->company_id)->first();

        $application->update([
            'status' => $validated['status']
        ]);

        $user->notify(new ApplicationStatusUpdatedNotification($application, $job, $recruiter, $company));

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
