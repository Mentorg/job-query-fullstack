<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Http\Requests\Api\V1\StoreJobRequest;
use App\Http\Requests\Api\V1\UpdateJobRequest;
use App\Models\User;
use App\Services\Api\V1\JobService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class JobController extends Controller implements HasMiddleware
{
    use AuthorizesRequests;

    protected $jobService;

    public function __construct(JobService $jobService)
    {
        $this->jobService = $jobService;
    }

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    public function index()
    {
        return response()->json($this->jobService->getJobs());
    }

    public function store(StoreJobRequest $request)
    {
        $this->authorize('create', Job::class);

        $createdJob = $this->jobService->create($request->validated(), $request);

        return $createdJob
            ? ResponseHelper::successResponse($createdJob, 'Job created successfully.')
            : ResponseHelper::errorResponse('Failed to create job!', 400);
    }

    public function show(Job $job)
    {
        $job = $this->jobService->getById($job);

        return response()->json($job);
    }

    public function update(UpdateJobRequest $request, Job $job)
    {
        $this->authorize('update', $job);

        $updatedJob = $this->jobService->update($job, $request->validated());

        return $updatedJob
            ? ResponseHelper::successResponse($updatedJob, 'Job updated successfully.')
            : ResponseHelper::errorResponse('Failed to update job!', 400);
    }

    public function destroy(Job $job)
    {
        $this->authorize('delete', $job);

        $deletedJob = $this->jobService->delete($job);

        return ResponseHelper::successResponse($deletedJob, 'Job deleted successfully.');
    }

    public function getJobsByRecruiter(User $user)
    {
        $recruiterJobs = $this->jobService->getJobsByRecruiter($user);

        return response()->json($recruiterJobs);
    }

    public function updateStatus(Request $request, Job $job)
    {
        $this->authorize('update', $job);

        $validated = $request->validate([
            'status' => 'required|string|in:open,filled',
        ]);

        $updatedStatus = $this->jobService->updateStatus($job, $validated);

        return $updatedStatus
            ? ResponseHelper::successResponse($updatedStatus, 'Job status updated successfully.')
            : ResponseHelper::errorResponse('Failed to update job status!', 400);
    }
}
