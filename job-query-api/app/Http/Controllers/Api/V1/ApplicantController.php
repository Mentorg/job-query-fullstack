<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreEducationRequest;
use App\Http\Requests\Api\V1\StoreExperienceRequest;
use App\Http\Requests\Api\V1\UpdateEducationRequest;
use App\Http\Requests\Api\V1\UpdateExperienceRequest;
use App\Models\Applicant;
use App\Models\Education;
use App\Models\Experience;
use App\Services\Api\V1\ApplicantService;
use Illuminate\Http\Request;

class ApplicantController extends Controller
{
    protected $applicantService;

    public function __construct(ApplicantService $applicantService)
    {
        $this->applicantService = $applicantService;
    }

    public function show(Request $request)
    {
        $applicant = $this->applicantService->getById($request);

        return response()->json($applicant);
    }

    public function createEducation(StoreEducationRequest $request)
    {
        $createdEducation = $this->applicantService->createEducation($request->validated(), $request);

        return $createdEducation
            ? ResponseHelper::successResponse($createdEducation, 'Education created successfully.')
            : ResponseHelper::errorResponse('Failed to create education!', 400);
    }

    public function updateEducation(UpdateEducationRequest $request, Applicant $applicant, Education $education)
    {
        $updatedEducation = $this->applicantService->updateEducation($applicant, $education, $request->validated());

        return $updatedEducation
            ? ResponseHelper::successResponse($updatedEducation, 'Education updated successfully.')
            : ResponseHelper::errorResponse('Failed to update education!', 400);
    }

    public function deleteEducation(Applicant $applicant, Education $education)
    {
        $deletedEducation = $this->applicantService->deleteEducation($applicant, $education);

        return ResponseHelper::successResponse($deletedEducation, 'Education deleted successfully.');
    }

    public function createExperience(StoreExperienceRequest $request)
    {
        $createdExperience = $this->applicantService->createExperience($request->validated(), $request);

        return $createdExperience
            ? ResponseHelper::successResponse($createdExperience, 'Experience created successfully.')
            : ResponseHelper::errorResponse('Failed to create experience!', 400);
    }

    public function updateExperience(UpdateExperienceRequest $request, Applicant $applicant, Experience $experience)
    {
        $updatedExperience = $this->applicantService->updateExperience($applicant, $experience, $request->validated());

        return $updatedExperience
            ? ResponseHelper::successResponse($updatedExperience, 'Experience updated successfully.')
            : ResponseHelper::errorResponse('Failed to update experience!', 400);
    }

    public function deleteExperience(Applicant $applicant, Experience $experience)
    {
        $deletedExperience = $this->applicantService->deleteExperience($applicant, $experience);

        return ResponseHelper::successResponse($deletedExperience, 'Experience deleted successfully.');
    }

    public function updateSkills(Request $request)
    {
        $validated = $request->validate([
            'skills' => 'array',
            'skills.*' => 'integer|exists:skills,id'
        ]);

        $updatedSkills = $this->applicantService->updateSkills($validated, $request);

        return $updatedSkills
            ? ResponseHelper::successResponse($updatedSkills, 'Skills updated successfully.')
            : ResponseHelper::errorResponse('Failed to update skills!', 400);
    }

    public function updateLanguages(Request $request)
    {
        $validated = $request->validate([
            'languages' => 'array',
            'languages.*' => 'integer|exists:languages,id'
        ]);

        $updatedLanguages = $this->applicantService->updateLanguages($validated, $request);

        return $updatedLanguages
            ? ResponseHelper::successResponse($updatedLanguages, 'Languages updated successfully.')
            : ResponseHelper::errorResponse('Failed to update languages!', 400);
    }
}
