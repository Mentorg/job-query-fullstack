<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\UpdateUserRequest;
use App\Models\User;
use App\Services\Api\V1\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        return response()->json($this->userService->getUsers());
    }

    public function show(Request $request)
    {
        $user = $this->userService->getById($request);

        return response()->json($user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $updatedUser = $this->userService->update($user, $request->validated(), $request->file('avatar'));

        return $updatedUser
            ? ResponseHelper::successResponse($updatedUser, 'User updated successfully.')
            : ResponseHelper::errorResponse('Failed to update user!', 400);
    }

    public function destroy(User $user)
    {
        $deletedUser = $this->userService->delete($user);

        return ResponseHelper::successResponse($deletedUser, 'User deleted successfully.');
    }

    public function updateEmail(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email'
        ]);

        $updatedUser = $this->userService->updateEmail($validated, $request);

        return $updatedUser
            ? ResponseHelper::successResponse($updatedUser, 'Email updated successfully.')
            : ResponseHelper::errorResponse('Failed to update email!', 400);
    }

    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|confirmed|string'
        ]);

        $updatedUser = $this->userService->updatePassword($validated, $request);

        return ResponseHelper::successResponse($updatedUser, 'Password updated successfully.');
    }

    public function updateLocaleSetting(Request $request)
    {
        $validated = $request->validate([
            'language' => 'sometimes|required|string',
            'timezone' => 'sometimes|required|string',
            'currencyId' => 'sometimes|required|exists:currencies,id'
        ]);

        $updatedUser = $this->userService->updateLocaleSetting($validated, $request);

        return $updatedUser
            ? ResponseHelper::successResponse($updatedUser, 'Locale settings updated successfully.')
            : ResponseHelper::errorResponse('Failed to update locale settings!', 400);
    }

    public function getCurrency(Request $request)
    {
        $currency = $this->userService->getCurrency($request);

        return response()->json($currency);
    }
}
