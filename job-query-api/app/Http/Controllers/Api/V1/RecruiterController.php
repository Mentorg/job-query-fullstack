<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Services\Api\V1\RecruiterService;
use Illuminate\Http\Request;

class RecruiterController extends Controller
{
    protected $recruiterService;

    public function __construct(RecruiterService $recruiterService)
    {
        $this->recruiterService = $recruiterService;
    }

    public function show(Request $request)
    {
        $recruiter = $this->recruiterService->getById($request);

        return response()->json($recruiter);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'expertise' => 'required|string',
            'description' => 'required|string'
        ]);

        $updatedRecruiter = $this->recruiterService->update($validated, $request);

        return $updatedRecruiter
            ? ResponseHelper::successResponse($updatedRecruiter, 'Recruiter data updated successfully.')
            : ResponseHelper::errorResponse('Failed to update recruiter data!', 400);
    }

    public function getCompanyRecruiters(Request $request)
    {
        $recruiters = $this->recruiterService->getCompanyRecruiters($request);

        return response()->json($recruiters);
    }

    public function getRecruiterCompany(Request $request)
    {
        $company = $this->recruiterService->getRecruiterCompany($request);

        return response()->json($company);
    }

    public function getNotificationSettings(Request $request)
    {
        $settings = $this->recruiterService->getNotificationSettings($request);

        return response()->json($settings);
    }

    public function updateNotificationSetting(Request $request)
    {
        $validated = $request->validate([
            'new_candidate' => 'sometimes|required|boolean',
            'communication_updates' => 'sometimes|required|boolean',
            'hiring_stage' => 'sometimes|required|boolean',
            'resume_status' => 'sometimes|required|boolean',
            'events_update' => 'sometimes|required|boolean',
            'recruitment_dates' => 'sometimes|required|boolean',
            'security_alerts' => 'sometimes|required|boolean',
            'renewal_dates' => 'sometimes|required|boolean',
        ]);

        $updatedSettings = $this->recruiterService->updateNotificationSetting($validated, $request);

        return $updatedSettings
            ? ResponseHelper::successResponse($updatedSettings, 'Notification settings updated successfully.')
            : ResponseHelper::errorResponse('Failed to update notification settings!', 400);
    }
}
