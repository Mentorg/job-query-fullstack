<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Job;
use App\Models\User;
use App\Services\Api\V1\ApplicationService;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    protected $applicationService;

    public function __construct(ApplicationService $applicationService)
    {
        $this->applicationService = $applicationService;
    }

    public function store(Request $request, Job $job)
    {
        $validated = $request->validate([
            'status' => 'required|string',
        ]);

        $createdApplication = $this->applicationService->createApplication($job, $validated);

        return $createdApplication
            ? ResponseHelper::successResponse($createdApplication, 'Application created successfully.')
            : ResponseHelper::errorResponse('Failed to create application!', 400);
    }

    public function getApplicantJobs(User $user)
    {
        $applicantJobs = $this->applicationService->getApplicantJobs($user);

        return response()->json($applicantJobs);
    }

    public function getRecruiterApplications(Request $request)
    {
        $recruiterApplications = $this->applicationService->getRecruiterApplications($request);

        return response()->json($recruiterApplications);
    }

    public function updateStatus(Request $request, Application $application)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:interview,on-hold,shortlisted,rejected'
        ]);

        $updatedStatus = $this->applicationService->updateStatus($application, $validated);

        return $updatedStatus
            ? ResponseHelper::successResponse($updatedStatus, 'Application status updated successfully.')
            : ResponseHelper::errorResponse('Failed to update application status!', 400);
    }

    public function updateNote(Request $request, Application $application)
    {
        $validated = $request->validate([
            'note' => 'required|string',
        ]);

        $updatedNote = $this->applicationService->updateNote($application, $validated);

        return $updatedNote
            ? ResponseHelper::successResponse($updatedNote, 'Application note updated successfully.')
            : ResponseHelper::errorResponse('Failed to update application note!', 400);
    }
}
