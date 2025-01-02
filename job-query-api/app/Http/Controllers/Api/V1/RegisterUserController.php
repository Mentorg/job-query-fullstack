<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Services\Api\V1\RegisterUserService;

class RegisterUserController extends Controller
{
    protected $registerUserService;

    public function __construct(RegisterUserService $registerUserService)
    {
        $this->registerUserService = $registerUserService;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'location' => 'required|exists:locations,id',
            'companies' => Rule::requiredIf($request->get('recruiterRegistration') === 'true'),
            'phone' => 'nullable|string|max:20',
            'linkedin_profile' => 'nullable|string|max:255',
            'timezone' => 'nullable|string|max:255',
            'language' => 'nullable|string|max:255',
        ]);

        $createdUser = $this->registerUserService->create($validated, $request);

        return $createdUser
            ? ResponseHelper::successResponse($createdUser, 'User created successfully.')
            : ResponseHelper::errorResponse('Failed to create user!', 400);
    }
}
