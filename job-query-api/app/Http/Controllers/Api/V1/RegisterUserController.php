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
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'companies' => Rule::requiredIf($request->get('recruiterRegistration') === 'true'),
        ]);

        $createdUser = $this->registerUserService->create($validated);

        return $createdUser
            ? ResponseHelper::successResponse($createdUser, 'User created successfully.')
            : ResponseHelper::errorResponse('Failed to create user!', 400);
    }
}
